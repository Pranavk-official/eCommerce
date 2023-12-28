const bcrypt = require('bcrypt');
const passport = require('passport');
const adminAuthLayout = './layouts/adminAuth'
const adminLayout = './layouts/adminLayout'
const authLayout = './layouts/userAuthLayout'

const verificationController = require('../controller/verificationController')
// Models / Schema

const User = require('../models/userSchema');



// User Registration and Verification
// Admin and User Login


module.exports = {

    // Admin Login
    getAdminLogin: (req, res) => {

        const locals = {
            title: 'Admin Login'
        }

        try {

            res.render('auth/adminLogin', {
                locals,
                layout: adminAuthLayout,
                message: req.flash('info')
            })
        } catch (error) {
            console.log(error);
        }
    },
    getAdminRegister: (req, res) => {

        const locals = {
            title: 'Admin Register'
        }

        try {
            res.render('auth/adminRegister', {
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
                layout: adminAuthLayout
            })


        } catch (error) {
            console.log(error);
            errors.push(error)
            res.render('auth/adminRegister', {
                errorMessage: errors,
                layout: adminAuthLayout
            })
        }
    },

    adminLogin: (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            if (!user) {
                console.log(info);
                return res.redirect('/admin/login');
            }
            req.logIn(user, (err) => {
                if (err) {
                    console.log(err);
                    return next(err);
                }
                return res.redirect('/admin/dashboard');
            });
        })(req, res, next);
    },

    adminLogout: (req, res) => {
        req.logout(err => {
            if (err) {
                console.log(err);
            }else{
                req.flash('info', 'Admin Logged Out!!')
                res.redirect('/admin/login')
            }
        });

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
                layout: authLayout,
                message: req.flash('info')
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
                res.locals.user = req.user
                return res.redirect('/user/profile');
            });
        })(req, res, next);
    },


    userRegister: async (req, res) => {
        const errors = []

        try {
            console.log(req.body);
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
            const otp = await verificationController.sendVerifyEmail(username, email)
            console.log(otp);
            const user = new User({
                username,
                firstName,
                lastName,
                email,
                phone,
                password: hashpwd,
                token: {
                    otp: otp,
                    generatedTime: new Date().getMinutes() + 10
                },
            })

            const userData = await user.save()
            req.session.unVerifiedMail = email

            if (userData) {
                req.flash('info', 'User has been registered successfully, Please verify your email')
                res.redirect('/verify-otp')
            }


            // res.render('auth/userLogin', {
            //     message: 'User registered successfully, Please login!!',
            //     layout: authLayout
            // })


        } catch (error) {
            console.log(error);
            errors.push(error)
            res.render('auth/userRegister', {
                errorMessage: errors,
                layout: authLayout
            })
        }
    },

    getVerifyOtp: (req, res) => {
        try {



            res.render('auth/verifyOtp', {
                layout: authLayout
            })

        } catch (error) {
            console.log(error);
        }
    },
    userVerification: async (req, res) => {
        try {
            const enterTime = new Date()

            const { otp } = req.body

            const checkOtp = await User.findOne({ email: req.session.unVerifiedMail, 'token.otp': otp })

            if (checkOtp) {
                const timeDiff = (new Date(enterTime) - checkOtp.token.generatedTime) / 1000 / 10

                if (timeDiff <= 60) {
                    await User.updateOne({ _id: checkOtp._id }, {
                        $set: {
                            isVerified: true
                        }
                    })
                }

                req.session.user = checkOtp._id
                req.session.unVerifiedMail = null
                req.flash('success', 'User Verified Successfully, Now Login')
                res.redirect('/user/profile')
            } else {
                console.log('Otp not matched');
                res.redirect('/verify-otp')
            }

        } catch (error) {
            console.log(error);
        }
    },

    userLogout: (req, res) => {
        req.logout(err => {
            if (err) {
                console.log(err);
            } else {
                // req.session.destroy(err => {
                //     if (err) {
                //         console.log(err);
                //     } else {
                //         res.clearCookie('connect.sid'); // replace 'connect.sid' with your session cookie name
                //         res.render('auth/userLogin', {
                //             message: 'User Logged Out Successfully',
                //             layout: authLayout
                //         });
                //     }
                // });
                req.flash('info', 'User Logged Out Successfully!!!')
                res.redirect('/login')
            }
        });
    },

    getForgotPassword: (req, res) => {
        try {
            res.render('auth/forgot-password', {
                layout: authLayout
            })
        } catch (error) {
            console.log(error);
        }
    },
    getForgotPasswordOtp: (req, res) => {
        try {
            res.render('auth/forgot-password-otp', {
                err: req.flash('existErr'),
                layout: authLayout
            })
        } catch (error) {
            console.log(error);
        }
    },

    forgotPassword: async (req, res) => {
        try {
            const user = await User.findOne( {email : req.body.email })
            console.log(user);
            if( user ){
                const newOtp = await verificationController.sendVerifyEmail(user.username, req.body.email)
                console.log(typeof newOtp);
                console.log(newOtp);
                await User.updateOne({email : req.body.email}, {
                    $set :{ 
                        'token.otp' : newOtp ,
                         'token.generatedTime' : new Date()
                    }
                })
                req.session.unVerfiedMail = req.body.email
                res.redirect('/forgot-password-otp')
            }
        } catch (error) {
            console.log(error.msg);
        }
    },
    forgotPasswordOtp: async (req, res) => {
        try {
            const enterTime = new Date()

            console.log(req.body, req.session.unVerfiedMail);

            const userOtp = req.body.otp

            const checkOtp = await User.findOne({ email: req.session.unVerfiedMail })

            console.log(checkOtp);

            if (checkOtp) {
                const timeDiff = (new Date(enterTime) - checkOtp.token.generatedTime) / 1000 / 10

                if( timeDiff <= 60 ) {
                    console.log('otp matched');
                    // If expiry time is valid setting isVerified as true
                    res.render('auth/passwordReEnter',{
                        err : req.flash('err')
                    })
                   // If TimedOut
                } else {
                    console.log('timout');
                    res.redirect( '/otp-verification' )
                }
    
            } else {
                console.log('otp not matched');
                res.redirect('/forgot-password')
            }

        } catch (error) {
            console.log(error);
        }
    },

    newPassword : async ( req, res ) => {
        try {

            const {pwd,pwdConf} = req.body
            if (pwd !== pwdConf) errors.push(`Passwords don't match`)
            

            const password = await bcrypt.hash( pwd, 12)
            await User.findOneAndUpdate( { email : req.session.unVerfiedMail },
                { $set : {
                    password : password
                }})
            res.redirect('/login')
        } catch (error) {
            res.redirect('/500')
        }
    }

}