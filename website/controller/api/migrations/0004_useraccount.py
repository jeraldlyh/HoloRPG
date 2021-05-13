# Generated by Django 3.2 on 2021-05-13 09:06

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0003_auto_20210510_1310'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserAccount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_registered', models.DateTimeField(auto_now_add=True)),
                ('sub_class', models.CharField(choices=[('Warrior', 'Dawn Warrior'), ('Warrior', 'Gladiator'), ('Warrior', 'Champion'), ('Warrior', 'Battle Master'), ('Archer', 'Hunter'), ('Archer', 'Ranger'), ('Archer', 'Arcane Archer'), ('Archer', 'Bow Master'), ('Magician', 'Battle Cleric'), ('Magician', 'Sorcerer'), ('Magician', 'Summoner'), ('Magician', 'Warlock'), ('Rogue', 'Scout'), ('Rogue', 'Assassin'), ('Rogue', 'Trickster'), ('Rogue', 'Phantom')], default=None, max_length=32)),
                ('level', models.IntegerField()),
                ('experience', models.IntegerField()),
                ('currency', models.IntegerField()),
                ('reputation', models.IntegerField()),
                ('max_health', models.IntegerField()),
                ('current_health', models.IntegerField()),
                ('attack', models.IntegerField()),
                ('defence', models.IntegerField()),
                ('dungeon_status', models.CharField(max_length=32)),
                ('dungeon_level', models.IntegerField()),
                ('dungeon_max_level', models.IntegerField()),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
