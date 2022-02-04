from django.db import connection
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

# Create your views here.
@api_view(['GET',])
@permission_classes((IsAuthenticated,))
def get_currencies_view(request):
    data = {}
    user = request.user

    if user:
        currencies = get_all_currencies()
        data['currency_count'] = len(currencies)
        data['currencies'] = currencies
        data['status'] = 'success'
    else:
        data['status'] = 'Access Denied'
    return Response(data)

def get_all_currencies():
    with connection.cursor() as cursor:
        cursor.execute(
            f'''SELECT "Symbol","Code" FROM "currency_currency";'''
        )
        currencies = cursor.fetchall()
        cursor.close()

    currencies_data = []
    for currency in currencies: # pack data to dictionary
        currency_data = {}
        currency_data['currency_symbol'] = currency[0]
        currency_data['currency_code'] = currency[1]
        currencies_data.append(currency_data)

    return currencies_data