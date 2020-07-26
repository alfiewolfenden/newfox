const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const CartItem = require('../models/cartitem');
const User = require('../models/user');
const Beer = require('../models/beer');
const cartitem = require('../models/cartitem');

const addToCart = async (req, res, next) => {
    const { beerId } = req.body;

    let beer;
    try {
        beer = await Beer.findById(beerId);
    } catch (err) {
        const error = new HttpError('Something went wrong :(', 500);
        return next(error);
    }

    if (!beer) {
        const error = new HttpError('No beer found :(', 404);
        return next(error);
    }

    let user;
    try {
        user = await User.findById(req.userData.userId);
    } catch (err) {
        const error = new HttpError('Something went wrong :(', 500);
        return next(error);
    }

    if (!user) {
        const error = new HttpError('Could not find user for provided id.', 404);
        return next(error);
    }

    let hasBeer;
    try {
        hasBeer = await CartItem.findOne({ beer: { beerId } })
    } catch (err) {
        const error = new HttpError('Something went wrong :(', 500);
        return next(error);
    }

    if (!hasBeer) {

        const newCartItem = new CartItem({
            user,
            beer: {
                beerId: beer,
                brewery: beer.brewery,
                image: beer.image,
                name: beer.name,
                abv: beer.abv,
                style: beer.style,
                qqty: beer.qqty,
                size: beer.size,
                price: beer.price
            },
            qty: 1
        })

        try {
            const sess = await mongoose.startSession();
            sess.startTransaction();
            await newCartItem.save({ session: sess });
            user.cartitems.push(newCartItem);
            await user.save({ session: sess });
            await sess.commitTransaction();
        } catch (err) {
            const error = new HttpError('Something went wrong :(', 500);
            return next(error);
        }

        res.status(201).json({ user: user.id, beer: newCartItem.beer, qty: newCartItem.qty });
    }
};

const getCartItems = async (req, res, next) => {
    const userId = req.userData.userId;
    let userWithCartItems;

    try {
        userWithCartItems = await User.findById(userId).populate('cartitems');
    } catch (err) {
        const error = new HttpError('Something went wrong :(', 500);
        return next(error);
    }

    if (!userWithCartItems || userWithCartItems.length === 0) {
        return next(
            new HttpError('Could not find cart items for the provided user id.', 404)
        );
    }


    res.json({
        cartItems: userWithCartItems.cartitems.map(cartitem => cartitem.toObject({ getters: true }))
    });
};

exports.addToCart = addToCart;
exports.getCartItems = getCartItems;