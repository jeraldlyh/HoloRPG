from rest_framework import viewsets, status
from rest_framework.response import Response

from .serializers import StockSerializer, StockPriceSerializer, UserStockSerializer
from .selectors import get_all_stocks
from .services import create_stock, create_stock_price, update_or_create_user_stock, get_stock_data_by_30_days

class StockViewSet(viewsets.ViewSet):
    serializer_class = StockSerializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            create_stock(serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({"Bad Request": serializer.error_messages}, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        serializer = self.serializer_class(get_all_stocks(), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class StockPriceViewSet(viewsets.ViewSet):
    serializer_class = StockPriceSerializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            create_stock_price(serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({"Bad Request": serializer.error_messages}, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        if pk is not None:
            stock_prizes = get_stock_data_by_30_days(pk)
            serializer = self.serializer_class(stock_prizes, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"Bad Request": "Stock name parameter not specified"}, status=status.HTTP_400_BAD_REQUEST)


class UserStockViewSet(viewsets.ViewSet):
    serializer_class = UserStockSerializer

    def create(self, request):
        serializer = self.serializer_class(request.data)
        if serializer.is_valid():
            update_or_create_user_stock(serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({"Bad Request": serializer.error_messages}, status=status.HTTP_400_BAD_REQUEST)

