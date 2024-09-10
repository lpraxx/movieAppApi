const Comment = require('../models/Comment');
const Movie = require('../models/Movie');

module.exports.addComment = async (req, res) => {
    try {
        const { movieId, userId, comment } = req.body;  // Use 'comment' instead of 'text' for consistency

        // Check if the movie exists
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).send({ message: 'Movie not found' });
        }

        // Create and save new comment
        const newComment = new Comment({ movieId, userId, comment });
        await newComment.save();
        
        res.status(201).send({ message: 'Comment added successfully', comment: newComment });
    } catch (err) {
        res.status(500).send({ message: 'Error adding comment', error: err.message });
    }
};

module.exports.getCommentsByMovieId = async (req, res) => {
    try {
        const { movieId } = req.params;

        // Check if the movie exists
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).send({ message: 'Movie not found' });
        }

        // Retrieve comments for the given movie
        const comments = await Comment.find({ movieId }).populate('userId', 'username');
        
        res.status(200).send(comments);
    } catch (err) {
        res.status(500).send({ message: 'Error retrieving comments', error: err.message });
    }
};
