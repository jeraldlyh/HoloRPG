from django.db import models
from django.utils.translation import gettext as _
from django.conf import settings
import string
import random

# def generate_unique_code():
#     """
#         Filter the list of existing Room objects and checks if 
#         a new generated code exists. If not, return the unique code
#     """

#     length = 6

#     while True:
#         code = ''.join(random.choices(string.ascii_lowercase, k=length))  # Generates a random ASCII string of length 6
        
#         if Room.objects.filter(code=code).count() == 0:
#             break

#     return code

# Create your models here.
class Article(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.title

# class Skills(models.Model):
#     class_name = 
class UserAccount(models.Model):
    WARRIOR = "Warrior"
    ARCHER = "Archer"
    MAGICIAN = "Magician"
    ROGUE = "Rogue"
    BEGINNER = "NULL"

    CLASS_CHOICES = [
        (WARRIOR, _("Dawn Warrior")),
        (WARRIOR, _("Gladiator")),
        (WARRIOR, _("Champion")),
        (WARRIOR, _("Battle Master")),
        (ARCHER, _("Hunter")),
        (ARCHER, _("Ranger")),
        (ARCHER, _("Arcane Archer")),
        (ARCHER, _("Bow Master")),
        (MAGICIAN, _("Battle Cleric")),
        (MAGICIAN, _("Sorcerer")),
        (MAGICIAN, _("Summoner")),
        (MAGICIAN, _("Warlock")),
        (ROGUE, _("Scout")),
        (ROGUE, _("Assassin")),
        (ROGUE, _("Trickster")),
        (ROGUE, _("Phantom")),
    ]

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date_registered = models.DateTimeField(auto_now_add=True)
    sub_class = models.CharField(max_length=32, choices=CLASS_CHOICES, default=None)
    level = models.IntegerField()
    experience = models.IntegerField()
    currency = models.IntegerField()
    reputation = models.IntegerField()
    max_health = models.IntegerField()
    current_health = models.IntegerField()
    attack = models.IntegerField()
    defence = models.IntegerField()
    dungeon_status = models.CharField(max_length=32)
    dungeon_level = models.IntegerField()
    dungeon_max_level = models.IntegerField()

    def __str__(self):
        return "User: {} Registered: {} Class: {} Level: {} Experience: {} Currency: {} Reputation: {} MaxHP: {} CurrentHP: {} Attack: {} Defence: {} DungeonStatus: {} DungeonLevel: {} DungeonMax: {} ".format(
            self.user, 
            self.date_registered, 
            self.sub_class, 
            self.level, 
            self.experience, 
            self.currency, 
            self.reputation, 
            self.max_health, 
            self.current_health, 
            self.attack, 
            self.defence, 
            self.dungeon_status, 
            self.dungeon_level, 
            self.dungeon_max_level
        )
