"""
Este script muestra los elementos y las imágenes disponibles.
"""

import os
import sys
import django

# Configura el entorno de Django
sys.path.append('.')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mysite.settings')
django.setup()

# Importa los modelos después de configurar Django
from landing.models import Elemento
from django.conf import settings

def mostrar_elementos_e_imagenes():
    # Mostrar todos los elementos
    elementos = Elemento.objects.all()
    print(f"Total de elementos: {elementos.count()}")
    
    for elemento in elementos:
        tiene_foto = "Sí" if elemento.foto else "No"
        print(f"ID: {elemento.id}, Nombre: {elemento.nombre}, Tiene foto: {tiene_foto}")
    
    # Mostrar imágenes disponibles
    static_photos_dir = os.path.join(settings.BASE_DIR, 'landing', 'static', 'Imgs', 'photos')
    print("\nImágenes disponibles en la carpeta estática:")
    
    if os.path.exists(static_photos_dir):
        image_files = [f for f in os.listdir(static_photos_dir) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif'))]
        for image in image_files:
            print(f"- {image}")
        print(f"Total de imágenes: {len(image_files)}")
    else:
        print(f"La carpeta {static_photos_dir} no existe")

if __name__ == '__main__':
    mostrar_elementos_e_imagenes()
