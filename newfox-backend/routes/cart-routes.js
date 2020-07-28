const express = require('express');

const checkAuth = require('../middleware/check-auth');
const cartsController = require('../controllers/cart-controllers');

const router = express.Router();

router.use(checkAuth);

router.post('/', cartsController.addToCart);

router.get('/', cartsController.getCartItems);

router.patch('/:iid', cartsController.updateCartItem);

router.delete('/:iid', cartsController.deleteCartItem);

module.exports = router;
