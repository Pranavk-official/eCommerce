const express = require('express');
const router = express.Router()

const shopController = require('../controller/shopController')
const cartController = require('../controller/cartController')

const { isAuthenticated, isBlocked, isUserLoggedOut} = require('../middlewares/authMiddleware')

// Routes - GET
router.get( '/', shopController.getHome )

router.get( '/shop', shopController.getShop )
// router.get( '/products/:id', shopController.getSingleProduct)

router.get( '/cart', isAuthenticated, cartController.getCart )
router.post( '/cart', isAuthenticated, (req,res) => {
    res.redirect('/cart')
} )
router.post( '/add-to-cart/:id', isAuthenticated, cartController.addToCart )
router.post( '/delete-cart-item/:id', isAuthenticated, cartController.deleteCartItem )
router.post( '/decrease-cart-item/:id', isAuthenticated, cartController.decreaseCartItem )
router.post( '/increase-cart-item/:id', isAuthenticated, cartController.increaseCartItem )


// Routes - POST
// router.post( '/add-to-cart', cartController.addToCart )

module.exports = router