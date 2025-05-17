# LandingPage-PPE: Guía de instalación y ejecución

Esta guía te ayudará a configurar y ejecutar el proyecto Django LandingPage-PPE paso a paso.

## Requisitos previos

- Python 3.9+ instalado
- Pip (gestor de paquetes de Python)
- Navegador web actualizado

## Pasos para ejecutar el proyecto

### 1. Preparar el entorno

Primero, es recomendable crear un entorno virtual para mantener las dependencias aisladas:

```bash
# Navega a la carpeta raíz del proyecto
cd LandingPage-PPE

# Crea un entorno virtual
python -m venv venv

# Activa el entorno virtual
# En Windows:
venv\Scripts\activate

# En macOS/Linux:
# source venv/bin/activate
```

### 2. Instalar dependencias

El proyecto incluye un archivo `requirements.txt` con todas las dependencias necesarias:

```bash
# Instala las dependencias desde requirements.txt
pip install -r requirements.txt
```

Las principales dependencias incluyen:
- Django 5.2
- Pillow 10.1.0
- django-debug-toolbar 4.2.0
- whitenoise 6.6.0

### 3. Configurar la base de datos

```bash
# Navega a la carpeta del proyecto Django
cd mysite

# Aplica las migraciones para crear la estructura de la base de datos
python manage.py migrate
```

### 4. Crear un usuario administrador

```bash
# Crea un superusuario para acceder al panel de administración
python manage.py createsuperuser
```

Sigue las instrucciones para crear un usuario con credenciales de acceso. Este usuario podrá ingresar al dashboard administrativo.

### 5. Iniciar el servidor de desarrollo

```bash
# Inicia el servidor de desarrollo de Django
python manage.py runserver
```

Ahora puedes acceder al sitio en tu navegador en: http://127.0.0.1:8000/

## Acceso a las diferentes secciones

- **Página principal**: http://127.0.0.1:8000/
- **Inicio de sesión**: http://127.0.0.1:8000/login/
- **Registro de usuario**: http://127.0.0.1:8000/register/
- **Panel de administración**: http://127.0.0.1:8000/dashboard/ (requiere iniciar sesión)

## Gestión de contenido

Una vez que hayas iniciado sesión, puedes acceder al panel de administración para:

1. **Ver elementos existentes**: En el dashboard verás una lista de todos los tours y servicios turísticos
2. **Agregar nuevos elementos**: Utiliza el botón "Agregar Elemento" para crear nuevos tours o servicios
3. **Editar elementos**: Haz clic en el botón "Editar" junto a cualquier elemento para modificar sus detalles
4. **Eliminar elementos**: Utiliza el botón "Eliminar" para quitar elementos del catálogo

## Funcionalidades principales

- **Sistema de autenticación**: Registro e inicio de sesión de usuarios
- **Gestión de contenido**: CRUD completo para los elementos turísticos (Crear, Leer, Actualizar, Eliminar)
- **Traducción**: Interfaz disponible en español e inglés
- **Diseño responsivo**: Adaptado para dispositivos móviles y de escritorio

## Solución de problemas comunes

1. **Error al aplicar migraciones**:
   - Asegúrate de estar en la carpeta correcta (mysite)
   - Verifica que la base de datos SQLite no esté bloqueada por otro proceso

2. **Problemas con imágenes o archivos estáticos**:
   - Comprueba que DEBUG = True en settings.py durante desarrollo
   - Asegúrate de que las rutas a los archivos estáticos son correctas

3. **Error de dependencias**:
   - Verifica que estás usando la versión correcta de Python
   - Asegúrate de que todas las dependencias estén instaladas correctamente

## Estructura de archivos importantes

- `mysite/landing/models.py`: Define el modelo de datos para los elementos turísticos
- `mysite/landing/views.py`: Contiene la lógica de las vistas
- `mysite/landing/templates/`: Contiene las plantillas HTML
- `mysite/landing/static/`: Contiene archivos CSS, JavaScript e imágenes

## Notas adicionales

- La base de datos por defecto es SQLite, incluida en el archivo `db.sqlite3`
- El proyecto está configurado para desarrollo local, no para producción
- Para entornos de producción, se necesitarían configuraciones adicionales de seguridad


Incluye imágenes, diagramas o cualquier otro recurso que facilite la comprensión del proyecto.

![Ejemplo de uso](https://via.placeholder.com/600x300)

---

*Autor: Tu Nombre*
