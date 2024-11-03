const User = require('../models/model-user');

// Acciones de prueba
const pruebaUser = (req, res) => {
    return res.status(200).send({
        mensaje: 'Mensaje enviado desde: controllers/user.js',
    });
};

// Registro de usuario
const register = async (req, res) => {
    // Recoger datos de la peticion

    // Comprobar que me llegan bien (+ validacion)

    // Control usuarios duplicados

    // Cifrar la contraseña

    // Guardar en la base de datos

    return res.status(200).json({
        mensaje: 'Accion de registro de usuarios.',
    });
};

// exportar acciones
module.exports = {
    pruebaUser,
    register,
};
