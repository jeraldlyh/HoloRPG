from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import StockPriceDetail, StockListCreate

router = DefaultRouter()
# router.register(r"stock", StockViewSet, basename="stock")
# router.register(r"stockprice", StockPriceViewSet, basename="stockprice")
# router.register(r"userstock", UserStockViewSet, basename="userstock")

urlpatterns = [
    path("stocks/", StockListCreate.as_view()),
    path("stocks/<str:pk>/", StockPriceDetail.as_view()),
    path("", include(router.urls)),
]