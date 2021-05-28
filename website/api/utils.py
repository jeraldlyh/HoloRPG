import random
import string
from django.db.models import Model


def generate_unique_code(room: Model):
    """
        Filter the list of existing Room objects and checks if 
        a new generated code exists. If not, return the unique code
    """

    length = 6
    while True:
        code = ''.join(random.choices(string.ascii_lowercase, k=length))  # Generates a random ASCII string of length 6
        if room.objects.filter(id=code).count() == 0:
            return code

def get_monster_name(dungeon_name, monster: Model):
    monsters = list(monster.objects.all().filter(dungeon_name=dungeon_name))
    return random.choice(monsters) if len(monsters) > 1 else monsters[0]

def generate_monster_stats(dungeon_level):
    """
        [dungeon_level] - An integer to represent monster level
        [number_of_players] - An integer to represent number of players to enhance monster stats
        
        # of players    Multiplier
        1               5%
        2               10%
        3               20%
        4               40%
        
        Returns a tuple of monster statistics (health, attack, defence)
    """

    number_of_players = 1               # TODO - CALCULATE BASED ON NUM OF PLAYERS
    baseStats = {
        1: { 
            "HP" : 7,
            "Attack" : 5,
            "Defence" : 5,
            "Scaling" : 0.05
        },
        30: {
            "HP" : 15,
            "Attack" : 10,
            "Defence" : 10,
            "Scaling" : 0.1
        },
        60 : {
            "HP" : 37,
            "Attack" : 20,
            "Defence" : 20,
            "Scaling" : 0.2
        },
        90 : {
            "HP" : 103,
            "Attack" : 40,
            "Defence" : 40,
            "Scaling" : 0.4
        }
    }

    index = 0
    for key in list(baseStats.keys())[::-1]:
        if dungeon_level >= key:
            index = key
            break

    multiplier = 1 + baseStats[index]["Scaling"] * number_of_players
    health = int(baseStats[index]["HP"] * dungeon_level * multiplier)
    attack = int(baseStats[index]["Attack"] * dungeon_level * multiplier)
    defence = int(baseStats[index]["Defence"] * dungeon_level * multiplier)

    return health, attack, defence