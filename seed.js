// Script de seed para Movie-API
// Ejecuta este archivo con: node seed.js
const mongoose = require('mongoose');
const { Movies } = require('./models/movies.model');
const { Users } = require('./models/users.model');
require('dotenv').config();

async function seed() {
  await mongoose.connect(process.env.CONNECTION_URI);
  await Movies.deleteMany({});
  await Users.deleteMany({});
  await Movies.insertMany([
    {
      Title: 'WALL-E',
      Description: 'Un robot solitario en la Tierra desierta del futuro...',
      Genre: { Name: 'Ciencia ficción', Description: 'Películas futuristas...' },
      Director: { Name: 'Andrew Stanton', Bio: 'Nació en Rockport...', Birth: '1965', Death: '2015' },
      ImageURL: 'https://i.imgur.com/EikSVq5.jpeg',
      Featured: true
    },
    {
      Title: 'Tron: El legado',
      Description: 'Película de ciencia ficción...',
      Genre: { Name: 'Ciencia ficción', Description: 'Género de películas futuristas' },
      Director: { Name: 'Joseph Kosinski', Bio: 'Director estadounidense...', Birth: '1974', Death: '' },
      ImageURL: 'https://i.imgur.com/gyx7pdb.png',
      Featured: false
    }
  ]);
  await Users.create({
    Name: 'demo',
    Password: await require('bcrypt').hash('demo123', 10),
    Email: 'demo@demo.com',
    Birthday: '1990-01-01',
    FavoriteMovies: []
  });
  console.log('Datos de ejemplo insertados.');
  await mongoose.disconnect();
}
seed();
