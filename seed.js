require('dotenv').config()
const mongoose = require('mongoose')
const Usuario = require('./models/user')
const Publicacion = require('./models/post')
const Comentario = require('./models/comment')

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log('Conectado a MongoDB')

    // Limpiar la base de datos
    await Usuario.deleteMany({})
    await Publicacion.deleteMany({})
    await Comentario.deleteMany({})

    // Crear usuarios
    const usuario1 = new Usuario({
      nombreUsuario: 'usuario1',
      correoElectronico: 'usuario1@example.com',
      contraseña: 'contraseña1'
    })
    const usuario2 = new Usuario({
      nombreUsuario: 'usuario2',
      correoElectronico: 'usuario2@example.com',
      contraseña: 'contraseña2'
    })

    await usuario1.save()
    await usuario2.save()

    // Crear publicaciones
    const publicacion1 = new Publicacion({
      titulo: 'Post 1',
      contenido: 'Contenido del post 1',
      autor: usuario1._id,
      comentarios: []
    })
    const publicacion2 = new Publicacion({
      titulo: 'Post 2',
      contenido: 'Contenido del post 2',
      autor: usuario2._id,
      comentarios: []
    })

    await publicacion1.save()
    await publicacion2.save()

    // Crear comentarios
    const comentario1 = new Comentario({
      texto: 'Comentario 1',
      publicacion: publicacion1._id,
      usuario: usuario2._id
    })
    const comentario2 = new Comentario({
      texto: 'Comentario 2',
      publicacion: publicacion2._id,
      usuario: usuario1._id
    })

    await comentario1.save()
    await comentario2.save()

    console.log('Base de datos completa')
    process.exit()
  } catch (error) {
    console.error('Error al poblar la base de datos:', error.message)
    process.exit(1)
  }
}

seedDatabase()
