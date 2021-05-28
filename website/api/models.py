from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext as _
from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save, pre_save
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
        if Room.objects.filter(id=code).count() == 0:
            return code

def get_monster_name(dungeon_name):
    monsters = list(Monster.objects.all().filter(dungeon_name=dungeon_name))
    # monster_names = [getattr(monster, "name") for monster in monsters]
    return random.choice(monsters) if len(monsters) > 1 else monsters[0]

def generate_monster_stats(dungeon_level):
    """
        [dungeon_level] - An integer to represent monster level
        [number_of_players] - An integer to represent number of players to enhance monster stats
        
        # of players    Multiplier
        1               5%
        2               10%
        3               20%
        4               40%
        
        Returns a tuple of monster statistics (health, attack, defence)
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
    health = int(baseStats[index]["HP"] * dungeon_level * multiplier)
    attack = int(baseStats[index]["Attack"] * dungeon_level * multiplier)
    defence = int(baseStats[index]["Defence"] * dungeon_level * multiplier)

    return health, attack, defence


# Create your models here.

class Character(models.Model):
    """
        PRIMARY KEY: main_class, sub_class
        REQUIRED FIELDS: main_class, sub_class
    """
    class Meta:
        constraints = [models.UniqueConstraint(name="unique_character", fields=["main_class", "sub_class"])]

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

    main_class = models.CharField(choices=CLASS_CHOICES, default=DEFAULT, max_length=32)
    sub_class = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.main_class} -> {self.sub_class}"

# class Skill(models.Model):
#     """
#         PRIMARY KEY: character, name
#         REQUIRED FIELDS: character, name, accuracy, multiplier
#     """
#     class Meta:
#         constraints = [models.UniqueConstraint(fields=["character", "name"])]
    
#     character = models.ForeignKey(Character, on_delete=models.DO_NOTHING)
#     name = models.CharField(max_length=50, unique=True)
#     accuracy = models.IntegerField()
#     multiplier = models.IntegerField()

class Dungeon(models.Model):
    """
        PRIMARY KEY: name
        REQUIRED FIELDS: name, level
    """
    name = models.CharField(max_length=100, primary_key=True)
    level = models.IntegerField()

    def __str__(self):
        return self.name

class UserProfile(models.Model):
    """
        PRIMARY KEY: id
        GENERATED FIELDS:
            user
            image
            date_registered
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
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, blank=True)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, to_field="username", on_delete=models.CASCADE)
    image = models.CharField(default="https://svgshare.com/i/Xd6.svg", max_length=100)
    date_registered = models.DateTimeField(auto_now_add=True, blank=True)
    character = models.ForeignKey(Character, on_delete=models.SET_NULL, null=True)
    level = models.IntegerField()
    experience = models.IntegerField()
    currency = models.IntegerField()
    reputation = models.IntegerField()
    max_health = models.IntegerField()
    current_health = models.IntegerField()
    attack = models.IntegerField()
    defence = models.IntegerField()
    status = models.CharField(max_length=10)

    def __str__(self):
        return self.user.username


class Monster(models.Model):
    """
        PRIMARY KEY: name, dungeon_name
        REQUIRED FIELDS: name, dungeon_name
    """
    class Meta:
        constraints = [models.UniqueConstraint(name="unique_monster", fields=["name", "dungeon_name"])]

    name = models.CharField(max_length=50)
    dungeon_name = models.ForeignKey(Dungeon, on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.name

class Room(models.Model):
    """
        PRIMARY KEY: id
        REQUIRED FIELDS:
            dungeon
            host
        GENERATED FIELDS:
            id
            status
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
    @property
    def get_profile_pictures(self):
        profile_pictures = [UserProfile.objects.get(user=self.host).image]
        if self.player_two is not None:
            profile_pictures.append(UserProfile.objects.get(user=self.player_two).image)
        if self.player_three is not None:
            profile_pictures.append(UserProfile.objects.get(user=self.player_three).image)
        if self.player_four is not None:
            profile_pictures.append(UserProfile.objects.get(user=self.player_four).image)
        return profile_pictures

    DEFAULT = "WAITING"
    STARTED = "STARTED"

    STATUS_CHOICES = (
        (DEFAULT, _("Waiting")),
        (STARTED, _("Started"))
    )

    dungeon = models.ForeignKey(Dungeon, on_delete=models.DO_NOTHING)
    host = models.OneToOneField(User, on_delete=models.DO_NOTHING, to_field="username", related_name="%(class)s_host")
    status = models.CharField(choices=STATUS_CHOICES, default=DEFAULT, blank=True, max_length=7)
    id = models.CharField(max_length=6, primary_key=True, default=generate_unique_code, blank=True, editable=False)
    status = models.CharField(choices=STATUS_CHOICES, default=DEFAULT, max_length=7, editable=False)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    monster = models.ForeignKey(Monster, on_delete=models.DO_NOTHING, blank=True, editable=False)
    monster_attack = models.IntegerField(blank=True, editable=False)
    monster_defence = models.IntegerField(blank=True, editable=False)
    monster_current_health = models.IntegerField(blank=True, editable=False)
    monster_max_health = models.IntegerField(blank=True, editable=False)
    player_two = models.OneToOneField(User, on_delete=models.DO_NOTHING, blank=True, null=True, to_field="username", related_name="%(class)s_p2")
    player_three = models.OneToOneField(User, on_delete=models.DO_NOTHING, blank=True, null=True, to_field="username", related_name="%(class)s_p3")
    player_four = models.OneToOneField(User, on_delete=models.DO_NOTHING, blank=True, null=True, to_field="username", related_name="%(class)s_p4")

    def __str__(self):
        return self.id

class Relationship(models.Model):
    FRIEND = "FRIEND"
    FAMILY = "FAMILY"

    RELATIONSHIP_CHOICES = (
        (FRIEND, _("Friend")),
        (FAMILY, _("Family"))
    )

    name = models.CharField(choices=RELATIONSHIP_CHOICES, max_length=10, primary_key=True)
class UserRelationship(models.Model):
    class Meta:
        constraints = [models.UniqueConstraint(fields=["user_from", "user_to"], name="unique_relationship")]

    user_from = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="%(class)s_from")
    user_to = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="%(class)s_to")
    relationship = models.ForeignKey(Relationship, on_delete=models.DO_NOTHING)

@receiver(pre_save, sender=Room)
def create_room(sender, instance, **kwargs):
    monster_stats = generate_monster_stats(Dungeon.objects.get(name=instance.dungeon).level)

    instance.monster = get_monster_name(instance.dungeon)
    instance.monster_attack=monster_stats[1]
    instance.monster_defence=monster_stats[2]
    instance.monster_current_health=monster_stats[0]
    instance.monster_max_health=monster_stats[0]

@receiver(post_save, sender=User)                               # Listener for creation of profiles
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(
            user=instance,
            character=Character.objects.get(main_class="Default"),
            level=1,
            experience=0,
            currency=0,
            reputation=0,
            max_health=100,
            current_health=100,
            attack=1,
            defence=1,
            status="IDLE",
        )