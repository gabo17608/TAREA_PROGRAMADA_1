const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const path = require("path");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// rutas API
app.use("/api", routes);

// puerto
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:3000/`);
  console.log("También disponible en tu IP de Hamachi");
});
