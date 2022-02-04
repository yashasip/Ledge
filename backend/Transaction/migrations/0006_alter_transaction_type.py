# Generated by Django 4.0.1 on 2022-02-03 04:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Transaction', '0005_alter_transaction_description_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaction',
            name='type',
            field=models.CharField(choices=[('Income', 'Income'), ('Expense', 'Expense'), ('Transfer', 'Transfer')], db_column='Type', default='INCOME', max_length=10),
        ),
    ]
