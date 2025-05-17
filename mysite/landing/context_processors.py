
def user_type(request):
    """
    Context processor que añade información sobre el tipo de usuario al contexto
    de todas las plantillas.
    """
    context = {}
    
    if request.user.is_authenticated:
        # Determinar el tipo de usuario
        is_admin = request.user.is_superuser or request.user.groups.filter(name='Administradores').exists()
        is_superuser = request.user.is_superuser
        
        # Añadir al contexto
        context['is_admin'] = is_admin
        context['is_superuser'] = is_superuser
    
    return context
