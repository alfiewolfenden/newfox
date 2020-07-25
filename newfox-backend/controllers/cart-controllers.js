const CartItem = require('../models/cart-item');

const addToCart = async (req, res, next) => {
    const { image, name, abv, qty, qqty, size, price } = req.body;

    const newCartItem = new new CartItem({
        image,
        name,
        abv,
        qty,
        qqty,
        size,
        price
    });

    try {
        await newCartItem.save();
    } catch (err) {
        const error = new HttpError('Something went wrong :(', 500);
        return next(error);
    }

    res.status(201).json({ name: newCartItem.name, qqty: newCartItem.qqty });
};

exports.addToCart = addToCart;