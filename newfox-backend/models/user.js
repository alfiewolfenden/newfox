const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    cartitems: [{ type: mongoose.Types.ObjectId, required: true, ref: 'CartItem' }]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);