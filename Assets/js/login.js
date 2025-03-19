import { createClient } from "https://cdn.skypack.dev/@supabase/supabase-js";

// Configurar Supabase con tu URL y API Key
const supabaseUrl = "https://fqulwjwfpatbcamctscm.supabase.co"; // Tu URL de Supabase
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxdWx3andmcGF0YmNhbWN0c2NtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzNDA2OTAsImV4cCI6MjA1NzkxNjY5MH0._o9h-G5qaxzjjI_hok5bbRrCVEFwiTtKqC2JiMLw0sc"; // Tu anon API Key
const supabase = createClient(supabaseUrl, supabaseKey);
// Función para redirigir al inicio

function irAInicio() {
    window.location.href = '/'; // Cambia la URL según sea necesario
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("login-form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Evita que la página se recargue

        const email = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!email || !password) {
            alert("Por favor, ingrese su correo y contraseña.");
            return;
        }

        // Autenticación con Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            console.error("Error al iniciar sesión:", error.message);
            alert("Error: " + error.message);
        } else {
            alert("Inicio de sesión exitoso. Redirigiendo...");
            window.location.href = "/dashboard.html"; // Redirigir a otra página
        }
    });
});