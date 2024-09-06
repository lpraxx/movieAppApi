const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    director: {
        type: String,
        required: [true, 'Director is required']
    },
    year: {
        type: Number,
        required: [true, 'Year is required']
    },
    description: {
        type: String,
        required: [false]
    },
    genre: {
        type: String,
        required: [false]
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

module.exports = mongoose.model('Movie', movieSchema);
