const mongoose = require('mongoose');

const Brewery = require('../models/brewery');
const Beer = require('../models/beer');
const User = require('../models/user');
const HttpError = require('../models/http-error');

const addBrewery = async (req, res, next) => {
    const { name, image } = req.body;

    let hasBrewery;
    try {
        hasBrewery = await Brewery.findOne({ name });
    } catch (err) {
        const error = new HttpError('Something went wrong :(', 500);
        return next(error);
    }

    if (hasBrewery) {
        const error = new HttpError('This brewery is already registered.', 422);
        return next(error);
    }

    const newBrewery = new Brewery(
        {
            name,
            image,
            beers: []
        }
    );

    try {
        await newBrewery.save();
    } catch (err) {
        const error = new HttpError('Could not save Brewery', 500);
        return next(error);
    }

    res.status(201).json({ Brewery: newBrewery.name });
};

const getBreweries = async (req, res, next) => {
    let breweriesList;
    try {
        breweriesList = await Brewery.find({})
    } catch (err) {
        const error = new HttpError('Something went wrong :(', 500);
        return next(error);
    }

    res.status(200).json({ breweries: breweriesList.map(brewery => brewery.toObject({ getters: true })) });
};

const addBeer = async (req, res, next) => {
    const { brewery, image, name, abv, style, qqty, size, price } = req.body;

    let currentBrewery;

    try {
        currentBrewery = await Brewery.findOne({ name: brewery })
    } catch (err) {
        const error = new HttpError('Something went wrong :(', 500);
        return next(error);
    }

    if (!currentBrewery) {
        const error = new HttpError('Could not find brewery, failed to add beer.', 404);
        return next(error);
    }

    const newBeer = new Beer(
        {
            breweryId: currentBrewery,
            brewery,
            image,
            name,
            abv,
            style,
            qqty,
            size,
            price
        }
    );

    console.log(newBeer);

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await newBeer.save({ session: sess });
        currentBrewery.beers.push(newBeer);
        await currentBrewery.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        console.log(err);
        const error = new HttpError('Creating beer failed, please try again', 500);
        return next(error);
    }

    res.status(201).json({ Beer: newBeer.name, Brewery: newBeer.brewery.name });
};

const getBeers = async (req, res, next) => {
    const uid = req.params.uid;
    let priceVariable;
    let user;

    try {
        user = await User.findById(uid);
    } catch (err) {
        const error = new HttpError('Beer list not found, no authorization', 500);
        return next(error);
    }

    if (user.pgroup === "groupone") {
        priceVariable = 1;
    } else {
        priceVariable = 0;
    }

    let pricedBeerList;
    try {
        beerList = await Beer.find({});
        pricedBeerList = beerList.map(beer => {
            beer.price *= priceVariable;
            return beer;
        });
    } catch (err) {
        const error = new HttpError('Something went wrong, could not find beer list :(', 500);
        return next(error);
    }
    res.status(200).json({ beers: pricedBeerList.map(beer => beer.toObject({ getters: true })) });
};

exports.addBrewery = addBrewery;
exports.getBreweries = getBreweries;
exports.addBeer = addBeer;
exports.getBeers = getBeers;