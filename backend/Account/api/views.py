from django.db import connection
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

from Account.api.serializers import AccountSerializer
from Mappings.models import AccountUserCurrencyMapping
from Account.models import Account
from currency.models import Currency
# from backend.User.api import serializers 

@api_view(['POST', ])
@permission_classes((IsAuthenticated,))
def add_new_account(request):
    #checks

    data = {}
    user = request.user # gets user id
    if len(request.data['account_name']) < 3:
        data['message'] = 'Could not add Account, Account Name should contain atleast 3 characters'
        data['status'] = 'failure'
        return Response(data)
    elif int(request.data['balance']) < 0:
        data["message"] = 'Account Balance should be greater than 0'
        data["status"] = "failure"
        return Response(data)
    elif request.data['account_name'] in get_user_account_names(user.id):
        data["message"] = 'Account already exists, Choose a different name'
        data["status"] = "failure"
        return Response(data)


    get_user_account_names(user.id)
    serializer = AccountSerializer(data=request.data)

    if serializer.is_valid():
        new_account = serializer.save()
        currency_id = get_currency_id(request.data['currency_code'])
        currency = Currency.objects.get(currency_id=currency_id)
        account_user_map = AccountUserCurrencyMapping(account_id= new_account, user_id=user, currency_id=currency)
        # check if account name unique for user
        account_user_map.save()
        data['message'] = 'Account Added'
        data['status'] = 'success'
    else:
        data['message'] = 'Could not add Account'
        data['status'] = 'failure'

    return Response(data)

@api_view(['GET', ])
@permission_classes((IsAuthenticated,))
def get_all_user_accounts(request):
    data = {}
    user = request.user
    
    accounts = get_user_accounts_data(user.id)
    data["account_count"] = len(accounts)
    data["accounts"] = accounts
    data["status"] = "success"
    return Response(data)


def get_user_accounts_data(user_id):
    with connection.cursor() as cursor:
        cursor.execute(
            f'''SELECT A."AccountName",A."Type",A."Balance", C."Symbol", C."Code"
            FROM "Mappings_accountusercurrencymapping" M, "Account_account" A, "currency_currency" C
            WHERE M."UserID" = {user_id} AND 
            M."AccountID"=A."AccountID" AND
            M."CurrencyID"= C."CurrencyID"
            ORDER BY A."AccountID";'''
        )
        accounts = cursor.fetchall()
        cursor.close()

    accounts_data = []
    for account in accounts: # pack data to dictionary
        account_data = {}
        account_data['account_name'] = account[0]
        account_data['account_type'] = account[1]
        account_data['balance'] = account[2]
        account_data['currency_symbol'] = account[3]
        account_data['currency_code'] = account[4]
        accounts_data.append(account_data)

    return accounts_data

def get_user_account_names(user_id):
    with connection.cursor() as cursor:
        cursor.execute(
            f'''SELECT A."AccountName"
            FROM "Mappings_accountusercurrencymapping" MAUC, "Account_account" A
            WHERE MAUC."UserID" = {user_id};'''
        )
        accounts = cursor.fetchall()
        cursor.close()

    account_names = [item[0] for item in accounts] # convert list of tuples to 1D list
    return account_names;


def get_currency_data(account_id):
    with connection.cursor() as cursor:
        cursor.execute(
                f'''SELECT C."Symbol", C."Code"
                FROM "Mappings_accountusercurrencymapping" M, "currency_currency" C
                WHERE M."AccountID" = {account_id} AND 
                M."CurrencyID"= C."CurrencyID";'''
        )
        currency = cursor.fetchone()
        cursor.close()
        
    return currency;

def get_currency_id(currency_code):
    with connection.cursor() as cursor:
        cursor.execute(
            f'''SELECT C."CurrencyID", C."Symbol"
            FROM "currency_currency" C
            WHERE C."Code" = '{currency_code}';'''
        )
        currency_id = cursor.fetchone()
        cursor.close()

    if currency_id:
        return currency_id[0];
    return currency_id;

    
