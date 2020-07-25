const express = require('express');

const cartsController = require('../controllers/cart-controllers');

const router = express.Router();

router.post('/addToCart', cartsController.addToCart);

module.exports = router;
