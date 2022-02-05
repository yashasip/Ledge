from django.db import connection
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from Transaction.api.serializers import TransactionSerializer
from Account.models import Account
from Category.models import Category
from Mappings.models import TransactionCategoryAccountMapping


@api_view(
    [
        "POST",
    ]
)
@permission_classes((IsAuthenticated,))
def add_new_transaction(request):
    # checks 

    data = {}
    user = request.user  # gets user id
    serializer = TransactionSerializer(data=request.data)

    if serializer.is_valid():
        new_transaction = serializer.save()
        account_id = get_account_id(user.id, request.data['account_name'])
        category_id = get_category_id(user.id, request.data['category_name'])
        account = Account.objects.get(account_id = account_id)
        category = Category.objects.get(category_id=category_id)
        account_user_map = TransactionCategoryAccountMapping(transaction_id = new_transaction, category_id = category ,account_id=account )
        balance_user_account(new_transaction.type, account_id, new_transaction.amount)
        account_user_map.save()
        data["message"] = 'Transaction added'
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
def get_all_user_transactions(request):
    data = {}
    user = request.user  # gets user id
    
    transactions = get_all_transactions_data(user.id)
    data["transaction_count"] = len(transactions)
    data["transactions"] = transactions
    data["status"] = "success"
    return Response(data)

def balance_user_account(transaction_type, account_id, amount):
    with connection.cursor() as cursor:
        if transaction_type == 'Income':
            cursor.execute(
            f'''CALL spaccountincome({account_id},{amount});''')
        elif transaction_type == 'Expense':
            cursor.execute(
            f'''CALL spaccountexpense({account_id},{amount});''')
        cursor.close()



def get_all_transactions_data(user_id):
    with connection.cursor() as cursor:
        cursor.execute(
            f'''SELECT T."Amount", T."Type", T."TransactionDate", T."Description", T."TransactionParty",
            CAT."CategoryName", A."AccountName", CUR."Symbol"
            FROM "Mappings_transactioncategoryaccountmapping" MTCA, 
            "Mappings_accountusercurrencymapping" MAUC, 
            "Account_account" A,
            "Transaction_transaction" T,
            "Category_category" CAT,
            "currency_currency" CUR
            WHERE MAUC."UserID" = {user_id} AND 
            MAUC."AccountID" = MTCA."AccountID" AND 
            A."AccountID" = MTCA."AccountID" AND
            MTCA."TransactionID" = T."TransactionID" AND
            MTCA."CategoryID" = CAT."CategoryID" AND
            MAUC."CurrencyID" = CUR."CurrencyID"
            ORDER BY T."TransactionID" DESC;'''
        )
        transactions = cursor.fetchall()
        cursor.close()

    transactions_data = []
    for transaction in transactions: # pack data to dictionary
        transaction_data = {}
        transaction_data['amount'] = transaction[0]
        transaction_data['type'] = transaction[1]
        transaction_data['transaction_date'] = transaction[2]
        transaction_data['description'] = transaction[3]
        transaction_data['transaction_party'] = transaction[4]
        transaction_data['category_name'] = transaction[5]
        transaction_data['account_name'] = transaction[6]
        transaction_data['currency_symbol'] = transaction[7]
        transactions_data.append(transaction_data)

    return transactions_data
    

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

def get_category_id(user_id, category_name):
    with connection.cursor() as cursor:
        cursor.execute(
                f'''SELECT M."CategoryID", C."CategoryName"
                FROM "Mappings_categoryusermapping" M, "Category_category" C
                WHERE M."UserID" = {user_id} AND 
                M."CategoryID"=C."CategoryID" AND 
                C."CategoryName" = '{category_name}';'''
        )
        category_id = cursor.fetchone()
        cursor.close()

    if category_id:
        return category_id[0]
    return category_id
