// login.js

// Función para redirigir al inicio
function irAInicio() {
    window.location.href = '/'; // Cambia la URL según sea necesario
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita el envio del formulario por defecto
        
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        
        // Guardar en localStorage
        localStorage.setItem("username", username);
        localStorage.setItem("password", password); // RECORDAR QUE NOOO es seguro guardar contraseñas así en producción
        
        alert("Datos guardados en localStorage");
        
        form.reset();
    });
});