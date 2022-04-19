from rest_framework import serializers
from . import models


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ['id', 'email', 'first_name', 'last_name']


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ['email', 'password', 'first_name', 'last_name']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = super().create(validated_data)
        user.set_password(password)
        user.save()
        return user


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Employee
        exclude = ['user']
        read_only_fields = []


class WorkExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.WorkExperience
        exclude = ['employee']


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Language
        fields = '__all__'


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Company
        fields = '__all__'


class UserCompanySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    company = CompanySerializer(read_only=True)

    class Meta:
        model = models.UserCompany
        fields = '__all__'


class CountySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.County
        fields = '__all__'


class CitySerializer(serializers.ModelSerializer):
    county = CountySerializer(read_only=True)

    class Meta:
        model = models.City
        fields = '__all__'


class JobSerializer(serializers.ModelSerializer):
    # TODO validations
    class Meta:
        model = models.Job
        fields = '__all__'


class JobUserSerializer(serializers.ModelSerializer):
    job_set = JobSerializer(read_only=True, many=True)

    class Meta:
        model = models.Company
        fields = '__all__'
