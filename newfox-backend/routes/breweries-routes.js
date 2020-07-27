const express = require('express');

const breweriesController = require('../controllers/breweries-controllers');

const router = express.Router();

router.post('/', breweriesController.addBrewery);

router.get('/', breweriesController.getBreweries);

router.post('/beers', breweriesController.addBeer);

router.get('/beers/:uid', breweriesController.getBeers);

module.exports = router;