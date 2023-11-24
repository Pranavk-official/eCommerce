const adminAuthLayout = './layouts/adminAuth'
const adminLayout = './layouts/adminLayout'
const authLayout = './layouts/userAuthLayout'

// User Registration and Verification
// Admin and User Login


module.exports = {
    // Admin Login
    getAdminLogin : (req,res) => {
        try {
            res.render('auth/adminLogin', {
                locals,
                layout: adminAuthLayout
            })
        } catch (error) {
            console.log(error);
        }
    },

    adminLogin : (req,res) => {
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
    getUserLogin : (req,res) => {
        try {
            res.render('auth/adminLogin', {
                locals,
                layout: adminAuthLayout
            })
        } catch (error) {
            console.log(error);
        }
    },

    userLogin : (req,res) => {
        try {
            res.render('auth/adminLogin', {
                locals,
                layout: adminAuthLayout
            })
        } catch (error) {
            console.log(error);
        }
    },

    userLogout : (req,res) => {
        try {
            
        } catch (error) {
            console.log(error)
            res.render('error.ejs',{
                error
            })
        }
    }
}