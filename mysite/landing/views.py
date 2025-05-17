from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User, Group
from django.db import models
from .models import Elemento 
from .forms import ElementoForm, CustomUserCreationForm
from .decorators import superuser_required, admin_required, normal_user_required
import requests
from django.db import models

def index(request):
    return render(request, 'index.html')

def register(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            # Asignar usuario al grupo de usuarios normales por defecto
            grupo_usuarios = Group.objects.get_or_create(name='Usuarios')[0]
            user.groups.add(grupo_usuarios)
            messages.success(request, 'Tu cuenta ha sido creada exitosamente. Ahora puedes iniciar sesión.')
            return redirect('login')
        else:
            messages.error(request, 'Por favor corrige los errores en el formulario.')
    else:
        form = CustomUserCreationForm()
    return render(request, 'register.html', {'form': form})

@normal_user_required
def dashboard(request):
    elementos = Elemento.objects.all()
    # Determinar qué tipo de usuario es para mostrar opciones correspondientes
    is_admin = request.user.is_superuser or request.user.groups.filter(name='Administradores').exists()
    is_superuser = request.user.is_superuser
    
    context = {
        'elementos': elementos,
        'is_admin': is_admin,
        'is_superuser': is_superuser
    }
    return render(request, 'dashboard.html', context)

@admin_required
def agregar_elemento(request):
    if request.method == 'POST':
        form = ElementoForm(request.POST, request.FILES)
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

@admin_required
def editar_elemento(request, elemento_id):
    elemento = get_object_or_404(Elemento, id=elemento_id)
    if request.method == 'POST':
        form = ElementoForm(request.POST, request.FILES, instance=elemento)
        if form.is_valid():
            form.save()
            messages.success(request, 'Elemento editado correctamente.')
            return redirect('dashboard')
    else:
        form = ElementoForm(instance=elemento)
    return render(request, 'editar_elemento.html', {'form': form, 'elemento': elemento})

@admin_required
def eliminar_elemento(request, elemento_id):
    elemento = get_object_or_404(Elemento, id=elemento_id)
    elemento.delete()
    messages.success(request, 'Elemento eliminado correctamente.')
    return redirect('dashboard')

@admin_required
def user_management(request):
    users = User.objects.filter(is_superuser=False)
    admin_group = Group.objects.get(name='Administradores')
    user_group = Group.objects.get(name='Usuarios')
    
    # Determinar qué tipo de usuario es
    is_admin = request.user.is_superuser or request.user.groups.filter(name='Administradores').exists()
    is_superuser = request.user.is_superuser
    
    context = {
        'users': users,
        'admin_group': admin_group,
        'user_group': user_group,
        'is_admin': is_admin,
        'is_superuser': is_superuser
    }
    return render(request, 'user_management.html', context)

@admin_required
def toggle_admin_rights(request, user_id):
    if request.method == 'POST':
        user = User.objects.get(id=user_id)
        admin_group = Group.objects.get(name='Administradores')
        user_group = Group.objects.get(name='Usuarios')
        
        # Verificar si el usuario ya es administrador
        if admin_group in user.groups.all():
            # Quitar derechos de administrador
            user.groups.remove(admin_group)
            user.groups.add(user_group)
            messages.success(request, f'El usuario {user.username} ahora es un usuario normal.')
        else:
            # Otorgar derechos de administrador
            user.groups.add(admin_group)
            user.groups.remove(user_group)
            messages.success(request, f'El usuario {user.username} ahora es administrador.')
        
        return redirect('user_management')
    
    return redirect('dashboard')

@normal_user_required
def buscar_elementos(request):
    """Vista para búsqueda de elementos (accesible para todos los usuarios)"""
    query = request.GET.get('q', '')
    elementos = Elemento.objects.all()
    
    if query:
        elementos = elementos.filter(
            models.Q(nombre__icontains=query) | 
            models.Q(descripcion__icontains=query) |
            models.Q(ubicacion__icontains=query)
        )
    
    # Determinar qué tipo de usuario es para mostrar opciones correspondientes
    is_admin = request.user.is_superuser or request.user.groups.filter(name='Administradores').exists()
    is_superuser = request.user.is_superuser
    
    context = {
        'elementos': elementos,
        'is_admin': is_admin,
        'is_superuser': is_superuser,
        'query': query
    }
    return render(request, 'dashboard.html', context)

def custom_permission_denied_view(request, exception):
    return render(request, '403.html', {'exception': exception}, status=403)