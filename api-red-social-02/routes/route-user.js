const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const auth = require('../middlewares/auth');

// Definir las rutas
router.get('/prueba-usuario', auth.auth, UserController.pruebaUser);

// Registro de usuario
router.post('/register', UserController.register);

// Login de usuario
router.post('/login', UserController.loginUser);

// Exportar router
module.exports = router;
