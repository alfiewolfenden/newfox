const mongoose = require('mongoose');

const beerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brewery: { type: String, required: true },
    image: { type: String, required: true },
    size: { type: String, enum: ['30L', '20L', 'C330', 'C440'], required: true },
    style: { type: String, required: true },
    abv: { type: Number, required: true },
    qqty: { type: Number, required: true },
    price: { type: Number, required: true }
});

module.exports = mongoose.model('Beer', beerSchema);