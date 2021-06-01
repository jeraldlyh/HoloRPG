from django.db import models
from django.db.models.signals import pre_save
from django.dispatch.dispatcher import receiver
from django.utils.translation import gettext as _
from ..user.models import UserProfile
from ..formulas.models import generate_unique_code, get_monster_name, generate_monster_stats

class Dungeon(models.Model):
    """
        PRIMARY KEY: name
        REQUIRED FIELDS: name, level
    """
    name = models.CharField(max_length=100, primary_key=True)
    level = models.IntegerField()

    def __str__(self):
        return self.name

class Monster(models.Model):
    """
        PRIMARY KEY: name, dungeon_name
        REQUIRED FIELDS: name, dungeon_name
    """
    class Meta:
        constraints = [models.UniqueConstraint(name="unique_monster", fields=["name", "dungeon_name"])]

    name = models.CharField(max_length=50)
    dungeon_name = models.ForeignKey(Dungeon, on_delete=models.DO_NOTHING)

    def __str__(self) -> str:
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
    
    @property
    def get_profile_pictures(self) -> list:
        profile_pictures = [self.host.image]
        if self.player_two is not None:
            profile_pictures.append(self.player_two.image)
        if self.player_three is not None:
            profile_pictures.append(self.player_three.image)
        if self.player_four is not None:
            profile_pictures.append(self.player_four.image)
        return profile_pictures

@receiver(pre_save, sender=Room)
def create_room(sender, instance, **kwargs):
    monster_stats = generate_monster_stats(Dungeon.objects.get(name=instance.dungeon).level)

    instance.monster = get_monster_name(instance.dungeon)
    instance.monster_attack=monster_stats[1]
    instance.monster_defence=monster_stats[2]
    instance.monster_current_health=monster_stats[0]
    instance.monster_max_health=monster_stats[0]
