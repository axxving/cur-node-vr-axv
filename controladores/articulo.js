const fs = require("fs");
const { validarArticulo } = require("../helpers/validar");
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
    validarArticulo(parametros);
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
    validarArticulo(articuloAEditar);

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

const subir = async (req, res) => {
  try {
    // Recoger la imagen

    if (!req.file && !req.files) {
      return res.status(404).json({
        status: "error",
        mensaje: "Petición invalida.",
      });
    }

    // Nombre del archivo
    let archivo = req.file.originalname;

    // Extensión del archivo subido
    let extension = archivo.split(".").pop().toLowerCase();

    // Comprobar la extensión correcta
    if (extension !== "jpg" && extension !== "png" && extension !== "gif") {
      // Borrar archivo y dar respuesta
      fs.unlink(req.file.path, (error) => {
        if (error) {
          return res.status(500).json({
            status: "error",
            mensaje: "Error al eliminar el archivo incorrecto",
          });
        }
        return res.status(400).json({
          status: "error",
          mensaje: "La imagen no tiene la extensión correcta",
        });
      });
      return; // Termina la ejecución si la extensión es incorrecta
    }

    // Si todo va bien, devolver una respuesta
    return res.status(200).json({
      status: "success",
      mensaje: "Todo funciona correctamente",
      file: req.file,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      mensaje: "Error en el proceso de subida de la imagen",
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
  subir,
};
