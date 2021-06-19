
from rest_framework import serializers
from .models import Stock, StockPrice, UserStock

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = "__all__"

class StockPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockPrice
        fields = "__all__"

    volume = serializers.ReadOnlyField(source="get_volume")

class UserStockSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserStock
        fields = "__all__"