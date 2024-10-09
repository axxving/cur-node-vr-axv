const { conexion } = require("./baseDatos/coneccion");
const express = require("express");
const cors = require("cors");
const { Cursor } = require("mongoose");

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

// Convertir body a urlencoded
app.use(express.urlencoded({ extended: true })); // form - urlencode

// RUTAS
const rutas_articulo = require("./rutas/articulo");

// cargo las rutas
app.use("/api", rutas_articulo);

// Crear rutas ejemplo
app.get("/probando", (req, res) => {
  console.log("Se ha ejecutado la ruta de prueba");

  // return res.status(200).send(`
  //     <div>Probando ruta de node js</div>
  //     <p>Creando API Rest con node js</p>
  //   `);

  // return res.status(200).send({

  // return res.status(200).json({
  //   curso: "Master en React",
  //   autor: "Victor Robles Web",
  //   url: "victorrobles.es/master-react",
  // });

  return res.status(200).json([
    {
      curso: "Master en React",
      autor: "Victor Robles Web",
      url: "victorrobles.es/master-react",
    },
    {
      curso: "Master en React",
      autor: "Victor Robles Web",
      url: "victorrobles.es/master-react",
    },
  ]);
});

// Inicio de la aplicacion
app.get("/", (req, res) => {
  return res
    .status(200)
    .send(`<h2>Empezando a crear una API rest con node js</h2>`);
});

// Crear el servidor y escuchar peticiones\
app.listen(puerto, () => {
  console.log("Servidor corriendo en el puerto " + puerto);
});
