from django.contrib import admin
from django.apps import apps
from .models import UserProfile, Character

# Register your models here.
models = apps.get_models()
for model in models:
    try:
        if model.__name__ == "AuthToken":
            continue
        admin.site.register(model)
    except admin.sites.AlreadyRegistered:
        pass