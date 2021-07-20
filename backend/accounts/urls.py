from django.urls import path
from .views import LogoutView, CustomTokenRefreshView, LoginAPIView, RegisterAPIView

urlpatterns = [
    path("register/", RegisterAPIView.as_view()),
    path("logout/", LogoutView.as_view()),
    path("token/refresh/", CustomTokenRefreshView().as_view()),
    path("login/", LoginAPIView.as_view()),
]