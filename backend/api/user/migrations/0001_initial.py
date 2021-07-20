# Generated by Django 3.2.5 on 2021-07-19 18:02

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Character',
            fields=[
                ('main_class', models.CharField(default='DEFAULT', max_length=32, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Relationship',
            fields=[
                ('name', models.CharField(choices=[('FRIEND', 'Friend'), ('FAMILY', 'Family')], max_length=10, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('image', models.CharField(default='https://svgshare.com/i/Xd6.svg', max_length=100)),
                ('date_registered', models.DateTimeField(auto_now_add=True)),
                ('level', models.IntegerField(default=1)),
                ('experience', models.IntegerField(default=0)),
                ('currency', models.IntegerField(default=0)),
                ('reputation', models.IntegerField(default=0)),
                ('current_health', models.IntegerField(default=100)),
                ('max_health', models.IntegerField(default=100)),
                ('attack', models.IntegerField(default=1)),
                ('defence', models.IntegerField(default=1)),
                ('status', models.CharField(default='IDLE', max_length=10)),
                ('character', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='user.character')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, to_field='username')),
            ],
        ),
        migrations.CreateModel(
            name='UserRelationship',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('relationship', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='user.relationship')),
                ('user_from', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_from', to='user.userprofile', to_field='user_id')),
                ('user_to', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_to', to='user.userprofile', to_field='user_id')),
            ],
        ),
        migrations.CreateModel(
            name='Bounty',
            fields=[
                ('id', models.CharField(blank=True, default=uuid.uuid4, max_length=36, primary_key=True, serialize=False)),
                ('value', models.IntegerField(blank=True)),
                ('placed_at', models.DateTimeField(auto_now_add=True)),
                ('claimed_at', models.DateTimeField(blank=True, editable=False, null=True)),
                ('status', models.CharField(blank=True, default='UNCLAIMED', editable=False, max_length=10)),
                ('claimed_by', models.ForeignKey(editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='claimed_by', to='user.userprofile', to_field='user_id')),
                ('placed_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='placed_by', to='user.userprofile', to_field='user_id')),
                ('target', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='target', to='user.userprofile', to_field='user_id')),
            ],
        ),
        migrations.AddConstraint(
            model_name='userrelationship',
            constraint=models.UniqueConstraint(fields=('user_from', 'user_to'), name='unique_relationship'),
        ),
    ]
