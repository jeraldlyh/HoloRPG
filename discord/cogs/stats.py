import random

class Statistics():
    def __init__(self):
        self.baseStats = {
            1 : { 
                "Monster" : {
                    "HP" : 7,
                    "Attack" : 7,
                    "Defence" : 5,
                    "Scaling" : 0.05
                },
                "Player" : {
                    "HP" : 5,
                    "Attack" : 2,
                    "Defence" : 2
                },
            },
            30 : {
                "Monster" : {
                    "HP" : 15,
                    "Attack" : 14,
                    "Defence" : 5,
                    "Scaling" : 0.1
                },
                "Player" : {
                    "HP" : 9,
                    "Attack" : 6,
                    "Defence" : 5
                },
            },
            60 : {
                "Monster" : {
                    "HP" : 37,
                    "Attack" : 28,
                    "Defence" : 20,
                    "Scaling" : 0.2
                },
                "Player" : {
                    "HP" : 13,
                    "Attack" : 10,
                    "Defence" : 8
                },
            },
            90 : {
                "Monster" : {
                    "HP" : 103,
                    "Attack" : 56,
                    "Defence" : 40,
                    "Scaling" : 0.4
                },
                "Player" : {
                    "HP" : 17,
                    "Attack" : 14,
                    "Defence" : 11
                },
            }
        }

    def get_monster_stats(self, level, numberOfPlayers):
        """
        [level] - An integer to represent monster level
        [numberOfPlayers] - An integer to represent number of players to enhance monster stats
        
        # of players    Multiplier
        1               5%
        2               10%
        3               20%
        4               40%
        
        Returns a tuple of monster statistics
        """

        for key in self.baseStats:
            if level < key:
                multiplier = self.baseStats[key]["Monster"]["Scaling"] * numberOfPlayers
                health = int(self.baseStats[key]["Monster"]["HP"] * level * multiplier)
                attack = int(self.baseStats[key]["Monster"]["Attack"] * level * multiplier)
                defence = int(self.baseStats[key]["Monster"]["Defence"] * level * multiplier)
                return health, attack, defence

    def damage_dealt(self, attack, defence):
        """
        [attack] - An integer that represents a player/monster's attack power
        [defence] - An integer that represents a player/monster's defence

        Computes damage dealt to player/monster
        """
        damage = (attack ** 2) / (attack + defence)
        lowerBound = damage * 0.75
        upperBound = damage * 1.25
        damageDealt = random.randint(int(lowerBound), int(upperBound))


        return damageDealt