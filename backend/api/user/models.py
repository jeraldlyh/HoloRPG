import uuid
from datetime import datetime
from django.contrib.auth.base_user import BaseUserManager
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext as _

from .utils import get_duration, clamp


class Character(models.Model):
    main_class = models.CharField(default="DEFAULT", max_length=32, primary_key=True)


class UserManager(BaseUserManager):
    def create_user(self, username, email, password):
        user = self.model(
            username=username,
            email=self.normalize_email(email),
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, username, email, password):
        user = self.create_user(
            username=username,
            email=email,
            password=password
        )
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class UserProfile(AbstractBaseUser, PermissionsMixin):
    # Default credentials
    id = models.UUIDField(default=uuid.uuid4, editable=False)
    email = models.EmailField(max_length=254, unique=True, null=False, blank=False)
    username = models.CharField(primary_key=True, max_length=16, unique=True, null=False, blank=False)
    is_staff = models.BooleanField(default=False, blank=True)
    is_superuser = models.BooleanField(default=False, blank=True)
    is_active = models.BooleanField(default=True)
    last_login = models.DateTimeField(null=True, blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    has_changed_name = models.BooleanField(default=False, blank=True)

    # Profile data
    image = models.CharField(max_length=100, null=True, blank=True)
    character = models.ForeignKey(Character, on_delete=models.SET_NULL, null=True)
    level = models.IntegerField(default=1)
    experience = models.IntegerField(default=0)
    currency = models.IntegerField(default=1000)
    reputation = models.IntegerField(default=0)
    current_health = models.IntegerField(default=100)
    max_health = models.IntegerField(default=100)
    attack = models.IntegerField(default=1)
    defence = models.IntegerField(default=1)
    status = models.CharField(max_length=10, default="IDLE")

    USERNAME_FIELD = "username"
    EMAIL_FIELD = "email"
    REQUIRED_FIELDS = ["email"]
    objects = UserManager()

    def __str__(self):
        return self.username
    
    @property
    def get_account_age(self) -> int:
        registered = self.date_joined
        age = get_duration(registered, interval="days")
        return age if age >= 0 else 0

    @property
    def get_rank(self) -> int:
        from .selectors import get_all_user_levels

        all_levels = list(get_all_user_levels())[::-1]
        return all_levels.index(self.level) + 1

    @property
    def get_income_accumulated(self) -> int:
        from ..entity.selectors import get_user_entities_by_username

        player_entities = get_user_entities_by_username(self.username)

        sum_of_entities_income = 0
        for entity in player_entities:
            hours = clamp(get_duration(entity.last_collected, interval="hours"), 0, 24)
            sum_of_entities_income += entity.entity.income * entity.quantity * hours

        # last_collected = self.income_collected
        # hours = clamp(get_duration(last_collected, interval="hours"), 0, 24)

        print(f"{self.username} - Total Income - {sum_of_entities_income}")
        return sum_of_entities_income
    
    @property
    def get_net_worth(self) -> int:
        from .services import get_user_net_worth

        return get_user_net_worth(self.username) + self.currency

    @property
    def get_last_collected(self) -> datetime:
        from ..entity.selectors import get_last_collected_time_by_username

        return get_last_collected_time_by_username(self.username)
    
    @property
    def get_exp_required(self) -> int:
        from .services import exp_required

        return exp_required(self.level)

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
    id = models.CharField(primary_key=True, max_length=36, blank=True, default=uuid.uuid4, editable=False)
    placed_by = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="placed_by")
    target = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="target")
    value = models.IntegerField()
    placed_at = models.DateTimeField(auto_now_add=True, blank=True, editable=False)
    claimed_by = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="claimed_by", null=True, editable=False)
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