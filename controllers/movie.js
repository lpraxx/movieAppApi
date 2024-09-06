const Movie = require('../models/Movie');
const auth = require('../auth');
const { errorHandler } = auth;



module.exports.addMovie = async (req, res) => {
    try {
        const { title, director, year, description, genre } = req.body;

        const newMovie = new Movie({ title, director, year, description, genre });
        await newMovie.save();
        res.status(201).send({ message: 'Movie added successfully' });
    } catch (err) {
        res.status(500).send({ message: 'Error adding movie', error: err.message });
    }
};

module.exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).send(movies);
    } catch (err) {
        res.status(500).send({ message: 'Error retrieving movies', error: err.message });
    }
};

module.exports.getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).send({ message: 'Movie not found' });
        }
        res.status(200).send(movie);
    } catch (err) {
        res.status(500).send({ message: 'Error retrieving movie', error: err.message });
    }
};

module.exports.updateMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!movie) {
            return res.status(404).send({ message: 'Movie not found' });
        }
        res.status(200).send({ message: 'Movie updated successfully', movie });
    } catch (err) {
        res.status(500).send({ message: 'Error updating movie', error: err.message });
    }
};

module.exports.deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) {
            return res.status(404).send({ message: 'Movie not found' });
        }
        res.status(200).send({ message: 'Movie deleted successfully' });
    } catch (err) {
        res.status(500).send({ message: 'Error deleting movie', error: err.message });
    }
};
