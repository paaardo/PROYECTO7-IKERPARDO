const express = require('express')
const router = express.Router()
const controladorUsuario = require('../controllers/userController')
const auth = require('../middleware/auth')

router.get('/', auth, controladorUsuario.obtenerUsuarios)

router.put('/:id/rol', auth, controladorUsuario.cambiarRolUsuario)

router.delete('/:id', auth, controladorUsuario.eliminarUsuario)

module.exports = router
