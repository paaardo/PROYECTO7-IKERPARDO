const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/user')

exports.registro = async (req, res) => {
  const { nombreUsuario, correoElectronico, contraseña } = req.body

  try {
    let usuario = await Usuario.findOne({ correoElectronico })
    if (usuario) {
      return res.status(400).json({ msg: 'El usuario ya existe' })
    }

    const usuarios = await Usuario.find()
    const rol = usuarios.length === 0 ? 'admin' : 'usuario'

    usuario = new Usuario({
      nombreUsuario,
      correoElectronico,
      contraseña,
      rol
    })

    const salt = await bcrypt.genSalt(10)
    usuario.contraseña = await bcrypt.hash(contraseña, salt)

    await usuario.save()

    const payload = {
      usuario: {
        id: usuario.id
      }
    }

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err
        res.json({ token })
      }
    )
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Error en el servidor')
  }
}

exports.iniciarSesion = async (req, res) => {
  const { correoElectronico, contraseña } = req.body

  try {
    let usuario = await Usuario.findOne({ correoElectronico })
    if (!usuario) {
      return res.status(400).json({ msg: 'Credenciales no válidas' })
    }

    const isMatch = await bcrypt.compare(contraseña, usuario.contraseña)
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciales no válidas' })
    }

    const payload = {
      usuario: {
        id: usuario.id
      }
    }

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err
        res.json({ token })
      }
    )
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Error en el servidor')
  }
}

exports.obtenerUsuarioAutenticado = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select('-contraseña')
    res.json(usuario)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Error en el servidor')
  }
}
