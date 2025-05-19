from django.contrib import admin
from django.utils.html import format_html
from django.utils import timezone
from .models import Comentario

class ComentarioAdmin(admin.ModelAdmin):
    list_display = ('usuario', 'contenido_preview', 'fecha_creacion_formateada', 'activo', 'acciones')
    list_filter = ('activo', 'fecha_creacion')
    search_fields = ('usuario__username', 'contenido')
    list_per_page = 20
    date_hierarchy = 'fecha_creacion'
    actions = ['marcar_activo', 'marcar_inactivo']
    readonly_fields = ('fecha_creacion', 'usuario')
    
    def contenido_preview(self, obj):
        return obj.contenido[:50] + '...' if len(obj.contenido) > 50 else obj.contenido
    contenido_preview.short_description = 'Contenido'
    
    def fecha_creacion_formateada(self, obj):
        return timezone.localtime(obj.fecha_creacion).strftime('%d/%m/%Y %H:%M')
    fecha_creacion_formateada.short_description = 'Fecha de creación'
    fecha_creacion_formateada.admin_order_field = 'fecha_creacion'
    
    def acciones(self, obj):
        return format_html(
            '<div class="button-group">' +
            '<a href="/admin/comentarios/comentario/{}/change/" class="button">Editar</a> ' +
            '<a href="/admin/comentarios/comentario/{}/delete/" class="button">Eliminar</a>' +
            '</div>',
            obj.id, obj.id
        )
    acciones.short_description = 'Acciones'
    acciones.allow_tags = True
    
    def marcar_activo(self, request, queryset):
        updated = queryset.update(activo=True)
        self.message_user(request, f"{updated} comentarios marcados como activos.")
    marcar_activo.short_description = "Marcar como activo"
    
    def marcar_inactivo(self, request, queryset):
        updated = queryset.update(activo=False)
        self.message_user(request, f"{updated} comentarios marcados como inactivos.")
    marcar_inactivo.short_description = "Marcar como inactivo"

admin.site.register(Comentario, ComentarioAdmin)

# Personalización del título del sitio de administración
admin.site.site_header = 'Administración de Comentarios'
admin.site.site_title = 'Panel de Control'
admin.site.index_title = 'Bienvenido al Panel de Administración'
