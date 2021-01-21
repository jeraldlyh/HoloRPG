import sqlite3
import datetime
import pytz
import discord
import random

from discord.ext import commands
from utils.embed import command_processed, command_error
from utils.checks import has_registered, has_chosen_class
from utils.checks import NotRegistered

class Profile(commands.Cog):
    def __init__(self, bot):
        self.bot = bot


    @commands.command(description="Registers user into the database")
    async def register(self, ctx):
        database = sqlite3.connect(self.bot.config.dbPath)
        cursor = database.cursor()
        cursor.execute(f"SELECT user_id FROM profile WHERE user_id = {ctx.author.id}")
        result = cursor.fetchone()

        # If user does not exist in database
        if result is None:
            # Profile table
            sql = ("""
                INSERT INTO profile(
                    user_id,
                    date_registered,
                    main_class,
                    sub_class,
                    passive,
                    level,
                    experience,
                    currency,
                    reputation,
                    max_health,
                    health,
                    attack,
                    defence)
                VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)
            """)
            time_now = datetime.datetime.now(tz=pytz.timezone("Asia/Singapore"))
            date_registered = time_now.strftime("%Y-%m-%d %H:%M:%S")
            data = (
                ctx.author.id,          # User ID
                date_registered,        # Date
                "Jobless",              # Main Class
                "Jobless",              # Sub Class
                0,                      # Passive
                1,                      # Level
                0,                      # Experience
                0,                      # Currency
                0,                      # Reputation
                0,                      # Max Health
                0,                      # Health
                0,                      # Attack
                0                       # Defence
            )
            cursor.execute(sql, data)
            database.commit()

            # Dungeon table
            sql = ("""
                INSERT INTO dungeon(user_id, status, level, max_level)
                VALUES(?,?,?,?)
            """)
            data = (ctx.author.id, 0, 1, 1)
            cursor.execute(sql, data)
            database.commit()
            database.close()
            
            message = command_processed(description=f"{ctx.author.mention} has successfully registered.")
            await ctx.send(embed=message)
        else:
            message = command_error(description=f"{ctx.author.mention} You have already registered in the game.")
            await ctx.send(embed=message)

    @has_registered()
    @commands.command(description="Display user profile")
    async def profile(self, ctx, user:discord.User=None):
        if user is None:
            user = ctx.author
        database = sqlite3.connect(self.bot.config.dbPath)
        cursor = database.cursor()
        cursor.execute(f"""
            SELECT sub_class, level, experience, currency, reputation, max_health, health, attack, defence
            FROM profile WHERE user_id = {user.id}
            """)
        result = cursor.fetchone()
        database.close()

        # Checks if user specified has registered for the game
        if result is None:
            message = command_error(description=f"{user.mention} has **not registered** in the game yet")
            return await ctx.send(embed=message)

        embed = discord.Embed(color=discord.Color.from_hsv(random.random(), 1, 1))
        embed.set_author(name=f"Profile of {user.name}", icon_url=user.avatar_url)
        embed.add_field(name="Information", value=f"""
            🏆 Level: **{result[1]}**
            ⭐ Reputation: **{result[4]}**
        """)
        embed.add_field(name="Statistics", value=f"""
            🥋 Job: **{result[0]}** 
            💗 HP: **{result[6]}/{result[5]}**
            🗡 Attack: **{result[7]}**
            🛡 Defence: **{result[8]}**
        """)
        embed.add_field(name="Currencies", value=f"💵 Cash: **{result[3]}**")
        await ctx.send(embed=embed)

    @profile.error
    async def profile_error(self, ctx, error):
        if isinstance(error, NotRegistered):
            message = command_error(description=f"{ctx.author.mention} {error}")
            await ctx.send(embed=message)


# Adding the cog to main script
def setup(bot):
    bot.add_cog(Profile(bot))
