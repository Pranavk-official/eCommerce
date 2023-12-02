const User = require('../models/userSchema')
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
    }
}
