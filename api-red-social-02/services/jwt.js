const jwt = require('jwt-simple');
const moment = require('moment');

// Clave secreta
const secret = 'clavemuysecreta';

// Función para generar tokens
const generateToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        surname: user.surname,
        nick: user.nick,
        email: user.email,
        role: user.role,
        imagen: user.image,
        iat: moment().unix(),
        exp: moment().add(300000, 'days').unix(),
    };

    // Devolver jwt token codificado
    return jwt.encode(payload, secret);
};

module.exports = {
    generateToken,
};
