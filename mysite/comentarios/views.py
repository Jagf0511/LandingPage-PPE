from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.utils import timezone
from .models import Comentario
from .forms import ComentarioForm

def listar_comentarios(request):
    """Vista para listar todos los comentarios activos"""
    comentarios = Comentario.objects.filter(activo=True).order_by('-fecha_creacion')
    return comentarios

@login_required
def agregar_comentario(request):
    """Vista para agregar un nuevo comentario"""
    if request.method == 'POST':
        form = ComentarioForm(request.POST)
        if form.is_valid():
            comentario = form.save(commit=False)
            comentario.usuario = request.user
            comentario.save()
            messages.success(request, '¡Tu comentario ha sido publicado exitosamente!')
            return redirect('index')  # Asegúrate de que 'index' sea el nombre de la URL de tu página principal
    else:
        form = ComentarioForm()
    
    return render(request, 'comentarios/agregar_comentario.html', {'form': form})

@login_required
def eliminar_comentario(request, comentario_id):
    """Vista para eliminar un comentario (solo el autor o un administrador puede eliminarlo)"""
    comentario = get_object_or_404(Comentario, id=comentario_id)
    
    # Verificar que el usuario sea el autor del comentario o un superusuario
    if request.user == comentario.usuario or request.user.is_superuser:
        comentario.activo = False
        comentario.save()
        messages.success(request, 'El comentario ha sido eliminado.')
    else:
        messages.error(request, 'No tienes permiso para realizar esta acción.')
    
    return redirect('index')  # Redirigir a la página principal después de eliminar
