from django.contrib import admin
from django.urls import path, include
from .views import index

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", index),
    path("faq/", index),
    path("login/", index),
    path("register/", index),
    path("home/", index),
    path("profile/", index),
    path("room/", index),
]
