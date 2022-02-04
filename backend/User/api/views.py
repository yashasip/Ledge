from django.db import connection
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User
from django.contrib.auth import login,authenticate, logout

from User.api.serializers import UserSerializer

# add api views
@api_view(['POST', ])
@permission_classes(())
def register_user_view(request):
    #run checks and validation
    # ..

    data = {}
    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():
        new_user = serializer.save()
        data['username'] = new_user.username
        data['email'] = new_user.email
        data['first name'] = new_user.first_name
        data['last name'] = new_user.last_name
        data['password'] = new_user.password
        token = Token.objects.get(user=new_user).key
        data['token'] = token
        data['status'] = 'success'
    else:
        data['response'] = 'failed'
    return Response(data)

@api_view(['POST',])
@permission_classes(())
def login_user_view(request):
    data = {}
    user = authenticate(username=request.data['username'], password=request.data['password'])
    if user:
        login(request, user)
        token = Token.objects.get(user=user).key
        data['token'] = token
        data['status'] = 'success'
    else:
        data['status'] = 'failure'
    return Response(data)
      
