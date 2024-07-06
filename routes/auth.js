const express = require('express')
const router = express.Router()
const controladorAuth = require('../controllers/authController')
const auth = require('../middleware/auth')

router.post('/register', controladorAuth.registro)
router.post('/login', controladorAuth.iniciarSesion)
router.get('/', auth, controladorAuth.obtenerUsuarioAutenticado)

module.exports = router
