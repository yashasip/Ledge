from django.urls import path

from Budget.api.views import (
    add_new_budget,
)

app_name = 'Budget'

urlpatterns = [
    path('new_budget', add_new_budget, name="CreateNewBudget"),
]
