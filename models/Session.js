const mongoose = require('mongoose');
const SessionSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference the User model
            required: true,
        },
        token: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: '7d', // Automatically delete session after 7 days
        },
    },
    {
        collection: 'sessions', // Store in the 'sessions' collection
    }
);
module.exports = mongoose.model('Session', SessionSchema);