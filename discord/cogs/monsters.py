import random
import math
import os

from cogs.stats import Statistics

class Monsters(object):
    def __init__(self, index, numberOfPlayers):
        # Dungeons
        # self.dungeons = ["Dungeon 1", "Dungeon 2", "Dungeon 3", "Dungeon 4"]
        self.dungeons = {
            1 : {
                "Name" : "Dungeon 1",
                "Min" : 1,
                "Max" : 10
            },
            2 : {
                "Name" : "Dungeon 2",
                "Min" : 11,
                "Max" : 20
            },
            3 : {
                "Name" : "Dungeon 3",
                "Min" : 21,
                "Max" : 30
            },
            4 : {
                "Name" : "Dungeon 4",
                "Min" : 31,
                "Max" : 40
            }
        }
        with open(r"{0}/utils/monsters.txt".format(os.getcwd()), "r") as f:
            self.nameList = [x.rstrip("\n") for x in f.readlines()]
        self.name = random.choice(self.nameList)
        self.dungeonName = self.dungeons[index]["Name"]
        self.min = self.dungeons[index]["Min"]
        self.max = self.dungeons[index]["Max"]
        
        # Monster Stats
        self.level = random.randint(self.min, self.max)
        self.stats = Statistics().get_monster_stats(self.level, numberOfPlayers)
        self.HP = self.stats[0]
        self.maxHP = self.HP
        self.attack = self.stats[1]
        self.defence = self.stats[2]
        
        # Experience
        self.expExact = (self.level ** 2) * 4
        self.expGain = random.randint(int(self.expExact * 0.75), int(self.expExact * 1.25))
        
