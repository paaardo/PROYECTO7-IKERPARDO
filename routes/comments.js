const express = require('express')
const router = express.Router()
const controladorComentario = require('../controllers/commentController')
const auth = require('../middleware/auth')

router.post('/', auth, controladorComentario.crearComentario)
router.get('/', controladorComentario.obtenerComentarios)
router.put('/:id', auth, controladorComentario.actualizarComentario)
router.delete('/:id', auth, controladorComentario.eliminarComentario)

module.exports = router
