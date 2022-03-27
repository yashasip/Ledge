from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from django.utils import timezone

def not_negative(value):
    if value < 0:
        raise ValidationError(
        _('%(value)s is negative transaction'),
        params={'value': value},
    )

# Create your models here.
class Transaction(models.Model):
    TRANSACTION_TYPE_CHOICES = [
        ('Income', 'Income'),
        ('Expense', 'Expense'),
    ]

    transaction_id = models.AutoField(verbose_name="TransactionID",primary_key=True,db_column="TransactionID")
    type = models.CharField(choices=TRANSACTION_TYPE_CHOICES, max_length=10,default='INCOME', db_column="Type")
    amount = models.DecimalField(max_digits=100, decimal_places=2, db_column="Amount", validators=[not_negative])
    transaction_date = models.DateTimeField(default=timezone.now,db_column="TransactionDate")
    transaction_party = models.CharField(max_length=50, blank=True, db_column="TransactionParty")
    description = models.TextField(max_length=500,blank=True, db_column="Description")

    def __str__(self)->str:
        return f'(#TR{self.transaction_id},{self.type},{self.amount},{self.transaction_date})'
    