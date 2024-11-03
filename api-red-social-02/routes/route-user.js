const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');

// Definir las rutas
router.get('/prueba-usuario', UserController.pruebaUser);

// Registro de usuario
router.post('/register', UserController.register);

// Exportar router
module.exports = router;
