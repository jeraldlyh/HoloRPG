from rest_framework import views, status
from rest_framework.response import Response

from .serializers import StockSerializer, StockPriceSerializer, UserStockSerializer
from .selectors import get_all_stocks
from .services import create_stock, create_stock_price, update_or_create_user_stock, get_stock_data_by_30_days

class StockListCreate(views.APIView):
    def get(self, request, format=None):
        serializer = StockSerializer(get_all_stocks())
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, format=None):
        serializer = StockPriceSerializer(request.data)
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.error_messages, status=status.HTTP_400_BAD_REQUEST)

class StockPriceDetail(views.APIView):
    def get(self, request, pk, format=None):
        if pk is not None:
            stock_price = get_stock_data_by_30_days(pk)
            serializer  = StockPriceSerializer(stock_price, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({
            "message": "Stock name is not specified",
        }, status=status.HTTP_400_BAD_REQUEST)


class UserStockCreate(views.APIView):
    def post(self, request, format=None):
        serializer = UserStockSerializer(request.data)
        if serializer.is_valid():
            update_or_create_user_stock(serializer.validated_data)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.error_messages, status=status.HTTP_400_BAD_REQUEST)

