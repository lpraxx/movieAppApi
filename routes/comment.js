const express = require('express');
const commentController = require('../controllers/comment');
const { verify, isLoggedIn } = require('../auth');
const router = express.Router();

// Route to add a comment
router.post('/addComment', verify, isLoggedIn, commentController.addComment);

// Route to get all comments for a specific movie
router.get('/getComments/:movieId', verify, commentController.getCommentsByMovieId);

module.exports = router;
