import sqlite3
from discord.ext import commands



def has_registered():
    '''Checks if user has been registered in database'''
    def predicate(ctx):
        database = sqlite3.connect("users.db")
        cursor = database.cursor()
        cursor.execute(f'SELECT user_id FROM profile WHERE user_id = {ctx.author.id}')
        result = cursor.fetchone()
        if ctx.author.id == result[0]:
            return True
    return commands.check(predicate)

def has_chosen_class():
    '''Checks if user has chosen a class'''
    def predicate(ctx):
        database = sqlite3.connect("users.db")
        cursor = database.cursor()
        cursor.execute(f'SELECT user_id FROM classes WHERE user_id = {ctx.author.id}')
        result = cursor.fetchone()
        if ctx.author.id == result[0]:
            return True
    return commands.check(predicate)
