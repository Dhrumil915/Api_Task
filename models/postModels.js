const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter title'],
    },
    body: {
        type: String,
        required: [true, 'Please enter body'],
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    post_status: {
        type: Boolean,
        value: ['active', 'inactive'],
        required: true
    }
});

module.exports = mongoose.model('Post', postSchema);
