const express = require('express');
const multer = require('multer');
const router = express.Router();

const {isAuthenticated, isAdminLoggedIn} = require('../middlewares/authMiddleware')
const {upload, categoryUpload, productUpload} = require('../middlewares/multer')


const userController = require('../controller/userController')
const adminController = require('../controller/adminController')
const productController = require('../controller/productController')
const categoryController = require('../controller/categoryController')


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
router.get('/category/view-category/:id', )
router.get('/category/edit-category/:id', )

router.get('/banners', )
router.get('/users/add-banner', )
router.get('/banners/view/banner:id', )
router.get('/banners/edit/banner:id', )



// Routes - POST /

router.post('/users/add-user', )
router.post('/products/add-product', isAdminLoggedIn, productUpload.array('images', 4), productController.addProduct)
router.post('/products/edit-product/:id', isAdminLoggedIn, productUpload.array('images', 4), productController.editProduct)
router.post('/category/add-category', isAdminLoggedIn, categoryUpload.single('image'), categoryController.addCategory)
router.post('/category/edit-category', isAdminLoggedIn, categoryUpload.single('image'), categoryController.editCategory)
router.post('/banners/add-banner', )


// Routes - Delete /

router.delete('/users/delete-user/:id', isAdminLoggedIn, adminController.deleteUser )
router.delete('/products/view/user:id', )
router.delete('/category/delete-category/:id', isAdminLoggedIn, categoryController.deleteCategory )
router.delete('/banners/view/user:id', )


// Routes - Put / Patch
router.patch('/users/block-user/:id', isAdminLoggedIn, adminController.blockUser )
router.patch('/users/unblock-user/:id', isAdminLoggedIn, adminController.unblockUser )

router.patch('/category/list-category/:id', isAdminLoggedIn, categoryController.listCategory )
router.patch('/category/unlist-category/:id',  isAdminLoggedIn, categoryController.unlistCategory)

router.patch('/products/list-product/:id', isAdminLoggedIn, productController.listProduct )
router.patch('/products/unlist-product/:id',  isAdminLoggedIn, productController.unlistProduct)


module.exports = router