// Configuración de Supabase
const SUPABASE_URL = "https://fqulwjwfpatbcamctscm.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxdWx3andmcGF0YmNhbWN0c2NtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzNDA2OTAsImV4cCI6MjA1NzkxNjY5MH0._o9h-G5qaxzjjI_hok5bbRrCVEFwiTtKqC2JiMLw0sc";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Función para verificar la autenticación
function verificarAutenticacion() {
    const token = localStorage.getItem("supabase_token");
    if (!token) {
        alert("No tienes acceso. Inicia sesión.");
        window.location.href = "/login.html";
        return false;
    }
    return true;
}

// Obtener elementos SIN librería (Usando fetch)
async function obtenerElementos() {
    if (!verificarAutenticacion()) return;

    try {
        const url = "https://fqulwjwfpatbcamctscm.supabase.co/rest/v1/toures";
        const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxdWx3andmcGF0YmNhbWN0c2NtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzNDA2OTAsImV4cCI6MjA1NzkxNjY5MH0._o9h-G5qaxzjjI_hok5bbRrCVEFwiTtKqC2JiMLw0sc";

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "apikey": apiKey,
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) throw new Error("Error al obtener los datos");

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
        tableBody.innerHTML = "<tr><td colspan='7'>No hay elementos disponibles</td></tr>";
        return;
    }

    data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.id || ''}</td>
            <td>${item.nombre || ''}</td>
            <td>${item.descripcion || ''}</td>
            <td>$${item.precio || 0}</td>
            <td>${item.duracion || 0} días</td>
            <td>${item.destino || ''}</td>
            <td>
                <button class="btn-eliminar" data-id="${item.id}">❌ Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
    
    // Agregar eventos a los botones de eliminar
    document.querySelectorAll(".btn-eliminar").forEach(btn => {
        btn.addEventListener("click", function() {
            const id = this.getAttribute("data-id");
            eliminarElemento(id);
        });
    });
}

// Función para agregar un nuevo elemento
async function agregarElemento() {
    if (!verificarAutenticacion()) return;

    const nombre = prompt("Ingrese el nombre del tour:");
    if (!nombre) {
        alert("El nombre es obligatorio.");
        return;
    }

    const descripcion = prompt("Ingrese una descripción:");
    const precio = parseFloat(prompt("Ingrese el precio:"));
    const duracion = parseInt(prompt("Ingrese la duración en días:"));
    const destino = prompt("Ingrese el destino:");

    if (!descripcion || isNaN(precio) || isNaN(duracion) || !destino) {
        alert("Todos los campos son obligatorios y deben ser válidos.");
        return;
    }

    try {
        const { data, error } = await supabase
            .from("toures")
            .insert([{ nombre, descripcion, precio, duracion, destino }]);

        if (error) throw error;

        alert("Tour agregado correctamente.");
        obtenerElementos();
    } catch (error) {
        console.error("Error al agregar el tour:", error);
        alert("No se pudo agregar el tour.");
    }
}

// Función para eliminar un elemento
async function eliminarElemento(id) {
    if (!verificarAutenticacion()) return;
    
    if (!confirm("¿Seguro que deseas eliminar este tour?")) return;

    try {
        const { error } = await supabase
            .from("toures")
            .delete()
            .eq("id", id);

        if (error) throw error;

        alert("Tour eliminado correctamente.");
        obtenerElementos();
    } catch (error) {
        console.error("Error al eliminar el tour:", error);
        alert("No se pudo eliminar el tour.");
    }
}

// Función para cerrar sesión
function logout() {
    localStorage.removeItem("supabase_token");
    window.location.href = "/login.html";
}

// Inicializar la página
function inicializarPagina() {
    // Cargar elementos
    obtenerElementos();
    
    // Configurar evento de búsqueda
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("input", function() {
            const filter = this.value.toLowerCase();
            const rows = document.querySelectorAll("#resultsBody tr");

            rows.forEach(row => {
                const nombre = row.cells[1].textContent.toLowerCase();
                const descripcion = row.cells[2].textContent.toLowerCase();
                row.style.display = nombre.includes(filter) || descripcion.includes(filter) ? "" : "none";
            });
        });
    }
    
    // Configurar botón de búsqueda
    const searchButton = document.getElementById("searchButton");
    if (searchButton) {
        searchButton.addEventListener("click", function() {
            const filter = document.getElementById("searchInput").value.toLowerCase();
            const rows = document.querySelectorAll("#resultsBody tr");

            rows.forEach(row => {
                const nombre = row.cells[1].textContent.toLowerCase();
                const descripcion = row.cells[2].textContent.toLowerCase();
                row.style.display = nombre.includes(filter) || descripcion.includes(filter) ? "" : "none";
            });
        });
    }
    
    // Configurar botón de agregar
    const addButton = document.getElementById("addButton");
    if (addButton) {
        addButton.addEventListener("click", agregarElemento);
    }
    
    // Configurar botón de logout
    const logoutButton = document.querySelector("button[onclick='logout()']");
    if (logoutButton) {
        logoutButton.onclick = logout;
    }
}

// Ejecutar cuando el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", inicializarPagina);

// Exportar funciones para uso global
window.obtenerElementos = obtenerElementos;
window.agregarElemento = agregarElemento;
window.eliminarElemento = eliminarElemento;
window.logout = logout;