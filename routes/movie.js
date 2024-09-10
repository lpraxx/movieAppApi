const express = require('express');
const movieController = require('../controllers/movie');
const { verify, verifyAdmin, isLoggedIn } = require('../auth');
const router = express.Router();


router.post('/addMovie', verify, verifyAdmin, isLoggedIn, movieController.addMovie);
router.get('/getMovies', movieController.getAllMovies);
router.get('/getMovie/:id', movieController.getMovieById);
router.put('/updateMovie/:id', verify, verifyAdmin, isLoggedIn, movieController.updateMovie);
router.delete('/deleteMovie/:id', verify, verifyAdmin, isLoggedIn, movieController.deleteMovie);

module.exports = router;  // Ensure this is exporting the router
