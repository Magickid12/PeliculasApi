# Movie-API

## Descripción

API RESTful para gestionar información de películas y usuarios. Permite consultar, buscar, crear y administrar películas, así como registrar usuarios y gestionar favoritos.

## Tecnologías utilizadas

- Node.js, Express.js, MongoDB Atlas, Mongoose
- JWT (jsonwebtoken), Passport.js, Bcrypt
- Express-validator, CORS

## Estructura del proyecto

- `index.js`: punto de entrada de la app
- `models/`: esquemas de Mongoose para películas y usuarios
- `routes/`: rutas de la API (usuarios, películas, login)
- `middleware/`: Passport, Swagger y middlewares
- `prueba.html`: frontend de prueba para consumir la API
- `seed.js`: script para poblar la base de datos con datos de ejemplo

## Instalación y uso

1. Clona el repositorio y entra a la carpeta:
   ```bash
   git clone <repo-url>
   cd Movie-API
   ```
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Crea un archivo `.env` con:
   ```env
   CONNECTION_URI=<tu cadena de conexión de MongoDB Atlas>
   JWT_SECRET=<tu secreto JWT>
   PORT=8080
   ```
4. (Opcional ASEGURATE ANTES QUE LA BASE DE DATOS NO ESTE POBLADA YA) Pobla la base de datos con datos de ejemplo:
   ```bash
   ejecuta node seed.js 
   ```
5. Inicia el servidor:
   ```bash
   npm start
   ```
6. La API estará disponible en: http://localhost:8080

## Uso de la API

- La autenticación es por JWT. Usa `/login` para obtener un token y agrégalo como `Bearer <token>` en el header `Authorization` para endpoints protegidos.
- Consulta la documentación interactiva en `/docs` (Swagger UI).

## Ejemplo de flujo de autenticación

1. POST `/login` con usuario y contraseña → recibe un JWT.
2. Usa ese JWT en el frontend para consumir endpoints protegidos.

## Ejemplo de endpoints principales

- POST `/users` — registro de usuario
- POST `/login` — login y obtención de JWT
- GET `/movies` — lista de películas (protegido)
- GET `/movies/search/{query}` — búsqueda flexible de películas
- POST `/movies` — crear película (protegido)

## CORS

CORS está habilitado para permitir peticiones desde el frontend.

## Manejo de errores

Todos los endpoints devuelven mensajes claros y consistentes en caso de error (campos faltantes, validaciones, etc).

## Seguridad

- No subas tu `.env` ni el secreto JWT a repositorios públicos.
- Cambia el secreto JWT antes de producción.

