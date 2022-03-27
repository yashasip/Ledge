from rest_framework import serializers
from Budget.models import Budget

class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = ['budget_name',  'budget_label', 'start_date', 'end_date', 'budget_amount']
