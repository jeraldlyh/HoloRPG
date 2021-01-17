import discord
import asyncio
import random
import sqlite3
import os

from discord.ext import commands
from cogs.monsters import Monsters
from cogs.classes import Classes
from cogs.stats import Statistics
from utils.checks import has_registered, user_has_registered, has_chosen_class
from utils.checks import NotRegistered, NotChosenClass
from utils.embed import command_processed, command_error
from utils.format import format_battle_text, format_skills_text, format_health_text, format_grammar

class Dungeon(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    def check_dungeon_status(self, playersData, connection):
        """
        [playersData] - A dictionary of players' data which contains their statistics
        [connection] - A SQL connection passed in from the pool

        Pulls latest status data from SQL database to compare with old data stored in the
        memory which in this case is playerData

        Checks if any of the players are currently in a battle
        1 - TRUE
        0 - FALSE
        """

        cursor = connection.cursor()
        sql = (f"""
                SELECT status
                FROM dungeon
                WHERE user_id = {list(playersData.keys())[0]}
            """)
        cursor.execute(sql)
        result = cursor.fetchone()
        status = result[0]

        errorList = []
        for index, data in enumerate(playersData.items()):
            if index == 0:
                continue

            sql = (f"""
                SELECT status
                FROM dungeon
                WHERE user_id = {data[0]}
            """)
            cursor.execute(sql)
            result = cursor.fetchone()
            if result[0] != status:
                errorList.append(data[0])

        errorType = "currently **in battle**"
        errorText = format_grammar(errorList, "is", "are", errorType)
        return errorText

    def in_same_dungeon_location(self, playersData):
        """
        [playersData] - A dictionary of players' data which contains their statistics

        Returns TRUE if all party members are in the same dungeon location
        """

        dungeonLevel = playersData[list(playersData.keys())[0]]["Dungeon"][1]
        for playerID in playersData:
            if playersData[playerID]["Dungeon"][1] != dungeonLevel:
                return False
        return True

    def is_players_alive(self, playersData):
        """
        [playersData] - A dictionary of players' data which contains their statistics

        Returns TRUE if there"s at least one player alive in the dungeon after each turn
        """

        for player in playersData:
            if playersData[player]["Statistics"][4] != 0:
                return True
        return False

    def has_sufficient_hp(self, playersData):
        """
        [playersData] - A dictionary of players' data which contains their statistics

        Checks if all players have sufficient HP to enter the dungeon
        Returns a string that contains the players with insufficient HP
        """

        errorList = []
        for playerID in playersData:
            playerHP = playersData[playerID]["Statistics"][4]
            if playerHP == 0:
                errorList.append(playerID)

        errorType = "**insufficient health** to enter the dungeon"
        errorText = format_grammar(errorList, "has", "have", errorType)
        return errorText

    async def update_database(self, ctx, playersData, connection, experience=0, dungeon=0):
        """
        [playersData] - A dictionary of players' data which contains their statistics
        [connection] - A SQL connection passed in from the pool
        [experience] - An integer that represents amount of experience gained from the dungeon; defaults to 0 
        [dungeon] - An integer that increments players' dungeon level; defaults to 0

        Updates SQL database
        """

        cursor = connection.cursor()
        profileData = []
        dungeonData = []
        for playerID in playersData:
            playerLevel = playersData[playerID]["Statistics"][1]
            playerEXP = playersData[playerID]["Statistics"][2]
            playerHP = playersData[playerID]["Statistics"][4]
            playerMaxHP = playersData[playerID]["Statistics"][5]
            playerAttack = playersData[playerID]["Statistics"][6]
            playerDefence = playersData[playerID]["Statistics"][7]
            playerDungeon = playersData[playerID]["Dungeon"][1]
            playerMaxDungeon = playersData[playerID]["Dungeon"][2]

            # Checks if player travelled to previous dungeons
            if playerDungeon < playerMaxDungeon:
                playerDungeon += int(dungeon)
            else:
                playerMaxDungeon = playerDungeon + int(dungeon)

            levelCheck =  Statistics().process_level(
                playerID,
                playerLevel,
                playerEXP + experience,
                playerAttack,
                playerDefence,
                playerMaxHP,
                connection)

            if levelCheck[0] != 0:      # If player manages to level up
                message = discord.Embed(
                    description=f"""
                    <@{playerID}> You have leveled up **{levelCheck[0]}** times!\n
                    💗Health: **+{levelCheck[3]}**
                    🗡Attack: **+{levelCheck[1]}**
                    🛡Defence: **+{levelCheck[2]}**
                    """,
                    color=0x95ed6f
                    )
                await ctx.send(embed=message)

            # Appends a tuple for SQL query subsequently
            profileData.append((playerHP, playerID))
            dungeonData.append((0, playerDungeon, playerMaxDungeon, playerID))
        
        # Profile table
        sql = (f"""
            UPDATE profile
            SET health = ?
            WHERE user_id = ?
        """)
        cursor.executemany(sql, profileData)
        connection.commit()

        # Dungeon data
        sql = (f"""
            UPDATE dungeon
            SET status = ?,
                level = ?,
                max_level = ?
            WHERE user_id = ?
        """)
        cursor.executemany(sql, dungeonData)
        connection.commit()

    def change_dungeon_status(self, playersData, connection):
        """
        [playersData] - A dictionary of players' data which contains their statistics
        [connection] - A SQL connection passed in from the pool

        Changes status of player(s) to prevent them from entering another dungeon concurrently
        """

        cursor = connection.cursor()
        sql = (f"""
            UPDATE dungeon
            SET status = ?
            WHERE user_id = ?
        """)
        cursor.executemany(sql, [(1, playerID) for playerID in playersData])
        connection.commit()

    async def dungeon_requests(self, ctx, playersData, monster, color):
        """
        [playersData] - A dictionary of players' data which contains their statistics
        [monster] - A monster object that contains its relevant statistics
        [color] - A hexcode used in embed message to be standardised throughout the combat

        Sends out confirmation requests to respective players
        """

        embed = discord.Embed(
                title=f"{monster.dungeonName}",
                description=f"You are currently entering {monster.dungeonName}...",
                color=color
                )

        # Battle confirmation messages
        playersStatusList = ["**Unconfirmed**" for player in range(len(playersData))]
        playersIDList = [int(playerID) for playerID in playersData]
        playersMention = "\n".join(f"<@{str(player)}>" for player in playersData)
        playersLevel = "\n".join(str(playersData[int(player)]["Statistics"][0]) for player in playersData)
        playersStatus = "\n".join(str(status) for status in playersStatusList)

        embed.add_field(name="Players", value=playersMention, inline=True)
        embed.add_field(name="Level", value=playersLevel, inline=True)
        embed.add_field(name="Status", value=playersStatus, inline=True)
        statusMessage = await ctx.send(embed=embed)
        
        # Listens to players' responses to battle request
        try:
            for player in playersData:
                def check(message):
                    return message.author.id in playersIDList and message.content.lower() == "yes"

                message = await self.bot.wait_for("message", timeout=15, check=check)

                # Find index of player ID and updates the status correspondingly
                index = playersIDList.index(message.author.id)
                playersStatusList[index] = "**Confirmed**"
                
                # Removes player ID from the list -> Allows bot to listen to multiple users at the same time
                playersIDList.remove(message.author.id)

                updatedPlayersStatus = "\n".join(str(status) for status in playersStatusList)
                embed.set_field_at(index=2, name="Status", value=updatedPlayersStatus)
                await statusMessage.edit(embed=embed)

        except asyncio.TimeoutError:
            # Find players that did not accept the battle request
            deniedPlayers = ""
            for index in range(len(playersStatusList)):
                if playersStatusList[index] == "**Unconfirmed**":
                    deniedPlayers += (f"<@{playersIDList[index]}> ")
            message = command_error(description=f"{deniedPlayers}did not accept the request.")
            await ctx.send(embed=message)
            return False
        return True

    async def pre_dungeon_checks(self, ctx, playersData, connection):
        """
        [playersData] - A dictionary of players' data which contains their statistics
        [connection] - A SQL connection passed in from the pool
        
        Executes necessary checks before commencement of the dungeon
        Returns TRUE if all checks are successfuly
        """

        dungeonLocationCheck = self.in_same_dungeon_location(playersData)
        hpCheck = self.has_sufficient_hp(playersData)
        dungeonStatusCheck = self.check_dungeon_status(playersData, connection)

        # Checks if all party members are in the same dungeon location
        if not dungeonLocationCheck:
            message = command_error(description=f"{ctx.author.mention} Not all the players are in the **same** dungeon!")
            await ctx.send(embed=message)
            return False

        # Checks if all party members have sufficient HP to enter the dungeon
        elif hpCheck:
            message = command_error(description=hpCheck)
            await ctx.send(embed=message)
            return False

        # Checks if any of the players are currently in another battle
        elif dungeonStatusCheck:
            message = command_error(description=dungeonStatusCheck)
            await ctx.send(embed=message)
            return False

        return True

    async def start_battle(self, ctx, playersData, monster, color, connection):
        """
        [playersData] - A dictionary of players' data which contains their statistics
        [monster] - A monster object that contains its relevant statistics
        [color] - A hexcode used in embed message to be standardised throughout the combat
        [connection] - A SQL connection passed in from the pool

        Commencement of the dungeon battle

        Sends out embed message at every single loop which contains options for players to choose their skill
        """
        
        self.change_dungeon_status(playersData, connection)     # Changes status of player(s) in dungeon
        battleText = "\n" + format_health_text(playersData, monster)
        while self.is_players_alive(playersData) and monster.HP > 0:
            for playerID in playersData:
                if monster.HP == 0:     # In case monster dies before other player's turn
                    break

                playerName = playersData[playerID]["Info"][0]
                playerAvatar = playersData[playerID]["Info"][1]
                playerJob = playersData[playerID]["Statistics"][0]
                playerHP = playersData[playerID]["Statistics"][4]
                playerAttack = playersData[playerID]["Statistics"][6]
                playerDefence = playersData[playerID]["Statistics"][7]
                battleLogs = ""

                if playerHP == 0:       # If player is dead, does not get to continue in the battle
                    continue

                # Display battle description
                battleEmbed = discord.Embed(
                    description=f"You have encountered a **Level {monster.level} {monster.name}**!",
                    color=color
                )
                battleEmbed.set_author(name=f"{monster.dungeonName}", icon_url=playerAvatar)

                # Displays battle logs
                battleEmbed.add_field(name="\u200b", value=battleText)

                # Displays available skills of player according to their class
                battleEmbed.add_field(
                    name=f"It's {playerName} turn!",
                    value=f"What will you do, <@{playerID}>?",
                    inline=False
                )
                
                skillsDict = Classes(self.bot).classDict[playerJob]["Skills"]
                skillsText = format_skills_text(skillsDict)
                battleEmbed.add_field(name="Skills Available", value=skillsText, inline=False)
                await ctx.send(embed=battleEmbed)
                
                # Listens to player's response to determine which skill to use
                try:
                    def check(message):
                        return message.author.id == playerID and \
                        message.content.lower() in [skill.lower() for skill in list(skillsDict.keys())]

                    message = await self.bot.wait_for("message", timeout=15, check=check)
                    skill = skillsDict[message.content.capitalize()]
                    chanceToHit = skill[0]
                    damageMultipler = skill[1]

                    chanceGenerated = random.randint(1, 100)
                    if chanceGenerated <= chanceToHit:       # Successfully damages the monster
                        damageDealt = round(Statistics().damage_dealt(playerAttack, monster.defence, playersData) * (damageMultipler / 100))
                        monster.HP -= damageDealt
                        if monster.HP < 0:
                            monster.HP = 0

                        battleLogs += f"=> **{playerName}** dealt **{damageDealt}**`💗` to **{monster.name}**\n"

                    # Monster damages player
                    damageDealt = round(Statistics().damage_dealt(monster.attack, playerDefence, playersData, playerID))
                    playersData[playerID]["Statistics"][4] -= damageDealt
                    if playersData[playerID]["Statistics"][4] < 0:      # Checks if damage is overkilling the player's HP
                        playersData[playerID]["Statistics"][4] = 0      # Prevents health from becoming a negative value

                    battleLogs += f"=> **{playerName}** received **{damageDealt}**`💗` from **{monster.name}**\n" 

                except asyncio.TimeoutError:
                    # Player did not make his move
                    playersData[playerID]["Statistics"][4] = 0              # Sets player HP to 0
                    battleLogs += f"=> **{playerName}** took too long to respond and got killed `💀`\n"
                    playersData[playerID]["Info"][0] = playerName + " 💀"   # Adds an indication for dead players

                battleText = format_battle_text(battleLogs, playersData, monster)

        if not self.is_players_alive(playersData):      # All players are dead
            healthText = format_health_text(playersData, monster)
            loseEmbed = discord.Embed(
                title=monster.dungeonName,
                description=f"**All** players have been defeated by **{monster.name}**\n{healthText}",
                color=color
            )
            loseEmbed.add_field(name="Rewards", value="There are no rewards. Keep up the grind. 🤘🏻", inline=False)
            await ctx.send(embed=loseEmbed)
            await self.update_database(ctx=ctx, playersData=playersData, connection=connection)
        else:
            playersMention = f"<@{list(playersData.keys())[0]}>"
            for index in range(len(playersData)):
                if index == 0:      # Skip first iteration for fence post
                    continue
                playersMention += f", <@{list(playersData.keys())[index]}> "

            healthText = format_health_text(playersData, monster)
            winEmbed = discord.Embed(
                title=monster.dungeonName,
                description=f"**{monster.name}** has been defeated by {playersMention}\n{healthText}",
                color=color
            )
            winEmbed.add_field(
                name="Rewards", 
                value="All players have **successfully** advanced to the next dungeon\n" + \
                f"📈 Experience: +**{monster.expGain}**",
                inline=False
            )
            await ctx.send(embed=winEmbed)
            await self.update_database(ctx=ctx, playersData=playersData, connection=connection, experience=monster.expGain, dungeon=1)

    @has_registered()
    @commands.command(description="Enters a dungeon")
    async def dungeon(self, ctx, *users:discord.User):
        """
        [users] - A list of Discord users tagged in the command

        Pulls relevant players' data from SQL database and compiles it into a dictionary to be called with
        other functions
        
        Provides options for solo or party play
        """

        connection = sqlite3.connect(self.bot.config.dbPath)
        cursor = connection.cursor()

        if len(users) != 0:
            # Party play
            cursor.execute(f"""
                SELECT p.main_class, 
                        p.level, 
                        p.experience, 
                        p.currency, 
                        p.health, 
                        p.max_health, 
                        p.attack, 
                        p.defence,
                        d.status,
                        d.level,
                        d.max_level
                FROM profile p
                JOIN dungeon d
                    ON d.user_id = p.user_id
                WHERE p.user_id = {ctx.author.id}
            """)
            result = cursor.fetchone()
            playersData = {
                ctx.author.id : {
                    "Info" : [ctx.author.name, ctx.author.default_avatar_url],
                    "Statistics" : [stats for stats in list(result)[:8]],
                    "Dungeon" : [data for data in list(result)[8:]]
                }
            }

            for user in users:
                # Checks if chosen party members has registered in the game
                if not user_has_registered(user.id):
                    message = command_error(description=f"{user.mention} has not registered in the game yet.")
                    return await ctx.send(embed=message)

                cursor.execute(f"""
                    SELECT p.main_class, 
                        p.level, 
                        p.experience, 
                        p.currency, 
                        p.health, 
                        p.max_health, 
                        p.attack, 
                        p.defence,
                        d.status,
                        d.level,
                        d.max_level
                FROM profile p
                JOIN dungeon d
                    ON d.user_id = p.user_id
                WHERE p.user_id = {user.id}
                """)
                result = cursor.fetchone()
                data = {
                    user.id : {
                        "Info" : [user.name, user.default_avatar_url],
                        "Statistics" : [stats for stats in list(result)[:8]],
                        "Dungeon" : [data for data in list(result)[8:]]
                    }
                }
                playersData.update(data)

            # All players successfully completed pre-dungeon checks
            dungeonCheck = await self.pre_dungeon_checks(ctx, playersData, connection)
            if dungeonCheck:
                dungeonLevel = playersData[ctx.author.id]["Dungeon"][1]
                monster = Monsters(dungeonLevel, len(playersData))  # Instantiates a monster class
                # color = discord.Color.from_hsv(random.random(), 1, 1)
                color = random.randint(0, 0xffffff)

                # All players accepted the request
                requestCheck = await self.dungeon_requests(ctx, playersData, monster, color)
                if requestCheck:
                    await self.start_battle(ctx, playersData, monster, color, connection)
                connection.close()
        else:
            # Solo play
            cursor.execute(f"""
                SELECT p.main_class, 
                        p.level, 
                        p.experience, 
                        p.currency, 
                        p.health, 
                        p.max_health, 
                        p.attack, 
                        p.defence,
                        d.status,
                        d.level,
                        d.max_level
                FROM profile p
                JOIN dungeon d
                    ON d.user_id = p.user_id
                WHERE p.user_id = {ctx.author.id}
            """)
            result = cursor.fetchone()

            playersData = {
                ctx.author.id : {
                    "Info" : [ctx.author.name, ctx.author.default_avatar_url],
                    "Statistics" : [stats for stats in list(result)[:8]],
                    "Dungeon" : [data for data in list(result)[8:]]
                }
            }

            # All players successfully completed pre-dungeon checks
            dungeonCheck = await self.pre_dungeon_checks(ctx, playersData, connection)
            if dungeonCheck:
                dungeonLevel = playersData[ctx.author.id]["Dungeon"][1]
                monster = Monsters(dungeonLevel, len(playersData))  # Instantiates a monster class
                # color = discord.Color.from_hsv(random.random(), 1, 1)
                color = random.randint(0, 0xffffff)

                await self.start_battle(ctx, playersData, monster, color, connection)
                connection.close()

    @has_registered()
    @has_chosen_class()
    @commands.command(description="Travels to another dungeon location")
    async def travel(self, ctx, dungeonLevel:int):
        """
        [dungeonLevel] - An integer that represents player's selected dungeon

        Allows player to travel back to previous dungeons to assist their allies
        """
        # Checks if player tries to access level < 1
        if dungeonLevel < 1:
            message = command_error(description=f"{ctx.author.mention} Dungeon level **{dungeonLevel}** is **out of bounds**")
            return await ctx.send(embed=message)

        connection = sqlite3.connect(self.bot.config.dbPath)
        cursor = connection.cursor()
        sql = (f"""
            SELECT level, max_level
            FROM dungeon
            WHERE user_id = {ctx.author.id}
        """)
        cursor.execute(sql)
        result = cursor.fetchone()

        level = result[0]
        maxLevel = result[1]

        # Checks if selected level is below player"s maxLevel
        if dungeonLevel < maxLevel:
            sql = ("""
                UPDATE dungeon
                SET level = ?
                WHERE user_id = ?
            """)
            data = (dungeonLevel, ctx.author.id)
            cursor.execute(sql, data)
            connection.commit()

            message = command_processed(description=f"{ctx.author.mention} You have successfully travelled to **Level {dungeonLevel} - {Monsters(1, 0).dungeons[dungeonLevel]['Name']}**")
            await ctx.send(embed=message)
        else:
            message = command_error(description=f"{ctx.author.mention} You are not strong enough to travel beyond **Level {maxLevel} - {Monsters(1, 0).dungeons[maxLevel]['Name']}**")
            await ctx.send(embed=message)

        connection.close()

    @travel.error
    async def travel_error(self, ctx, error):
        if isinstance(error, NotRegistered):
            message = command_error(description=f"{ctx.author.mention} {error}")
            await ctx.send(embed=message)
        elif isinstance(error, NotChosenClass):
            message = command_error(description=f"{ctx.author.mention} {error}")
            await ctx.send(embed=message)



# Adding the cog to main script
def setup(bot):
    bot.add_cog(Dungeon(bot))