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
              userData: req.user  
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

        console.log(userData.lastName);

        try {
            
            res.render('users/editProfile',{
              userData ,
              isAuthenticated: req.isAuthenticated()
            })
        } catch (error) {
            
        }

    }
}
