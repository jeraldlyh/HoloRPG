# Generated by Django 3.2 on 2021-06-25 14:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('entity', '0002_alter_userentity_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='userentity',
            name='last_collected',
            field=models.DateTimeField(auto_now_add=True),
            preserve_default=False,
        ),
    ]
