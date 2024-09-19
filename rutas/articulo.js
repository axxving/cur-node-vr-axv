// const { Router } = require("express");\
const express = require("express");
const router = express.Router();

// Cargando controlador de articulo
const ArticuloControlador = require("../controladores/articulo.js");
const cursoControlador = require("../controladores/articulo.js");

// Rutas de prueba
router.get("/ruta-de-prueba", ArticuloControlador.prueba);

// Ruta de curso
router.get("/ruta-curso", cursoControlador.curso);

module.exports = router;
