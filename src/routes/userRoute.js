const express = require('express');
const router = express.Router();

const userController = require('../controller/userController')
const authController = require('../controller/authController')

// User Routes - GET /
router.get('/')

router.get('/login')
router.get('/signup')
router.get('/verify-otp')

router.get('/profile')
router.get('/address')

router.get('/products')
router.get('/categories')

router.get('/orders')
router.get('/order/product/:id')

router.get('/cart')


// User Routes - POST /
router.post('/login')
router.post('/signup')
router.post('/verify-otp')
router.post('/profile/edit/')

router.post('/address/add/')

// User Routes - PUT / and PATCH /
router.put('/edit-profile')

router.patch('/address/edit/:id')

router.patch('/cancel-order/:id')


module.exports = router;