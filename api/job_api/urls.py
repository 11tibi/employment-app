from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('employee', views.EmployeeView, basename='employee')
router.register('employer', views.EmployerView, basename='employer')

urlpatterns = [
    path('user/', views.UserView.as_view()),
    path('register/', views.RegisterView.as_view()),
    path('language/', views.LanguageView.as_view()),
    path('city/<pk>/', views.CityView.as_view()),
]

urlpatterns += router.urls
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
