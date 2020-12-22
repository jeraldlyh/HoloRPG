import discord
import pytz
import datetime

from discord.ext import commands
from config import BOT_TOKEN

extensions = [
        'cogs.template',
        'cogs.profile',
        'cogs.moderation',
        'cogs.classes'
    ]

class RPGBot(commands.Bot):
    def __init__(self):
        # Creates a super class to inherit child classes
        super().__init__(command_prefix = '.')


        for cog in extensions:
            self.load_extension(cog)
            print(f'Loaded {cog}')
    

    async def on_ready(self):
        await self.change_presence(activity=discord.Activity(name='ZeusRPG', type=3))
        time_now = datetime.datetime.now(tz=pytz.timezone('Asia/Singapore'))
        login_time = time_now.strftime('%d-%m-%Y %I:%M %p')
        print("-----------------")
        print('Logged in as {0} at {1}'.format(self.user.name, login_time))

    def run(self):
        super().run(BOT_TOKEN)
        

bot = RPGBot()
bot.run()
