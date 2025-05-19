from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User, Group
from django.db import models
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import Elemento 
from .forms import ElementoForm, CustomUserCreationForm
from .decorators import superuser_required, admin_required, normal_user_required
import requests

def index(request):
    from comentarios.models import Comentario
    comentarios = Comentario.objects.filter(activo=True).order_by('-fecha_creacion')
    context = {
        'comentarios': comentarios,
        'user': request.user  # Asegurarse de que el usuario esté en el contexto
    }
    return render(request, 'index.html', context)

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
    # Obtener el número de elementos por página (por defecto 10)
    elementos_por_pagina = int(request.GET.get('per_page', 10))
    
    # Obtener todos los elementos ordenados por ID
    elementos_lista = Elemento.objects.all().order_by('id')
    
    # Crear el objeto paginador
    paginator = Paginator(elementos_lista, elementos_por_pagina)
    
    # Obtener el número de página de la URL
    page = request.GET.get('page')
    
    try:
        elementos = paginator.page(page)
    except PageNotAnInteger:
        # Si la página no es un entero, mostrar la primera página
        elementos = paginator.page(1)
    except EmptyPage:
        # Si la página está fuera de rango, mostrar la última página
        elementos = paginator.page(paginator.num_pages)
    
    # Determinar qué tipo de usuario es para mostrar opciones correspondientes
    is_admin = request.user.is_superuser or request.user.groups.filter(name='Administradores').exists()
    is_superuser = request.user.is_superuser
    
    # Opciones de elementos por página
    opciones_por_pagina = [10, 25, 50, 100]
    
    context = {
        'elementos': elementos,
        'is_admin': is_admin,
        'is_superuser': is_superuser,
        'opciones_por_pagina': opciones_por_pagina,
        'elementos_por_pagina': elementos_por_pagina
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
    # Obtener el número de elementos por página (por defecto 10)
    elementos_por_pagina = int(request.GET.get('per_page', 10))
    
    # Obtener los elementos filtrados por la búsqueda
    elementos_lista = Elemento.objects.all()
    
    if query:
        elementos_lista = elementos_lista.filter(
            models.Q(nombre__icontains=query) | 
            models.Q(descripcion__icontains=query) |
            models.Q(ubicacion__icontains=query)
        )
    
    # Ordenar los elementos por ID
    elementos_lista = elementos_lista.order_by('id')
    
    # Crear el objeto paginador
    paginator = Paginator(elementos_lista, elementos_por_pagina)
    
    # Obtener el número de página de la URL
    page = request.GET.get('page')
    
    try:
        elementos = paginator.page(page)
    except PageNotAnInteger:
        # Si la página no es un entero, mostrar la primera página
        elementos = paginator.page(1)
    except EmptyPage:
        # Si la página está fuera de rango, mostrar la última página
        elementos = paginator.page(paginator.num_pages)
    
    # Determinar qué tipo de usuario es para mostrar opciones correspondientes
    is_admin = request.user.is_superuser or request.user.groups.filter(name='Administradores').exists()
    is_superuser = request.user.is_superuser
    
    # Opciones de elementos por página
    opciones_por_pagina = [10, 25, 50, 100]
    
    context = {
        'elementos': elementos,
        'is_admin': is_admin,
        'is_superuser': is_superuser,
        'query': query,
        'opciones_por_pagina': opciones_por_pagina,
        'elementos_por_pagina': elementos_por_pagina
    }
    return render(request, 'dashboard.html', context)

def custom_permission_denied_view(request, exception):
    return render(request, '403.html', {'exception': exception}, status=403)