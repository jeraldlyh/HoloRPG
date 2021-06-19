# Generated by Django 3.2 on 2021-06-19 22:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stock', '0003_auto_20210619_2156'),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name='stockprice',
            name='unique_stockprice',
        ),
        migrations.RenameField(
            model_name='userstock',
            old_name='stock',
            new_name='company_name',
        ),
        migrations.AddConstraint(
            model_name='stockprice',
            constraint=models.UniqueConstraint(fields=('datetime', 'company_name'), name='unique_stockprice'),
        ),
    ]
