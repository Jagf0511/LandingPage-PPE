from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .models import Elemento 
from .forms import ElementoForm 
from .forms import CustomUserCreationForm
import requests

def index(request):
    return render(request, 'index.html')

def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Tu cuenta ha sido creada exitosamente. Ahora puedes iniciar sesión.')
            return redirect('login')
        else:
            messages.error(request, 'Por favor corrige los errores en el formulario.')
    else:
        form = UserCreationForm()
    return render(request, 'register.html', {'form': form})

@login_required
def dashboard(request):
    elementos = Elemento.objects.all()
    return render(request, 'dashboard.html', {'elementos': elementos})

@login_required
def agregar_elemento(request):
    if request.method == 'POST':
        form = ElementoForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Elemento agregado correctamente.')
            return redirect('dashboard')
    else:
        form = ElementoForm()
        # Prellenar el campo "nombre" si se pasa como parámetro en la URL
        nombre = request.GET.get('nombre', '')
        if nombre:
            form.fields['nombre'].initial = nombre
    return render(request, 'agregar_elemento.html', {'form': form})

@login_required
def editar_elemento(request, elemento_id):
    elemento = get_object_or_404(Elemento, id=elemento_id)
    if request.method == 'GET':
        # Actualizar los datos del elemento con los parámetros de la URL
        elemento.nombre = request.GET.get('nombre', elemento.nombre)
        elemento.descripcion = request.GET.get('descripcion', elemento.descripcion)
        elemento.precio = request.GET.get('precio', elemento.precio)
        elemento.duracion = request.GET.get('duracion', elemento.duracion)
        elemento.ubicacion = request.GET.get('ubicacion', elemento.ubicacion)
        elemento.save()
        messages.success(request, 'Elemento editado correctamente.')
        return redirect('dashboard')

@login_required
def eliminar_elemento(request, elemento_id):
    elemento = get_object_or_404(Elemento, id=elemento_id)
    elemento.delete()
    messages.success(request, 'Elemento eliminado correctamente.')
    return redirect('dashboard')