from datetime import datetime
from typing import Union
from django.db.models.query import QuerySet
from django.db.models.query_utils import Q

from .models import Entity, UserEntity

def get_all_entities() -> QuerySet:
    return Entity.objects.all()

def get_user_entity_by_entityname(username: str, entity_name: str) -> UserEntity:
    query = Q(user__username=username, entity__name=entity_name)
    return UserEntity.objects.get(query)

def get_user_entities_by_username(username: str) -> QuerySet:
    query = Q(user__username=username)
    return UserEntity.objects.filter(query)

def get_entity_income(entity_name: str) -> int:
    query = Q(name=entity_name)
    return Entity.objects.get(query).income

def get_entity_upkeep(entity_name: str) -> int:
    query = Q(name=entity_name)
    return Entity.objects.get(query).upkeep

def get_sorted_user_entities_by_upkeep(username: str) -> QuerySet:
    query = Q(user__username=username)
    return UserEntity.objects.filter(query).order_by("-entity_id__upkeep")

def get_last_collected_time_by_username(username: str) -> Union[datetime, None] :
    query = Q(user__username=username)
    result = UserEntity.objects.filter(query).order_by("-last_collected")

    return result[0].last_collected if result else None