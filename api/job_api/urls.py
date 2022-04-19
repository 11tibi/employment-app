from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('employee', views.EmployeeView, basename='employee')
router.register('user-company', views.UserCompanyView, basename='user-company')
router.register('job', views.JobView, basename='job')

urlpatterns = [
    path('user/', views.UserView.as_view()),
    path('register/', views.RegisterView.as_view()),
    path('language/', views.LanguageView.as_view()),
    path('city/<pk>/', views.CityView.as_view()),
    path('job-employer/', views.JobEmployerView.as_view()),
]

urlpatterns += router.urls
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
