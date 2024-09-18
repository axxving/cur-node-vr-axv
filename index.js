const { conexion } = require("./baseDatos/coneccion");

// Inicializar app
console.log("App de node arrancada");

// Conectar a la base de datos
conexion();
