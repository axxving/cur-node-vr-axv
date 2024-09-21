const validator = require("validator");
const Articulo = require("../modelos/Articulo");

// Generando un controlador
const prueba = (req, res) => {
  return res.status(200).json({
    mensaje: "Soy una accion de prueba en mi controlador de articulos",
  });
};

// Generando controlador
const curso = (req, res) => {
  console.log("Se ha ejecutado el endpoint de probando");

  return res.status(200).json([
    {
      curso: "Master en react",
      autor: "Victor Robles",
      url: "victorrobles.es/master-react",
    },
    {
      curso: "Master en vue",
      autor: "Victor Robles",
      url: "victorrobles.es/master-vue",
    },
  ]);
};

// **! El error que estás recibiendo está relacionado con la versión más reciente de Mongoose. En la última versión de Mongoose, el método save() ya no acepta callbacks como solía hacerlo. Ahora, save() devuelve una promesa, y deberás usar la sintaxis de promesas (then/catch) o async/await para manejar la operación.

// Método de guardar
const crear = async (req, res) => {
  // Recoger los parámetros por post al guardar
  let parametros = req.body;

  // Validar datos
  try {
    let validarTitulo =
      !validator.isEmpty(parametros.titulo) &&
      validator.isLength(parametros.titulo, { min: 5, max: undefined });
    let validarContenido = !validator.isEmpty(parametros.contenido);

    if (!validarTitulo || !validarContenido) {
      throw new Error("No se ha validado la información");
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Faltan datos por enviar",
    });
  }

  try {
    // Crear el objeto a guardar
    const articulo = new Articulo(parametros);

    // Guardar el artículo en la base de datos
    const articuloGuardado = await articulo.save();

    // Devolver el resultado
    return res.status(200).json({
      status: "success",
      articulo: articuloGuardado,
      mensaje: "Artículo creado con éxito",
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "No se ha guardado el artículo",
    });
  }
};

// Exportando el controlador para que pueda ser usado
module.exports = {
  prueba,
  curso,
  crear,
};
