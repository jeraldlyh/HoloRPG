import uuid
from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext as _
from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save

from .utils import get_duration, clamp

class Character(models.Model):
    main_class = models.CharField(default="DEFAULT", max_length=32, primary_key=True)

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

    def __str__(self):
        return self.user.username
    
    @property
    def get_account_age(self) -> int:
        registered = self.date_registered
        age = get_duration(registered, interval="days")
        return age if age != 0 else 0

    @property
    def get_rank(self) -> int:
        from .selectors import get_all_user_levels

        all_levels = list(get_all_user_levels())[::-1]
        return all_levels.index(self.level) + 1

    @property
    def get_income_accumulated(self) -> int:
        from ..entity.selectors import get_user_entities_by_username

        player_entities = get_user_entities_by_username(self.user)

        sum_of_entities_income = 0
        for entity in player_entities:
            hours = clamp(get_duration(entity.last_collected, interval="hours"), 0, 24)
            sum_of_entities_income += entity.entity.income * entity.quantity * hours

        # last_collected = self.income_collected
        # hours = clamp(get_duration(last_collected, interval="hours"), 0, 24)

        print(f"{self.user} - Total Income - {sum_of_entities_income}")
        return sum_of_entities_income
    
    @property
    def get_net_worth(self) -> int:
        from .services import get_user_net_worth

        return get_user_net_worth(self.user.username)

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

    user_from = models.ForeignKey(UserProfile, to_field="user_id", on_delete=models.CASCADE, related_name="user_from")
    user_to = models.ForeignKey(UserProfile, to_field="user_id", on_delete=models.CASCADE, related_name="user_to")
    relationship = models.ForeignKey(Relationship, on_delete=models.DO_NOTHING)

class Bounty(models.Model):
    id = models.CharField(max_length=36, blank=True, default=uuid.uuid4, primary_key=True)
    placed_by = models.ForeignKey(UserProfile, to_field="user_id", on_delete=models.CASCADE, related_name="placed_by")
    target = models.ForeignKey(UserProfile, to_field="user_id", on_delete=models.CASCADE, related_name="target")
    value = models.IntegerField(blank=True)
    placed_at = models.DateTimeField(auto_now_add=True, blank=True, editable=False)
    claimed_by = models.ForeignKey(UserProfile, to_field="user_id", on_delete=models.CASCADE, related_name="claimed_by", null=True, editable=False)
    claimed_at = models.DateTimeField(null=True, blank=True, editable=False)
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