from django.contrib.auth.decorators import user_passes_test
from django.core.exceptions import PermissionDenied
from django.shortcuts import redirect

def superuser_required(view_func):
    """Decorador que verifica si el usuario es superusuario"""
    def check_superuser(user):
        if user.is_superuser:
            return True
        raise PermissionDenied("Necesitas ser superusuario para acceder a esta página.")
    
    return user_passes_test(check_superuser)(view_func)

def admin_required(view_func):
    """Decorador que verifica si el usuario es administrador o superusuario"""
    def check_admin(user):
        if user.is_superuser or user.groups.filter(name='Administradores').exists():
            return True
        raise PermissionDenied("Necesitas ser administrador para acceder a esta página.")
    
    return user_passes_test(check_admin)(view_func)

def normal_user_required(view_func):
    """Decorador que verifica si el usuario está autenticado (cualquier usuario)"""
    def check_user(user):
        return user.is_authenticated
    
    return user_passes_test(check_user)(view_func)
