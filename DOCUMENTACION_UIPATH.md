# Documentación de Automatización UIPath para Gestión de Elementos

## Tabla de Contenidos
1. [Introducción](#introducción)
2. [Requisitos del Sistema](#requisitos-del-sistema)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Selectores de Elementos](#selectores-de-elementos)
5. [Flujos de Trabajo](#flujos-de-trabajo)
6. [Solución de Problemas](#solución-de-problemas)
7. [Mejoras Futuras](#mejoras-futuras)

## Introducción
Este documento proporciona una guía completa para automatizar las operaciones CRUD de la aplicación de gestión de elementos utilizando UIPath. La automatización cubre las siguientes funcionalidades:
- Inicio de sesión
- Creación de elementos
- Lectura/consulta de elementos
- Actualización de elementos
- Eliminación de elementos

## Requisitos del Sistema
- UIPath Studio 2022.10 o superior
- Navegador Chrome (versión estable más reciente)
- Acceso a la aplicación web en `http://localhost:8000`
- Credenciales de usuario con permisos de administrador

## Estructura del Proyecto
```
CRUD_Automation_Django/
├── Main.xaml              # Flujo principal
├── Config/
│   └── Config.xlsx       # Configuraciones y datos de prueba
├── Workflows/
│   ├── Login.xaml        # Autenticación
│   ├── CreateItem.xaml    # Crear elemento
│   ├── ReadItems.xaml     # Leer elementos
│   ├── UpdateItem.xaml    # Actualizar elemento
│   └── DeleteItem.xaml    # Eliminar elemento
└── Libraries/
    └── Common.xaml       # Funciones de utilidad
```

## Selectores de Elementos

### Página de Inicio de Sesión
```xml
<!-- Campo de usuario -->
<webctrl id='id_username' tag='INPUT' />

<!-- Campo de contraseña -->
<webctrl id='id_password' tag='INPUT' type='password' />

<!-- Botón de inicio de sesión -->
<webctrl tag='BUTTON' type='submit' />
```

### Página del Dashboard
```xml
<!-- Botón Agregar Elemento -->
<webctrl tag='A' class='btn-success' innertext='Agregar Elemento' />

<!-- Tabla de Elementos -->
<webctrl id='resultsTable' tag='TABLE' />
```

### Botones de Acción
```xml
<!-- Botón Editar -->
<webctrl tag='A' class='btn-warning btn-editar' data-elemento-id='[ID]' />

<!-- Botón Eliminar -->
<webctrl tag='BUTTON' class='btn-danger btn-eliminar' data-elemento-id='[ID]' />

<!-- Confirmación de Eliminación -->
<webctrl tag='BUTTON' innertext='Aceptar' />
```

## Flujos de Trabajo

### 1. Inicio de Sesión (`Login.xaml`)
1. Navegar a `http://localhost:8000`
2. Ingresar credenciales
3. Verificar inicio de sesión exitoso

### 2. Crear Elemento (`CreateItem.xaml`)
1. Hacer clic en "Agregar Elemento"
2. Rellenar formulario con datos de prueba
3. Subir imagen (opcional)
4. Hacer clic en "Guardar"
5. Verificar creación exitosa

### 3. Leer Elementos (`ReadItems.xaml`)
1. Navegar al dashboard
2. Extraer datos de la tabla
3. Almacenar resultados en DataTable

### 4. Actualizar Elemento (`UpdateItem.xaml`)
1. Localizar elemento por ID/nombre
2. Hacer clic en botón "Editar"
3. Modificar campos necesarios
4. Guardar cambios
5. Verificar actualización

### 5. Eliminar Elemento (`DeleteItem.xaml`)
1. Localizar elemento por ID/nombre
2. Hacer clic en botón "Eliminar"
3. Confirmar eliminación
4. Verificar eliminación

## Solución de Problemas

### Problemas Comunes
1. **Elemento no encontrado**
   - Verificar que el selector sea correcto
   - Añadir tiempo de espera antes de interactuar
   - Usar selectores más específicos

2. **Tiempos de espera**
   ```plaintext
   - Actividad: Wait Element
     - Selector: <selector>
     - Timeout: 30000
   ```

3. **Diálogos inesperados**
   ```plaintext
   - Actividad: On Element Appear
     - Selector: <selector_dialogo>
     - Acción: Cerrar diálogo
   ```

### Registro de Errores
- Habilitar logging detallado en UIPath
- Tomar capturas de pantalla en caso de fallo
- Registrar errores en archivo de log

## Mejoras Futuras
1. Implementar manejo de datos dinámicos
2. Agregar validaciones más robustas
3. Crear pruebas de regresión
4. Implementar ejecución en paralelo
5. Integrar con sistema de CI/CD

---
*Última actualización: 19/05/2025*
