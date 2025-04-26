/**
 * Configuración y manejo de autenticación con Supabase
 *
 * Este script se encarga de gestionar el inicio de sesión, verificar la sesión actual
 * y manejar el cierre de sesión en una aplicación web utilizando Supabase.
 */

// Importar el cliente de Supabase desde Skypack
import { createClient } from "https://cdn.skypack.dev/@supabase/supabase-js";

/**
 * Configurar Supabase con la URL y la API Key
 *
 * @constant {string} supabaseUrl - URL del proyecto en Supabase
 * @constant {string} supabaseKey - Clave de acceso pública (anon key) de Supabase
 */
const supabaseUrl = "https://fqulwjwfpatbcamctscm.supabase.co"; // Reemplazar con tu URL de Supabase
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxdWx3andmcGF0YmNhbWN0c2NtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzNDA2OTAsImV4cCI6MjA1NzkxNjY5MH0._o9h-G5qaxzjjI_hok5bbRrCVEFwiTtKqC2JiMLw0sc"; // Reemplazar con tu API Key anónima

// Crear una instancia del cliente de Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Funcion: checkAuthBeforeLoad
 * 
 * Descripcion: Esta funcion verifica si hay una sesion activa del usuario 
 * antes de cargar el contenido de la pagina. Si no hay sesion, redirige 
 * al usuario a la pagina de inicio de sesion.
 * 
 * Tipo: Asincrona (async)
 * 
 * Uso de async: La palabra clave `async` se utiliza para declarar que 
 * esta funcion es asincrona. Esto permite el uso de `await` dentro de 
 * la funcion, lo que significa que la funcion puede esperar a que 
 * se completen las promesas (en este caso, la llamada a 
 * supabase.auth.getSession()) antes de continuar con la ejecucion. 
 * Esto facilita la escritura de codigo asincrono de manera mas 
 * legible y evita el uso excesivo de callbacks.
 */
async function checkAuthBeforeLoad() {
    try {
        // Intenta obtener la sesion actual del usuario
        const { data: { session }, error } = await supabase.auth.getSession();

        // Manejo de errores al intentar obtener la sesion
        if (error) {
            console.error("Error al verificar sesion:", error.message);
            return; // Termina la ejecucion de la funcion si hay un error
        }

        // Verifica si no hay sesion (usuario no autenticado)
        if (!session) {
            // Redirige al usuario a la pagina de inicio de sesion
            window.location.replace("/login/");
        } else {
            // Muestra el contenido de la pagina si hay sesion activa
            document.documentElement.style.display = "";
        }
    } catch (error) {
        // Captura y maneja errores inesperados
        console.error("Error inesperado al verificar la sesion:", error);
    }
}

// Si estamos en la página dashboard.html, verificamos la sesión antes de mostrar el contenido
if (window.location.pathname.includes("dashboard.html")) {
    document.documentElement.style.display = "none"; // Ocultar el contenido hasta verificar la sesión
    checkAuthBeforeLoad();
}

/**
 * Manejar el envío del formulario de inicio de sesión
 *
 * Se encarga de autenticar al usuario con el correo y la contraseña proporcionados.
 */
/**
 * Evento: DOMContentLoaded
 * 
 * Descripcion: Este evento se dispara cuando el contenido del documento 
 * HTML ha sido completamente cargado y analizado. Se utiliza para 
 * asegurarse de que el DOM esté listo antes de ejecutar el código 
 * relacionado con el formulario de inicio de sesión.
 */
document.addEventListener("DOMContentLoaded", async function () {
    // Obtiene el formulario de inicio de sesión por su ID
    const form = document.getElementById("login-form");

    // Verifica si el formulario existe en el DOM
    if (form) {
        // Agrega un evento de escucha para el evento 'submit' del formulario
        form.addEventListener("submit", async function (event) {
            // Previene el comportamiento por defecto del formulario (recarga de página)
            event.preventDefault();

            // Obtiene los valores de correo y contraseña del formulario
            const email = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();

            // Verifica que se hayan ingresado tanto el correo como la contraseña
            if (!email || !password) {
                alert("Por favor, ingrese su correo y contraseña.");
                return; // Termina la ejecución si faltan datos
            }

            try {
                // Autenticar con Supabase
                const { data, error } = await supabase.auth.signInWithPassword({ email, password });

                // Manejo de errores durante la autenticación
                if (error) {
                    console.error("Error al iniciar sesión:", error.message);
                    alert("Error: " + error.message); // Muestra un mensaje de error al usuario
                } else {
                    // Almacenar el token y el correo del usuario en localStorage
                    localStorage.setItem("supabase_token", data.session.access_token);
                    localStorage.setItem("user_email", data.user.email);

                    alert("Inicio de sesión exitoso. Redirigiendo...");
                    // Redirigir a la página protegida (dashboard)
                    window.location.href = "/dashboard.html";
                }
            } catch (error) {
                // Captura y maneja errores inesperados
                console.error("Error inesperado al iniciar sesión:", error);
            }
        });
    }
});

/**
 * Cerrar sesión
 *
 * Finaliza la sesión activa y redirige al usuario a la página de inicio de sesión.
 */
window.logout = async function () {
    try {
        // Intenta cerrar la sesión utilizando Supabase
        const { error } = await supabase.auth.signOut();

        // Manejo de errores durante el cierre de sesión
        if (error) {
            console.error("Error al cerrar sesión:", error.message);
        } else {
            // Notifica al usuario que la sesión se ha cerrado correctamente
            alert("Sesión cerrada correctamente.");
            // Redirige al usuario a la página de inicio de sesión
            window.location.href = "/login/";
        }
    } catch (error) {
        // Captura y maneja errores inesperados
        console.error("Error inesperado al cerrar sesión:", error);
    }
};
/**
 * Redirigir al usuario a la página de inicio
 *
 * @function irAInicio
 */
window.irAInicio = function () {
    window.location.href = "templates/index.html"; // Ajustar la ruta según la estructura del proyecto
};