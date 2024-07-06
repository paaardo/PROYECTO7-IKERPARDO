const mongoose = require('mongoose')

const schemaPublicacion = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  contenido: {
    type: String,
    required: true
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  comentarios: [
    {
      usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
      },
      texto: {
        type: String,
        required: true
      }
    }
  ]
})

module.exports = mongoose.model('Publicacion', schemaPublicacion)
