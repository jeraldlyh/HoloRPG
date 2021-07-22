# Generated by Django 3.2.5 on 2021-07-22 23:36

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0014_alter_user_email'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('username', models.CharField(max_length=16, unique=True)),
                ('is_staff', models.BooleanField(blank=True, default=False)),
                ('is_superuser', models.BooleanField(blank=True, default=False)),
                ('is_active', models.BooleanField(default=True)),
                ('last_login', models.DateTimeField(blank=True, null=True)),
                ('date_joined', models.DateTimeField(auto_now_add=True)),
                ('has_changed_name', models.BooleanField(blank=True, default=False)),
                ('image', models.CharField(blank=True, max_length=100, null=True)),
                ('level', models.IntegerField(default=1)),
                ('experience', models.IntegerField(default=0)),
                ('currency', models.IntegerField(default=0)),
                ('reputation', models.IntegerField(default=0)),
                ('current_health', models.IntegerField(default=100)),
                ('max_health', models.IntegerField(default=100)),
                ('attack', models.IntegerField(default=1)),
                ('defence', models.IntegerField(default=1)),
                ('status', models.CharField(default='IDLE', max_length=10)),
            ],
            options={
                'abstract': False,
            },
        ),
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
            name='UserRelationship',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('relationship', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='user.relationship')),
                ('user_from', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_from', to=settings.AUTH_USER_MODEL)),
                ('user_to', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_to', to=settings.AUTH_USER_MODEL)),
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
                ('claimed_by', models.ForeignKey(editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='claimed_by', to=settings.AUTH_USER_MODEL)),
                ('placed_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='placed_by', to=settings.AUTH_USER_MODEL)),
                ('target', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='target', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='userprofile',
            name='character',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='user.character'),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='groups',
            field=models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups'),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions'),
        ),
        migrations.AddConstraint(
            model_name='userrelationship',
            constraint=models.UniqueConstraint(fields=('user_from', 'user_to'), name='unique_relationship'),
        ),
    ]
