from django.db import models
from django.db.models.lookups import IsNull
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


class Character(models.Model):
    class Meta:
        unique_together = (("main_class", "sub_class"))

    WARRIOR = 1
    ARCHER = 2
    MAGICIAN = 3
    ROGUE = 4
    DEFAULT = 0
    
    CLASS_CHOICES = (
        (WARRIOR, _("Warrior")),
        (ARCHER, _("Archer")),
        (MAGICIAN, _("Magician")),
        (ROGUE, _("Rogue")),
        (DEFAULT, _("NONE"))
    )

    main_class = models.PositiveSmallIntegerField(
        choices=CLASS_CHOICES,
        default=DEFAULT,
    )
    sub_class = models.CharField(max_length=50)


class Skill(models.Model):
    class Meta:
        unique_together = (("character", "name"))
    
    character = models.ForeignKey(Character, on_delete=models.DO_NOTHING)
    name = models.CharField(max_length=50)
    accuracy = models.IntegerField()
    multiplier = models.IntegerField()

class UserProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date_registered = models.DateTimeField(auto_now_add=True)
    character = models.ForeignKey(Character, default=None, on_delete=models.DO_NOTHING)
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
