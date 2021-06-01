from django.db import models
from ..user.models import UserProfile


class Entity(models.Model):
    name = models.CharField(max_length=50, primary_key=True)
    upkeep = models.IntegerField()
    income = models.IntegerField()
    cost = models.IntegerField()

class UserEntity(models.Model):
    entity = models.ForeignKey(Entity, on_delete=models.CASCADE)
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    quantity = models.IntegerField()