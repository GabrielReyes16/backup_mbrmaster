from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import AbstractUser

# Create your models here.
class users(AbstractUser): 
    username = models.CharField(max_length=100, default="username")
    email = models.EmailField(unique=True)


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta:
        db_table = "users"

class Profile(models.Model):
    user = models.OneToOneField(users, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=1000)
    bio = models.CharField(max_length=100)
    image = models.ImageField(upload_to="user_images", default="default.jpg")
    verified = models.BooleanField(default=False)

    class Meta:
        db_table = 'profileadmin'


def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()


post_save.connect(create_user_profile, sender=users)
post_save.connect(save_user_profile, sender=users)

class Unidad(models.Model):
    nombre = models.CharField(max_length=255)

class Area(models.Model):
    unidad = models.ForeignKey(Unidad, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=255)

class Banco(models.Model):
    nombre = models.CharField(max_length=100)
    moneda = models.CharField(max_length=50)
    tipo_cuenta = models.CharField(max_length=50)
    fecha_apertura = models.DateField()
    numero_cuenta = models.CharField(max_length=20)
    cci = models.CharField(max_length=20)
    funcionario = models.CharField(max_length=100)
    agencia_apertura = models.CharField(max_length=100)
    estado = models.CharField(max_length=20)

    def __str__(self):
        return self.nombre
