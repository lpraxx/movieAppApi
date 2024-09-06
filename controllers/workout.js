const Workout = require("../models/Workout");
const auth = require('../auth');
const { errorHandler } = auth;

// Add a new workout
module.exports.addWorkout = (req, res) => {
    const { name, duration, status } = req.body;
    
    const newWorkout = new Workout({
        name,
        duration,
        status,
        userId: req.user.id, // Only the authenticated user can add their workout
    });

    return newWorkout.save()
    .then(result => res.status(201).send(result))
    .catch(err => errorHandler(err, req, res));
};

// Get all workouts for the logged-in user
module.exports.getMyWorkouts = (req, res) => {
    return Workout.find({ userId: req.user.id })
    .then(workouts => {
        if (workouts.length === 0) {
            return res.status(404).send({ message: 'No workouts found' });
        }
        return res.status(200).send({workouts: workouts});
    })
    .catch(err => errorHandler(err, req, res));
};

// Update a workout by its ID
module.exports.updateWorkout = (req, res) => {
    const { name, duration, status } = req.body;

    return Workout.findOneAndUpdate(
        { _id: req.params.workoutId, userId: req.user.id },
        { name, duration, status },
        { new: true }
    )
    .then(updatedWorkout => {
        if (!updatedWorkout) {
            return res.status(404).send({ message: 'Workout not found' });
        }
        return res.status(200).send(updatedWorkout);
    })
    .catch(err => errorHandler(err, req, res));
};

// Delete a workout by its ID
module.exports.deleteWorkout = (req, res) => {
    return Workout.findOneAndDelete({ _id: req.params.workoutId, userId: req.user.id })
    .then(deletedWorkout => {
        if (!deletedWorkout) {
            return res.status(404).send({ message: 'Workout not found' });
        }
        return res.status(200).send({ message: 'Workout deleted successfully' });
    })
    .catch(err => errorHandler(err, req, res));
};

// Complete a workout (update status to 'completed')
module.exports.completeWorkoutStatus = (req, res) => {
    return Workout.findOneAndUpdate(
        { _id: req.params.workoutId, userId: req.user.id },
        { status: 'completed' },
        { new: true }
    )
    .then(updatedWorkout => {
        if (!updatedWorkout) {
            return res.status(404).send({ message: 'Workout not found' });
        }
        return res.status(200).send(updatedWorkout);
    })
    .catch(err => errorHandler(err, req, res));
};
