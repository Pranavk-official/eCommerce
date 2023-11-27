const express = require('express');
const router = express.Router()

const authController = require('../controller/authController')

router.get('/login', authController.getUserLogin)
router.get('/logout', authController.userLogout)
router.get('/register', authController.getUserRegister)
router.get('/admin/login', authController.getAdminLogin)
router.get('/admin/register', authController.getAdminRegister)
// router.get('/verify-otp')

// Routes - POST /
router.post('/login', authController.userLogin)
router.post('/register', authController.userRegister)



module.exports = router