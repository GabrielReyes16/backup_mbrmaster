from django.urls import path, include
from rest_framework import routers
from django.contrib import admin
from .views import *
from . import views
from mbr_master import views
from rest_framework_simplejwt.views import TokenRefreshView

router = routers.DefaultRouter()
router.register(r"bancos", views.bancoView, "bancos")
router.register(r"tipos", views.tipoView, "tipos")
router.register(r"personas", views.personaView, "personas")
router.register(r"direcciones", views.direccionView, "direcciones")
router.register(r"contactos", views.contactoView, "contactos")
router.register(r"cuentasBancarias", views.CuentaBancariaView, "cuentasBancarias")
router.register(r"impuestosAsociados", views.impuestoAsociadoView, "impuestosAsociados")
router.register(r"personaImpuestosAsociados", views.personaImpuestoView, "personaImpuestosAsociados")
router.register(r"tiposPago", views.tipoPagoView, "tiposPago")
router.register(r"personaTiposPago", views.personaTipoPagoView, "personaTiposPago")


urlpatterns = [
    #Autenticación
    path('token', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('test/', views.testEndPoint, name='test'),
    path('', views.getRoutes),


    path('users/', usersView.as_view()),
    path('users/<int:pk>/', usersDetail.as_view()),
    path('users/post/', usersView.as_view()),
    path('users/get/<int:pk>/', usersDetail.as_view()),
    path('users/put/<int:pk>/', usersDetail.as_view()),
    path('users/delete/<int:pk>/', usersDetail.as_view()),

    # Rutas para la API
    path('api/nueva_unidad/', nueva_unidad, name='nueva_unidad_api'),
    path('api/nueva_area/', nueva_area, name='nueva_area_api'),
    path('api/consultar/', consultar, name='consultar_api'),

    #Rutas para el Banco

    path("api/v1/", include(router.urls)),

]





