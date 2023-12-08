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
router.post( '/add-to-cart/:id', isAuthenticated, cartController.addToCart )


// Routes - POST
// router.post( '/add-to-cart', cartController.addToCart )

module.exports = router