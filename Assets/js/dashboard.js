// Configuración de Supabase
const SUPABASE_URL = "https://fqulwjwfpatbcamctscm.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxdWx3andmcGF0YmNhbWN0c2NtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzNDA2OTAsImV4cCI6MjA1NzkxNjY5MH0._o9h-G5qaxzjjI_hok5bbRrCVEFwiTtKqC2JiMLw0sc";

// Función para obtener y mostrar los 100 elementos
async function obtenerElementos() {
    const token = localStorage.getItem("supabase_token"); // Recuperar el token de autenticación
    if (!token) {
        alert("No tienes acceso. Inicia sesión.");
        window.location.href = "/login.html";
        return;
    }

    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/toures?select=id,nombre,descripcion,precio,duracion,destino&limit=100`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Error al obtener los datos.");
        }

        const data = await response.json();
        mostrarElementos(data);

    } catch (error) {
        console.error("Error al obtener elementos:", error);
        alert("Error al cargar los datos.");
    }
}

// Función para mostrar los elementos en la tabla
function mostrarElementos(data) {
    const tableBody = document.getElementById("resultsBody");
    tableBody.innerHTML = "";

    if (!data || data.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='5'>No hay elementos disponibles</td></tr>";
        return;
    }

    data.forEach(item => {
        const row = `<tr>
            <td>${item.id}</td>
            <td>${item.nombre}</td>
            <td>${item.descripcion}</td>
            <td>$${item.precio}</td>
            <td>${item.duracion} días</td>
            <td>${item.destino}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// Función para la búsqueda en tiempo real
document.getElementById("searchInput").addEventListener("input", function () {
    const filter = this.value.toLowerCase();
    const rows = document.querySelectorAll("#resultsBody tr");

    rows.forEach(row => {
        const nombre = row.cells[1].textContent.toLowerCase();
        row.style.display = nombre.includes(filter) ? "" : "none";
    });
});

// Llamar a la función cuando cargue la página
document.addEventListener("DOMContentLoaded", obtenerElementos);
