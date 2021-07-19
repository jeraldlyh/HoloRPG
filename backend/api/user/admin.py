from django.contrib import admin
from django.apps import apps

models = apps.get_models()
for model in models:
    try:
        if model.__name__ in ["OutstandingToken", "BlacklistedToken", "Schedule", "Success", "Failure"]:
            continue
        admin.site.register(model)
    except admin.sites.AlreadyRegistered:
        pass