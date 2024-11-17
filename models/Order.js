const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },

    restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    menu_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
    status: { type: String, required: true, enum: ['placed', 'preparing', 'delivered'], default: 'placed' },
    total_amount: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);