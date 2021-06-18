from django.db.models import query
from django.db.models.query import QuerySet
from django.db.models.query_utils import Q

from .models import Stock, StockPrice, UserStock


def get_all_stocks() -> QuerySet:
    return Stock.objects.all()

def get_stock_price_by_name(company_name: str) -> QuerySet:
    query = Q(company_name=company_name)
    return StockPrice.objects.filter(query).order_by("-date")[0:25]