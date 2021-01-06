import sqlite3
import datetime
import pytz
import discord
import random

from discord.ext import commands
from utils.embed import command_processed, command_error
from utils.checks import has_registered, has_chosen_class
from utils.checks import NotRegistered, NotChosenClass

class Profile(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.database = sqlite3.connect('users.db')
        self.cursor = self.database.cursor()
        # self.cursor.execute('''
        # CREATE TABLE IF NOT EXISTS classes(
        #     user_id INT,
        #     main_class VARCHAR(20),
        #     sub_class VARCHAR(20),
        #     health INT,
        #     experience INT,
        #     level INT,
        #     attack INT,
        #     defence INT
        # )
        # '''
        # )

    @commands.command(description='Registers user into the database')
    async def register(self, ctx):
        self.cursor.execute(f'SELECT user_id FROM profile WHERE user_id = {ctx.author.id}')
        result = self.cursor.fetchone()

        # If user does not exist in database
        if result is None:
            sql = ('''
                INSERT INTO profile(user_id, date_registered)
                VALUES(?,?)
            ''')
            time_now = datetime.datetime.now(tz=pytz.timezone('Asia/Singapore'))
            date_registered = time_now.strftime('%Y-%m-%d %H:%M:%S')
            val = (ctx.author.id, date_registered)
            self.cursor.execute(sql, val)
            self.database.commit()
            message = command_processed(description=f'{ctx.author.mention} has successfully registered.')
            await ctx.send(embed=message)
        else:
            message = command_error(description=f'{ctx.author.mention} You have already registered in the game.')
            await ctx.send(embed=message)

    @has_registered()
    @has_chosen_class()
    @commands.command(description='Display user profile')
    async def profile(self, ctx, user:discord.User=None):
        self.cursor.execute(f'''
            SELECT sub_class, level, experience, max_health, health, attack, defence
            FROM classes WHERE user_id = {ctx.author.id}
            ''')
        result = self.cursor.fetchone()
        if user is None:
            user = ctx.author
        embed = discord.Embed(color=discord.Color.from_hsv(random.random(), 1, 1))
        embed.set_author(name=f'Profile of {user.name}', icon_url=user.avatar_url)
        embed.add_field(name='Information', value=f'🏆 Level: **{result[1]}**')
        embed.add_field(name='Statistics', value=f'''
            🥋 Job: **{result[0]}** 
            💗 HP: **{result[4]}/{result[3]}**
            🗡 Attack: **{result[5]}**
            🛡 Defence: **{result[6]}**
            ''')
        embed.add_field(name='Currencies', value=f'**')
        await ctx.send(embed=embed)

    @profile.error
    async def profile_error(self, ctx, error):
        if isinstance(error, NotRegistered):
            message = command_error(description=f'{ctx.author.mention} {error}')
            await ctx.send(embed=message)
        elif isinstance(error, NotChosenClass):
            message = command_error(description=f'{ctx.author.mention} {error}')
            await ctx.send(embed=message)

# Adding the cog to main script
def setup(bot):
    bot.add_cog(Profile(bot))
