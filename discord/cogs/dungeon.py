import discord
import asyncio
import random
import sqlite3
import os

from discord.ext import commands
from cogs.monsters import Monsters
from cogs.classes import Classes
from utils.checks import has_registered, user_has_registered
from utils.embed import command_processed, command_error

class Dungeon(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    def in_same_dungeon(self, listOfUserIDs):
        '''Checks if all party members are in the same dungeon location'''
        
        database = sqlite3.connect(self.bot.config.dbPath)
        cursor = database.cursor()
        cursor.execute(f'SELECT dungeon FROM classes WHERE user_id IN {tuple(listOfUserIDs)}')
        result = cursor.fetchall()
        dungeonLevel = result[0]
        for level in list(result):
            if level != dungeonLevel:
                return False
        return True

    def is_players_alive(self, playersData):
        '''Checks if there's at least one player alive in the dungeon after each turn'''

        for player in playersData:
            if playersData[player]['Statistics'][2] != 0:
                return True
        return False

    def has_sufficient_hp(self, playersData):
        '''
        Checks if all players have sufficient HP to enter the dungeon
        Returns a string if at least one of the players has insufficient HP
        '''

        errorList = []
        for playerID in playersData:
            playerHP = playersData[playerID]['Statistics'][2]
            if playerHP == 0:
                errorList.append(playerID)

        # Returns empty string if list is empty
        errorText = f'<@{errorList[0]}>' if errorList else ''
        for playerID in errorList[1:]:
            errorText += f', <@{playerID}>'

        # Grammar correction
        if errorText:
            if len(errorList) == 1:
                errorText += ' has **insufficient health** to enter the dungeon'
            else:
                errorText += ' have **insufficient health** to enter the dungeon'
        return errorText

    def format_skills_text(self, skillsDict):
        '''Beautify indentation skills text to be display in embed'''

        # Finds longest length of string to beautify formatting
        longestString = len(list(skillsDict.keys())[0])
        for skill in list(skillsDict.keys())[:1]:
            if len(skill) > longestString:
                longestString = len(skill)

        skillsText = '```\t' + ' ' * longestString + 'CHANCE\t' + 'DAMAGE\n'
        for skill in skillsDict:
            skillsText += f'{skill.upper()}\t'
            chanceToHit = skillsDict[skill][0]
            damage = skillsDict[skill][1]

            # Adds in extra spaces so that all text are aligned
            if len(skill) != longestString:
                skillsText += ' ' * (longestString - len(skill))

            skillsText += f'{chanceToHit}%\t  '
            if len(str(chanceToHit)) < 3:
                skillsText += ' ' * (3 - len(str(chanceToHit)))

            skillsText += f'{damage}%\n'
        skillsText += '```'
        return skillsText

    def format_health_text(self, playersData, monster):
        '''Beautify indentation skills text to be display in embed'''

        # Finds longest length of string to beautify formatting
        longestString = len(monster.name)
        for playerID in playersData:
            playerName = playersData[playerID]['Info'][0]
            if len(playerName) > longestString:
                longestString = len(playerName)

        # healthText = '```\t' + ' ' * longestString + 'HEALTH\n'
        healthText = f'```{monster.name}\t' + ' ' * (longestString - len(monster.name)) + f'{monster.HP}/{monster.maxHP}🖤'
        for playerID in playersData:
            playerName = playersData[playerID]['Info'][0]
            playerHP = playersData[playerID]['Statistics'][2]
            playerMaxHP = playersData[playerID]['Statistics'][3]
            healthText += f'\n{playerName}\t' + ' ' * (longestString - len(playerName)) + f'{playerHP}/{playerMaxHP}❤️'
        healthText += '```'
        return healthText

    def format_battle_text(self, battleLogs, playersData, monster):
        '''Inserts battleText infront of healthText'''

        battleText = battleLogs + self.format_health_text(playersData, monster)
        return battleText

    def damage_dealt(self, damage, defence):
        '''Computes damage dealt to player/monster'''

        lowerBound = damage * 0.75
        upperBound = damage * 1.25
        damageDealt = random.randint(int(lowerBound), int(upperBound))
        if defence > damageDealt:       # Defence complete negates damage taken
            return 0
        return (damageDealt - defence)

    def update_database(self, playersData, experience=0, dungeon=0):
        '''Updates SQL database'''

        database = sqlite3.connect(self.bot.config.dbPath)
        cursor = database.cursor()
        data = []           # To be converted into tuple for SQL query subsequently
        for playerID in playersData:
            playerLevel = playersData[playerID]['Statistics'][0]
            playerEXP = playersData[playerID]['Statistics'][1] + int(experience)
            playerHP = playersData[playerID]['Statistics'][2]
            playerDungeon = playersData[playerID]['Statistics'][7] + int(dungeon)
            data.append((playerLevel, playerEXP, playerHP, playerDungeon, playerID))
        sql = (f'''
            UPDATE classes 
            SET level = ?, 
                experience = ?, 
                health = ?, 
                dungeon = ?
            WHERE user_id = ?
        ''')
        cursor.executemany(sql, data)
        database.commit()
        database.close()

    def change_dungeon_status(self, playersData):
        '''Change status of player(s) to prevent them from entering another dungeon concurrently'''
        database = sqlite3.connect(self.bot.config.dbPath)
        cursor = database.cursor()
        sql = (f'''
            UPDATE dungeon 
            SET status = ?, 
            WHERE user_id = ?
        ''')
        cursor.execute(sql, [(1, playerID) for playerID in playersData])
        database.commit()
        database.close()

    async def dungeon_requests(self, ctx, playersData, monster, color):
        '''Sends out confirmation requests to respective players'''

        embed = discord.Embed(
                title=f'{monster.dungeonName}',
                description=f'You are currently entering {monster.dungeonName}...',
                color=color
                )

        # Battle confirmation messages
        playersStatusList = ['**Unconfirmed**' for player in range(len(playersData))]
        playersIDList = [int(playerID) for playerID in playersData]
        playersMention = '\n'.join(f'<@{str(player)}>' for player in playersData)
        playersLevel = '\n'.join(str(playersData[int(player)]['Statistics'][0]) for player in playersData)
        playersStatus = '\n'.join(str(status) for status in playersStatusList)

        embed.add_field(name='Players', value=playersMention, inline=True)
        embed.add_field(name='Level', value=playersLevel, inline=True)
        embed.add_field(name='Status', value=playersStatus, inline=True)
        statusMessage = await ctx.send(embed=embed)
        
        # Listens to players' responses to battle request
        try:
            for player in playersData:
                def check(message):
                    return message.author.id in playersIDList and message.content.lower() == 'yes'

                message = await self.bot.wait_for('message', timeout=15, check=check)

                # Find index of player ID and updates the status correspondingly
                index = playersIDList.index(message.author.id)
                playersStatusList[index] = '**Confirmed**'
                
                # Removes player ID from the list -> Allows bot to listen to multiple users at the same time
                playersIDList.remove(message.author.id)

                updatedPlayersStatus = '\n'.join(str(status) for status in playersStatusList)
                embed.set_field_at(index=2, name='Status', value=updatedPlayersStatus)
                await statusMessage.edit(embed=embed)

        except asyncio.TimeoutError:
            # Find players that did not accept the battle request
            deniedPlayers = ''
            for index in range(len(playersStatusList)):
                if playersStatusList[index] == '**Unconfirmed**':
                    deniedPlayers += (f'<@{playersIDList[index]}> ')
            message = command_error(description=f'{deniedPlayers}did not accept the request.')
            await ctx.send(embed=message)
            return 0
        return 1

    async def start_battle(self, ctx, playersData, dungeonLevel, monster, color):
        '''Battle logs for dungeon fights'''

        battleText = '\n' + self.format_health_text(playersData, monster)
        while self.is_players_alive(playersData) and monster.HP > 0:
            for playerID in playersData:
                playerName = playersData[playerID]['Info'][0]
                playerAvatar = playersData[playerID]['Info'][1]
                playerJob = playersData[playerID]['Statistics'][6]
                playerHP = playersData[playerID]['Statistics'][2]
                playerAttack = playersData[playerID]['Statistics'][4]
                playerDefence = playersData[playerID]['Statistics'][5]
                battleLogs = ''

                if playerHP == 0:       # If player is dead, does not get to continue in the battle
                    continue

                # Display battle description
                battleEmbed = discord.Embed(
                    description=f'You have encountered **{monster.name}**!',
                    color=color
                )
                battleEmbed.set_author(name=f'{monster.dungeonName}', icon_url=playerAvatar)

                # Displays battle logs
                battleEmbed.add_field(name='\u200b', value=battleText)

                # Displays available skills of player according to their class
                battleEmbed.add_field(
                    name=f"It's {playerName} turn!",
                    value=f'What will you do, <@{playerID}>?',
                    inline=False
                )
                
                skillsDict = Classes(self.bot).classDict[playerJob]['Skills']
                skillsText = self.format_skills_text(skillsDict)
                battleEmbed.add_field(name='Skills Available', value=skillsText, inline=False)
                await ctx.send(embed=battleEmbed)
                
                # Listens to player's response to determine which skill to use
                try:
                    def check(message):
                        return message.author.id == playerID and \
                        message.content.lower() in [skill.lower() for skill in list(skillsDict.keys())]

                    message = await self.bot.wait_for('message', timeout=15, check=check)
                    skill = skillsDict[message.content.capitalize()]
                    chanceToHit = skill[0]
                    damageMultipler = skill[1]

                    chanceGenerated = random.randint(1, 100)
                    if chanceGenerated <= chanceToHit:       # Manage to damage the monster
                        damageDealt = round(self.damage_dealt(playerAttack, monster.defence) * (damageMultipler / 100))
                        monster.HP -= damageDealt
                        if monster.HP < 0:
                            monster.HP = 0

                        battleLogs += f'=> **{playerName}** dealt **{damageDealt}**`💗` to **{monster.name}**\n'

                    damageDealt = self.damage_dealt(monster.attack, playerDefence)
                    playersData[playerID]['Statistics'][2] -= damageDealt

                    if playersData[playerID]['Statistics'][2] < 0:
                        playersData[playerID]['Statistics'][2] = 0

                    battleLogs += f'=> **{playerName}** received **{damageDealt}**`💗` from **{monster.name}**\n' 

                except asyncio.TimeoutError:
                    # Player did not make his move
                    playersData[playerID]['Statistics'][2] = 0
                    battleLogs += f'=> **{playerName}** took too long to respond and got killed `💀`\n'
                    playersData[playerID]['Info'][0] = playerName + ' 💀'
                    
                battleText = self.format_battle_text(battleLogs, playersData, monster)

        if not self.is_players_alive(playersData):      # All players are dead
            healthText = self.format_health_text(playersData, monster)
            loseEmbed = discord.Embed(
                title=monster.dungeonName,
                description=f'**All** players have been defeated by **{monster.name}**\n{healthText}',
                color=color
            )
            loseEmbed.add_field(name='Rewards', value="There are no rewards. Keep up the grind. 🤘🏻", inline=False)
            await ctx.send(embed=loseEmbed)
            self.update_database(playersData)
        else:
            playersMention = f'<@{list(playersData.keys())[0]}>'
            for index in range(len(playersData)):
                if index == 0:      # Skip first iteration for fence post
                    continue
                playersMention += f', <@{list(playersData.keys())[index]}> '

            healthText = self.format_health_text(playersData, monster)
            winEmbed = discord.Embed(
                title=monster.dungeonName,
                description=f'**{monster.name}** has been defeated by {playersMention}\n{healthText}',
                color=color
            )
            winEmbed.add_field(
                name='Rewards', 
                value='All players have **successfully** advanced to the next dungeon\n' + \
                f'📈 Experience: +**{monster.expGain}**',
                inline=False
            )
            await ctx.send(embed=winEmbed)
            self.update_database(playersData, monster.expGain, 1)

    @has_registered()
    @commands.command(description='Enters a dungeon')
    async def dungeon(self, ctx, *users:discord.User):
        database = sqlite3.connect(self.bot.config.dbPath)
        cursor = database.cursor()

        if len(users) != 0:
            # Party play
            cursor.execute(f'''
                SELECT level, experience, health, max_health, attack, defence, main_class, dungeon
                FROM classes 
                WHERE user_id = {ctx.author.id}
            ''')
            result = cursor.fetchone()
            playersData = {
                ctx.author.id : {
                    'Info' : [ctx.author.name, ctx.author.default_avatar_url],
                    'Statistics' : [data for data in list(result)]
                }
            }

            for user in users:
                # Checks if chosen party members has registered in the game
                if not user_has_registered(user.id):
                    message = command_error(description=f'{user.mention} has not registered in the game yet.')
                    return await ctx.send(embed=message)

                cursor.execute(f'''
                    SELECT level, experience, health, max_health, attack, defence, main_class, dungeon
                    FROM classes 
                    WHERE user_id = {user.id}
                ''')
                result = cursor.fetchone()
                data = {
                    user.id : {
                        'Info' : [user.name, user.default_avatar_url],
                        'Statistics' : [data for data in list(result)]
                    }
                }
                playersData.update(data)
                
            # Checks if all party members are in the same dungeon location
            if not self.in_same_dungeon(list(playersData.keys())):
                message = command_error(description=f'{ctx.author.mention} Not all the players are in the **same** dungeon!')
                return await ctx.send(embed=message)

            # Checks if all party members have sufficient HP to enter the dungeon
            hpCheck = self.has_sufficient_hp(playersData)
            if hpCheck:
                message = command_error(description=hpCheck)
                return await ctx.send(embed=message)

            dungeonLevel = playersData[ctx.author.id]['Statistics'][7]
            monster = Monsters(dungeonLevel)  # Instantiates a monster class
            # color = discord.Color.from_hsv(random.random(), 1, 1)
            color = random.randint(0, 0xffffff)

            request = await self.dungeon_requests(ctx, playersData, monster, color)
            if request == 1:
                await self.start_battle(ctx, playersData, dungeonLevel, monster, color)

        else:
            # Solo play
            cursor.execute(f'''
                SELECT level, experience, health, max_health, attack, defence, main_class, dungeon
                FROM classes 
                WHERE user_id = {ctx.author.id}
            ''')
            result = cursor.fetchone()
            playersData = {
                ctx.author.id : {
                    'Info' : [ctx.author.name, ctx.author.default_avatar_url],
                    'Statistics' : [data for data in list(result)]
                }
            }

            # Checks if player has sufficient HP to enter the dungeon
            hpCheck = self.has_sufficient_hp(playersData)
            if hpCheck:
                message = command_error(description=hpCheck)
                return await ctx.send(embed=message)

            dungeonLevel = playersData[ctx.author.id]['Statistics'][7]
            monster = Monsters(dungeonLevel)  # Instantiates a monster class
            # color = discord.Color.from_hsv(random.random(), 1, 1)
            color = random.randint(0, 0xffffff)

            await self.start_battle(ctx, playersData, dungeonLevel, monster, color)

        database.close()


    # @has_registered()
    # @commands.command(description='Travels to another dungeon location')
    # async def travel(self, ctx, dungeon:int):


# Adding the cog to main script
def setup(bot):
    bot.add_cog(Dungeon(bot))