from django.urls import path
from .views import BlacklistTokenView, LoginAPIView, RegisterAPIView

urlpatterns = [
    path('register/', RegisterAPIView.as_view()),
    path('logout/', BlacklistTokenView.as_view()),
    path('login/', LoginAPIView.as_view()),
]