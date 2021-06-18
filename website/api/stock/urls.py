from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import StockViewSet, StockPriceViewSet, UserStockViewSet

router = DefaultRouter()
router.register(r"stock", StockViewSet, basename="stock")
router.register(r"stockprice", StockPriceViewSet, basename="stockprice")
router.register(r"userstock", UserStockViewSet, basename="userstock")

urlpatterns = [
    path("", include(router.urls)),
]