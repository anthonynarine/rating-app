from typing import Required
from .models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields =[ "username", "id"]
        

# Serializer for the User model during registration
class UserSignupSerializer(serializers.ModelSerializer):
    # This field is used for confirming password, it won't be stored in the database
    password2 = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'} )

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2']
        
    def validate_password(self, value):
        """
        Check the validity of the password field on its own.
        """
        # Example: Check if password is too short
        if len(value) < 6:
            raise serializers.ValidationError("The password is too short.")
        return value    

    def validate(self, data):
        """
        Ensure that the passwords provided match.
        """
        password = data.get('password')
        password2 = data.pop('password2')
        if password != password2:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        """
        Create a new user instance using the validated data.
        """
        user = User.objects.create_user(**validated_data)
        return user


