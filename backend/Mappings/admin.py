from django.contrib import admin
from Mappings.models import AccountUserCurrencyMapping,TransactionCategoryAccountMapping, BudgetAccountMapping, CategoryUserMapping

# Register your models here.
admin.site.register((AccountUserCurrencyMapping, TransactionCategoryAccountMapping, BudgetAccountMapping, CategoryUserMapping))