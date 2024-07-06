const Usuario = require('../models/user')

exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select('-contraseña')
    res.json(usuarios)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Error en el servidor')
  }
}

exports.cambiarRolUsuario = async (req, res) => {
  try {
    const { id } = req.params
    const { rol } = req.body

    let usuario = await Usuario.findById(id)
    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado' })
    }

    if (req.usuario.id === id) {
      return res.status(403).json({ msg: 'No puedes modificar tu propio rol' })
    }

    usuario.rol = rol
    await usuario.save()

    res.json(usuario)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Error en el servidor')
  }
}

exports.eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params

    let usuario = await Usuario.findById(id)
    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado' })
    }

    if (req.usuario.rol === 'admin' || req.usuario.id === id) {
      await usuario.remove()
      return res.json({ msg: 'Usuario eliminado' })
    } else {
      return res
        .status(403)
        .json({ msg: 'No tienes permiso para eliminar este usuario' })
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Error en el servidor')
  }
}
