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
        res.status(200).send({movies: movies});
    } catch (err) {
        res.status(500).send({ message: 'Error retrieving movies', error: err.message });
    }
};

module.exports.getMovieById = (req, res) => {
    const movieId = req.params.id;

    Movie.findById(movieId)
        .populate('comments.userId', 'firstName lastName')
        .then(movie => {
            if (!movie) {
                return res.status(404).json({ message: 'Movie not found' });
            }
            res.status(200).json(movie);
        })
        .catch(err => {
            res.status(500).json({ message: 'Error retrieving movie', error: err.message });
        });
};

module.exports.updateMovie = (req, res) => {
    const movieId = req.params.id;
    const updateData = {
        title: req.body.title,
        director: req.body.director,
        year: req.body.year,
        description: req.body.description,
        genre: req.body.genre,
    };

    Movie.findByIdAndUpdate(movieId, updateData, { new: true })
        .then(updatedMovie => {
            if (!updatedMovie) {
                return res.status(404).json({ message: 'Movie not found' });
            }
            res.status(200).json({
                message: 'Movie updated successfully',
                updatedMovie
            });
        })
        .catch(err => {
            res.status(500).json({ message: 'Error updating movie', error: err.message });
        });
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
