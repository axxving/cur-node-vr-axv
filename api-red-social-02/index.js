// Importar dependencias
const { conection } = require("./database/conection");

// Mensaje de bienvenida
console.log("API NODE para RED SOCIAL arrancada");

// Conexion a la base de datos
conection();

// Crear un servidor de node