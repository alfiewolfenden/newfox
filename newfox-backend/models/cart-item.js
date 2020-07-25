const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    image: { type: String, required: true },
    name: { type: String, required: true },
    abv: { type: Number, required: true },
    qty: { type: Number, required: true },
    qqty: { type: Number, required: true },
    size: { type: String, enum: ['30L', '20L', 'C330', 'C440'], required: true },
    price: { type: Number, required: true }
});

module.exports = mongoose.model('CartItem', cartItemSchema);