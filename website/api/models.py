import uuid
from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext as _
from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save, pre_save
from .utils import generate_unique_code, get_monster_name, generate_monster_stats

# FIRST MIGRATION
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

class Skill(models.Model):
    """
        PRIMARY KEY: character, name
        REQUIRED FIELDS: character, name, accuracy, multiplier
    """
    class Meta:
        constraints = [models.UniqueConstraint(fields=["character", "name"], name="unique_skill")]
    
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

# SECOND MIGRATION

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
    host = models.OneToOneField(UserProfile, on_delete=models.DO_NOTHING, to_field="user_id", related_name="%(class)s_host")
    status = models.CharField(choices=STATUS_CHOICES, default=DEFAULT, blank=True, max_length=7)
    id = models.CharField(max_length=6, primary_key=True, default=generate_unique_code, blank=True, editable=False)
    status = models.CharField(choices=STATUS_CHOICES, default=DEFAULT, max_length=7, editable=False)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    monster = models.ForeignKey(Monster, on_delete=models.DO_NOTHING, blank=True, editable=False)
    monster_attack = models.IntegerField(blank=True, editable=False)
    monster_defence = models.IntegerField(blank=True, editable=False)
    monster_current_health = models.IntegerField(blank=True, editable=False)
    monster_max_health = models.IntegerField(blank=True, editable=False)
    player_two = models.OneToOneField(UserProfile, on_delete=models.DO_NOTHING, blank=True, null=True, to_field="user_id", related_name="%(class)s_p2")
    player_three = models.OneToOneField(UserProfile, on_delete=models.DO_NOTHING, blank=True, null=True, to_field="user_id", related_name="%(class)s_p3")
    player_four = models.OneToOneField(UserProfile, on_delete=models.DO_NOTHING, blank=True, null=True, to_field="user_id", related_name="%(class)s_p4")

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

    user_from = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="user_from")
    user_to = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="user_to")
    relationship = models.ForeignKey(Relationship, on_delete=models.DO_NOTHING)

class Bounty(models.Model):
    class Meta:
        constraints = [models.UniqueConstraint(fields=["placed_by", "target"], name="unique_bounty")]
    
    placed_by = models.ForeignKey(UserProfile, on_delete=models.CASCADE, to_field="user_id", related_name="%(class)s_placed_by")
    target = models.ForeignKey(UserProfile, on_delete=models.CASCADE, to_field="user_id", related_name="%(class)s_target")
    value = models.IntegerField(blank=True)
    placed_at = models.DateTimeField(auto_now_add=True, blank=True, editable=False)


# List of receivers
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