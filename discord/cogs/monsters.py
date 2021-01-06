import random
import math


class Monsters(object):
    def __init__(self, baseLevelOfDungeon, maxLevelOfDungeon):
        # Monster Stats
        self.level = random.randint(baseLevelOfDungeon, maxLevelOfDungeon)
        self.health = 15 * self.level
        self.baseAttack = 7 + 2 * self.level
        self.damage = random.randint(int(self.baseAttack * 0.75), int(self.baseAttack * 1.25))
        self.defence = random.randint(1, self.level)
        
        # Experience
        self.expExact = math.log10(50 ** (self.level * self.level)) * self.level / 3
        self.expGain = random.randint(int(self.expExact / 2), int(self.expExact))