// const { Router } = require("express");\
const express = require("express");
const router = express.Router();
const multer = require("multer");

const almacenamiento = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./imagenes/articulos/");
  },
  filename: (req, file, cb) => {
    cb(null, "articulo" + Date.now() + file.originalname);
  },
});

const subidas = multer({ storage: almacenamiento });

// Cargando controlador de articulo
const ArticuloControlador = require("../controladores/articulo.js");

// Rutas de prueba
router.get("/ruta-de-prueba", ArticuloControlador.prueba);

// Ruta de curso
router.get("/curso", ArticuloControlador.curso);

// Ruta util
router.post("/crear", ArticuloControlador.crear);

// Obtener articulos
router.get("/articulos/:ultimos?", ArticuloControlador.listar);

// Obtener un articulo por su id
router.get("/articuloId/:id", ArticuloControlador.unArticulo);

// Borrar un articulo por su id
router.delete("/articuloDeleteId/:id", ArticuloControlador.borrarArticulo);

// Editar un articulo
router.put("/editarArticulo/:id", ArticuloControlador.editar);

// subir un archivo de imagen
router.post(
  "/subir-imagen/:id",
  [subidas.single("file0")],
  ArticuloControlador.subir
);

// Consultar una imagen
router.get("/imagen/:fichero", ArticuloControlador.imagen);

// Ruta de buscador
router.get("/buscar/:busqueda", ArticuloControlador.buscador);

module.exports = router;
