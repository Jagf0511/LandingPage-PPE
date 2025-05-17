# Guía de instalación y ejecución de LandingPage-PPE

Esta guía paso a paso te ayudará a configurar y ejecutar correctamente el proyecto Django LandingPage-PPE.

## 📋 Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- Python 3.9 o superior
- Pip (gestor de paquetes de Python)
- Git (opcional, para clonar el repositorio)

## 🚀 Instrucciones paso a paso

### Paso 1: Obtener el código fuente

Si aún no tienes el código:

```bash
# Clona el repositorio (si tienes Git instalado)
git clone https://github.com/tu-usuario/LandingPage-PPE.git

# O simplemente descarga y extrae el archivo ZIP del proyecto
```

### Paso 2: Preparar el entorno virtual

Es recomendable usar un entorno virtual para evitar conflictos con otras aplicaciones:

```bash
# Navega al directorio del proyecto
cd LandingPage-PPE

# Crea un entorno virtual
python -m venv venv

# Activa el entorno virtual (Windows)
venv\Scripts\activate

# Activa el entorno virtual (macOS/Linux)
# source venv/bin/activate
```

### Paso 3: Instalar dependencias

```bash
# Instala todas las dependencias necesarias
pip install -r requirements.txt
```

Las dependencias principales incluyen:
- Django 5.2
- Pillow 10.1.0 (para procesamiento de imágenes)
- django-debug-toolbar 4.2.0
- whitenoise 6.6.0 (para servir archivos estáticos)

### Paso 4: Configurar la base de datos

```bash
# Navega al directorio del proyecto Django
cd mysite

# Ejecuta las migraciones para crear la estructura de la base de datos
python manage.py migrate
```

### Paso 5: Crear un usuario administrador

```bash
# Crea un superusuario para acceder al panel de administración
python manage.py createsuperuser
```

Sigue las instrucciones en la terminal:
- Ingresa un nombre de usuario (por ejemplo: admin)
- Proporciona una dirección de correo electrónico
- Crea y confirma una contraseña segura

### Paso 6: Iniciar el servidor

```bash
# Inicia el servidor de desarrollo de Django
python manage.py runserver
```

Ahora puedes acceder al sitio en tu navegador en: http://127.0.0.1:8000/

## 🔍 Acceso a las diferentes secciones

- **Página principal**: Visita http://127.0.0.1:8000/
- **Inicio de sesión**: Visita http://127.0.0.1:8000/login/
- **Registro de usuario**: Visita http://127.0.0.1:8000/register/
- **Dashboard administrativo**: Visita http://127.0.0.1:8000/dashboard/ (requiere iniciar sesión)

## 🛠️ Funcionalidades principales

### Como visitante puedes:
- Explorar la página principal con información sobre servicios turísticos
- Registrarte como nuevo usuario
- Iniciar sesión con credenciales existentes

### Como usuario registrado puedes:
- Acceder al dashboard administrativo
- Ver todos los elementos turísticos disponibles
- Agregar nuevos elementos al catálogo
- Editar elementos existentes
- Eliminar elementos

## ⚠️ Solución de problemas comunes

### El servidor no inicia
- Verifica que estás en el directorio correcto (`mysite`)
- Asegúrate de que el entorno virtual está activado
- Comprueba que todas las dependencias están instaladas

### Errores de migración
- Si encuentras errores relacionados con la base de datos, intenta:
  ```bash
  python manage.py makemigrations
  python manage.py migrate
  ```

### No se cargan los estilos o imágenes
- Verifica que `DEBUG = True` en el archivo `settings.py`
- Comprueba que la carpeta `static` y sus archivos existen

### Problemas de autenticación
- Si no puedes iniciar sesión, intenta restablecer la contraseña creando un nuevo superusuario

## 📝 Notas importantes

- Este proyecto usa SQLite como base de datos por defecto, lo que facilita la configuración inicial
- La configuración actual está optimizada para desarrollo, no para producción
- Si planeas utilizar este proyecto en producción, deberás hacer ajustes adicionales de seguridad

## 🔄 Actualización del proyecto

Si necesitas actualizar el proyecto después de cambios en el repositorio:

```bash
# Actualiza tu copia local (si usas Git)
git pull

# Actualiza las dependencias
pip install -r requirements.txt

# Aplica posibles cambios en la base de datos
python manage.py migrate
```

---

Para cualquier consulta adicional, consulta la documentación en los archivos README_IMPROVEMENTS.md y README.md
