import { createClient } from "https://cdn.skypack.dev/@supabase/supabase-js";

// Configurar Supabase con tu URL y API Key
const supabaseUrl = "https://fqulwjwfpatbcamctscm.supabase.co"; // Tu URL de Supabase
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxdWx3andmcGF0YmNhbWN0c2NtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzNDA2OTAsImV4cCI6MjA1NzkxNjY5MH0._o9h-G5qaxzjjI_hok5bbRrCVEFwiTtKqC2JiMLw0sc"; // Tu anon API Key
const supabase = createClient(supabaseUrl, supabaseKey);
// Función para redirigir al inicio

async function checkAuthBeforeLoad() {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
        console.error("Error al verificar sesión:", error.message);
    }

    if (!session) {
        window.location.replace("/login.html"); // Redirigir inmediatamente si no hay sesión
    } else {
        document.documentElement.style.display = ""; // Mostrar la página si hay sesión
    }
}

// 🛑 Si estamos en dashboard.html, verificamos la sesión antes de mostrar contenido
if (window.location.pathname.includes("dashboard.html")) {
    document.documentElement.style.display = "none"; // Ocultar toda la página
    checkAuthBeforeLoad();
}

document.addEventListener("DOMContentLoaded", async function () {
    const form = document.getElementById("login-form");

    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault();

            const email = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();

            if (!email || !password) {
                alert("Por favor, ingrese su correo y contraseña.");
                return;
            }

            // Autenticación con Supabase
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });

            if (error) {
                console.error("Error al iniciar sesión:", error.message);
                alert("Error: " + error.message);
            } else {
                // Guardar el token en localStorage
                localStorage.setItem("supabase_token", data.session.access_token);
                localStorage.setItem("user_email", data.user.email);

                alert("Inicio de sesión exitoso. Redirigiendo...");
                window.location.href = "/dashboard.html"; // Redirigir a la página protegida
            }
        });
    }
});


// 🔓 Función para cerrar sesión
window.logout = async function () {
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error("Error al cerrar sesión:", error.message);
    } else {
        alert("Sesión cerrada correctamente.");
        window.location.href = "/login.html";
    }
};

window.irAInicio = function () {
    window.location.href = "/index.html"; // Ajusta la ruta según tu estructura de archivos
}


