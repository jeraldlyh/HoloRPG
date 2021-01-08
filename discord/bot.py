import discord
import pytz
import datetime
import os

from create_sql import create_dungeon_table, create_profile_table
from discord.ext import commands
from config.parser import Parser

extensions = [
        'cogs.template',
        'cogs.profile',
        'cogs.moderation',
        'cogs.classes',
        'cogs.help',
        'cogs.dungeon'
    ]

class RPGBot(commands.Bot):
    def __init__(self):
        # Creates a super class to inherit child classes
        super().__init__(command_prefix = '.')
        self.remove_command('help')
        self.config = Parser()

        for cog in extensions:
            self.load_extension(cog)
            print(f'Loaded {cog}')
        
        create_profile_table(self.config.dbPath)
        create_dungeon_table(self.config.dbPath)
    

    async def on_ready(self):
        await self.change_presence(activity=discord.Activity(name='ZeusRPG', type=3))
        time_now = datetime.datetime.now(tz=pytz.timezone('Asia/Singapore'))
        login_time = time_now.strftime('%d-%m-%Y %I:%M %p')
        print("-----------------")
        print('Logged in as {0} at {1}'.format(self.user.name, login_time))

    def run(self):
        super().run(self.config.discordKey)

bot = RPGBot()
bot.run()