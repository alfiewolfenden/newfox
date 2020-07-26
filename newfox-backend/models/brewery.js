const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const brewerySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    beers: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Beer' }]
});

brewerySchema.plugin(uniqueValidator);

module.exports = mongoose.model('Brewery', brewerySchema);