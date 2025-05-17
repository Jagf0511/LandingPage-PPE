from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login/', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
    path('register/', views.register, name='register'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('dashboard/buscar/', views.buscar_elementos, name='buscar_elementos'),
    path('dashboard/agregar/', views.agregar_elemento, name='agregar_elemento'),
    path('dashboard/editar/<int:elemento_id>/', views.editar_elemento, name='editar_elemento'),
    path('dashboard/eliminar/<int:elemento_id>/', views.eliminar_elemento, name='eliminar_elemento'),
    path('logout/', auth_views.LogoutView.as_view(next_page='index'), name='logout'),
    path('user-management/', views.user_management, name='user_management'),
    path('user-management/toggle-admin/<int:user_id>/', views.toggle_admin_rights, name='toggle_admin_rights'),
]