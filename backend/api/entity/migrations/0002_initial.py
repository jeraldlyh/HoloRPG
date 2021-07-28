# Generated by Django 3.2.5 on 2021-07-28 20:07

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('entity', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='userentity',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddConstraint(
            model_name='userentity',
            constraint=models.UniqueConstraint(fields=('entity', 'user'), name='unique_user_entity'),
        ),
    ]