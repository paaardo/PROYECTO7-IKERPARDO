const jwt = require('jsonwebtoken')
const Usuario = require('../models/user')

module.exports = async function (req, res, next) {
  const token = req.header('x-auth-token')

  if (!token) {
    return res.status(401).json({ msg: 'No hay token, autorización denegada' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.usuario = decoded.usuario

    const usuario = await Usuario.findById(req.usuario.id)

    if (!usuario) {
      return res.status(401).json({ msg: 'Token no válido' })
    }

    if (usuario.rol === 'admin' && req.baseUrl.includes('admin')) {
      return next()
    }

    if (usuario.rol === 'usuario' && !req.baseUrl.includes('admin')) {
      return next()
    }

    return res.status(403).json({ msg: 'Acceso denegado para este usuario' })
  } catch (err) {
    console.error(err.message)
    res.status(401).json({ msg: 'Token no válido' })
  }
}
