import discord
import sqlite3

from discord.ext import commands

class Profile(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.database = sqlite3.connect("profile.db")
        self.cursor = self.database.cursor()
    
    
# Adding the cog to main script
def setup(bot):
    bot.add_cog(Profile(bot))
