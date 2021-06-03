from django.db.models.query import QuerySet

from .models import Room, Dungeon


def get_all_rooms() -> QuerySet:
    return Room.objects.all()

def get_all_dungeons() -> QuerySet:
    return Dungeon.objects.all()