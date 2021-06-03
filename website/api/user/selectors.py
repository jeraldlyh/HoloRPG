from django.db.models.query import QuerySet
from django.db.models.query_utils import Q

from .models import Bounty, UserProfile, UserRelationship

def get_user_by_username(username: str) -> UserProfile:
    query = Q(user_id=username)
    return UserProfile.objects.get(query)

def get_user_by_abstract_id(id: str) -> UserProfile:
    query = Q(user__id=id)
    return UserProfile.objects.get(query)

def get_users_by_relationships(relationships: QuerySet) -> QuerySet:
    query = Q(id__in=relationships)
    return UserProfile.objects.filter(query)

def get_bounty_by_id(id: str) -> Bounty:
    query = Q(id=id)
    return Bounty.objects.get(query)

def get_bounties_by_status(status: str) -> QuerySet:
    query = Q(status=status)
    return Bounty.objects.filter(query)

def get_bounties_by_target_status(target: str,  status: str) -> QuerySet:
    query = Q(target=target, status=status)
    return Bounty.objects.filter(query)

def get_list_of_relationships_by_username(username: str) -> QuerySet:
    query = Q(user_from__user_id=username)
    return UserRelationship.objects.filter(query).values_list("user_to")