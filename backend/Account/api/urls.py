from django.urls import path

from Account.api.views import (
    add_new_account,
    get_all_user_accounts,
)

app_name = 'Account'

urlpatterns = [
    path('new_account', add_new_account, name="CreateNewAccount"),
    path('user_account_list', get_all_user_accounts, name="UserAccounts"),
]
