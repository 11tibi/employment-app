from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils.translation import gettext_lazy as _


class UserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        user = self.model(
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None):
        if not email:
            raise ValueError('Admin must have an email address')
        user = self.model(
            email=self.normalize_email(email),
        )
        user.is_admin = True
        user.set_password(password)
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    first_name = models.CharField(max_length=20, null=False, blank=False)
    last_name = models.CharField(max_length=30, null=False, blank=False)
    profile_image = models.ImageField(upload_to='./profile_picture', blank=True, null=True, default=None)
    is_admin = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['password']

    def __str__(self):
        return f'{self.email}'

    @property
    def is_staff(self):
        return self.is_admin


class Employee(models.Model):
    user = models.OneToOneField(User, unique=True, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=15, blank=False, null=False)
    city = models.CharField(max_length=15, blank=False, null=False)
    video_cv = models.FileField(upload_to='./video_cv', default=None, null=True)
    description = models.TextField(default=None, null=True)
    public = models.BooleanField(default=True, blank=False, null=False)

    def __str__(self):
        return f'{self.description}'


class Links(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.RESTRICT)
    link = models.URLField(default=None, null=True)


class WorkExperience(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    company_name = models.CharField(max_length=50, blank=False, null=False)
    location = models.CharField(max_length=50, blank=False, null=False)
    period_start = models.DateField(blank=False, null=False)
    period_end = models.DateField(blank=False, null=False)

    def __str__(self):
        return f'{self.company_name}'


class Education(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    institution_name = models.CharField(max_length=50, blank=False, null=False)
    location = models.CharField(max_length=50, blank=False, null=False)
    period_start = models.DateField(blank=False, null=False)
    period_end = models.DateField(blank=False, null=False)

    def __str__(self):
        return f'{self.institution_name}'


class Language(models.Model):
    language = models.CharField(max_length=50, blank=False, null=False, unique=True)

    def __str__(self):
        return f'{self.language}'


class SpokenLanguages(models.Model):
    class Level(models.TextChoices):
        BEGINNER = 'BEGINNER', _('Incepator')
        INTERMEDIATE = 'INTERMEDIATE', _('Mediu')
        ADVANCED = 'ADVANCED', _('Avansat')

    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    level = models.CharField(choices=Level.choices, max_length=12, blank=False, null=False)

    def __str__(self):
        return f'{self.level}'


class Skills(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    skill = models.CharField(max_length=50, blank=False, null=False)
    period = models.IntegerField(blank=False, null=False)

    def __str__(self):
        return f'{self.skill}'


class Company(models.Model):
    name = models.CharField(max_length=20, blank=False, null=False)
    profile_picture = models.ImageField(upload_to='./company_img', blank=True, null=True)
    video = models.FileField(upload_to='./company_video', blank=True, null=True)
    phone_number = models.CharField(max_length=15)
    email = models.EmailField(blank=False, null=False)
    website = models.URLField(null=True, default=None)

    def __str__(self):
        return f'{self.name}'


class Employer(models.Model):
    user = models.OneToOneField(User, unique=True, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user}'


class EmployerCompany(models.Model):
    employer = models.ForeignKey(Employer, on_delete=models.CASCADE)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    is_admin = models.BooleanField(blank=False, null=False)

    def __str__(self):
        return f'{self.is_admin}'


class County(models.Model):
    county = models.CharField(max_length=50, unique=True, null=False)

    def __str__(self):
        return self.county


class City(models.Model):
    county = models.ForeignKey(County, on_delete=models.RESTRICT, null=False)
    city = models.CharField(max_length=50)

    def __str__(self):
        return self.city


class Job(models.Model):
    class JobType(models.TextChoices):
        FULL_TIME = 'FULL_TIME', _('Full Time')
        PART_TIME = 'PART_TIME', _('Part Time')
        INTERNSHIP = 'INTERNSHIP', _('Internship/ Voluntariat')
        PROJECT = 'PROJECT', _('Proiect/ Sezonier')

    class SalaryInterval(models.TextChoices):
        HOUR = 'HOUR', _('ora')
        MONTH = 'MONTH', _('luna')
        YEAR = 'YEAR', _('an')

    company = models.ForeignKey(Company, on_delete=models.RESTRICT)
    title = models.ForeignKey(City, on_delete=models.RESTRICT)
    location = models.CharField(max_length=20, blank=False, null=False)
    job_type = models.CharField(choices=JobType.choices, max_length=10, null=False, blank=False)
    salary_max = models.IntegerField(null=False, blank=False)
    salary_min = models.IntegerField(null=False, blank=False)
    salary_interval = models.CharField(choices=SalaryInterval.choices, max_length=5, null=False, blank=False)
    description = models.TextField(null=False, blank=False)
    expires_at = models.DateTimeField(blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True, blank=False, null=False)
    updated_at = models.DateTimeField(auto_now=True, blank=False, null=False)

    def __str__(self):
        return f'{self.title}'


class JobMedia(models.Model):
    job = models.ForeignKey(Job, on_delete=models.RESTRICT)
    path = models.FileField(upload_to='./job/media', null=False, blank=False)

    def __str__(self):
        return f'{self.path}'


class Candidate(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    letter_of_intent = models.TextField(default=None)
    letter_of_intent_path = models.FileField(upload_to='./candidate/letter/', default=None)
    created_at = models.DateTimeField(auto_now_add=True, blank=False, null=False)

    def __str__(self):
        return f'{self.employee} {self.job}'
