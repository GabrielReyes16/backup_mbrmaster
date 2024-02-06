from django.http import Http404
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import permissions, status, viewsets, generics
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Unidad, Area, Banco
from .serializer import UnidadSerializer, AreaSerializer, BancoSerializer


#Authentication
from .models import User, Profile
from .serializer import UserSerializer,MyTokenObtainPairSerializer, RegisterSerializer
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
    
@api_view(['POST'])
def nueva_unidad(request):
    if request.method == 'POST':
        serializer = UnidadSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'status': 'success'})
        else:
            return Response({'status': 'error', 'errors': serializer.errors}, status=400)

@api_view(['POST'])
def nueva_area(request):
    if request.method == 'POST':
        serializer = AreaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'status': 'success'})
        else:
            return Response({'status': 'error', 'errors': serializer.errors}, status=400)

@api_view(['GET'])
def consultar(request):
    unidades = Unidad.objects.all()
    areas = Area.objects.all()
    
    unidad_serializer = UnidadSerializer(unidades, many=True)
    area_serializer = AreaSerializer(areas, many=True)

    data = {
        'unidades': unidad_serializer.data,
        'areas': area_serializer.data,
    }
    
    return Response(data)