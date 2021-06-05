from django.db.models.query import QuerySet
from django.db.models.query_utils import Q
from django.db.models import Sum

from .models import Entity, UserEntity

def get_all_entities() -> QuerySet:
    return Entity.objects.all()

def get_user_entity_by_username_entityname(username: str, entity_name: str) -> UserEntity:
    query = Q(user__user_id=username, entity__name=entity_name)
    return UserEntity.objects.get(query)

def get_user_entities_by_username(username: str) -> QuerySet:
    query = Q(user__user_id=username)
    return UserEntity.objects.filter(query)

def get_entity_income(entity_name: str) -> int:
    query = Q(name=entity_name)
    return Entity.objects.get(query).income