from django.db import models
from django.conf import settings


class Entity(models.Model):
    name = models.CharField(max_length=50, primary_key=True)
    upkeep = models.IntegerField()
    income = models.IntegerField()
    cost = models.IntegerField()


class UserEntity(models.Model):
    class Meta:
        constraints = [models.UniqueConstraint(fields=["entity", "user"], name="unique_user_entity")]

    entity = models.ForeignKey(Entity, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    last_collected = models.DateTimeField(auto_now_add=True, blank=True)

    @property
    def get_income(self) -> int:
        return self.entity.income
