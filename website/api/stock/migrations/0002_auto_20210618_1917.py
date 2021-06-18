# Generated by Django 3.2 on 2021-06-18 19:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stock', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='stock',
            name='shares',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='stock',
            name='symbol',
            field=models.CharField(default=1, max_length=3),
            preserve_default=False,
        ),
    ]
