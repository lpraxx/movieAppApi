const express = require('express');
const commentController = require('../controllers/comment');
const { isLoggedIn } = require('../auth');
const router = express.Router();

router.post('/addComment', isLoggedIn, commentController.addComment);
router.get('/getComments/:movieId', commentController.getCommentsByMovieId);

module.exports = router;  // Ensure this is exporting the router
