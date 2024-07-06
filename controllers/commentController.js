const Comentario = require('../models/comment')

exports.crearComentario = async (req, res) => {
  try {
    const nuevoComentario = new Comentario({
      ...req.body,
      usuario: req.usuario.id
    })

    const comentario = await nuevoComentario.save()
    res.json(comentario)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Error en el servidor')
  }
}

exports.obtenerComentarios = async (req, res) => {
  try {
    const comentarios = await Comentario.find()
      .populate('usuario', 'nombreUsuario correoElectronico')
      .populate('publicacion', 'titulo')
    res.json(comentarios)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Error en el servidor')
  }
}

exports.actualizarComentario = async (req, res) => {
  try {
    const comentario = await Comentario.findById(req.params.id)
    if (!comentario)
      return res.status(404).json({ msg: 'Comentario no encontrado' })

    if (comentario.usuario.toString() !== req.usuario.id) {
      return res
        .status(403)
        .json({ msg: 'No tienes permisos para esta acción' })
    }

    comentario.texto = req.body.texto || comentario.texto

    const comentarioActualizado = await comentario.save()
    res.json(comentarioActualizado)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Error en el servidor')
  }
}

exports.eliminarComentario = async (req, res) => {
  try {
    const comentario = await Comentario.findById(req.params.id)
    if (!comentario)
      return res.status(404).json({ msg: 'Comentario no encontrado' })

    if (comentario.usuario.toString() !== req.usuario.id) {
      return res
        .status(403)
        .json({ msg: 'No tienes permisos para esta acción' })
    }

    await comentario.remove()
    res.json({ msg: 'Comentario eliminado' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Error en el servidor')
  }
}
