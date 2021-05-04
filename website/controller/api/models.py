from django.db import models
import string
import random

def generate_unique_code():
    """
        Filter the list of existing Room objects and checks if 
        a new generated code exists. If not, return the unique code
    """

    length = 6

    while True:
        code = ''.join(random.choices(string.ascii_lowercase, k=length))  # Generates a random ASCII string of length 6
        
        if Room.objects.filter(code=code).count() == 0:
            break

    return code

# Create your models here.
class Lead(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    message = models.CharField(max_length=500, blank=True)
    create_at = models.DateTimeField(auto_now_add=True)