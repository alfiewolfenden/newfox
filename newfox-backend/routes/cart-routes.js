const express = require('express');

const cartsController = require('../controllers/cart-controllers');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.use(checkAuth);

router.post('/', cartsController.addToCart);

router.get('/', cartsController.getCartItems);

module.exports = router;
