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

const listar = async (req, res) => {
  try {
    let articulos;

    if (req.params.ultimos) {
      articulos = await Articulo.find({}).sort({ fecha: -1 }).limit(3);
    } else {
      articulos = await Articulo.find({}).sort({ fecha: -1 });
    }

    return res.status(200).send({
      status: "success",
      contador: articulos.length,
      articulos,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "No se han encontrado artículos",
    });
  }
};

const unArticulo = async (req, res) => {
  try {
    // Recoger el id de la URL
    let id = req.params.id;

    // Buscar un artículo por su id
    const articulo = await Articulo.findById(id);

    // Si no se encuentra el artículo, lanzar un error
    if (!articulo) {
      return res.status(404).json({
        status: "error",
        mensaje: "No se ha encontrado el artículo",
      });
    }

    // Si se encuentra el artículo, devolver el resultado
    return res.status(200).json({
      status: "success",
      articulo,
    });
  } catch (error) {
    // Manejar errores y devolver una respuesta de error
    return res.status(500).json({
      status: "error",
      mensaje: "Error en la consulta del artículo",
    });
  }
};

const borrarArticulo = async (req, res) => {
  try {
    // Recoger el id del artículo a borrar
    let id = req.params.id;

    // Buscar y borrar el artículo
    const articuloBorrado = await Articulo.findOneAndDelete({ _id: id });

    // Si no se encuentra el artículo, lanzar un error
    if (!articuloBorrado) {
      return res.status(404).json({
        status: "error",
        mensaje: "No se ha encontrado el artículo",
      });
    }

    // Si se encuentra y se borra el artículo, devolver el resultado
    return res.status(200).json({
      status: "success",
      articulo: articuloBorrado,
    });
  } catch (error) {
    // Manejar errores y devolver una respuesta de error
    return res.status(500).json({
      status: "error",
      mensaje: "Error en el proceso de borrado del artículo",
    });
  }
};

const editar = async (req, res) => {
  try {
    // Obtener el id del articulo
    const id = req.params.id;

    // Recoger los datos del body
    const articuloAEditar = req.body;

    // Validar datos
    const validarTitulo =
      !validator.isEmpty(articuloAEditar.titulo) &&
      validator.isLength(articuloAEditar.titulo, { min: 5 });
    const validarContenido = !validator.isEmpty(articuloAEditar.contenido);

    if (!validarTitulo || !validarContenido) {
      return res.status(400).json({
        status: "error",
        mensaje: "Validación fallida. Datos incorrectos.",
      });
    }

    // Buscar y actualizar articulo
    const articuloActualizado = await Articulo.findOneAndUpdate(
      { _id: id },
      articuloAEditar,
      // Para devolver el artículo actualizado
      { new: true }
    );

    // Si no se encuentra el artículo, devolver error
    if (!articuloActualizado) {
      return res.status(404).json({
        status: "error",
        mensaje: "No se ha encontrado el artículo",
      });
    }

    // Devolver una respuesta con el artículo actualizado
    return res.status(200).json({
      status: "success",
      articulo: articuloActualizado,
    });
  } catch (error) {
    // Manejar errores y devolver una respuesta de error
    return res.status(500).json({
      status: "error",
      mensaje: "Error en el proceso de edición del artículo",
    });
  }
};

// Exportando el controlador para que pueda ser usado
module.exports = {
  prueba,
  curso,
  crear,
  listar,
  unArticulo,
  borrarArticulo,
  editar,
};
