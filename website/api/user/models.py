import uuid
from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext as _
from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save

from .utils import get_duration, clamp

class Character(models.Model):
    class Meta:
        constraints = [models.UniqueConstraint(name="unique_character", fields=["main_class", "sub_class"])]

    main_class = models.CharField(default="DEFAULT", max_length=32)
    sub_class = models.CharField(default="NULL", max_length=50)

class Skill(models.Model):
    class Meta:
        constraints = [models.UniqueConstraint(fields=["character", "name"], name="unique_skill")]
    
    character = models.ForeignKey(Character, on_delete=models.DO_NOTHING)
    name = models.CharField(max_length=50, unique=True)
    accuracy = models.IntegerField()
    multiplier = models.IntegerField()

class UserProfile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, to_field="username", on_delete=models.CASCADE)
    image = models.CharField(default="https://svgshare.com/i/Xd6.svg", max_length=100)
    date_registered = models.DateTimeField(auto_now_add=True)
    character = models.ForeignKey(Character, on_delete=models.SET_NULL, null=True)
    level = models.IntegerField(default=1)
    experience = models.IntegerField(default=0)
    currency = models.IntegerField(default=0)
    reputation = models.IntegerField(default=0)
    current_health = models.IntegerField(default=100)
    max_health = models.IntegerField(default=100)
    attack = models.IntegerField(default=1)
    defence = models.IntegerField(default=1)
    status = models.CharField(max_length=10, default="IDLE")
    income_collected = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username
    
    @property
    def get_account_age(self) -> int:
        registered = self.date_registered
        
        return get_duration(registered, interval="days")
    
    @property
    def get_character_class(self) -> tuple:
        return (self.character.main_class, self.character.sub_class)
    
    @property
    def get_rank(self) -> int:
        all_levels = list(UserProfile.objects.values_list("level", flat=True))[::-1]
        return all_levels.index(self.level) + 1
    
    @property
    def get_income_accumulated(self) -> int:
        from ..entity.selectors import get_user_entities_by_username, get_entity_income

        player_entities = list(get_user_entities_by_username(self.user).values_list("entity", "quantity"))

        sum_of_entities_income = 0
        for entity, quantity in player_entities:
            sum_of_entities_income += get_entity_income(entity) * quantity

        last_collected = self.income_collected
        hours = clamp(get_duration(last_collected, interval="hours"), 0, 24)
        return hours * sum_of_entities_income
    
    @property
    def get_net_worth(self) -> int:
        from .services import get_user_net_worth

        return get_user_net_worth(self.user)

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
    placed_by = models.ForeignKey(UserProfile, on_delete=models.CASCADE, to_field="user_id", related_name="%(class)s_placed_by")
    target = models.ForeignKey(UserProfile, on_delete=models.CASCADE, to_field="user_id", related_name="%(class)s_target")
    value = models.IntegerField(blank=True)
    placed_at = models.DateTimeField(auto_now_add=True, blank=True, editable=False)
    claimed_by = models.ForeignKey(UserProfile, on_delete=models.CASCADE, to_field="user_id", related_name="%(class)s_claimed_by", null=True, editable=False)
    status = models.CharField(max_length=10, blank=True, editable=False, default="UNCLAIMED")

    @property
    def get_target_health(self) -> dict:
        current_health = self.target.current_health
        max_health =self.target.max_health
        return {
            "current_health": current_health,
            "max_health": max_health
        }

@receiver(post_save, sender=User)                               # Listener for creation of profiles
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(
            user=instance,
            character=Character.objects.get(main_class="Default"),
        )