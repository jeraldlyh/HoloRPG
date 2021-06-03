from collections import OrderedDict

from .models import Room


def create_room(serializer_data: OrderedDict):
    data = list(serializer_data.items())
    Room.objects.create(**serializer_data)