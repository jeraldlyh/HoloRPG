import os
import configparser
import codecs

class Parser:
    def __init__(self):
        self.configFile = r"{0}/config/config.ini".format(os.getcwd())
        config = configparser.ConfigParser()
        config.read_file(codecs.open(self.configFile, "r", "utf-8-sig"))
        
        self.discordKey = config["Discord"]["Key"]
        self.dbPath = config["DB"]["Path"]