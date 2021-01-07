import random
import math
import os

class Monsters(object):
    def __init__(self, baseLevel):
        # Dungeons
        self.dungeons = ['Dungeon 1', 'Dungeon 2', 'Dungeon 3', 'Dungeon 4']
        self.dungeonName = self.dungeons[baseLevel]
        
        # Monster Stats
        self.level = random.randint(baseLevel, baseLevel + 10 if baseLevel != 0 else baseLevel + 9)
        self.HP = 15 * self.level
        self.maxHP = self.HP
        self.attack = 7 + 2 * self.level
        self.defence = random.randint(1, self.level)
        
        # Experience
        self.expExact = math.log10(50 ** (self.level * self.level)) * self.level / 3
        self.expGain = random.randint(int(self.expExact / 2), int(self.expExact))
        with open(r'{0}/utils/monsters.txt'.format(os.getcwd()), 'r') as f:
            self.nameList = [x.rstrip('\n') for x in f.readlines()]
        self.name = random.choice(self.nameList)