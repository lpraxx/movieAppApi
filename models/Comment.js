const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    comment: {
        type: String,
        required: [true, 'Comment text is required']
    }
}, { timestamps: true }); // To track when comments are added/updated

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;

