import sqlite3
import discord

from discord.ext import commands
from utils.embed import command_processed, command_error
from utils.checks import has_registered, has_chosen_class
from utils.checks import NotRegistered, NotChosenClass

class Classes(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.classDict = {
            "Warrior" : {
                "Jobs": ["Dawn Warrior", "Gladiator", "Champion", "Battle Master"],
                "Base Stats" : [150, 10, 15],
                "Skills" : { # Chance, Attack Damage
                    "Perforate" : [100, 120],
                    "Ultimate" : [15, 500],
                    "Block" : [50, 170]
                }
            },
            "Archer" : {
                "Jobs": ["Hunter", "Ranger", "Arcane Archer", "Bow Master"],
                "Base Stats" : [110, 15, 10],
                "Skills" : {
                    "Pierce" : [100, 120],
                    "Ultimate" : [15, 500],
                    "Swerve" : [50, 170]
                }
            },
            "Rogue" : {
                "Jobs": ["Genin", "Chunin", "Jonin", "Hokage"],
                "Base Stats" : [110, 15, 10],
                "Skills" : {
                    "Ninjutsu" : [100, 120],
                    "Ultimate" : [15, 500],
                    "Shinobi" : [50, 170]
                }
            },
            "Magician" : {
                "Jobs" : ["Battle Cleric", "Sorcerer", "Summoner", "Warlock"],
                "Base Stats" : [100, 7, 7],
                "Skills" : {
                    "Spellslinger" : [100, 120],
                    "Ultimate" : [15, 500],
                    "Heal" : [50, 170]
                }
            }
        }
        self.advancementLevels = [1, 30, 60, 90]


    @commands.command(description="Displays available classes")
    async def classes(self, ctx):
        await ctx.send("""```
Tree    | Warrior       | Archer        | Rogue       | Magician
--------|---------------|---------------|-------------|--------------
Lvl 1   | Dawn Warrior  | Hunter        | Genin       | Battle Cleric
Lvl 30  | Gladiator     | Ranger        | Chunin      | Sorcerer
Lvl 60  | Champion      | Arcane Archer | Jonin       | Summoner
Lvl 90  | Battle Master | Bow Master    | Hokage      | Warlock
```""")
        embed = discord.Embed(title="Hidden Perks", description="Each class has its own unique hidden perk")
        embed.add_field(name="Warrior", value="**Advanced Tactics** - 15% chance of blocking and deflecting damage", inline=False)
        embed.add_field(name="Archer", value="**Marksman** - 20% chance of critical hit - 150% of overall damage", inline=False)
        embed.add_field(name="Rogue", value="**Trickster** - 5% bonus EXP and increased chances of loots", inline=False)
        embed.add_field(name="Magician", value="**Restoration** - 15% chance to heal everyone after each turn", inline=False)
        embed.set_footer(text="Command - .choose <className>")
        return await ctx.send(embed=embed)

    @has_registered()
    @commands.command(description="Chooses a main class")
    async def choose(self, ctx, job):
        selectedJob = str(job).capitalize()
        if selectedJob not in self.classDict:
            message = command_error(description="There are currently **4** classes available. Refer to ``.classes``.")
            return await ctx.send(embed=message)
        
        # Checks if user has already selected a class previously
        connection = sqlite3.connect(self.bot.config.dbPath)
        cursor = connection.cursor()
        cursor.execute(f"SELECT main_class FROM profile WHERE user_id = {ctx.author.id}")
        result = cursor.fetchone()
        if result is not None and result[0] == ctx.author.id:
            message = command_error(description=f"{ctx.author.mention} You have already selected a class - **{result[1]}**.")
            return await ctx.send(embed=message)
        else:
            sql = ("""
                UPDATE profile
                SET main_class = ?,
                    sub_class = ?,
                    max_health = ?,
                    health = ?,
                    attack = ?,
                    defence = ?
                WHERE user_id = ?
            """)
            data = (
                selectedJob,                                    # Main class
                self.classDict[selectedJob]["Jobs"][0],         # Sub class
                self.classDict[selectedJob]["Base Stats"][0],   # Starting max health
                self.classDict[selectedJob]["Base Stats"][0],   # Health
                self.classDict[selectedJob]["Base Stats"][1],   # Attack
                self.classDict[selectedJob]["Base Stats"][2],   # Defence
                ctx.author.id                                   # User ID
                )
            cursor.execute(sql, data)
            connection.commit()
            connection.close()
            message = command_processed(description=f"{ctx.author.mention} You have successfully selected **{selectedJob}** as your class. You're now officially a **{self.classDict[selectedJob]['Jobs'][0]}**!")
            return await ctx.send(embed=message)

    @has_registered()
    @has_chosen_class()
    @commands.command(description="Advances to next class")
    async def advance(self, ctx):
        connection = sqlite3.connect(self.bot.config.dbPath)
        cursor = connection.cursor()
        cursor.execute(f"SELECT level, main_class, sub_class FROM profile WHERE user_id = {ctx.author.id}")
        result = cursor.fetchone()

        # Checks if user has sufficient level to advance job
        requiredLevelIndex = self.classDict[result[1]]["Jobs"].index(result[2]) + 1
        if result[0] < self.advancementLevels[requiredLevelIndex]:
            message = command_error(description=f"{ctx.author.mention} You have not reached the required level to advance to the next job. Keep up the grind.")
            return await ctx.send(embed=message)
        else:
            nextJob = self.classDict[result[1]]["Jobs"][requiredLevelIndex]
            sql = "UPDATE profile SET sub_class = ? WHERE user_id = ?"
            data = (nextJob, ctx.author.id)
            cursor.execute(sql, data)
            connection.commit()
            connection.close()
            
            message = command_processed(description=f"{ctx.author.mention} Congratulations, you have just advanced to **{nextJob}**!")
            return await ctx.send(embed=message)

    @advance.error
    async def advance_error(self, ctx, error):
        if isinstance(error, NotRegistered):
            message = command_error(description=f"{ctx.author.mention} {error}")
            await ctx.send(embed=message)
        elif isinstance(error, NotChosenClass):
            message = command_error(description=f"{ctx.author.mention} {error}")
            await ctx.send(embed=message)

# Adding the cog to main script
def setup(bot):
    bot.add_cog(Classes(bot))