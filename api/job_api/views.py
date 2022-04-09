from rest_framework import generics, viewsets, permissions, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db import transaction, IntegrityError
from django.db.models.functions import Concat
from django.db.models import Value, CharField
from .permissions import IsUnauthenticated
from . import models
from . import serializers


class UserView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = serializers.UserSerializer

    def get(self, request, *args, **kwargs):
        user = models.User.objects.get(pk=request.user.id)
        serializer = self.get_serializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class RegisterView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny, ]
    serializer_class = serializers.RegisterSerializer


class EmployerView(viewsets.ModelViewSet):
    queryset = models.Employer.objects.all()
    serializer_class = serializers.EmployerSerializer
    permission_classes = [permissions.IsAuthenticated]

    def retrieve(self, request, pk=None, *args, **kwargs):
        user = self.queryset.filter(user=request.user.id).exists()
        data = {'exists': user}
        return Response(data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        company_serializer = serializers.CompanySerializer(data=request.data)
        company_serializer.is_valid(raise_exception=True)
        employer_serializer = serializers.EmployerSerializer(data={'user': request.user.id})
        employer_serializer.is_valid(raise_exception=True)
        try:
            with transaction.atomic():
                company = company_serializer.save()
                employer = employer_serializer.save()
                employer_company_serializer = serializers.EmployerCompanySerializer(
                    data={'employer': employer.id, 'company': company.id, 'is_admin': True})
                employer_company_serializer.is_valid(raise_exception=True)
                employer_company_serializer.save()
                return Response(status=status.HTTP_201_CREATED)
        except IntegrityError:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class EmployeeView(viewsets.ModelViewSet):
    queryset = models.Employee.objects.all()
    serializer_class = serializers.EmployeeSerializer
    permission_classes = [permissions.AllowAny, ]

    def retrieve(self, request, pk=None, *args, **kwargs):
        data = get_object_or_404(self.queryset, user=pk)
        serializer = self.get_serializer(data)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def list(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def partial_update(self, request, *args, **kwargs):
        code_instance = get_object_or_404(self.queryset, user=request.user.id)
        serializer = self.get_serializer(code_instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def destroy(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class LanguageView(generics.ListAPIView):
    queryset = models.Language.objects.all()
    serializer_class = serializers.LanguageSerializer
    permission_classes = [permissions.AllowAny, ]


class CityView(generics.RetrieveAPIView):
    queryset = models.City.objects.select_related('county')
    serializer_class = serializers.CitySerializer
    permission_classes = [permissions.AllowAny, ]

    def retrieve(self, request, pk=None, *args, **kwargs):
        data = self.queryset.filter(city__icontains=pk).all()
        serializer = self.get_serializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class EmployerCompanyView(viewsets.ModelViewSet):
    queryset = models.EmployerCompany.objects.select_related('employer')
    serializer_class = serializers.EmployerCompanySerializer
    permission_classes = [permissions.AllowAny, ]

    def list(self, request, *args, **kwargs):
        data = self.queryset.filter(employer_id__user=request.user.id).all()
        serializer = self.get_serializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class JobView(viewsets.ModelViewSet):
    queryset = models.Job.objects.all()
    serializer_class = serializers.JobSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None, *args, **kwargs):
        pass

    def list(self, request, *args, **kwargs):
        pass
