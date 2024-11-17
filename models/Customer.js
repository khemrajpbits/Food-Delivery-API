const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    password_hash: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

customerSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
