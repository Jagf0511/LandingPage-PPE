"""
URL configuration for mysite project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from landing.admin_custom import CustomAdminSite

# Configuración personalizada del administrador
admin.site.__class__ = CustomAdminSite
admin.site.site_header = 'Administración del Sitio'
admin.site.site_title = 'Panel de Control'
admin.site.index_title = 'Bienvenido al Panel de Administración'

urlpatterns = [
    path('', include('landing.urls')),
    path('admin/', admin.site.urls),
    path('comentarios/', include('comentarios.urls')),
]

# Añadir URLs para servir archivos multimedia durante el desarrollo
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# Configuración para servir archivos estáticos en desarrollo
if not settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
