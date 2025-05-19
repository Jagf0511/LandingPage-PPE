from django.contrib import admin
from django.utils.html import format_html
from django.utils.safestring import mark_safe
from .models import Elemento

@admin.register(Elemento)
class ElementoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'precio', 'duracion', 'precio_formateado', 'duracion_con_unidad', 'ubicacion', 'imagen_preview', 'acciones')
    list_filter = ('ubicacion',)
    search_fields = ('nombre', 'descripcion', 'ubicacion')
    list_per_page = 20
    list_editable = ('precio', 'duracion')
    readonly_fields = ('imagen_preview', 'precio_formateado', 'duracion_con_unidad')
    fieldsets = (
        ('Información Básica', {
            'fields': ('nombre', 'descripcion', 'ubicacion')
        }),
        ('Detalles', {
            'fields': ('precio', 'duracion')
        }),
        ('Imagen', {
            'fields': ('foto', 'imagen_preview')
        }),
    )
    
    def precio_formateado(self, obj):
        return f"${obj.precio:,.2f}"
    precio_formateado.short_description = 'Precio'
    precio_formateado.admin_order_field = 'precio'
    
    def duracion_con_unidad(self, obj):
        return f"{obj.duracion} días"
    duracion_con_unidad.short_description = 'Duración'
    duracion_con_unidad.admin_order_field = 'duracion'
    
    def imagen_preview(self, obj):
        if obj.foto:
            return mark_safe(f'<img src="{obj.foto.url}" style="max-height: 100px;" />')
        return "Sin imagen"
    imagen_preview.short_description = 'Vista previa'
    
    def acciones(self, obj):
        return format_html(
            '<div class="button-group">' +
            '<a href="/admin/landing/elemento/{}/change/" class="button">Editar</a> ' +
            '<a href="/admin/landing/elemento/{}/delete/" class="button">Eliminar</a>' +
            '</div>',
            obj.id, obj.id
        )
    acciones.short_description = 'Acciones'
    acciones.allow_tags = True

# Personalización adicional del sitio de administración
admin.site.site_header = 'Administración del Sitio'
admin.site.site_title = 'Panel de Control'
admin.site.index_title = 'Bienvenido al Panel de Administración'
