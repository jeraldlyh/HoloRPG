import discord
import asyncio

from discord.ext import commands
from utils.stats import Statistics


class Level(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    async def send_level_message(self, ctx, playerID, levelData):
        if levelData[0] != 0:      # If player manages to level up
            message = discord.Embed(
                description=f"""
                <@{playerID}> You have leveled up **{levelData[0]}** times!\n
                💗 Health: **+{levelData[3]}**
                🗡 Attack: **+{levelData[1]}**
                🛡 Defence: **+{levelData[2]}**
                """,
                color=0x95ed6f
                )
            await ctx.send(embed=message)


# Adding the cog to main script
def setup(bot):
    bot.add_cog(Level(bot))