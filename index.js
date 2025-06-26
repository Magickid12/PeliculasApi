require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
let fs = require('fs');
let path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const mongoose = require('mongoose');
const cors = require('cors');

const {loginRouter} = require("./routes/login");
const {moviesRouter} = require("./routes/movies");
const {usersRouter} = require("./routes/users");

const app = express();
const port = process.env.PORT || 8080;
const dsnConnection = process.env.CONNECTION_URI || 'mongodb://localhost:27017/test';



// CONNECT DATABASE AND REST API
mongoose.connect(dsnConnection, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('✅ Conexión exitosa a MongoDB Atlas'))
  .catch(err => {
    console.error('❌ Error al conectar a MongoDB Atlas:');
    if (err.message) {
      if (err.message.includes('failed to connect')) {
        console.error('No se pudo conectar al servidor de MongoDB. Verifica tu URI y tu conexión a internet.');
      } else if (err.message.includes('authentication')) {
        console.error('Error de autenticación. Verifica usuario y contraseña en la URI.');
      } else {
        console.error(err.message);
      }
    } else {
      console.error(err);
    }
  });


// LOGGING
const accessLogStream = fs.createWriteStream(path.join(__dirname, './middleware/log.txt'), {flags: 'a'});
app.use(morgan('combined', {stream: accessLogStream}));


// DOCUMENTATION
const swaggerDocument = YAML.load('./middleware/swagger.yaml');
app.use('/documentation.html', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// BODY PARSER
app.use(bodyParser.json());


// CORS MIDDLEWARE (SELECTION OF ALLOWED ORIGINS)
app.use(cors());


// PASSPORT
require('./middleware/passport');


// ROUTES
app.get('/', (req, res) => {
    res.send('Welcome to my Movie API!')
});

app.use(loginRouter);
app.use(moviesRouter);
app.use(usersRouter);


// CUSTOM ERROR FUNCTION
app.use((err, request, res, next) => {
    console.error(err);
    res.status(500).send('Something is broken!');
});


// LISTEN FOR REQUESTS
app.listen(port, '0.0.0.0',() => {
    console.log('Listening on Port ' + port);
});
