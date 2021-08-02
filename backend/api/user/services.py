import random
from collections import OrderedDict
from typing import List, Tuple
from django.db.models.expressions import F
from datetime import datetime

from .rpg import BASE_STATS, LEVELS
from .models import Bounty, UserProfile, UserRelationship
from .exceptions import BountyExistError, SameUserError, InsufficientCurrencyError, InsufficientHealthError
from .selectors import get_bounties_by_target_status, get_bounty_by_id, get_user_by_username


def is_attack_successful(player: UserProfile, target: UserProfile) -> bool:
    """
        Determine if an attack by player is successful on target
        1. Compute individual player's stats (i.e. attack & defence)
        2. Retrieve player's winning percentage out of the sum of both players' stats
        3. Roll a number out of 100
        4. If dice number < player's chance, attack is successful
    """

    player_stats = player.attack + player.defence
    target_stats = target.attack + target.defence
    total = player_stats + target_stats

    player_chance = round((player_stats / total) * 100)
    dice = random.randint(0, 100)

    return dice <= player_chance


def exp_required(level: int) -> int:
    """
        Computes EXP required for current level
        - EXP Required: (8 * Level^3) / 4
    """

    BASE_EXP = 8
    amount = BASE_EXP * (level ** 3)
    return round(amount / 4)


def damage_dealt(player: UserProfile, target: UserProfile, percentage: int = 100) -> int:
    """
        Computes damage dealt from player to target
        - Amount = (Attack^2 / (Attack + Defence))
        - Damage =  Random(75% of amount, 125% of amount) * Percentage
    """

    amount = player.attack ** 2 / (player.attack / player.defence)
    lower_bound = int(0.75 * amount)
    upper_bound = int(1.25 * amount)
    damage = round(random.randint(lower_bound, upper_bound) * percentage)

    if target.current_health - damage > 0:
        target.current_health = F("current_health") - damage
    else:
        target.current_health = 0

    target.save()
    return damage


def process_level(player: UserProfile):
    """
        Returns number of levels if player has leveled up
    """

    # Retrieves the correct index
    index = 0
    for key in LEVELS[::-1]:
        if player.level >= key:
            index = key

    levels = 0
    while player.experience >= exp_required(player.level):
        player.attack = F("attack") + BASE_STATS[index]["Player"]["Attack"]
        player.defence = F("defence") + BASE_STATS[index]["Player"]["Defence"]
        player.current_health = F("current_health") + BASE_STATS[index]["Player"]["HP"]
        player.max_health = F("max_health") + BASE_STATS[index]["Player"]["HP"]
        player.save()
        player.refresh_from_db()
        levels += 1

    return levels


def get_user_net_worth(username: str) -> int:
    """
        Computes user's net worth
       -  Net Worth = 3 * (Total income generated by entities)
    """

    from ..entity.selectors import get_user_entities_by_username

    player_entities = get_user_entities_by_username(username)

    net_worth = 0
    for entity in player_entities:
        net_worth += entity.entity.income * entity.quantity

    return net_worth * 3


def exp_gained(player: UserProfile, target: UserProfile, percentage: int = 100) -> int:
    """
        Adds player's experience
        - Buffer = (Player Level + Target Level) * 5
        - EXP Gained = (Target Level^2 * 4) +- Random(-Buffer, +Buffer) * percentage
    """

    bound = (player.level + target.level) * 5
    buffer = random.randint(-bound, bound)
    experience = (target.level ** 2) * 4 + buffer
    player.experience = F("experience") + round(experience * percentage)
    player.save()

    return experience


def plunder(player: UserProfile, target: UserProfile) -> int:
    """
        Target loses 3% of currency when attacked by player
    """

    currency = round(0.03 * target.currency)
    add_player_currency(player, currency)
    deduct_player_currency(target, currency)

    return currency


def attack_target(player: UserProfile, target: UserProfile) -> Tuple[int, int, int]:
    """
        Player attacks target and rewards are as follows:
        - Winner HP -= 25% damage from loser
        - Winner Currency += Plunder
        - Winner EXP += EXP gained
        - Loser HP -= 100% damage from winner
        - Loser EXP += 25% of EXP gained
    """

    if target.current_health == 0:
        raise InsufficientHealthError

    print("BEFORE", player.experience)
    result = is_attack_successful(player, target)
    winner = player if result else target
    loser = target if result else player

    winner_damage = damage_dealt(winner, loser)         # Winner deals 100% damage to loser
    loser_damage = damage_dealt(loser, winner, 25)      # Loser returns 25% damage to winner

    winner_exp = exp_gained(winner, loser)              # Winner earns 100% of experience in the battle
    loser_exp = exp_gained(loser, winner, 25)           # Loser earns 25% of experience in the battle

    winner_currency = plunder(winner, target)           # Winner plunders loser's currency

    print("AFTER", player.experience)
    return (winner_damage, winner_currency, winner_exp) if winner == player else (loser_damage, 0, loser_exp)


def claim_bounty(player: UserProfile, bounty: Bounty) -> None:
    """
        Set bounty to be claimed by player and rewards player with bounty value
    """

    bounty.status = "CLAIMED"
    bounty.claimed_by = player
    bounty.claimed_at = datetime.now()
    bounty.save()

    add_player_currency(player, bounty.value)


def add_player_currency(player: UserProfile, value: int) -> None:
    """
        Adds player's currency
    """

    player.currency = F("currency") + value
    player.save()


def deduct_player_currency(player: UserProfile, value) -> None:
    """
        Deducts player's currency
    """

    player.currency = F("currency") - value
    player.save()


def attack_player_on_bounty(player_name: str, bounty_id: str) -> Tuple[int, int, int, str]:
    """
        Attacks target on bounty list

        Raises
        ------
        - InsufficientHealthError: Target is already dead
    """

    player = get_user_by_username(player_name)
    bounty = get_bounty_by_id(bounty_id)

    target = bounty.target

    if target.current_health == 0:
        raise InsufficientHealthError
    
    damage, currency, exp = attack_target(player, target)
    if target.current_health == 0:
        claim_bounty(player, bounty)
    
    return damage, currency, exp, target.username


def create_bounty(serializer_data: OrderedDict) -> None:
    """
        Creates a bounty on target by player

        Raises
        ------
        - SameUserError: Player places bounty on themselves
        - BountyExistError: An existing bounty on the target exists
        - InsufficientHealthError: Target is already dead
        - InsufficientCurrencyError: Player does not have enough currency
    """

    data = list(serializer_data.items())

    player = data[1][1]
    target = data[2][1]
    bounty_value = data[0][1]

    if player.username == target.username:
        raise SameUserError
    
    if get_bounties_by_target_status(target.username, "UNCLAIMED").count() != 0:
        raise BountyExistError
    
    if target.current_health == 0:
        raise InsufficientHealthError
    
    if player.currency < bounty_value:
        raise InsufficientCurrencyError
    
    deduct_player_currency(player, bounty_value)
    Bounty.objects.create(**serializer_data)


def create_user_relationship(serializer_data: OrderedDict) -> None:
    """
        Creates a relationship between two players

        Raises
        ------
        - SameUserError: Player tries to befriend themselves
        - BountyExistError: An existing bounty on the target exists
        - InsufficientHealthError: Target is already dead
        - InsufficientCurrencyError: Player does not have enough currency
    """
    data = list(serializer_data.items())
    user_from = data[0][1]
    user_to = data[1][1]

    if user_from.username == user_to.username:
        raise SameUserError

    UserRelationship.objects.create(**serializer_data)