# 🚀 Transport Service Medellín - Panel de Administración

[![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)](https://www.djangoproject.com/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

Bienvenido al repositorio del panel de administración de Transport Service Medellín, una aplicación web desarrollada con Django que permite gestionar servicios de transporte turístico en la ciudad de Medellín.

## 🌟 Características principales

- **Panel de administración intuitivo** con diseño moderno y responsivo
- **Gestión de usuarios** con diferentes niveles de acceso
- **CRUD completo** para servicios turísticos
- **Interfaz bilingüe** (Español/Inglés)
- **Diseño optimizado** para dispositivos móviles y escritorio
- **Sistema de autenticación** seguro
- **Panel de estadísticas** para seguimiento de actividad

## 🛠️ Requisitos del sistema

- Python 3.9 o superior
- pip (gestor de paquetes de Python)
- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Git (opcional, para control de versiones)

## 🚀 Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/Jagf0511/LandingPage-PPE
cd LandingPage-PPE
```

### 2. Configurar entorno virtual

```bash
# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# Windows:
.\venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate
```

### 3. Instalar dependencias

```bash
pip install -r requirements.txt
```

### 4. Configurar base de datos

```bash
cd mysite
python manage.py migrate
```

### 5. Crear superusuario

```bash
python manage.py createsuperuser
```

### 6. Iniciar servidor de desarrollo

```bash
python manage.py runserver
```

Accede a la aplicación en: http://127.0.0.1:8000/

## 📊 Estructura del proyecto

```
LandingPage-PPE/
├── mysite/                  # Configuración principal de Django
│   ├── landing/             # Aplicación principal
│   │   ├── migrations/      # Migraciones de la base de datos
│   │   ├── static/          # Archivos estáticos (CSS, JS, imágenes)
│   │   ├── templates/       # Plantillas HTML
│   │   ├── admin.py         # Configuración del panel de administración
│   │   ├── models.py        # Modelos de datos
│   │   ├── urls.py          # Rutas de la aplicación
│   │   └── views.py         # Vistas de la aplicación
│   ├── comentarios/         # Módulo de comentarios
│   └── mysite/              # Configuración del proyecto
└── requirements.txt         # Dependencias del proyecto
```

## 🔐 Acceso al sistema

- **Página principal**: http://127.0.0.1:8000/
- **Panel de administración**: http://127.0.0.1:8000/dashboard/
- **Admin Django**: http://127.0.0.1:8000/admin/

## 🎨 Guía de estilo

### Paleta de colores

- **Color primario**: `#00FFCE` (Turquesa)
- **Fondo oscuro**: `#1E1E1E`
- **Texto principal**: `#FFFFFF`
- **Texto secundario**: `#A0A0A0`
- **Éxito**: `#2ED573`
- **Error**: `#FF4757`
- **Advertencia**: `#FFA502`

### Tipografía

- **Familia principal**: 'Montserrat', sans-serif
- **Tamaños de fuente**:
  - Títulos: 2rem / 1.8rem / 1.5rem
  - Texto normal: 1rem
  - Texto pequeño: 0.85rem

## 🛠️ Despliegue en producción

Para entornos de producción, se recomienda:

1. Configurar un servidor web como Nginx o Apache
2. Usar Gunicorn o uWSGI como servidor de aplicaciones
3. Configurar una base de datos PostgreSQL
4. Configurar variables de entorno para datos sensibles
5. Configurar SSL/TLS para conexiones seguras

