import discord

from discord.ext import commands
from config import BOT_TOKEN

bot = commands.Bot(command_prefix='.')
bot.remove_command('help')

extensions = [

    ]


if __name__ == "__main__":
    for extension in extensions:
        try:
            bot.load_extension(extension)
            print('Loaded {0}'.format(extension))
        except Exception as e:
            raise Exception
    
bot.run(f'{BOT_TOKEN}')