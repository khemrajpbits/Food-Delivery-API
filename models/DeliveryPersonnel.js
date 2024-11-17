const mongoose = require('mongoose');

const DeliveryPersonnelSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },

    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: String, required: true }, 
    address: { type: String, required: true }, 
    contact: { type: String, required: true }, 
    govt_id: { type: String, required: true }, 
    vehicle_number: { type: String, required: true },
    availability_timings: { type: String, required: true },
    password_hash: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }

});

module.exports = mongoose.model('DeliveryPersonnel', DeliveryPersonnelSchema, 'delivery_personnels');
