from collections import OrderedDict
from typing import List, Tuple
from django.db.models.expressions import F
from rest_framework.utils.serializer_helpers import ReturnDict

from .models import Bounty, UserProfile
from .serializers import BountySerializer
from .exceptions import BountyExist, BountyOnSameUser, InsufficientCurrency, InsufficientHealth
from .selectors import get_bounties_by_status, get_bounties_by_target_status, get_bounty_by_id, get_user_by_username

def damage_dealt(attack, defence) -> int:
    return attack**2 / (attack / defence)

def attack_target(player: UserProfile, target: UserProfile):
    """
        Raises InsufficientHealth if target is already dead
        Returns the damage value to be rendered on frontend
    """
    if target.current_health == 0:
        raise InsufficientHealth

    damage = damage_dealt(player.attack, player.defence)

    if target.current_health - damage > 0:
        target.current_health = F("current_health") - damage
    else:
        target.current_health = 0
    target.save()
    return damage

def claim_bounty(player: UserProfile, bounty: Bounty):
    bounty.status = "CLAIMED"
    bounty.claimed_by = player
    bounty.save()
    add_player_currency(player, bounty.value)

def get_unclaimed_bounties() -> List[dict]:
    bounty_queryset = Bounty.objects.filter(status="UNCLAIMED")
    bounty_serializer = BountySerializer(bounty_queryset, many=True)
    result = [dict(OrderedDict(bounty)) for bounty in bounty_serializer.data]
    return result

def add_player_currency(player: UserProfile, value):
    player.currency = F("currency") + value
    player.save()

def deduct_player_currency(player: UserProfile, value):
    player.currency = F("currency") - value
    player.save()

def attack_player_on_bounty(player_name: str, bounty_id: str) -> Tuple[int, UserProfile]:
    """
        Raises InsufficientHealth if target is already dead prior to attack
        Returns damage dealt in battle and target profile to be rendered on frontend
    """
    player = get_user_by_username(player_name)
    bounty = get_bounty_by_id(bounty_id)
    target = bounty.target

    if target.current_health == 0:
        raise InsufficientHealth
    
    damage = attack_target(player, target)
    if target.current_health == 0:
        claim_bounty(player, bounty)
    
    return damage, target

def create_bounty(serializer_data: OrderedDict):
    """
        Raises BountyOnSameUser if player places bounty on themselves
        Raises BountyExist if an existing bounty on the target exists
        Raises InsufficientHealth if target is already dead
        Raises InsufficientCurrency if player does not have enough currency
    """

    data = list(serializer_data.items())
    player = data[1][1]
    target = data[2][1]
    bounty_value = data[0][1]

    if player.user.username == target.user.username:
        raise BountyOnSameUser
    
    if get_bounties_by_target_status(target.user.username, "UNCLAIMED").count() != 0:
        raise BountyExist
    
    if target.current_health == 0:
        raise InsufficientHealth
    
    if player.currency < bounty_value:
        raise InsufficientCurrency
    
    deduct_player_currency(player, bounty_value)
    Bounty.objects.create(**serializer_data)