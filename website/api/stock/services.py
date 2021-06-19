from collections import OrderedDict
from typing import List

from.selectors import get_stock_data_by_30_days
from .models import Stock, StockPrice, UserStock

def create_stock(serializer_data: OrderedDict) -> None:
    Stock.objects.create(**serializer_data)

def create_stock_price(serializer_data: OrderedDict) -> None:
    StockPrice.objects.create(**serializer_data)

def update_or_create_user_stock(serializer_data: OrderedDict) -> None:
    """
        Creates a new user stock object if it does not exist for the user
        Returns updated list of user stocks to be rendered on frontend
    """

    data = list(serializer_data.items())
    print(data)
    # UserStock.objects.create(**serializer_data)
