from django.contrib import admin
from django.contrib.admin.views.decorators import staff_member_required
from django.template.response import TemplateResponse
from django.urls import path

@staff_member_required
def custom_admin_view(request):
    """
    Vista personalizada para el panel de administración.
    """
    context = {
        'title': 'Panel de Control Personalizado',
        'app_list': [{
            'name': 'Personalización',
            'app_label': 'custom',
            'models': [
                {
                    'name': 'Configuración',
                    'admin_url': '/admin/',
                    'view_only': True,
                },
            ],
        }],
    }
    return TemplateResponse(request, 'admin/custom_index.html', context)

class CustomAdminSite(admin.AdminSite):
    site_header = 'Administración Personalizada'
    site_title = 'Panel de Control'
    index_title = 'Bienvenido al Panel de Administración'
    
    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('custom-view/', self.admin_view(custom_admin_view), name='custom-view'),
        ]
        return custom_urls + urls
    
    def get_app_list(self, request):
        """
        Personaliza la lista de aplicaciones en el índice del admin.
        """
        app_list = super().get_app_list(request)
        
        # Personalizar el orden o la presentación de las aplicaciones
        return app_list
