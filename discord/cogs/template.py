import discord

from discord.ext import commands

class Template(commands.Cog):
    def __init__(self, bot):
        self.bot = bot


    # CODE

# Adding the cog to main script
def setup(bot):
    bot.add_cog(Template(bot))
