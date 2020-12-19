import discord

def command_processed(description):
    success = discord.Embed(title='✅ Command Processed')
    success.description = description
    success.color = discord.Colour.green()
    return success
    
def command_error(description):
    failure = discord.Embed(title='❌ Command Error')
    failure.description = description
    failure.color = discord.Colour.red()
    return failure