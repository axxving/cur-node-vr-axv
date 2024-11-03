// Importar modulos
const jwt = require('jwt-simple');
const moment = require('moment');

// Importar clave secreta
const libjwt = require('../services/jwt');
const secret = libjwt.secret;

// MIDDLEWARE de autenticacion
exports.auth = (req, res, next) => {
    // Comprobar si me llega l cabecera de auth
    if (!req.headers.authorization) {
        return res.status(403).send({
            status: 'error',
            message: 'No se ha proporcionado la cabecera de autenticación',
        });
    }

    // Limpiar el token
    const token = req.headers.authorization.replace(/[''"]+/g, '');

    // Decodificar token
    try {
        let payload = jwt.decode(token, secret);

        // comprobar expiracion del token
        if (payload.exp <= moment().unix()) {
            return res.status(401).send({
                status: 'error',
                message: 'Token invalido',
            });
        }

        // Agregar datos de usuario a request
        req.user = payload;
    } catch (error) {
        return res.status(404).send({
            status: 'error',
            message: 'Token no válido',
        });
    }

    // Pasar a ejecucion de accion
    next();
};
