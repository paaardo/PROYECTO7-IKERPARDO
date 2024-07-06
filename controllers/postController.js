const Publicacion = require('../models/post')

exports.crearPost = async (req, res) => {
  try {
    const nuevaPublicacion = new Publicacion({
      ...req.body,
      autor: req.usuario.id
    })

    const publicacion = await nuevaPublicacion.save()
    res.json(publicacion)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Error en el servidor')
  }
}

exports.obtenerPosts = async (req, res) => {
  try {
    const publicaciones = await Publicacion.find().populate(
      'autor',
      'nombreUsuario correoElectronico'
    )
    res.json(publicaciones)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Error en el servidor')
  }
}

exports.actualizarPost = async (req, res) => {
  try {
    const publicacion = await Publicacion.findById(req.params.id)
    if (!publicacion)
      return res.status(404).json({ msg: 'Publicación no encontrada' })

    if (publicacion.autor.toString() !== req.usuario.id) {
      return res
        .status(403)
        .json({ msg: 'No tienes permisos para esta acción' })
    }

    publicacion.titulo = req.body.titulo || publicacion.titulo
    publicacion.contenido = req.body.contenido || publicacion.contenido

    const publicacionActualizada = await publicacion.save()
    res.json(publicacionActualizada)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Error en el servidor')
  }
}

exports.eliminarPost = async (req, res) => {
  try {
    const publicacion = await Publicacion.findById(req.params.id)
    if (!publicacion)
      return res.status(404).json({ msg: 'Publicación no encontrada' })

    if (publicacion.autor.toString() !== req.usuario.id) {
      return res
        .status(403)
        .json({ msg: 'No tienes permisos para esta acción' })
    }

    await publicacion.remove()
    res.json({ msg: 'Publicación eliminada' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Error en el servidor')
  }
}
