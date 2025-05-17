from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import User
from landing.models import Elemento

class Command(BaseCommand):
    help = 'Crea grupos de usuarios con permisos específicos'

    def handle(self, *args, **options):
        # Crear grupo de administradores
        admin_group, created = Group.objects.get_or_create(name='Administradores')
        if created:
            self.stdout.write(self.style.SUCCESS('Grupo "Administradores" creado'))
        else:
            self.stdout.write(self.style.WARNING('Grupo "Administradores" ya existe'))
            admin_group.permissions.clear()  # Limpiar permisos existentes

        # Crear grupo de usuarios normales
        user_group, created = Group.objects.get_or_create(name='Usuarios')
        if created:
            self.stdout.write(self.style.SUCCESS('Grupo "Usuarios" creado'))
        else:
            self.stdout.write(self.style.WARNING('Grupo "Usuarios" ya existe'))
            user_group.permissions.clear()  # Limpiar permisos existentes

        # Obtener content types para los modelos necesarios
        elemento_content_type = ContentType.objects.get_for_model(Elemento)
        user_content_type = ContentType.objects.get(app_label='auth', model='user')

        # Asignar permisos CRUD completos a administradores para Tour y Service
        for perm in Permission.objects.filter(content_type=elemento_content_type):
            admin_group.permissions.add(perm)
            self.stdout.write(f'Permiso "{perm.codename}" asignado a Administradores')

        # Asignar permisos para gestionar usuarios a administradores
        admin_perms = Permission.objects.filter(
            content_type=user_content_type, 
            codename__in=['add_user', 'change_user', 'view_user']
        )
        for perm in admin_perms:
            admin_group.permissions.add(perm)
            self.stdout.write(f'Permiso "{perm.codename}" asignado a Administradores')

        # Asignar permisos de solo lectura a usuarios normales
        view_elemento_perm = Permission.objects.get(content_type=elemento_content_type, codename='view_elemento')
        user_group.permissions.add(view_elemento_perm)
        self.stdout.write(f'Permisos de solo lectura asignados a Usuarios')

        self.stdout.write(self.style.SUCCESS('Configuración de grupos y permisos completada'))
