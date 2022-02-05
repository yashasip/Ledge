# Generated by Django 4.0.1 on 2022-02-02 08:06

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('Account', '0003_alter_account_account_type'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserAccountMapping',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('account_id', models.OneToOneField(db_column='AccountID', on_delete=django.db.models.deletion.CASCADE, to='Account.account')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]