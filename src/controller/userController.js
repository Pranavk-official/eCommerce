const User = require('../models/userSchema')
const Address = require('../models/addressSchema')
// User Profile - View
// User Profile - Edit
// User Orders
// User Cart
// User History
// User Payment/Checkout


module.exports = {
    getUserProfile: (req,res) => {
        // console.log(req.user);
        const locals = {
            title: 'User Profile'
        }
        try {
            
            res.render('users/viewProfile',{
              userData: req.user,
              user: req.user
            })
        } catch (error) {
            
        }

    },
    getEditUserProfile: async (req,res) => {
        // console.log(req.user);
        const locals = {
            title: 'Edit User Profile'
        }

        const userData = await User.findById(req.user._id)

        // console.log(req);

        try {
            
            res.render('users/editProfile',{
              userData ,
              user: req.user
            })
        } catch (error) {
            
        }

    },

    editUserProfile : async (req,res) => {
        try {   
            console.log(req.body,req.file, req.user.id);

            // await User.updateOne({_id: req.params.id}, {
            //     $set: {
            //         avatar: req.file.path,
            //         firstName: req.body.firstName,
            //         lastName: req.body.lastName,
            //     }
            // })

            await User.updateOne({_id: req.user.id},{$set: {avatar : req.file.filename }})

            res.redirect('/user/profile')
        } catch (error) {
            console.log(error);
        }
    },

    getAddress : async (req,res) => {
        try {   

            const user = await User.findById(req.user.id).populate({
                path: 'address',
                model: 'Address',
                match: { status: true }
            })   
            
            console.log(user);

            res.render('users/viewAddress', {
                user: user,
                address: user.address
            })
        } catch (error) {
            console.log(error);
        }
    },
    getAddAddress : async (req,res) => {
        try {

            res.render('users/addAddress', {
                success: req.flash('success'),
                errmsg: req.flash('err')
            })
            
        } catch (error) {
            console.log(error);
        }
    },
    addAddress : async (req,res) => {
        try {

            const {firstName, lastName, mobile, landmark, street, address1, address2, city, state, zipcode, country} = req.body

            const address = new Address({
                firstName,
                lastName,
                mobile,
                address1,
                address2,
                state,
                landmark,
                street,
                city,
                zipcode,
                country,
                userId: req.user.id,
            })

            const result = await address.save()

            await User.updateOne({_id: req.user.id}, {
                $push: {
                    address: result._id
                }
            })

            res.redirect('/user/address')

        } catch (error) {
            console.log(error);
        }
    },
    getEditAddress : async (req,res) => {
        try {
            
        } catch (error) {
            console.log(error);
        }
    },
    editAddress : async (req,res) => {
        try {
            
        } catch (error) {
            console.log(error);
        }
    },
    removeAddress : async (req,res) => {
        try {
            
        } catch (error) {
            console.log(error);
        }
    },
}
