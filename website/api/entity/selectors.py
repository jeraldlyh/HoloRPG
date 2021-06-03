from django.db.models import query
from django.db.models.query import QuerySet
from django.db.models.query_utils import Q

from .models import Entity, UserEntity

def get_all_entities() -> QuerySet:
    return Entity.objects.all()

def get_user_entity_by_username(username: str) -> QuerySet:
    query = Q(user__user_id=username)
    return UserEntity.objects.filter(query)