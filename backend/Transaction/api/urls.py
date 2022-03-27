from django.urls import path

from Transaction.api.views import (
    add_new_transaction,
    get_all_user_transactions,
)

app_name = 'Account'

urlpatterns = [
    path('new_transaction', add_new_transaction, name="CreateNewTransaction"),
    path('user_transactions', get_all_user_transactions, name="UserTransactions"),
]
