const adminLayout = './layouts/adminLayout'

// Admin Dashboard
// Admin User Management
//      - List
//      - Add
//      - Edit
//      - Delelte

// Admin Category Management
//      - List
//      - Add
//      - Edit
//      - Delelte

// Admin Banner Management
//      - List
//      - Add
//      - Edit
//      - Delelte

// Admin - Orders


module.exports = {
    dashboard : ( req,res ) => {
        const locals = {
            title: "Admin Dashboard"
        }

        try {
            res.render('admin/dashboard', {
                locals,
                layout: adminLayout
            })
        } catch (error) {
            console.log(error);
        }
    },

    home : ( req,res ) => {

        try {
            res.redirect('/admin/dashboard')
        } catch (error) {
            console.log(error);
        }
    },




}






