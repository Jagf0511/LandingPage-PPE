import { createClient } from "https://cdn.skypack.dev/@supabase/supabase-js";

// Configurar Supabase con tu URL y API Key
const supabaseUrl = "https://fqulwjwfpatbcamctscm.supabase.co"; // Tu URL de Supabase
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxdWx3andmcGF0YmNhbWN0c2NtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzNDA2OTAsImV4cCI6MjA1NzkxNjY5MH0._o9h-G5qaxzjjI_hok5bbRrCVEFwiTtKqC2JiMLw0sc"; // Tu anon API Key
const supabase = createClient(supabaseUrl, supabaseKey);

function irAInicio() {
    window.location.href = "/index.html"; // Ajusta la ruta según tu estructura de archivos
}
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const firstName = document.getElementById("first-name").value.trim();
        const lastName = document.getElementById("last-name").value.trim();
        const email = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirm_password").value.trim();

        // Validaciones
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        if (password.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        // Registro en Supabase Auth
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { firstName, lastName } // Guardar metadatos
            }
        });

        if (error) {
            console.error("Error al registrar usuario:", error.message);
            alert("Error al registrar usuario: " + error.message);
        } else {
            alert("Usuario registrado exitosamente. Verifica tu correo para activar la cuenta.");
            form.reset();
        }
    });
});


