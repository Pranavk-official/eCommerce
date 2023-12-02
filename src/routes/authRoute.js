const express = require('express');
const router = express.Router()

const authController = require('../controller/authController');
const verificationController = require('../controller/verificationController');
const { isAuthenticated ,isUserLoggedOut, isAdminLoggedIn, isAdminLoggedOut, isBlocked } = require('../middlewares/authMiddleware');

router.get('/login', isUserLoggedOut ,authController.getUserLogin)

router.get('/logout', (req,res) => {
    res.redirect('/login')
})

router.get('/register', isUserLoggedOut, authController.getUserRegister)
router.get('/admin/login', isAdminLoggedOut,authController.getAdminLogin)
router.get('/admin/register', authController.getAdminRegister)
router.get('/admin/logout', authController.adminLogout)
router.get('/verify-otp', authController.getVerifyOtp)
router.get('/forgot-password', authController.getForgotPassword)
router.get('/forgot-password-otp', authController.getForgotPasswordOtp)

// Routes - POST /
router.post('/login', isBlocked, authController.userLogin)
router.post('/logout', authController.userLogout)

router.post('/admin/login', authController.adminLogin)
router.post('/admin/register', authController.adminRegister)

router.post('/register', authController.userRegister)
router.post('/verify-otp', authController.userVerification)

router.post('/forgot-password', authController.forgotPassword)
router.post('/forgot-password-otp', authController.forgotPasswordOtp)

router.post('/new-password', authController.newPassword)



module.exports = router