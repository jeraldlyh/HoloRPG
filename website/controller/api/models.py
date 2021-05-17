from django.db import models
from django.contrib.auth.models import User
from django.db.models.lookups import IsNull
from django.utils.translation import gettext as _
from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save
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
    class Meta:
        unique_together = (("character", "name"))
    
    character = models.ForeignKey(Character, on_delete=models.DO_NOTHING)
    name = models.CharField(max_length=50, unique=True)
    accuracy = models.IntegerField()
    multiplier = models.IntegerField()

class Dungeon(models.Model):
    name = models.CharField(max_length=100)
    level = models.IntegerField(unique=True)

    def __str__(self):
        return f"Name: {self.name} | Level: {self.level}"

class UserProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, to_field="username", on_delete=models.CASCADE, unique=True)
    date_registered = models.DateTimeField(auto_now_add=True, blank=True)
    character = models.ForeignKey(Character, on_delete=models.DO_NOTHING)
    level = models.IntegerField()
    experience = models.IntegerField()
    currency = models.IntegerField()
    reputation = models.IntegerField()
    max_health = models.IntegerField()
    current_health = models.IntegerField()
    attack = models.IntegerField()
    defence = models.IntegerField()
    dungeon_status = models.CharField(max_length=32)
    dungeon_level = models.ForeignKey(Dungeon, to_field="level", on_delete=models.DO_NOTHING)

    def __str__(self):
        return str(self.user)
        

    @receiver(post_save, sender=User)       # Listener for creation of profiles
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            UserProfile.objects.create(user=instance, character=Character.objects.get(main_class="Default"), level=1, experience=0, currency=0, reputation=0, max_health=100, current_health=100, attack=1, defence=1, dungeon_status="Not battling", dungeon_level=Dungeon.objects.get(level=1))

