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


@api_view(
    [
        "GET",
    ]
)
@permission_classes((IsAuthenticated,))
def get_budget_amount_spent_view(request):
    data = {}
    user = request.user

    if user:
        data['spent'] = get_budget_amount_spent(user.id)
        data["message"] = "Budget Spent Money Received"
        data["status"] = "success"
    else:
        data['status'] ='failure'
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

def get_budget_amount_spent(user_id):
    with connection.cursor() as cursor:
        cursor.execute(
            f'''SELECT B."StartDate", B."EndDate", B."Amount", MBA."AccountID"
            FROM "Mappings_accountusercurrencymapping" MAUC,"Mappings_budgetaccountmapping" MBA, "Budget_budget" B
            WHERE MAUC."UserID" = {user_id} AND MAUC."AccountID" = MBA."AccountID" AND MBA."BudgetID" = B."BudgetID"
            ORDER BY B."BudgetID" DESC;''')
        data = cursor.fetchone()
        cursor.close()

    budget_data = {}
    budget_data['start_date'] = data[0]
    budget_data['end_date'] = data[1]
    budget_data['amount'] = data[2]
    budget_data['account_id'] = data[3]

    with connection.cursor() as cursor:
        cursor.execute(
            f'''SELECT SUM(T."Amount")
            FROM "Mappings_transactioncategoryaccountmapping" MTCA, 
            "Mappings_accountusercurrencymapping" MAUC, 
            "Transaction_transaction" T
            WHERE MTCA."AccountID" = {budget_data['account_id']} AND 
            MTCA."TransactionID" = T."TransactionID" AND
            T."Type" = 'Expense'
            AND T."TransactionDate" >= '{budget_data['start_date']}' AND 
            T."TransactionDate" <='{budget_data['end_date']}';''')
        spent = cursor.fetchone()[0]
        cursor.close()

    return (spent//budget_data['amount']) * 100