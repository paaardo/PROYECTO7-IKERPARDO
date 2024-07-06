const express = require('express')
const router = express.Router()
const controladorPost = require('../controllers/postController')
const auth = require('../middleware/auth')

router.post('/', auth, controladorPost.crearPost)
router.get('/', controladorPost.obtenerPosts)
router.put('/:id', auth, controladorPost.actualizarPost)
router.delete('/:id', auth, controladorPost.eliminarPost)

module.exports = router
