from django.urls import path

from Budget.api.views import (
    add_new_budget,
    get_latest_budget_view,
)

app_name = 'Budget'

urlpatterns = [
    path('new_budget', add_new_budget, name="CreateNewBudget"),
    path('get_spent', get_latest_budget_view, name="GetTotalSpent"),
]
