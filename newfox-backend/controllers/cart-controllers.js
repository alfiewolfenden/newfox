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
        const error = new HttpError('Could not find beer :(', 500);
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
        const error = new HttpError('Could not find user :(', 500);
        return next(error);
    }

    if (!user) {
        const error = new HttpError('Could not find user for provided id.', 404);
        return next(error);
    }

    let hasBeer;
    try {
        hasBeer = await CartItem.find({ user, 'beer.beerId': beerId })
    } catch (err) {
        console.log(err);
        const error = new HttpError('Something went wrong :(', 500);
        return next(error);
    }

    if (hasBeer.length === 0) {

        const newCartItem = new CartItem({
            user,
            beer: {
                beerId: beer,
                breweryId: beer.breweryId,
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
            const error = new HttpError('Something went wrong, could not save cart item :(', 500);
            console.log(err);
            return next(error);
        }

        res.status(201).json({ user: user.id, beer: newCartItem.beer, qty: newCartItem.qty });
    } else {
        hasBeer[0].qty += 1;
        try {
            await hasBeer[0].save();
        } catch (err) {
            const error = new HttpError('Something went wrong :(', 500);
            console.log(err);
            return next(error);
        }

        res.status(201).json({ user: hasBeer[0].user, beer: hasBeer[0].beer.name, qty: hasBeer[0].qty });
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

const deleteCartItem = async (req, res, next) => {
    const id = req.params.iid;

    let user;
    try {
        user = await User.findById(req.userData.userId);
    } catch (err) {
        const error = new HttpError('Something went wrong, could not find user :(', 500);
        return next(error);
    }

    let itemToDelete;
    try {
        itemToDelete = await CartItem.findById(id);
    } catch (err) {
        const error = new HttpError('Something went wrong, could not find item :(', 500);
        return next(error);
    }

    console.log(user.id);
    console.log(itemToDelete.user);

    if (user.id != itemToDelete.user) {
        const error = new HttpError('Something went wrong, this action is not authorized.', 404);
        return next(error);
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await itemToDelete.remove({ session: sess });
        user.cartitems.pull(itemToDelete);
        await user.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError('Something went wrong, item not deleted :(', 500);
        return next(error);
    }

    res.status(200).json({ message: 'item deleted' });
};

exports.addToCart = addToCart;
exports.getCartItems = getCartItems;
exports.deleteCartItem = deleteCartItem;