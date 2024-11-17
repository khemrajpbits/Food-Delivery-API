const mongoose = require('mongoose');

const DeliverySchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },

    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    status: { type: String, required: true, enum: ['Pending', 'In Transit', 'Delivered', 'picked up'], default: 'picked up' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Delivery', DeliverySchema);