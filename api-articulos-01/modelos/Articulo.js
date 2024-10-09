const { Schema, model } = require("mongoose");

// Modelo de articulos
const ArticuloSchema = Schema({
  titulo: {
    type: String,
    require: true,
  },
  contenido: {
    type: String,
    require: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
  imagen: {
    type: String,
    default: "default.png",
  },
});

// Exportando el modelo 
module.exports = model("Articulo", ArticuloSchema, "articulos");
