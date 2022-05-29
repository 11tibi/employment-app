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
    usercompany_set = UserCompanySerializer(read_only=True, many=True)

    class Meta:
        model = models.Job
        fields = '__all__'
        extra_kwargs = {
            'id': {'read_only': True},
            'company': {'read_only': True},
            'created_at': {'read_only': True},
            'updated_at': {'read_only': True},
        }


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Education
        exclude = ['employee']


class SpokenLanguagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SpokenLanguages
        fields = '__all__'


class LinksSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Links
        exclude = ['employee']


class SkillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Skills
        exclude = ['employee']


class WorkExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.WorkExperience
        exclude = ['employee']


class ResumeSerializer(serializers.ModelSerializer):
    education_set = EducationSerializer(read_only=True, many=True)
    spokenlanguages_set = SpokenLanguagesSerializer(read_only=True, many=True)
    links_set = LinksSerializer(read_only=True, many=True)
    skills_set = SkillsSerializer(read_only=True, many=True)
    workexperience_set = WorkExperienceSerializer(read_only=True, many=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = models.Employee
        fields = '__all__'


class JobSearchSerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)
    location = CitySerializer(read_only=True)

    class Meta:
        model = models.Job
        fields = '__all__'
