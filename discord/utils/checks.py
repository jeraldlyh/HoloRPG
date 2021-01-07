import sqlite3
from discord.ext import commands

class NotRegistered(commands.CheckFailure):
    pass

class NotChosenClass(commands.CheckFailure):
    pass

def has_registered():
    '''Checks if user has been registered in database'''

    def predicate(ctx):
        database = sqlite3.connect('users.db')
        cursor = database.cursor()
        cursor.execute(f'SELECT user_id FROM profile WHERE user_id = {ctx.author.id}')
        result = cursor.fetchone()
        if result is None:
            # <user> have not registered in the game yet.
            raise NotRegistered('You have not registered in the game yet.')
        return True
    return commands.check(predicate)

def has_chosen_class():
    '''Checks if user has chosen a class'''

    def predicate(ctx):
        database = sqlite3.connect('users.db')
        cursor = database.cursor()
        cursor.execute(f'SELECT user_id FROM classes WHERE user_id = {ctx.author.id}')
        result = cursor.fetchone()
        if result is None:
            # <user> have not chosen a class yet.
            raise NotRegistered('You have not chosen a class yet.')
        return True
    return commands.check(predicate)

def user_has_registered(userID):
    '''Checks if a particular user has been registered in database'''
    
    database = sqlite3.connect('users.db')
    cursor = database.cursor()
    cursor.execute(f'SELECT user_id FROM profile WHERE user_id = {userID}')
    result = cursor.fetchone()
    if result is None:
        return False
    return True