# Generated by Django 4.0.1 on 2022-02-03 12:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Category', '0004_alter_category_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='description',
            field=models.TextField(blank=True, db_column='Description', max_length=500, null=True),
        ),
    ]