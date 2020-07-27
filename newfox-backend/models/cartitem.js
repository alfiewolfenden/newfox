const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    beer: {
        beerId: { type: mongoose.Types.ObjectId, required: true, ref: 'Beer' },
        breweryId: { type: mongoose.Types.ObjectId, required: true, ref: 'Brewery' },
        brewery: { type: String, required: true },
        image: { type: String, required: true },
        name: { type: String, required: true },
        abv: { type: Number, required: true },
        style: { type: String, required: true },
        qqty: { type: Number, required: true },
        size: { type: String, enum: ['30L', '20L', 'C330', 'C440'], required: true },
        price: { type: Number, required: true },
        uprice: { type: Number, required: true }
    },
    qty: { type: Number, required: true },
    tprice: { type: Number, required: true }
});

module.exports = mongoose.model('CartItem', cartItemSchema);