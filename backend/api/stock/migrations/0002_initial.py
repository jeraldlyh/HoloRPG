# Generated by Django 3.2.5 on 2021-07-30 14:58

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('stock', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='userstock',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='stockprice',
            name='company_name',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='stock.stock'),
        ),
        migrations.AddConstraint(
            model_name='userstock',
            constraint=models.UniqueConstraint(fields=('placed_at', 'user'), name='unique_userstock'),
        ),
        migrations.AddConstraint(
            model_name='stockprice',
            constraint=models.UniqueConstraint(fields=('date', 'company_name'), name='unique_stockprice'),
        ),
    ]
