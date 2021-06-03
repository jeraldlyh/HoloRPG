from collections import OrderedDict
from datetime import datetime
from django.db.models.expressions import F

from ..user.models import UserProfile
from ..user.services import deduct_player_currency
from ..user.selectors import get_user_by_username
from .selectors import get_user_entities_by_username, get_user_entity_by_username_entityname
from .models import Entity, UserEntity


def create_entity(serializer_data: OrderedDict):
    Entity.objects.create(**serializer_data)

def update_or_create_user_entity(serializer_data: OrderedDict):
    """
        Creates a new user entity object if it does not exist for the user
        Returns updated list of user entities to be rendered on frontend
    """

    data = list(serializer_data.items())
    user = data[2][1]
    entity = data[1][1]
    quantity = data[0][1]

    try:
        existing = get_user_entity_by_username_entityname(user.user.username, entity.name)
        existing.quantity = F("quantity") + quantity
        existing.save()
    except UserEntity.DoesNotExist:
        UserEntity.objects.create(**serializer_data)

    cost = quantity * entity.cost
    deduct_player_currency(user, cost)

    return get_user_entities_by_username(user.user.username)

def reset_income_collected(user: UserProfile):
    user.income_collected = datetime.now()
    user.save()

def claim_income(username: str, amount: int):
    user = get_user_by_username(username)
    user.currency = F("currency") + amount
    user.save()
    reset_income_collected(user)
