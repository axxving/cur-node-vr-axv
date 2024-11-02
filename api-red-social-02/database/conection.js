const mongoose = require('mongoose');

const conection = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/mi_red_social', {});

        console.log('Conectado correctamente a bd: mi_red_social');
    } catch {
        console.log(error);
        throw new Error('No se ha podido conectar a la base de datos');
    }
};

// Exportar para poder usar en el index
module.exports = {
    conection,
};
