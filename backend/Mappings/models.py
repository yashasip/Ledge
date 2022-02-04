from django.db import models

# import all to be mapped models
from django.contrib.auth.models import User
from Account.models import Account
from Transaction.models import Transaction
from Budget.models import Budget
from currency.models import Currency
from Category.models import Category

# Create your models here.
class AccountUserCurrencyMapping(models.Model):
    account_id = models.OneToOneField(Account, on_delete=models.CASCADE, primary_key=True, db_column="AccountID")
    user_id = models.ForeignKey(User,on_delete=models.DO_NOTHING, db_column="UserID")
    currency_id = models.ForeignKey(Currency, on_delete=models.DO_NOTHING, db_column="CurrencyID")
    
    class Meta:
        verbose_name = 'AccountUserCurrencyMapping'

class TransactionCategoryAccountMapping(models.Model):
    transaction_id = models.OneToOneField(Transaction, on_delete=models.CASCADE,primary_key=True,db_column="TransactionID")
    category_id = models.ForeignKey(Category, on_delete=models.DO_NOTHING, db_column="CategoryID")
    account_id = models.ForeignKey(Account, on_delete=models.DO_NOTHING, db_column="AccountID")

    class Meta:
        verbose_name = 'TransactionCategoryAccountMapping'

class BudgetAccountMapping(models.Model):
    budget_id = models.OneToOneField(Budget, primary_key=True, on_delete=models.CASCADE,db_column="BudgetID")
    account_id = models.ForeignKey(Account, on_delete=models.DO_NOTHING, db_column="AccountID")

    class Meta:
        verbose_name = 'BudgetAccountMapping'

class CategoryUserMapping(models.Model):
    category_id = models.OneToOneField(Category, on_delete=models.CASCADE, primary_key=True, db_column="CategoryID")
    user_id = models.ForeignKey(User, on_delete=models.DO_NOTHING, db_column="UserID")

    class Meta:
        verbose_name = 'CategoryUserMapping'
