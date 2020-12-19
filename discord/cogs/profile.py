import sqlite3
import datetime
import pytz
from discord.ext import commands
from utils.embed import (command_processed, command_error)

class Profile(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.database = sqlite3.connect("users.db")
        self.cursor = self.database.cursor()
        # self.cursor.execute('''
        # CREATE TABLE IF NOT EXISTS profile(
        #     guild_id INT,
        #     user_id INT,
        #     currency INT,
        #     health INT,
        #     experience INT,
        #     level INT,
        #     attack INT,
        #     defence INT
        # )
        # '''
        # )
        
    @commands.command()
    async def register(self, ctx):
        self.cursor.execute(f'SELECT user_id FROM profile WHERE guild_id = {ctx.guild.id}')
        result = self.cursor.fetchone()

        # If user does not exist in database
        if result is None:
            sql = ('''
            INSERT INTO profile(guild_id, user_id, date_registered) 
            VALUES(?,?,?)
            ''')
            time_now = datetime.datetime.now(tz=pytz.timezone('Asia/Singapore'))
            date_registered = time_now.strftime('%Y-%m-%d %H:%M:%S')
            val = (ctx.guild.id, ctx.author.id, date_registered)
            self.cursor.execute(sql, val)
            self.database.commit()
            message = command_processed(description=f'{ctx.author.mention} has successfully registered.')
            await ctx.send(embed=message)
    
    @commands.command()
    async def test(self, ctx):
        message = command_processed(description='test')
        await ctx.send(embed=message)
        



# Adding the cog to main script
def setup(bot):
    bot.add_cog(Profile(bot))
