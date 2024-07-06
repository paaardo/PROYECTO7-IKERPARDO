require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = 3000

app.use(express.json())

const rutasAuth = require('./routes/auth')
const rutasUsuarios = require('./routes/users')
const rutasPosts = require('./routes/posts')

app.use('/api/auth', rutasAuth)
app.use('/api/users', rutasUsuarios)
app.use('/api/posts', rutasPosts)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB operativo rey'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err))

app.get('/', (req, res) => {
  res.send('La API esta fina')
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})
