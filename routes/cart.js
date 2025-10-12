const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/', cartController.addToCart);
router.get('/', cartController.getCart);
router.delete('/:itemId', cartController.removeFromCart);
router.put('/:itemId', cartController.updateCartItem);

module.exports = router;