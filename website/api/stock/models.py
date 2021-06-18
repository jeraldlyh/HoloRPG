from django.db import models
from django.utils.translation import gettext as _

from ..user.models import UserProfile

class Stock(models.Model):
    VOLATILE = "VOLATILE"
    PASSIVE = "PASSIVE"

    TYPE_CHOICES = (
        (VOLATILE, _("Volatile")),
        (PASSIVE, _("Passive"))
    )

    company_name = models.CharField(max_length=100, primary_key=True)
    symbol = models.CharField(max_length=3)
    shares = models.IntegerField()
    type = models.CharField(choices=TYPE_CHOICES, max_length=10)

class StockPrice(models.Model):
    class Meta:
        constraints = [models.UniqueConstraint(fields=["date", "company_name"], name="unique_stockprice")]

    date = models.DateField(auto_now_add=True, blank=True, editable=False)
    company_name = models.ForeignKey(Stock, on_delete=models.DO_NOTHING)
    open = models.IntegerField()
    close = models.IntegerField()
    volume = models.IntegerField()

class UserStock(models.Model):
    class Meta:
        constraints = [models.UniqueConstraint(fields=["placed_at", "user"], name="unique_userstock")]

    BUY = "BUY"
    SELL = "SELL"

    TRANSACTION_TYPES = (
        (BUY, _("Buy")),
        (SELL, _("Sell"))
    )

    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    stock = models.ForeignKey(Stock, on_delete=models.DO_NOTHING)
    placed_at = models.DateTimeField(auto_now_add=True, blank=True, editable=False)
    quantity = models.IntegerField()
    transaction_type = models.CharField(choices=TRANSACTION_TYPES, max_length=4)