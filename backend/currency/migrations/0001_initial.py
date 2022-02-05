# Generated by Django 4.0.1 on 2022-02-01 15:05

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Currency',
            fields=[
                ('currency_id', models.AutoField(db_column='CurrencyID', primary_key=True, serialize=False, verbose_name='CurrencyID')),
                ('currency_symbol', models.CharField(db_column='Symbol', max_length=5, null=True, verbose_name='Symbol')),
                ('currency_code', models.CharField(db_column='Code', max_length=5, unique=True, verbose_name='CurrencyCode')),
                ('type', models.CharField(choices=[('FIAT', 'Fiat'), ('CRYPTO', 'Crypto')], db_column='Type', max_length=10, verbose_name='Type')),
            ],
            options={
                'verbose_name_plural': 'Currencies',
            },
        ),
    ]