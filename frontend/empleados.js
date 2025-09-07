const API_URL = "http://localhost:3000/api"; // apunta a /api

const contenido = document.getElementById("contenido");
const btnListar = document.getElementById("btn-listar");
const btnAgregar = document.getElementById("btn-agregar");

// Función para listar empleados
async function listarEmpleados() {
  contenido.innerHTML = "<p>Cargando empleados...</p>";
  try {
    const res = await fetch(`${API_URL}/empleados`);
    const empleados = await res.json();

    let html = `<table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Salario</th>
                    </tr>
                  </thead>
                  <tbody>`;

    empleados.forEach(emp => {
      html += `<tr>
                 <td>${emp.id}</td>
                 <td>${emp.Nombre}</td>
                 <td>${emp.Salario}</td>
               </tr>`;
    });

    html += "</tbody></table>";
    contenido.innerHTML = html;

  } catch (err) {
    contenido.innerHTML = "<p>Error al cargar empleados</p>";
    console.error(err);
  }
}

// Función para mostrar formulario de agregar empleado
function mostrarFormulario() {
  contenido.innerHTML = `
    <h2>Agregar Empleado</h2>
    <form id="form-agregar">
      <label>Nombre:</label>
      <input type="text" name="nombre" required>
      <label>Salario:</label>
      <input type="number" name="salario" required>
      <button type="submit">Agregar</button>
    </form>
    <p id="mensaje"></p>
  `;

  const form = document.getElementById("form-agregar");
  const mensaje = document.getElementById("mensaje");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const nombre = form.nombre.value.trim();
    const salario = parseFloat(form.salario.value);

    // Validaciones frontend
    if (nombre === "") {
      mensaje.textContent = "El nombre no puede estar vacío";
      return;
    }
    if (salario < 0) {
      mensaje.textContent = "El salario no puede ser negativo";
      return;
    }

    const data = { nombre, salario };

    try {
      const res = await fetch(`${API_URL}/empleados`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const dataRes = await res.json(); // Recibimos { Codigo, Mensaje }
      
      mensaje.textContent = dataRes.Codigo === 1
        ? dataRes.Mensaje + " (puedes agregar otro empleado)"
        : dataRes.Mensaje; // Si Codigo = 0, mostramos error exacto

      if (dataRes.Codigo === 1) form.reset(); // solo reseteamos si fue exitoso

    } catch (err) {
      mensaje.textContent = "No se pudo conectar con el servidor";
      console.error(err);
    }
  });
}

// Eventos de los botones
btnListar.addEventListener("click", listarEmpleados);
btnAgregar.addEventListener("click", mostrarFormulario);

// Carga inicial
listarEmpleados();
