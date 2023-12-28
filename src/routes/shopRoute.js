const express = require('express');
const router = express.Router()

const shopController = require('../controller/shopController')
const cartController = require('../controller/cartController')

const { isAuthenticated, isBlocked, isUserLoggedOut} = require('../middlewares/authMiddleware');
const orderController = require('../controller/orderController');

// Routes - GET
router.get( '/', shopController.getHome )

router.get( '/shop', shopController.getShop )
// router.get( '/products/:id', shopController.getSingleProduct)

router.get( '/cart', isAuthenticated, cartController.getCart )
router.post( '/cart', isAuthenticated, (req,res) => {
    res.redirect('/cart')
} )

router.get( '/checkout', isAuthenticated, shopController.getCheckout )


// Routes - POST

router.post( '/add-to-cart/:id', isAuthenticated, cartController.addToCart )
router.post( '/delete-cart-item/:id', isAuthenticated, cartController.deleteCartItem )
router.post( '/change-cart-item/:id', isAuthenticated, cartController.changeQuantity );
// router.post( '/increase-cart-item/:id', isAuthenticated, cartController.increaseCartItem )

router.post( '/place-order' , isAuthenticated, orderController.placeOrder)
router.get( '/order-confirm' , isAuthenticated, orderController.getOrderConfirm)

// router.post( '/add-to-cart', cartController.addToCart )

module.exports = router