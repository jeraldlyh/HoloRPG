import random
import discord
import sqlite3

from config.parser import Parser

class Statistics():
    def __init__(self):
        self.config = Parser()
        self.baseStats = {
            1 : { 
                "Monster" : {
                    "HP" : 7,
                    "Attack" : 5,
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
                    "Attack" : 10,
                    "Defence" : 10,
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
                    "Attack" : 20,
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
                    "Attack" : 40,
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
        self.levels = [1, 30, 60, 90]

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

        index = 0
        for key in list(self.baseStats.keys())[::-1]:
            if level >= key:
                index = key

        multiplier = 1 + self.baseStats[index]["Monster"]["Scaling"] * numberOfPlayers
        health = int(self.baseStats[index]["Monster"]["HP"] * level * multiplier)
        attack = int(self.baseStats[index]["Monster"]["Attack"] * level * multiplier)
        defence = int(self.baseStats[index]["Monster"]["Defence"] * level * multiplier)
        return health, attack, defence

    def damage_dealt(self, attack, defence, playersData, targetID=None):
        """
        [attack] - An integer that represents a player/monster's attack power
        [defence] - An integer that represents a player/monster's defence
        [playersData] - A dictionary of players' data which contains their statistics
        [target] - A string to represent a targetted object (player/monster)

        Players who scales high defence will receive lesser damage from monster
        Computes damage dealt to player/monster
        """
        damage = (attack ** 2) / (attack + defence)
        print(damage)
        lowerBound = damage * 0.75
        upperBound = damage * 1.25
        damageDealt = random.randint(int(lowerBound), int(upperBound))
        
        if targetID is not None:
            totalDefence = 0
            for playerID in playersData:
                totalDefence += playersData[playerID]["Statistics"][7]
            print(damageDealt)
            percentageOfDefence = 1 - (playersData[targetID]["Statistics"][7] / totalDefence) if len(playersData) != 1 else 1
            return damageDealt * percentageOfDefence

        return damageDealt

    def experience_required(self, level):
        return (8 * (level ** 3)) / 4

    def process_level(self, playerID, level, experience, attack=0, defence=0, max_health=0, connection=None):
        """
        [playerID] - An integer that represents player's
        [level] - An integer that represents player's current level
        [experience] - An integer that represents player's current EXP
        [attack] - An integer that represents player's attack, defaults to 0
        [defence] - An integer that represents player's defence, defaults to 0
        [max HP] - An integer that represents player's max HP, defaults to 0
        [connection] - A SQL connection passed in from the pool, defaults to None
        """

        if connection is None:
            connection = sqlite3.connect(self.config.dbPath)
        
        # Searches correct index
        index = 0
        for key in self.levels[::-1]:
            if level >= key:
                index = key

        experienceRequired = self.experience_required(level)

        hasLeveledUp = experience > experienceRequired
        numberOfLevels = 0
        nextLevel = level
        totalAttack = 0
        totalDefence = 0
        totalHP = 0
        
        while hasLeveledUp:
            numberOfLevels += 1
            totalHP += self.baseStats[index]["Player"]["HP"]
            totalAttack += self.baseStats[index]["Player"]["Attack"]
            totalDefence += self.baseStats[index]["Player"]["Defence"]

            nextLevel += 1
            hasLeveledUp = experience > self.experience_required(nextLevel)

        cursor = connection.cursor()
        sql = ("""
            UPDATE profile
            SET level = ?,
                experience = ?,
                attack = ?,
                defence = ?,
                max_health = ?
            WHERE user_id = ?
        """)
        data = (
            level + numberOfLevels, 
            experience, 
            attack + totalAttack,
            defence + totalDefence,
            max_health + totalHP,
            playerID)
        cursor.execute(sql, data)
        connection.commit()
        return numberOfLevels, totalAttack, totalDefence, totalHP