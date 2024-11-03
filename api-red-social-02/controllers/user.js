const bcrypt = require('bcrypt');
const User = require('../models/model-user');

// Acciones de prueba
const pruebaUser = (req, res) => {
    return res.status(200).send({
        mensaje: 'Mensaje enviado desde: controllers/user.js',
    });
};

// Registro de usuario
const register = async (req, res) => {
    // Recoger datos de la petición
    const params = req.body;
    console.log(params);

    // Comprobar que llegan los datos necesarios (+ validación)
    if (!params.name || !params.email || !params.password || !params.nick) {
        console.log('Validación mínima no pasada');

        return res.status(400).send({
            status: 'error',
            mensaje: 'Faltan datos por enviar.',
            params: params,
        });
    }

    try {
        // Convertir email y nick a minúsculas antes de hacer la consulta para asegurar consistencia
        const email = params.email.toLowerCase();
        const nick = params.nick.toLowerCase();

        // Control de usuarios duplicados
        const users = await User.find({
            $or: [{ email: email }, { nick: nick }],
        });

        if (users.length > 0) {
            return res.status(409).send({
                // Cambié el código a 409 para conflicto
                status: 'error',
                mensaje: 'El usuario ya existe',
            });
        }

        // Cifrar la contraseña
        const pwd = await bcrypt.hash(params.password, 10);
        params.password = pwd;

        // Crear el objeto de usuario
        const user_to_save = new User({
            ...params,
            email: email,
            nick: nick,
        });

        // Guardar en la base de datos
        const userStored = await user_to_save.save();

        // Devolver resultado
        return res.status(201).send({
            status: 'success',
            mensaje: 'Usuario registrado correctamente',
            user: userStored,
        });
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            mensaje: 'Error en la petición o al guardar en la base de datos',
            error: error.message,
        });
    }
};

const loginUser = (req, res) => {
    // Recoger los parámetros
    const params = req.body;

    if (!params.email || !params.password) {
        return res.status(400).send({
            status: 'error',
            mensaje: 'Falta email o contraseña',
        });
    }

    // Buscar en la base de datos si existe
    User.findOne({ email: params.email })
        // .select({ password: 0 })
        .exec((error, user) => {
            if (error || !user) {
                return res.status(404).send({
                    status: 'error',
                    mensaje: 'Una de las credenciales no existe',
                });
            }

            // Comprobar su contraseña
            const pwd = bcrypt.compareSync(params.password, user.password);

            if (!pwd) {
                return res.status(400).send({
                    status: 'error',
                    mensaje: 'La contraseña no es correcta',
                });
            }

            // Conseguir Token
            const token = false;

            // Eliminar password del objeto

            // Devolver datos del usuario

            return res.status(200).send({
                status: 'success',
                mensaje: 'Login exitoso',
                user: {
                    id: user._id,
                    name: user.name,
                    nick: user.nick,
                },
                token,
            });
        });
};

// exportar acciones
module.exports = {
    pruebaUser,
    register,
    loginUser,
};
