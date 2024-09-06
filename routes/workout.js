const express = require('express');
const workoutController = require('../controllers/workout');
const { verify, isLoggedIn } = require('../auth');
const router = express.Router();

router.post('/addWorkout', verify, isLoggedIn, workoutController.addWorkout);
router.get('/getMyWorkouts', verify, isLoggedIn, workoutController.getMyWorkouts);
router.put('/updateWorkout/:workoutId', verify, isLoggedIn, workoutController.updateWorkout);
router.delete('/deleteWorkout/:workoutId', verify, isLoggedIn, workoutController.deleteWorkout);
router.put('/completeWorkoutStatus/:workoutId', verify, isLoggedIn, workoutController.completeWorkoutStatus);

module.exports = router;  // Ensure this is exporting the router
