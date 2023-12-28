const express = require('express');
const multer = require('multer');
const router = express.Router();

const {isAuthenticated, isAdminLoggedIn} = require('../middlewares/authMiddleware')
const {upload, categoryUpload, productUpload} = require('../middlewares/multer')
const { check, validationResult, checkSchema } = require('express-validator');

const userController = require('../controller/userController')
const adminController = require('../controller/adminController')
const productController = require('../controller/productController')
const categoryController = require('../controller/categoryController');
const orderController = require('../controller/orderController');


// Routes - GET /

router.get('/', isAdminLoggedIn, adminController.home)
router.get('/dashboard', isAdminLoggedIn, adminController.dashboard)

router.get('/users', isAdminLoggedIn, adminController.usersList)
router.get('/users/add-user', )
router.get('/users/view/user:id', )
router.get('/users/edit/user:id', )

router.get('/products', isAdminLoggedIn, productController.getProductList)
router.get('/products/add-product',  isAdminLoggedIn, productController.getAddProduct)
router.get('/products/view-product/:id',  isAdminLoggedIn, productController.viewProduct)
router.get('/products/edit-product/:id',  isAdminLoggedIn, productController.getEditProduct)

router.get('/category', isAdminLoggedIn, categoryController.getCategoryList)
router.get('/category/add-category', isAdminLoggedIn, categoryController.getAddCategory)
router.get('/view-category/:id', isAdminLoggedIn, categoryController.viewCategory )
router.get('/edit-category/:id', isAdminLoggedIn, categoryController.getEditCategory)

router.get('/banners', )
router.get('/users/add-banner', )
router.get('/banners/view/banner:id', )
router.get('/banners/edit/banner:id', )

router.get('/orders', isAdminLoggedIn, orderController.getOrderList )
router.get('/orders/products', isAdminLoggedIn, orderController.getOrderList )


// Routes - POST /

router.post('/users/add-user', )
router.post('/products/add-product', isAdminLoggedIn, productUpload.array('images', 6), productController.addProduct)
router.post('/products/edit-product/:id', isAdminLoggedIn, productUpload.array('images', 4), productController.editProduct)
router.post('/category/add-category', isAdminLoggedIn, categoryUpload.single('image'), categoryController.addCategory)
router.post('/category/edit-category', isAdminLoggedIn, categoryUpload.single('image'), categoryController.editCategory)
router.patch('/category/delete-image/', isAdminLoggedIn,  categoryController.deleteImage)
router.post('/banners/add-banner', )


// Routes - Delete /

router.delete('/users/delete-user/:id', isAdminLoggedIn, adminController.deleteUser )
router.delete('/products/delete-product/:id', isAdminLoggedIn, productController.deleteProduct)
router.delete('/category/delete-category/:id', isAdminLoggedIn, categoryController.deleteCategory )
router.delete('/banners/view/user:id', )


// Routes - Put / Patch
router.patch('/users/block-user/:id', isAdminLoggedIn, adminController.blockUser )
router.patch('/users/unblock-user/:id', isAdminLoggedIn, adminController.unblockUser )

router.patch('/category/change-category-status/:id', isAdminLoggedIn, categoryController.changeCategoryStatus )

router.patch('/products/list-product/:id', isAdminLoggedIn, productController.listProduct )
router.patch('/products/unlist-product/:id',  isAdminLoggedIn, productController.unlistProduct)

router.patch('/orders/change-order-status', isAdminLoggedIn, orderController.changeOrderStatus )


module.exports = router