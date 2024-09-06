const Comment = require('../models/Comment');
const Movie = require('../models/Movie');

module.exports.addComment = async (req, res) => {
    try {
        const { movieId, userId, text } = req.body;

        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).send({ message: 'Movie not found' });
        }

        const newComment = new Comment({ movieId, userId, text });
        await newComment.save();
        res.status(201).send({ message: 'Comment added successfully' });
    } catch (err) {
        res.status(500).send({ message: 'Error adding comment', error: err.message });
    }
};

module.exports.getCommentsByMovieId = async (req, res) => {
    try {
        const comments = await Comment.find({ movieId: req.params.movieId });
        res.status(200).send(comments);
    } catch (err) {
        res.status(500).send({ message: 'Error retrieving comments', error: err.message });
    }
};
