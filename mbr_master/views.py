from django.http import Http404
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import permissions, status, viewsets, generics
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Unidad, Area, SubArea, Banco
from .serializer import UnidadSerializer, AreaSerializer, SubAreaSerializer, BancoSerializer


#Authentication
from .models import *
from .serializer import *
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny, IsAuthenticated


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


# Get All Routes

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/tampus_admin/token/',
        '/tampus_admin/register/',
        '/tampus_admin/token/refresh/'
    ]
    return Response(routes)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = f"Congratulation {request.user}, your API just responded to GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = "Hello buddy"
        data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)


#App views

class bancoView(viewsets.ModelViewSet):
    serializer_class=BancoSerializer
    queryset=Banco.objects.all()

class tipoView(viewsets.ModelViewSet):
    serializer_class=TipoSerializer
    queryset=Tipo.objects.all()

class personaView(viewsets.ModelViewSet):
    serializer_class=PersonaSerializer
    queryset=Persona.objects.all()

class direccionView(viewsets.ModelViewSet):
    serializer_class=DireccionSerializer
    queryset=Direccion.objects.all()

class contactoView(viewsets.ModelViewSet):
    serializer_class=ContactoSerializer
    queryset=Contacto.objects.all()

class CuentaBancariaView(viewsets.ModelViewSet):
    serializer_class=CuentaBancariaSerializer
    queryset=CuentaBancaria.objects.all()

class impuestoAsociadoView(viewsets.ModelViewSet):
    serializer_class=ImpuestoAsociadoSerializer
    queryset=ImpuestoAsociado.objects.all()

class personaImpuestoView(viewsets.ModelViewSet):
    serializer_class=PersonaImpuestoSerializer
    queryset=PersonaImpuesto.objects.all()

class tipoPagoView(viewsets.ModelViewSet):
    serializer_class=TipoPagoSerializer
    queryset=TipoPago.objects.all()

class personaTipoPagoView(viewsets.ModelViewSet):
    serializer_class=PersonaTipoPagoSerializer
    queryset=PersonaTipoPago.objects.all()


class usersView(APIView):
    def get(self, request):
        Users = User.objects.all()
        serializer = UserSerializer(Users, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("error", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class usersDetail(APIView):
    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        Users = self.get_object(pk)
        serializer = UserSerializer(Users)
        return Response(serializer.data)

    def put(self, request, pk):
        Users = self.get_object(pk)
        serializer = UserSerializer(Users, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            print("error", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        Users = self.get_object(pk)
        Users.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
@api_view(['POST', 'GET'])
def area_list(request):
    if request.method == 'POST':
        serializer = AreaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    elif request.method == 'GET':
        areas = Area.objects.all()
        serializer = AreaSerializer(areas, many=True)
        return Response(serializer.data)

@api_view(['GET', 'PUT', 'DELETE'])
def area_detail(request, pk):
    try:
        area = Area.objects.get(pk=pk)
    except Area.DoesNotExist:
        return Response(status=404)

    if request.method == 'GET':
        serializer = AreaSerializer(area)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = AreaSerializer(area, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    elif request.method == 'DELETE':
        area.delete()
        return Response(status=204)

@api_view(['POST', 'GET'])
def subarea_list(request):
    if request.method == 'POST':
        serializer = SubAreaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    elif request.method == 'GET':
        subareas = SubArea.objects.all()
        serializer = SubAreaSerializer(subareas, many=True)
        return Response(serializer.data)

@api_view(['GET', 'PUT', 'DELETE'])
def subarea_detail(request, pk):
    try:
        subarea = SubArea.objects.get(pk=pk)
    except SubArea.DoesNotExist:
        return Response(status=404)

    if request.method == 'GET':
        serializer = SubAreaSerializer(subarea)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = SubAreaSerializer(subarea, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    elif request.method == 'DELETE':
        subarea.delete()
        return Response(status=204)

@api_view(['POST', 'GET'])
def unidad_list(request):
    if request.method == 'POST':
        serializer = UnidadSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    elif request.method == 'GET':
        unidades = Unidad.objects.all()
        serializer = UnidadSerializer(unidades, many=True)
        return Response(serializer.data)

@api_view(['GET', 'PUT', 'DELETE'])
def unidad_detail(request, pk):
    try:
        unidad = Unidad.objects.get(pk=pk)
    except Unidad.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UnidadSerializer(unidad)
        return Response(serializer.data)

    elif request.method == 'PUT':
        print("Datos recibidos para la edición:", request.data)  
        serializer = UnidadSerializer(unidad, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        unidad.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
@api_view(['GET'])
def consultar(request): 
    if request.method == 'GET':
        areas = Area.objects.all()
        subareas = SubArea.objects.all()
        unidades = Unidad.objects.all()
        
        area_serializer = AreaSerializer(areas, many=True)
        subarea_serializer = SubAreaSerializer(subareas, many=True)
        unidad_serializer = UnidadSerializer(unidades, many=True)

        data = {
            'areas': area_serializer.data,
            'subareas': subarea_serializer.data,
            'unidades': unidad_serializer.data,
        }
        
        return Response(data)
