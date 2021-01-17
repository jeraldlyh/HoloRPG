import random
import math
import os

class Monsters(object):
    def __init__(self, index):
        # Dungeons
        # self.dungeons = ["Dungeon 1", "Dungeon 2", "Dungeon 3", "Dungeon 4"]
        self.dungeons + {
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
        self.dungeonName = self.dungeons[index]["Name"]
        self.min = self.dungeons[index]["Min"]
        self.max = self.dungeons[index]["Max"]
        
        # Monster Stats
        self.level = random.randint(self.baseLevel, self.baseLevel + 10 if self.baseLevel != 0 else self.baseLevel + 9)
        self.HP = 15 * self.level
        self.maxHP = self.HP
        self.attack = 7 + 2 * self.level
        self.defence = random.randint(1, self.level)
        
        # Experience
        self.expExact = math.log10(50 ** (self.level * self.level)) * self.level / 3
        self.expGain = random.randint(int(self.expExact / 2), int(self.expExact))
        with open(r"{0}/utils/monsters.txt".format(os.getcwd()), "r") as f:
            self.nameList = [x.rstrip("\n") for x in f.readlines()]
        self.name = random.choice(self.nameList)

    @property
    