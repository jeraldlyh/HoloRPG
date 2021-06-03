from .models import Room, Dungeon
from django.db.models.query import QuerySet


def get_all_rooms() -> QuerySet:
    return Room.objects.all()

def get_all_dungeons() -> QuerySet:
    return Dungeon.objects.all()