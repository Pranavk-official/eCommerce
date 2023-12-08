const express = require('express');
const router = express.Router();

const multer = require('multer');

const userController = require('../controller/userController')
const authController = require('../controller/authController')

const { isAuthenticated, isVerified } = require('../middlewares/authMiddleware');
const {profileUpload, upload} = require('../middlewares/multer')
// const upload = multer({dest: './uploads/profile-images'})


// User Routes - GET /
router.get('/')


router.get('/profile', isAuthenticated,userController.getUserProfile)
router.get('/profile/edit', isAuthenticated,userController.getEditUserProfile)
router.get('/address')

router.get('/products')
router.get('/categories')

router.get('/orders')
router.get('/order/product/:id')


// User Routes - POST /

router.post('/profile/edit/')

router.post('/address/add/')

// User Routes - PUT / and PATCH /
router.put('/edit-profile')

router.patch('/edit-profile/:id', isAuthenticated, profileUpload.single('image'),userController.editUserProfile)
// router.patch('/address/edit/:id', isAuthenticated, profileUpload.single('avatar'),userController.editUserProfile)

router.patch('/cancel-order/:id')


module.exports = router;