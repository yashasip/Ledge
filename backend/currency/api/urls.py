from django.urls import path

from currency.api.views import (
    get_currencies_view,
    )

app_name = 'User'

urlpatterns = [
    path('get_currencies/', get_currencies_view, name='getCurrencies'),
]

 
