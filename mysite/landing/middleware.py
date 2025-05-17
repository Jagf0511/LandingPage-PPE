from django.contrib.auth.models import Group

class UserTypeMiddleware:
    """
    Middleware que añade información sobre el tipo de usuario al contexto de cada request
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Ejecutar cualquier código antes de la vista
        
        # Procesar la vista
        response = self.get_response(request)
        
        # Ejecutar cualquier código después de la vista
        return response
    
    def process_template_response(self, request, response):
        """
        Añade información del tipo de usuario al contexto de la plantilla
        """
        if hasattr(response, 'context_data') and request.user.is_authenticated:
            # Determinar el tipo de usuario
            is_admin = request.user.is_superuser or request.user.groups.filter(name='Administradores').exists()
            is_superuser = request.user.is_superuser
            
            # Añadir al contexto
            response.context_data['is_admin'] = is_admin
            response.context_data['is_superuser'] = is_superuser
        
        return response
