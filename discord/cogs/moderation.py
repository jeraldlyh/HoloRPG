import sqlite3
import discord

from discord.ext import commands

class Moderation(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        


    @commands.command()
    async def ping(self, ctx):
        await ctx.send(f"Latency: _{self.bot.latency}_")

    @commands.command()
    async def heal(self, ctx, *users:discord.User):
        database = sqlite3.connect(self.bot.config.dbPath)
        cursor = database.cursor()
        profileData = [(100, ctx.author.id)]
        for x in users:
            profileData.append((100, x.id))
        
        sql = (f"""
            UPDATE profile
            SET health = ?
            WHERE user_id = ?
        """)
        cursor.executemany(sql, profileData)
        database.commit()
        database.close()
        await ctx.send("Healed all players")

    @commands.command()
    async def reset(self, ctx, *users:discord.User):
        database = sqlite3.connect(self.bot.config.dbPath)
        cursor = database.cursor()
        profileData = [(1, 1, 100, 100, 50, 50, ctx.author.id)]
        dungeonData = [(1, ctx.author.id)]
        for x in users:
            profileData.append((1, 1, 100, 100, 50, 50, x.id))
            dungeonData.append((1, x.id))

        
        sql = (f"""
            UPDATE profile
            SET level = ?,
                experience = ?,
                max_health = ?,
                health = ?,
                attack = ?,
                defence = ?
            WHERE user_id = ?
        """)
        cursor.executemany(sql, profileData)
        database.commit()

        sql = (f"""
            UPDATE dungeon
            SET level = ?
            WHERE user_id = ?
        """)
        cursor.executemany(sql, dungeonData)
        database.commit()

        database.close()
        await ctx.send("Database reset")

# Adding the cog to main script
def setup(bot):
    bot.add_cog(Moderation(bot))
