import sqlite3

def create_profile_table(dbPath):
    database = sqlite3.connect(dbPath)
    cursor = database.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS profile(
        user_id INTEGER,
        date_registered DATETIME,
        main_class TEXT,
        sub_class TEXT,
        level INTEGER,
        experience INTEGER,
        currency INTEGER,
        reputation INTEGER,
        max_health INTEGER,
        health INTEGER,
        attack INTEGER,
        defence INTEGER
    )
    ''')

def create_dungeon_table(dbPath):
    database = sqlite3.connect(dbPath)
    cursor = database.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS dungeon(
        user_id INTEGER,
        level INTEGER,
        max_level INTEGER
    )
    ''')