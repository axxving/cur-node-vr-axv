const mongoose = require("mongoose");

const conexion = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/mi_blog");

    // Parametros a pasar dentro de un objeto // solo en caso de aviso
    // useNewUrlParser: true
    // useUnifiedTopology: true
    // useCreateIndex: true

    console.log("Conectado a la base de datos mi_blog");
  } catch {
    console.log(error);
    throw new Error("No se pudo conectar con la base de datos");
  }
};

// Exportando la funcion (conexion)
module.exports = {
  conexion,
};
