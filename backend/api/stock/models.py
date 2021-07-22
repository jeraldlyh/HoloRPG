from django.db import models
from django.utils.translation import gettext as _
from django.conf import settings


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
    price = models.IntegerField()

    @property
    def get_volume(self) -> int:
        from .selectors import get_volume_by_date

        return get_volume_by_date(self.company_name, self.datetime)

class UserStock(models.Model):
    class Meta:
        constraints = [models.UniqueConstraint(fields=["placed_at", "user"], name="unique_userstock")]

    BUY = "BUY"
    SELL = "SELL"

    TRANSACTION_TYPES = (
        (BUY, _("Buy")),
        (SELL, _("Sell"))
    )

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    company_name = models.ForeignKey(Stock, on_delete=models.DO_NOTHING)
    placed_at = models.DateTimeField(auto_now_add=True, blank=True, editable=False)
    quantity = models.IntegerField()
    transaction_type = models.CharField(choices=TRANSACTION_TYPES, max_length=4)