# Movie-API

## Descripción

Esta es una API RESTful que permite gestionar información de películas y usuarios. Permite consultar detalles de películas, registrar usuarios, iniciar sesión y administrar una lista de películas favoritas.

## Tecnologías utilizadas

- **Node.js** como entorno de ejecución.
- **Express.js** como framework backend.
- **MongoDB** como base de datos NoSQL.
- **Mongoose** para el modelado de datos.
- **JWT (jsonwebtoken)** para autenticación basada en tokens.
- **Passport.js** para autenticación con estrategia JWT.
- **Bcrypt** para el hash de contraseñas.
- **Express-validator** para validación de datos.
- **CORS** para permitir el consumo de la API desde otras aplicaciones.

## Funcionalidades principales

- Registro y autenticación de usuarios.
- CRUD de usuarios (actualización, eliminación, obtener datos).
- Consultar todas las películas o una por título.
- Consultar películas por género o director.
- Agregar o eliminar películas favoritas de un usuario.

## Cómo ejecutar el proyecto

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/Movie-API.git
cd Movie-API

Instalar dependencias:

npm install

Crear un archivo .env con el siguiente contenido:

CONNECTION_URI=mongodb://localhost:27017/moviesdb
PORT=8080

Iniciar el servidor:

npm run start

La API estará disponible en: http://localhost:8080

