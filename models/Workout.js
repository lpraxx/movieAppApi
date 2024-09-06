const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Workout name is required']
    },
    duration: {
        type: Number,  // Assuming duration is in minutes
        required: [true, 'Workout duration is required']
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'completed'], // Example statuses
        required: [true, 'Workout status is required'],
        default: 'pending'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    }
});

module.exports = mongoose.model('Workout', workoutSchema);
