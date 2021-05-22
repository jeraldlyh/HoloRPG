from django.db import models
from django.contrib.auth.models import User
from django.db.models import constraints
from django.db.models.lookups import IsNull
from django.utils.translation import gettext as _
from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save
import string
import random
import uuid

def generate_unique_code():
    """
        Filter the list of existing Room objects and checks if 
        a new generated code exists. If not, return the unique code
    """

    length = 6
    while True:
        code = ''.join(random.choices(string.ascii_lowercase, k=length))  # Generates a random ASCII string of length 6
        
        if Room.objects.filter(code=code).count() == 0:
            break
    return code

def get_monster_name(dungeon_name):
    monsters = Monster.objects.all().filter(monster=dungeon_name)
    monster_names = [getattr(monster, "name") for monster in monsters]
    return random.choice(monster_names)

def generate_monster_stats(dungeon_level):
    """
        [dungeon_level] - An integer to represent monster level
        [number_of_players] - An integer to represent number of players to enhance monster stats
        
        # of players    Multiplier
        1               5%
        2               10%
        3               20%
        4               40%
        
        Returns a tuple of monster statistics
    """
    number_of_players = 1               # TODO - CALCULATE BASED ON NUM OF PLAYERS
    baseStats = {
        1: { 
            "HP" : 7,
            "Attack" : 5,
            "Defence" : 5,
            "Scaling" : 0.05
        },
        30: {
            "HP" : 15,
            "Attack" : 10,
            "Defence" : 10,
            "Scaling" : 0.1
        },
        60 : {
            "HP" : 37,
            "Attack" : 20,
            "Defence" : 20,
            "Scaling" : 0.2
        },
        90 : {
            "HP" : 103,
            "Attack" : 40,
            "Defence" : 40,
            "Scaling" : 0.4
        }
    }

    index = 0
    for key in list(baseStats.keys())[::-1]:
        if dungeon_level >= key:
            index = key
            break

    multiplier = 1 + baseStats[index]["Scaling"] * number_of_players
    health = baseStats[index]["HP"] * dungeon_level * multiplier
    attack = baseStats[index]["Attack"] * dungeon_level * multiplier
    defence = baseStats[index]["Defence"] * dungeon_level * multiplier
    return health, attack, defence


# Create your models here.

class Character(models.Model):
    """
        PRIMARY KEY: main_class, sub_class
        REQUIRED FIELDS: main_class, sub_class
    """
    class Meta:
        constraints = [models.UniqueConstraint(fields=["main_class", "sub_class"])]

    WARRIOR = "Warrior"
    ARCHER = "Archer"
    MAGICIAN = "Magician"
    ROGUE = "Rogue"
    DEFAULT = "Default"
    
    CLASS_CHOICES = (
        (WARRIOR, _("Warrior")),
        (ARCHER, _("Archer")),
        (MAGICIAN, _("Magician")),
        (ROGUE, _("Rogue")),
        (DEFAULT, _("Beginner"))
    )

    main_class = models.CharField(
        choices=CLASS_CHOICES,
        default=DEFAULT,
        max_length=32
    )
    sub_class = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.main_class} -> {self.sub_class}"

class Skill(models.Model):
    """
        PRIMARY KEY: character, name
        REQUIRED FIELDS: character, name, accuracy, multiplier
    """
    class Meta:
        constraints = [models.UniqueConstraint(fields=["character", "name"])]
    
    character = models.ForeignKey(Character, on_delete=models.DO_NOTHING)
    name = models.CharField(max_length=50, unique=True)
    accuracy = models.IntegerField()
    multiplier = models.IntegerField()

class Dungeon(models.Model):
    """
        PRIMARY KEY: name
        REQUIRED FIELDS: name, level
    """
    name = models.CharField(max_length=100, primary_key=True)
    level = models.IntegerField()

    def __str__(self):
        return f"Name: {self.name} | Level: {self.level}"

class UserProfile(models.Model):
    """
        Model is created upon creation of user entity through a receiver listener

        PRIMARY KEY: id

        GENERATED FIELDS:
            user
            character
            level
            experience
            currency
            reputation
            max_health
            current_health
            attack
            defence
            status
            dungeon
    """
    id = models.UUIDField(primary_key=True, defualt=uuid.uuid4, editable=False, blank=True)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date_registered = models.DateTimeField(auto_now_add=True, blank=True)
    character = models.ForeignKey(Character, on_delete=models.SET_NULL)
    level = models.IntegerField()
    experience = models.IntegerField()
    currency = models.IntegerField()
    reputation = models.IntegerField()
    max_health = models.IntegerField()
    current_health = models.IntegerField()
    attack = models.IntegerField()
    defence = models.IntegerField()
    status = models.CharField(max_length=10)
    dungeon_name = models.ForeignKey(Dungeon, on_delete=models.SET_NULL)

    def __str__(self):
        return str(self.user.username)
        

    @receiver(post_save, sender=User)       # Listener for creation of profiles
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            UserProfile.objects.create(user=instance, character=Character.objects.get(main_class="Default"), level=1, experience=0, currency=0, reputation=0, max_health=100, current_health=100, attack=1, defence=1, dungeon_status="IDLE", dungeon_level=Dungeon.objects.get(level=1))

class Monster(models.Model):
    """
        PRIMARY KEY: name, dungeon_name
        REQUIRED FIELDS: name, dungeon_name
    """
    class Meta:
        constraints = [models.UniqueConstraint(fields=["name", "dungeon"])]

    name = models.CharField(max_length=50)
    dungeon_name = models.ForeignKey(Dungeon, on_delete=models.DO_NOTHING)

class Room(models.Model):
    """
        PRIMARY KEY: id
        REQUIRED FIELDS:
            dungeon_name
            host
        GENERATED FIELDS:
            id
            create_at
            monster_name
            monster_attack
            monster_defence
            monster_current_health
            monster_max_health
        OPTIONAL FIELDS:
            player_two
            player_three
            player_four
    """
    dungeon_name  = models.ForeignKey(Dungeon, on_delete=models.DO_NOTHING)
    host = models.OneToOneField(UserProfile, on_delete=models.DO_NOTHING)

    id = models.CharField(max_length=6, primary_key=True, default=generate_unique_code, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    monster_name = models.ForeignKey(Monster, on_delete=models.DO_NOTHING, blank=True)
    monster_attack = models.IntegerField(default=generate_monster_stats(Dungeon.objects.get(name=dungeon_name)[0].level)[1], blank=True)
    monster_defence = models.IntegerField(default=generate_monster_stats(Dungeon.objects.get(name=dungeon_name)[0].level)[2], blank=True)
    monster_current_health = models.IntegerField(default=generate_monster_stats(dungeon)[0], blank=True)
    monster_max_health = models.IntegerField(default=generate_monster_stats(Dungeon.objects.get(name=dungeon_name)[0].level)[0], blank=True)
    player_two = models.OneToOneField(UserProfile, on_delete=models.DO_NOTHING, blank=True, null=True)
    player_three = models.OneToOneField(UserProfile, on_delete=models.DO_NOTHING, blank=True, null=True)
    player_four = models.OneToOneField(UserProfile, on_delete=models.DO_NOTHING, blank=True, null=True)

    def __str__(self):
        return self.id