const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const schemaUsuario = new mongoose.Schema({
  nombreUsuario: {
    type: String,
    required: true,
    unique: true
  },
  correoElectronico: {
    type: String,
    required: true,
    unique: true
  },
  contraseña: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    enum: ['usuario', 'admin'],
    default: 'usuario'
  }
})

schemaUsuario.pre('save', function (next) {
  if (!this.isModified('rol')) return next()

  if (this.rol !== 'usuario') {
    return next(new Error('Solo se pueden crear usuarios con rol "usuario"'))
  }

  next()
})

schemaUsuario.pre('save', async function (next) {
  if (!this.isModified('contraseña')) return next()
  const salt = await bcrypt.genSalt(10)
  this.contraseña = await bcrypt.hash(this.contraseña, salt)
  next()
})

schemaUsuario.methods.compararContraseña = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.contraseña)
}

module.exports = mongoose.model('Usuario', schemaUsuario)
