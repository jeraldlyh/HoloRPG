import random
import math


class Monsters(object):
    def __init__(self, baseLevelOfDungeon, maxLevelOfDungeon, playerAttack):
        # Monster Stats
        self.level = random.randint(baseLevelOfDungeon, maxLevelOfDungeon)
        self.health = 15 * self.level
        self.baseAttack = 7 + 2 * self.level
        self.damage = random.randint(self.baseAttack * 0.75, self.baseAttack * 1.25)
        self.defence = random.randint(1, playerAttack)
        
        # Experience
        self.expExact = math.log10(50 ** (self.level * self.level)) * self.level / 3
        self.expGain = random.randint(self.expExact / 2, self.expExact)