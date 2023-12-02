const verificationController = require('../controller/verificationController')
const User = require('../models/userSchema')

const authLayout = './layouts/userAuthLayout'
// isAdmin, isAuthenticated, isVerified, isBlocked



module.exports = {
    isAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            next()
        } else {
            return res.redirect('/login')
        }
    },
    isUserLoggedOut: (req, res, next) => {
        if (req.isAuthenticated()) {
            return res.redirect('/user/profile')
        } else {
            next()
        }
    },
    isAdminLoggedOut: (req, res, next) => {
        if (req.isAuthenticated() && req.user.isAdmin) {
            return res.redirect('/admin/dashboard')
        } else {
            next()
        }
    },
    isAdminLoggedIn: (req, res, next) => {
        if (req.isAuthenticated() && req.user.isAdmin) {
            next();
        } else {
            return res.redirect('/admin/login');
        }
    },

    isBlocked: async (req, res, next) => {

        console.log(req.body);

        try {
            const user = await User.findOne({ email: req.body.email })

            if (user && user.isBlocked) {
                res.send('user is blocked ')
            } else {
                next()
            }
        } catch (error) {
            console.log(error);
        }
    },

    isVerified: async (req, res, next) => {
        try {
            const user = await User.findById(req.user.id)

            if (user && user.isVerified) {
                next()
            } else {
                const newOtp = await verificationController.sendVerifyEmail(user.username,user.email)
                await User.updateOne({email: user.email}, {
                    $set: {
                        'token.otp': newOtp,
                        'token.generatedTime': new Date()
                    }
                })

                res.redirect('/verify-otp')
            }

        } catch (error) {
            
        }
    }


}