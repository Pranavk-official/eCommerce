const express = require('express');
const router = express.Router();

const userController = require('../controller/userController')
const authController = require('../controller/authController')

const { isAuthenticated } = require('../middlewares/authMiddleware')

// User Routes - GET /
router.get('/')


router.get('/profile', isAuthenticated,userController.getUserProfile)
router.get('/profile/edit', isAuthenticated,userController.getEditUserProfile)
router.get('/address')

router.get('/products')
router.get('/categories')

router.get('/orders')
router.get('/order/product/:id')

router.get('/cart')


// User Routes - POST /

router.post('/profile/edit/')

router.post('/address/add/')

// User Routes - PUT / and PATCH /
router.put('/edit-profile')

router.patch('/address/edit/:id')

router.patch('/cancel-order/:id')


module.exports = router;