from rest_framework import serializers
from Transaction.models import Transaction

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['type', 'amount', 'transaction_date', 'transaction_party', 'description']

    