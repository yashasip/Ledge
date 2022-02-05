from django.urls import path

from Budget.api.views import (
    add_new_budget,
    get_budget_amount_spent_view,
)

app_name = 'Budget'

urlpatterns = [
    path('new_budget', add_new_budget, name="CreateNewBudget"),
    path('get_spent', get_budget_amount_spent_view, name="GetTotalSpent"),
]