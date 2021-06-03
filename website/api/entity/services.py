from collections import OrderedDict

from .selectors import get_user_entity_by_username
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

    UserEntity.objects.update_or_create(
        user=user,
        entity=entity,
        defaults={
            "quantity": data[0][1]
        }
    )

    return get_user_entity_by_username(user.user.username)