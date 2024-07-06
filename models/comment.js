const mongoose = require('mongoose')

const schemaComentario = new mongoose.Schema({
  texto: {
    type: String,
    required: true
  },
  publicacion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Publicacion',
    required: true
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  }
})

module.exports = mongoose.model('Comentario', schemaComentario)
