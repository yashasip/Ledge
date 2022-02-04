from django.urls import path

from User.api.views import (
    register_user_view,
    login_user_view,
    )

app_name = 'User'

urlpatterns = [
    path('signup', register_user_view, name='SignUpUser'),
    path('login/', login_user_view, name='loginUser'),
]
