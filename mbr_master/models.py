from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import AbstractUser

#Auth user
class User(AbstractUser):
    username = models.CharField(max_length=100, default="username")
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def profile(self):
        profile = Profile.objects.get(user=self)

    class Meta:
        db_table = 'useradmin'


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
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


post_save.connect(create_user_profile, sender=User)
post_save.connect(save_user_profile, sender=User)


# Modelo de áreas
class Area(models.Model):
    nombre = models.CharField(max_length=255)

    def __str__(self):
        return self.nombre

# Modelo de subáreas
class SubArea(models.Model):
    nombre = models.CharField(max_length=255)

    def __str__(self):
        return self.nombre

# Modelo de unidades
class Unidad(models.Model):
    area = models.ForeignKey(Area, on_delete=models.CASCADE)
    subarea = models.ForeignKey(SubArea, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=255)

    def __str__(self):
        return self.nombre

#Modelo de bancos
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

# #Modelos usados en recursos humanos
# class tipo_documento(models.Model):
#     nombre = models.CharField(max_length=100)

#     def __str__(self):
#         return self.nombre
    
# class Empleado(models.Model):
#     nombres = models.CharField(max_length=100)
#     primer_apellido = models.CharField(max_length=100)
#     segundo_apellido = models.CharField(max_length=100)
#     doc_identidad = models.ForeignKey(tipo_documento, on_delete=models.CASCADE) 
#     fecha_nacimiento = models.DateField()
#     fecha_ingreso = models.DateField()
#     fecha_salida = models.DateField()
#     cargo = models.CharField(max_length=100)
#     area = models.ForeignKey(Area, on_delete=models.CASCADE)
#     unidad = models.ForeignKey(Unidad, on_delete=models.CASCADE)
#     estado = models.CharField(max_length=20)

#     def __str__(self):
#         return self.nombre
    
   
#Modelos de almacen
class Familias(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=100, blank=True)
    estado = models.CharField(max_length=20, blank=True)
    def __str__(self):
        return self.nombre
    
class Producto(models.Model):
    familia = models.CharField(max_length=100)
    nombre = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=100)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()
    estado = models.CharField(max_length=20)

    def __str__(self):
        return self.nombre
    
class Tipo(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion=models.CharField(max_length=250)
    def __str__(self):
        return self.nombre

class Persona(models.Model):
    ruc_dni = models.CharField(max_length=20, unique=True)
    nombre_razon_social = models.CharField(max_length=255)
    fecha_inicio = models.DateField()
    rubro_actividad_economica = models.CharField(max_length=255)
    comentarios = models.TextField(blank=True, null=True)
    tipo = models.ForeignKey(Tipo, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre_razon_social


class Direccion(models.Model):
    direccion = models.CharField(max_length=255)
    distrito = models.CharField(max_length=100)
    provincia = models.CharField(max_length=100)
    departamento = models.CharField(max_length=100)
    pais = models.CharField(max_length=100)
    personaId = models.ForeignKey(Persona, on_delete=models.CASCADE, related_name='direcciones')

    def __str__(self):
        return self.direccion

class Contacto(models.Model):
    nombre=models.CharField(max_length=255)
    cargo=models.CharField(max_length=100)
    telefono=models.CharField(max_length=12)
    correo=models.EmailField()
    personaId = models.ForeignKey(Persona, on_delete=models.CASCADE, related_name='contactos')
    def __str__(self):
        return self.nombre

class CuentaBancaria(models.Model):
    entidad = models.CharField(max_length=100)
    numero_de_cuenta = models.CharField(max_length=50)
    cci = models.CharField(max_length=20)
    tipo_de_cuenta = models.CharField(max_length=20)
    moneda = models.CharField(max_length=10)
    personaId = models.ForeignKey(Persona, on_delete=models.CASCADE, related_name='cuentas_bancarias')

    def __str__(self):
        return f"Cuenta bancaria en {self.entidad} - {self.tipo_de_cuenta} - {self.moneda}"

class ImpuestoAsociado(models.Model):
    impuesto = models.CharField(max_length=100)
    valor = models.DecimalField(max_digits=5, decimal_places=2)
    descripcion = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.impuesto
    
class PersonaImpuesto(models.Model):
    personaId = models.ForeignKey(Persona, on_delete=models.CASCADE, related_name='persona_impuestosId')
    impuestoId = models.ForeignKey(ImpuestoAsociado, on_delete=models.CASCADE, related_name='persona_impuestos')
    def __str__(self):
        return f'{self.personaId} - {self.impuestoId}'
    
    
class TipoPago(models.Model):
    tipo=models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)
    def __str__(self):
        return self.tipo

class PersonaTipoPago(models.Model):
    personaId = models.ForeignKey(Persona, on_delete=models.CASCADE, related_name='persona_tipo_pago_Id')
    tipoPagoId = models.ForeignKey(TipoPago, on_delete=models.CASCADE, related_name='persona_tipo_pago')
    def __str__(self):
        return f'{self.personaId} - {self.tipoPagoId}'

# Modelo de Gastos
    
class TipoGasto(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

class TipoComprobante(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

class Gasto(models.Model):
    tipo_gasto = models.ForeignKey(TipoGasto, on_delete=models.CASCADE)
    tipo_comprobante = models.ForeignKey(TipoComprobante, on_delete=models.CASCADE)
    numero_serie = models.CharField(max_length=50)
    concepto = models.CharField(max_length=255)
    fecha_comprobante = models.DateField()
    numero_comprobante = models.CharField(max_length=50)
    ruc_dni = models.CharField(max_length=20)
    nombre_razon_social = models.CharField(max_length=255)
    direccion = models.CharField(max_length=255)
    distrito = models.CharField(max_length=100)
    provincia = models.CharField(max_length=100)
    departamento = models.CharField(max_length=100)
    pais = models.CharField(max_length=100)
    tipo_compra = models.CharField(max_length=100)
    orden_compra = models.CharField(max_length=100)
    fecha_vencimiento = models.DateField()
    moneda = models.CharField(max_length=10)
    comentarios = models.TextField(blank=True, null=True)
    total_comprobante = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.tipo_gasto} - {self.concepto}"
    

