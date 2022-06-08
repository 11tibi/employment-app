from rest_framework import generics, viewsets, permissions, status, mixins
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db import transaction, IntegrityError
from django.db.models.functions import Concat
from django.db.models import Value, CharField
from .permissions import IsUnauthenticated
from datetime import date, timedelta
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


class UserCompanyView(viewsets.ModelViewSet):
    queryset = models.UserCompany.objects.select_related('company')
    serializer_class = serializers.UserCompanySerializer
    permission_classes = [permissions.IsAuthenticated, ]

    def list(self, request, *args, **kwargs):
        data = self.queryset.filter(user_id=request.user.id).all()
        serializer = self.get_serializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None, *args, **kwargs):
        user = self.queryset.filter(user=request.user.id).exists()
        data = {'exists': user}
        return Response(data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        company_serializer = serializers.CompanySerializer(data=request.data)
        company_serializer.is_valid(raise_exception=True)
        try:
            with transaction.atomic():
                company = company_serializer.save()
                employer_company_serializer = serializers.UserCompanySerializer(
                    data={'user': request.user.id, 'company': company.id, 'is_admin': True})
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

    def destroy(self, request, pk=None, *args, **kwargs):
        self.queryset.get(id=pk).delete()
        return Response(status=status.HTTP_200_OK)

    def partial_update(self, request, *args, **kwargs):
        pass


class JobEmployerView(viewsets.ModelViewSet):
    queryset = models.Job.objects.prefetch_related('company', 'company__usercompany_set')
    serializer_class = serializers.JobUserSerializer
    permission_classes = [permissions.IsAuthenticated, ]

    def list(self, request, *args, **kwargs):
        data = self.queryset.filter(company__usercompany__user=request.user.id).order_by('created_at').all()[:5]
        serializer = self.get_serializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None, *args, **kwargs):
        data = get_object_or_404(self.queryset.filter(company__usercompany__user=request.user.id, id=pk))
        serializer = self.get_serializer(data)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def partial_update(self, request, pk=None, *args, **kwargs):
        queryset = self.queryset.filter(
            company__usercompany__user=request.user.id, id=pk, company__usercompany__is_admin=True)
        instance = get_object_or_404(queryset)
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def create(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


class ResumeView(viewsets.ModelViewSet):
    queryset = models.Employee.objects.prefetch_related(
        'education_set', 'spokenlanguages_set', 'links_set', 'skills_set', 'workexperience_set', 'user')
    serializer_class = serializers.ResumeSerializer
    permission_classes = [permissions.AllowAny, ]

    def retrieve(self, request, pk=None, *args, **kwargs):
        data = get_object_or_404(self.queryset.filter(user=request.user.id))
        serializer = self.get_serializer(data)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def list(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def destroy(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


class DeleteView(mixins.DestroyModelMixin):
    queryset = None

    def destroy(self, request, pk=None, *args, **kwargs):
        obj = get_object_or_404(self.queryset.filter(id=pk, employee__user_id=request.user.id))
        obj.delete()
        return Response(status=status.HTTP_200_OK)


class CreateView(mixins.CreateModelMixin):
    queryset = None
    serializer_class = None

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        employee_id = models.Employee.objects.select_related('user').get(user_id=request.user.id)
        serializer.save(employee=employee_id)
        return Response(status=status.HTTP_201_CREATED)


class EducationView(viewsets.ModelViewSet, DeleteView, CreateView):
    queryset = models.Education.objects.all()
    serializer_class = serializers.EducationSerializer
    permission_classes = [permissions.IsAuthenticated, ]


class WorkExperienceView(viewsets.ModelViewSet, DeleteView, CreateView):
    queryset = models.WorkExperience.objects.all()
    serializer_class = serializers.WorkExperienceSerializer
    permission_classes = [permissions.IsAuthenticated, ]


class LinksView(viewsets.ModelViewSet, DeleteView, CreateView):
    queryset = models.Links.objects.all()
    serializer_class = serializers.LinksSerializer
    permission_classes = [permissions.IsAuthenticated, ]


class SkillsView(viewsets.ModelViewSet, DeleteView, CreateView):
    queryset = models.Skills.objects.all()
    serializer_class = serializers.SkillsSerializer
    permission_classes = [permissions.IsAuthenticated, ]


class JobSearchView(viewsets.ModelViewSet):
    class Pagination(PageNumberPagination):
        page_size = 10
        page_query_param = 'page'

    queryset = models.Job.objects.prefetch_related('company', 'location').all()
    serializer_class = serializers.JobSearchSerializer
    permission_classes = [permissions.AllowAny, ]
    pagination_class = Pagination

    def list(self, request, *args, **kwargs):
        query = self.queryset
        if request.query_params.get('title', False):
            query = query.filter(title__icontains=request.query_params['title'])
        if request.query_params.get('job_type', False):
            query = query.filter(job_type__in=request.query_params['job_type'].split(','))
        if request.query_params.get('location', False):
            query = query.filter(location__city__icontains=request.query_params['location'])
        if request.query_params.get('date', False):
            if request.query_params['date'] == 'asc':
                query = query.order_by('created_at')
            elif request.query_params['date'] == 'desc':
                query = query.order_by('-created_at')
        query = self.paginate_queryset(query)
        serializer = self.get_serializer(query, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None, *args, **kwargs):
        data = get_object_or_404(self.queryset.filter(id=pk))
        serializer = self.get_serializer(data)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ApplyView(viewsets.ModelViewSet):
    queryset = models.Candidate.objects.prefetch_related('employee', 'job').all()
    serializer_class = serializers.ApplySerializer
    permission_classes = [permissions.IsAuthenticated, ]

    def create(self, request, *args, **kwargs):
        job = models.Job.objects.filter(id=request.data['job'], expires_at__gt=date.today())
        employee = models.Employee.objects.get(user=request.user.id)
        if not job.exists() or self.queryset.filter(
                employee=employee.id, job=job[0].id, created_at__gt=date.today() - timedelta(days=14)).exists():
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(employee=employee)
        return Response(status=status.HTTP_201_CREATED)
