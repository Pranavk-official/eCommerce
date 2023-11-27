const bcrypt = require('bcrypt');
const passport = require('passport');
const adminAuthLayout = './layouts/adminAuth'
const adminLayout = './layouts/adminLayout'
const authLayout = './layouts/userAuthLayout'

// Models / Schema

const User = require('../models/userSchema');

// User Registration and Verification
// Admin and User Login


module.exports = {
    // Admin Login
    getAdminLogin: (req, res) => {
        try {
            res.render('auth/adminLogin', {
                locals,
                layout: adminAuthLayout
            })
        } catch (error) {
            console.log(error);
        }
    },
    getAdminRegister: (req, res) => {
        try {
            res.render('auth/adminLogin', {
                locals,
                layout: adminAuthLayout
            })
        } catch (error) {
            console.log(error);
        }
    },

    adminRegister: async (req, res) => {
        const errors = []

        try {
            const { firstName, lastName, username, email, phone, pwd, pwdConf } = req.body


            if (pwd !== pwdConf) errors.push(`Passwords don't match`)

            const userTaken = await User.findOne({ username })
            if (userTaken) errors.push('Username taken!')

            const emailTaken = await User.findOne({ email })
            if (emailTaken) errors.push('Email taken!')

            const phoneTaken = await User.findOne({ phone })
            if (phoneTaken) errors.push('Phone taken!')

            if (errors.length > 0) res.render('auth/userRegister', {
                errorMessage: errors,
                layout: authLayout
            })

            // REGISTRATION
            const hashpwd = await bcrypt.hash(pwd, 12)

            const user = new User({
                firstName,
                lastName,
                username,
                email,
                phone,
                isAdmin: true,
                password: hashpwd
            })

            await user.save()

            res.render('auth/adminLogin', {
                message: 'Admin registered successfully, Please login!!',
                layout: authLayout
            })


        } catch (error) {
            console.log(error);
            errors.push(error)
            res.render('auth/adminRegister', {
                errorMessage: errors,
                layout: authLayout
            })
        }
    },

    adminLogin: (req, res) => {
        try {
            res.render('auth/adminLogin', {
                locals,
                layout: adminAuthLayout
            })
        } catch (error) {
            console.log(error);
        }
    },



    // User Login
    getUserLogin: (req, res) => {

        if (req.isAuthenticated()) {
            res.redirect('/user/profile')
        }

        const locals = {
            title: "User Login"
        }
        try {
            res.render('auth/userLogin', {
                locals,
                layout: authLayout
            })
        } catch (error) {
            console.log(error);
        }
    },

    getUserRegister: (req, res) => {

        if (req.isAuthenticated()) {
            res.redirect('/user/profile')
        }

        const locals = {
            title: 'User Register Page'
        }

        try {
            res.render('auth/userRegister', {
                locals,
                layout: authLayout
            })
        } catch (error) {
            console.log(error);
        }
    },

    userLogin: (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            if (!user) {
                console.log(info);
                return res.redirect('/login');
            }
            req.logIn(user, (err) => {
                if (err) {
                    console.log(err);
                    return next(err);
                }
                return res.redirect('/user/profile');
            });
        })(req, res, next);
     },
     

    userRegister: async (req, res) => {
        const errors = []

        try {
            const { firstName, lastName, username, email, phone, pwd, pwdConf } = req.body


            if (pwd !== pwdConf) errors.push(`Passwords don't match`)

            const userTaken = await User.findOne({ username })
            if (userTaken) errors.push('Username taken!')

            const emailTaken = await User.findOne({ email })
            if (emailTaken) errors.push('Email taken!')

            const phoneTaken = await User.findOne({ phone })
            if (phoneTaken) errors.push('Phone taken!')

            if (errors.length > 0) res.render('auth/userRegister', {
                errorMessage: errors,
                layout: authLayout
            })

            // REGISTRATION
            const hashpwd = await bcrypt.hash(pwd, 12)

            const user = new User({
                firstName,
                lastName,
                username,
                email,
                phone,
                password: hashpwd
            })

            await user.save()

            res.render('auth/userLogin', {
                message: 'User registered successfully, Please login!!',
                layout: authLayout
            })


        } catch (error) {
            console.log(error);
            errors.push(error)
            res.render('auth/userRegister', {
                errorMessage: errors,
                layout: authLayout
            })
        }
    },

    userLogout: (req, res) => {
        req.logout(err => {
            if (err) {
                console.log(err);
            } else {
                req.session.destroy(err => {
                    if (err) {
                       console.log(err);
                    } else {
                       res.clearCookie('connect.sid'); // replace 'connect.sid' with your session cookie name
                       res.render('auth/userLogin',{
                            message: 'User Logged Out Successfully',
                            layout: authLayout
                       });
                    }
                });
            }
        });
      }
      
}