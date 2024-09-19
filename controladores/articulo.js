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

// Exportando el controlador para que pueda ser usado
module.exports = {
  prueba,
  curso,
};
