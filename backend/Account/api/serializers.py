from rest_framework import serializers
from Account.models import Account

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['account_name','account_type','balance']
