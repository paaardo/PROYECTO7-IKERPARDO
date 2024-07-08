# PROYECTO7-IKERPARDO

## Descripción

Este proyecto es una API construida con Express y MongoDB que incluye un sistema de usuarios con roles, publicaciones y comentarios. Permite la creación, lectura, actualización y eliminación (CRUD) de estas entidades y establece relaciones entre ellas. Ademas, incluye autenticación con JWT y permisos basados en roles.

## Requisitos

- Node.js
- MongoDB Atlas

## Configuración del Proyecto

1. Clonar el repositorio.
2. Ejecutar `npm install` para instalar las dependencias.
3. Llenar la base de datos con datos iniciales ejecutando `node seed.js`.

## Scripts

- `npm start`: Inicia el servidor en modo producción.
- `npm run dev`: Inicia el servidor en modo desarrollo con nodemon.

## Endpoints

### Autenticación

- `POST /api/auth/register`: Registro de un nuevo usuario.
- `POST /api/auth/login`: Inicio de sesión.
- `GET /api/auth`: Obtener usuario autenticado.

### Usuarios

- `GET /api/users`: Obtener todos los usuarios (solo para admins).
- `PUT /api/users/:id/rol`: Cambiar el rol de un usuario (solo para admins).
- `DELETE /api/users/:id`: Eliminar un usuario.

### Publicaciones

- `POST /api/posts`: Crear una nueva publicación.
- `GET /api/posts`: Obtener todas las publicaciones.
- `PUT /api/posts/:id`: Actualizar una publicación.
- `DELETE /api/posts/:id`: Eliminar una publicación.

### Comentarios

- `POST /api/comments`: Crear un nuevo comentario.
- `GET /api/comments`: Obtener todos los comentarios.
- `PUT /api/comments/:id`: Actualizar un comentario.
- `DELETE /api/comments/:id`: Eliminar un comentario.

## Permisos

- Solo los usuarios con rol `admin` pueden ver todos los usuarios y cambiar roles.
- Los usuarios pueden eliminar su propia cuenta.
- Los admins pueden eliminar cualquier usuario.
- Solo los admins pueden crear, actualizar y eliminar publicaciones.
- Los usuarios pueden crear, actualizar y eliminar sus propios comentarios.

## Middleware

- `auth.js`: Verifica el token JWT en las peticiones.
- `admin.js`: Verifica si el usuario tiene rol de admin.
