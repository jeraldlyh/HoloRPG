from discord.ext import commands
from typing import Optional

class Moderation(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        


    @commands.command()
    async def ping(self, ctx):
        await ctx.send(f'Latency: {self.bot.latency}')


# Adding the cog to main script
def setup(bot):
    bot.add_cog(Moderation(bot))
