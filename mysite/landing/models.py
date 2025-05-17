from django.db import models

# Create your models here.
class Elemento(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    duracion = models.IntegerField(default=1)  # Duración en días
    ubicacion = models.CharField(max_length=100, default='Sin ubicación')

    def __str__(self):
        return self.nombre
