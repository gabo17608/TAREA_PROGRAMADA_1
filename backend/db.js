// backend/db.js
const sql = require("mssql");

const dbConfig = {
  user: "empleado_user",
  password: "12345Segura",
  database: "TP1",
  server: "25.0.249.159", 
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

async function getConnection() {
  try {
    const pool = await sql.connect(dbConfig);
    return pool;
  } catch (err) {
    console.error("Error en la conexión a SQL:", err);
  }
}

module.exports = { sql, getConnection };
