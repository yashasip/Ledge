from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from datetime import date

def not_negative(value):
    if value < 0:
        raise ValidationError(
        _('%(value)s is negative transaction'),
        params={'value': value},
    )

# Create your models here.
class Budget(models.Model):
    budget_id = models.AutoField(verbose_name="BudgetID",primary_key=True,db_column="BudgetID")
    budget_name = models.CharField(max_length=30, db_column="BudgetName")
    budget_label = models.CharField(max_length=30, blank=True, db_column="BudgetLabel")
    start_date = models.DateField(default=date.today,db_column="StartDate")
    end_date = models.DateField(db_column="EndDate")
    budget_amount = models.DecimalField(max_digits=100, decimal_places=2, db_column="Amount", validators=[not_negative])

    def __str__(self)->str:
        return self.budget_name
