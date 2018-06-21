function addMensaje (Nombre, Mensaje, database) {
  database.collection('Chat').add({
    name: Nombre,
    mensaje: Mensaje,
    fecha: new Date()
  });
};
