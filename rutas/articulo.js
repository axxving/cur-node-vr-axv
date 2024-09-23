// const { Router } = require("express");\
const express = require("express");
const router = express.Router();

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

module.exports = router;
