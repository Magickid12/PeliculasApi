# Movie-API

## Descripción

API RESTful para gestionar información de películas y usuarios. Permite consultar, buscar, crear y administrar películas, así como registrar usuarios y gestionar favoritos.

---

## ¿Cómo correr el proyecto si lo descargas desde GitHub?

1. **Clona el repositorio y entra a la carpeta:**
   ```bash
   git clone <repo-url>
   cd Movie-API
   ```
2. **Instala dependencias:**
   ```bash
   npm install
   ```
3. **Crea un archivo `.env` con:**
   ```env
   CONNECTION_URI=<tu cadena de conexión de MongoDB Atlas>
   JWT_SECRET=<tu secreto JWT>
   PORT=8080
   ```
4. **(Opcional, solo si la base está vacía) Pobla la base de datos con datos de ejemplo:**
   ```bash
   node seed.js
   ```
5. **Inicia el servidor:**
   ```bash
   npm start
   ```
6. **La API estará disponible en:**
   - Local: http://localhost:8080
   - Heroku: https://<tu-app>.herokuapp.com

---

## CORS

El backend tiene habilitado CORS para aceptar peticiones desde cualquier origen (útil para desarrollo y pruebas). Si necesitas restringirlo en producción, edita la configuración en `index.js`.

---

## ¿Cómo consumir la API?

- **Autenticación:**
  - Haz un POST a `/login` con usuario y contraseña para obtener un JWT.
  - Usa ese JWT en el header `Authorization` como `Bearer <token>` para acceder a endpoints protegidos.

- **Endpoints principales:**
  - POST `/users` — registro de usuario
  - POST `/login` — login y obtención de JWT
  - GET `/movies` — lista de películas (protegido)
  - GET `/movies/search/{query}` — búsqueda flexible de películas
  - POST `/movies` — crear película (protegido)

- **Respuestas y errores:**
  - Todos los endpoints devuelven mensajes claros y consistentes en caso de error (campos faltantes, validaciones, etc).

---

## ¿Cómo probar los endpoints en Swagger?

1. Accede a la documentación interactiva Swagger UI en:
   - Local: http://localhost:8080/docs O http://localhost:8080/documentation.html/
   - Heroku: https://<tu-app>.herokuapp.com/docs
2. Haz clic en "Authorize" e ingresa tu JWT para probar endpoints protegidos. (EL JWT LO OBTIENES HACIENDO EL LOGIN)
3. Prueba cualquier endpoint directamente desde la interfaz.

---

## ¿Cómo acceder y usar prueba.html?

- Abre el archivo `prueba.html` en tu navegador (puedes abrirlo localmente o subirlo a un hosting).
- Ingresa los datos en los formularios para probar login, registro, búsqueda, creación y gestión de usuarios/películas.
- El archivo guarda el JWT tras login y lo usa automáticamente en los endpoints protegidos.
- Los resultados y logs de cada acción se muestran en pantalla.

---

## Estructura del proyecto

- `index.js`: punto de entrada de la app
- `models/`: esquemas de Mongoose para películas y usuarios
- `routes/`: rutas de la API (usuarios, películas, login)
- `middleware/`: Passport, Swagger y middlewares
- `prueba.html`: frontend de prueba para consumir la API
- `seed.js`: script para poblar la base de datos con datos de ejemplo

---

