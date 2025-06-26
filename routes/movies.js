const express = require('express');

const passport = require("../middleware/passport");
const {Movies} = require("../models/movies.model");

const moviesRouter = express.Router();


moviesRouter.get('/movies', passport.authenticate('jwt', {session: false}), handleGetMovies());

moviesRouter.get('/movies/:Title', passport.authenticate('jwt', {session: false}), handleGetMovieByTitle());

moviesRouter.get('/movies/genre/:Name', passport.authenticate('jwt', {session: false}), handleGetGenreByName());

moviesRouter.get('/movies/director/:Name', passport.authenticate('jwt', {session: false}), handleGetDirectorByName());

moviesRouter.post('/movies', passport.authenticate('jwt', {session: false}), handleCreateMovie());

// SEARCH - Buscar películas por coincidencia parcial en el título
moviesRouter.get('/movies/search/:query', passport.authenticate('jwt', {session: false}), (req, res) => {
    const search = req.params.query;
    // Búsqueda insensible a mayúsculas/minúsculas y parcial
    Movies.find({ Title: { $regex: search, $options: 'i' } })
        .then(movies => {
            if (movies.length === 0) {
                return res.status(404).json({ message: 'No se encontraron películas que coincidan con la búsqueda.' });
            }
            res.status(200).json(movies);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Error al buscar películas', details: err.message });
        });
});

// READ - Get movie
function handleGetMovies() {
    return (req, res) => {
        Movies.find()
            .then(movies => {
                res.status(200).json(movies);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Error: ' + err);
            });
    };
}

// READ - Get movie by title
function handleGetMovieByTitle() {
    return (req, res) => {
        Movies.findOne({Title: req.params.Title})
            .then((movie) => {
                res.status(200).json(movie);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Error: ' + err);
            })
    };
}

// READ - Get description of genre by genre's name
function handleGetGenreByName() {
    return (req, res) => {
        Movies.findOne({'Genre.Name': req.params.Name})
            .then((movie) => {
                res.status(200).json(movie.Genre);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Error: ' + err);
            });
    };
}

// READ - Get data about director by director's name
function handleGetDirectorByName() {
    return (req, res) => {
        Movies.findOne({'Director.Name': req.params.Name})
            .then((movie) => {
                res.status(200).json(movie.Director);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Error: ' + err);
            });
    };
}

// VALIDATE - Check if image URL is valid
function isValidImageUrl(url) {
    // Solo acepta imágenes de dominios conocidos (Imgur, Unsplash, Picsum, etc.)
    const allowedDomains = [
        'i.imgur.com',
        'images.unsplash.com',
        'i.picsum.photos',
        'cdn.pixabay.com',
        'media.giphy.com',
        'i.ibb.co',
        'img.freepik.com'
    ];
    try {
        const u = new URL(url);
        const ext = u.pathname.split('.').pop().toLowerCase();
        const validExt = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
        return allowedDomains.includes(u.hostname) && validExt.includes(ext);
    } catch (e) {
        return false;
    }
}

// CREATE - Add a new movie
function handleCreateMovie() {
    return (req, res) => {
        const { Title, Description, Genre, Director, ImageURL, Featured } = req.body;
        if (!Title || !Description || !Genre || !Director) {
            return res.status(400).json({ error: 'Faltan campos obligatorios: Title, Description, Genre, Director' });
        }
        if (ImageURL && !isValidImageUrl(ImageURL)) {
            return res.status(400).json({ error: 'El campo ImageURL debe ser una URL válida de imagen (jpg, jpeg, png, webp, gif) y de un dominio permitido (Imgur, Unsplash, Picsum, Pixabay, Giphy, Freepik, ibb.co)' });
        }
        Movies.create({
            Title,
            Description,
            Genre,
            Director,
            ImageURL,
            Featured
        })
        .then(movie => res.status(201).json(movie))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Error al crear la película', details: err.message });
        });
    };
}

module.exports = {moviesRouter};
