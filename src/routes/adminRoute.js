const express = require('express');
const router = express.Router();

const userController = require('../controller/userController')
const adminController = require('../controller/adminController')
const productController = require('../controller/productController')
const categoryController = require('../controller/categoryController')
const authController = require('../controller/authController')


// Routes - GET /

router.get('/', adminController.dashboard)

router.get('/login', )
router.get('/signup', )

router.get('/admin/users', )
router.get('/admin/users/add-user', )
router.get('/admin/users/view/user:id', )
router.get('/admin/users/edit/user:id', )

router.get('/admin/products', )
router.get('/admin/users/add-product', )
router.get('/admin/products/view/product:id', )
router.get('/admin/products/edit/product:id', )

router.get('/admin/category', )
router.get('/admin/users/add-category', )
router.get('/admin/categories/view/category:id', )
router.get('/admin/categories/edit/category:id', )

router.get('/admin/banners', )
router.get('/admin/users/add-banner', )
router.get('/admin/banners/view/banner:id', )
router.get('/admin/banners/edit/banner:id', )



// Routes - POST /

router.post('/admin/users/add-user', )
router.post('/admin/users/add-product', )
router.post('/admin/users/add-category', )
router.post('/admin/users/add-banner', )


// Routes - Delete /

router.delete('/admin/users/view/user:id', )
router.delete('/admin/products/view/user:id', )
router.delete('/admin/categories/view/user:id', )
router.delete('/admin/banners/view/user:id', )


// Routes - Put / Patch


module.exports = router