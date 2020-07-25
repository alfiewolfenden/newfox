const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: { type: String, required: true },
    cycle: { type: String, required: true },
    content: { type: String, required: true },
});

module.exports = mongoose.model('Cart', cartSchema);