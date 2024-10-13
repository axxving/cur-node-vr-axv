// Importar dependencias
const { conection } = require("./database/conection");
const express = require("express");
const cors = require("cors");

// Mensaje de bienvenida
console.log("API NODE para RED SOCIAL arrancada");

// Conexion a la base de datos
conection();

// Crear un servidor de node
const app = express();
const puerto = 3900;

// Configurar cors
app.use(cors());

// Convertir los datos del body a un json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cargar las rutas
// Ruta de prueba
app.get("/ruta-prueba", (req, res) => {
  return res.status(200).json({
    mensaje: "Hola mundo desde la ruta de prueba",
    estado: true,
  });
});

// Poner servidor a escuchar peticiones http
app.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});
