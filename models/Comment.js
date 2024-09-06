const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: [true, 'Movie ID is required']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    text: {
        type: String,
        required: [true, 'Comment text is required']
    }
});

module.exports = mongoose.model('Comment', commentSchema);
