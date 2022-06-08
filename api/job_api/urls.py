from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('employee', views.EmployeeView, basename='employee')
router.register('user-company', views.UserCompanyView, basename='user-company')
router.register('job/search', views.JobSearchView, basename='search')
router.register('job', views.JobView, basename='job')
router.register('job-employer', views.JobEmployerView, basename='job-employer')
router.register('resume', views.ResumeView, basename='resume')
router.register('education', views.EducationView, basename='education')
router.register('work-experience', views.WorkExperienceView, basename='work-experience')
router.register('links', views.LinksView, basename='links')
router.register('skills', views.SkillsView, basename='skills')
router.register('apply', views.ApplyView, basename='apply')

urlpatterns = [
    path('user/', views.UserView.as_view()),
    path('register/', views.RegisterView.as_view()),
    path('language/', views.LanguageView.as_view()),
    path('city/<pk>/', views.CityView.as_view()),
]

urlpatterns += router.urls
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
