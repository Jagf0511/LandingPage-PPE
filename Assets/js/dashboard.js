// Configuración Supabase
const SUPABASE_URL = "https://zrrbszeuhxqblgtncgrb.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpycmJzemV1aHhxYmxndG5jZ3JiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzNTE4NjcsImV4cCI6MjA1NzkyNzg2N30.tjTL7f3RwIenz_i10gGjTXxxVH7CMyD8O6hH4KoJNRM";

// Variable global para el cliente de Supabase
let supabaseClient = null;

// Inicializar Supabase cuando la página esté lista
window.onload = function () {
    try {
        // Crear cliente de Supabase
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        console.log("Supabase inicializado correctamente");

        // Probar conexión
        testConnection();
    } catch (error) {
        console.error("Error al inicializar Supabase:", error);
        alert("Error al conectar con la base de datos. Revisa la consola para más detalles.");
    }
};

// Función para probar la conexión
async function testConnection() {
    try {
        const { data, error } = await supabaseClient.from("items").select("count");

        if (error) {
            console.error("Error de conexión:", error);
        } else {
            console.log("Conexión exitosa con Supabase:", data);
        }
    } catch (err) {
        console.error("Error al probar la conexión:", err);
    }
}

// Función para buscar elementos (global para ser accesible desde HTML)
window.buscarElemento = async function () {
    const query = document.getElementById("searchInput").value.trim();
    const resultsBody = document.getElementById("resultsBody");

    if (query === "") {
        resultsBody.innerHTML = "<tr><td colspan='2'>Ingrese un término de búsqueda</td></tr>";
        return;
    }

    try {
        console.log("Buscando:", query);

        const { data, error } = await supabaseClient
            .from("items")
            .select("id, name")
            .ilike("name", `%${query}%`);

        if (error) {
            console.error("Error en la búsqueda:", error);
            resultsBody.innerHTML = `<tr><td colspan='2'>Error en la búsqueda: ${error.message}</td></tr>`;
            return;
        }

        console.log("Resultados:", data);

        if (!data || data.length === 0) {
            resultsBody.innerHTML = "<tr><td colspan='2'>No se encontraron resultados</td></tr>";
        } else {
            resultsBody.innerHTML = "";
            data.forEach(item => {
                const row = `<tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                </tr>`;
                resultsBody.innerHTML += row;
            });
        }
    } catch (err) {
        console.error("Error:", err);
        resultsBody.innerHTML = `<tr><td colspan='2'>Error: ${err.message}</td></tr>`;
    }
};