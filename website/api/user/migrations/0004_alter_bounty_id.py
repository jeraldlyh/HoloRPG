# Generated by Django 3.2 on 2021-06-25 14:12

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_auto_20210625_1406'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bounty',
            name='id',
            field=models.CharField(blank=True, default=uuid.uuid4, max_length=36, primary_key=True, serialize=False),
        ),
    ]