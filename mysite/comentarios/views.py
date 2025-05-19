from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.utils import timezone
from django.http import JsonResponse
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
            
            # Si es una petición AJAX, devolver una respuesta JSON
            if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                return JsonResponse({
                    'success': True,
                    'message': '¡Tu comentario ha sido publicado exitosamente!',
                    'comentario': {
                        'contenido': comentario.contenido,
                        'fecha_creacion': comentario.fecha_creacion.strftime('%d/%m/%Y %H:%M'),
                        'usuario': comentario.usuario.username
                    }
                })
                
            messages.success(request, '¡Tu comentario ha sido publicado exitosamente!')
            return redirect('index')
        else:
            # Si es AJAX y el formulario no es válido, devolver errores
            if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                return JsonResponse({
                    'success': False,
                    'errors': form.errors,
                    'message': 'Por favor, corrige los errores en el formulario.'
                }, status=400)
    else:
        form = ComentarioForm()
    
    # Si no es AJAX, renderizar la plantilla normal
    if not request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return render(request, 'comentarios/agregar_comentario.html', {'form': form})
    
    # Si es AJAX pero no es POST, devolver error
    return JsonResponse({
        'success': False,
        'message': 'Método no permitido.'
    }, status=405)

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
