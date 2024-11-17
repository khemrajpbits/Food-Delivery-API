const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },

    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    restaurant_name: { type: String, required: true }, 
    restaurant_address: { type: String, required: true }, 
    contact: { type: String, required: true }, 
    govt_id: { type: String, required: true }, 
    gstin: { type: String, required: true },
    availability_timings: { type: String, required: true },
    password_hash: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }

});

module.exports = mongoose.model('Restaurant', RestaurantSchema, 'restaurant_owners');
