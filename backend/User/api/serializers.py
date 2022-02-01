from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'password']

    def	save(self):
        user = User(
					username=self.validated_data['username'],
					email=self.validated_data['email'],
					first_name=self.validated_data['first_name'],
					last_name=self.validated_data['last_name'],
				)
        password = self.validated_data['password']
        user.set_password(password)
        user.save()
        return user