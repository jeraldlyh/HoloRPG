import discord

def command_processed(description=None):
    success = discord.Embed(title='✅ Command Processed')
    # success = discord.Embed(title=title)
    success.description = description
    success.color = discord.Colour.green()
    return success
    
def command_error(description=None):
    failure = discord.Embed(title='❌ Command Error')
    # failure = discord.Embed(title=title)
    failure.description = description
    failure.color = discord.Colour.red()
    return failure