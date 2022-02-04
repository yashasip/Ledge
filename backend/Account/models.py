from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

def not_negative(value):
    if value < 0:
        raise ValidationError(
        _('%(value)s is negative balance'),
        params={'value': value},
    )

# Create your models here.
class Account(models.Model):
    account_id = models.AutoField(verbose_name="AccountID",primary_key=True,db_column="AccountID")
    account_name = models.CharField(max_length=30, db_column="AccountName")
    account_type = models.CharField(max_length=25, blank=True, db_column="Type")
    balance = models.DecimalField(max_digits=100, decimal_places=2, db_column="Balance", validators=[not_negative])

    def __str__(self)->str:
        return self.account_name
  