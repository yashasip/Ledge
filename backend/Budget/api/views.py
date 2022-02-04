from django.db import connection
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from Budget.api.serializers import BudgetSerializer
from Mappings.models import BudgetAccountMapping
from Account.models import Account


@api_view(
    [
        "POST",
    ]
)
@permission_classes((IsAuthenticated,))
def add_new_budget(request):
    #checks

    data = {}
    user = request.user
    serializer = BudgetSerializer(data=request.data)

    if serializer.is_valid():
        new_budget = serializer.save()
        account_id = get_account_id(user.id, request.data['account_name'])
        account = Account.objects.get(account_id= account_id)
        budget_account_map = BudgetAccountMapping(budget_id = new_budget, account_id =account)
        budget_account_map.save()
        data["message"] = "Budget Added"
        data["status"] = "success"
    else:
        data["status"] = "failure"

    return Response(data)


def get_account_id(user_id, account_name):
    with connection.cursor() as cursor:
        cursor.execute(
                f'''SELECT M."AccountID"
                FROM "Mappings_accountusercurrencymapping" M, "Account_account" A
                WHERE M."UserID" = {user_id} AND 
                M."AccountID"=A."AccountID" AND
                A."AccountName" = '{account_name}';'''
        )
        account_id = cursor.fetchone()
        cursor.close()

    if account_id:
        return account_id[0]
    return account_id