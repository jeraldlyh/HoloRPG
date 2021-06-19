from django.db.models import query
from django.db.models.aggregates import Sum
from django.db.models.query import QuerySet
from django.db.models.query_utils import Q
from django.db.models.functions import ExtractDay

from .models import Stock, StockPrice, UserStock


def get_all_stocks() -> QuerySet:
    return Stock.objects.all()

def get_stock_data_by_30_days(company_name: str) -> QuerySet:
    query = Q(company_name=company_name)
    return StockPrice.objects.filter(query).order_by("-datetime")[0: 30]

def get_volume_by_date(company_name: str, datetime: str) -> QuerySet:
    query = Q(company_name=company_name, placed_at__day=ExtractDay(datetime))
    quantity = UserStock.objects.filter(query).aggregate(quantity=Sum("quantity"))["quantity"]
    return quantity if quantity else 0