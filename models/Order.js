const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    number: { type: Number, required: true },
    size: { type: String, required: true },
    type: { type: String, required: true },
    payment: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
