from django.urls import path
from . import views

app_name = 'comentarios'

urlpatterns = [
    path('agregar/', views.agregar_comentario, name='agregar_comentario'),
    path('eliminar/<int:comentario_id>/', views.eliminar_comentario, name='eliminar_comentario'),
]
