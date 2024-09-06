const express = require('express');
const workoutController = require('../controllers/movie');
const { verify, isLoggedIn } = require('../auth');
const router = express.Router();


router.post('/addMovie', verifyAdmin, isLoggedIn, movieController.addMovie);
router.get('/getMovies', movieController.getAllMovies);
router.get('/getMovie/:id', movieController.getMovieById);
router.put('/updateMovie/:id', verifyAdmin, isLoggedIn, movieController.updateMovie);
router.delete('/deleteMovie/:id', verifyAdmin, isLoggedIn, movieController.deleteMovie);

module.exports = router;  // Ensure this is exporting the router


