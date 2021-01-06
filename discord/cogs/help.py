import discord
from discord.ext import commands


class Help(commands.Cog):
    def __init__(self,bot):
        self.bot = bot
    
    @commands.command(description='Help commands', hidden=True)
    async def help(self, ctx, cog='1'):
        helpEmbed = discord.Embed(
            title='Command List'
        )
        helpEmbed.set_thumbnail(url=ctx.author.avatar_url)

        cogs = [c for c in self.bot.cogs.keys()]
        
        for cog in cogs:
            currentcog = self.bot.get_cog(cog)
            commands = currentcog.get_commands()
            commandList = ''
            
            for command in commands:
                if command.hidden != True:
                    helpEmbed.add_field(
                        name=command.name, 
                        value=f'Description: {command.description}',
                        inline=False
                        )

        await ctx.send(embed=helpEmbed)


# Adding the cog to main script
def setup(bot):
    bot.add_cog(Help(bot))