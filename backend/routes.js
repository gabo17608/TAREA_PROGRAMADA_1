const express = require("express");
const router = express.Router();
const { getConnection, sql } = require("./db");

// GET: lista de empleados
router.get("/empleados", async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().execute("SP_Obtener_Empleados");
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ Codigo: 0, Mensaje: "Error al obtener empleados" });
  }
});

// POST: agregar empleado
router.post("/empleados", async (req, res) => {
  const { nombre, salario } = req.body;

  // Validación de salario
  if (salario < 0) {
    return res.status(400).json({ Codigo: 0, Mensaje: "El salario no puede ser negativo" });
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Nombre", sql.VarChar, nombre)
      .input("Salario", sql.Money, salario)
      .execute("SP_Insertar_Empleado");

    // Devuelve al frontend el Código y Mensaje del SP
    res.json(result.recordset[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ Codigo: 0, Mensaje: "No se pudo conectar con el servidor" });
  }
});

module.exports = router;
