const { conexion } = require("./baseDatos/coneccion");
const express = require("express");
const cors = require("cors");

// Inicializar app
console.log("App de node arrancada");

// Conectar a la base de datos
conexion();

// Crear servidor de node js
const app = express();
const puerto = 3900;

// Configurar el cors
app.use(cors());

// Convertir body a objeto js
app.use(express.json());

// Crear rutas

// Crear el servidor y escuchar peticiones\
app.listen(puerto, () => {
  console.log("Servidor corriendo en el puerto " + puerto);
});
