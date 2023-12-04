const adminLayout = './layouts/adminLayout'
const User = require('../models/userSchema')

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
    dashboard: async (req, res) => {
        const locals = {
            title: "Admin Dashboard"
        }

        const userCount = await User.countDocuments()

        try {
            res.render('admin/dashboard', {
                locals,
                layout: adminLayout,
                userCount
            })
        } catch (error) {
            console.log(error);
        }
    },

    home: (req, res) => {

        try {
            res.redirect('/admin/dashboard')
        } catch (error) {
            console.log(error);
        }
    },

    // User Management
    usersList: async (req, res) => {
        const locals = {
            title: 'User Management'
        }
        try {

            let perPage = 12;
            let page = req.query.page || 1;

            const users = await User.aggregate([{ $sort: { createdAt: -1 } }])
                .skip(perPage * page - perPage)
                .limit(perPage)
                .exec();

            const count = await User.countDocuments()
            const nextPage = parseInt(page) + 1
            const hasNextPage = nextPage <= Math.ceil(count / perPage)

            res.render('admin/users', {
                locals,
                users,
                current: page,
                pages: Math.ceil(count / perPage),
                nextPage: hasNextPage ? nextPage : null,
                currentRoute: '/admin/users/',
                layout: adminLayout
            })

        } catch (error) {

        }
    },

    viewUser: async (req, res) => {
        try {

            const userId = req.params.id
            const user = await userSchema.findById( userId )

            user.isBlocked = true;
            await user.updateOne({ $set: { isBlocked: true } });
            res.redirect('/admin/users');
        } catch (error) {
            console.log(error);
        }
    },
    editUser: async (req, res) => {
        try {

            const userId = req.params.id
            const user = await userSchema.findById( userId )

            const {username, firstName, lastName, phone, email } = req.body

            await user.updateOne({ $set: {
                username,
                firstName,
                lastName,
                phone,
                email
            } });
            res.redirect('/admin/users');
        } catch (error) {
            console.log(error);
        }
    },
    deleteUser: async (req, res) => {
        try {
            await User.deleteOne({_id: req.params.id})
            res.redirect('/admin/users');
        } catch (error) {
            console.log(error);
        }
    },
    blockUser: async (req, res) => {
        try {

            const userId = req.params.id
            const user = await userSchema.findById( userId )

            await user.updateOne({ $set: { isBlocked: true } });
            res.redirect('/admin/users');
        } catch (error) {
            console.log(error);
        }
    },
    unblockUser: async (req, res) => {
        try {
            const userId = req.params.id
            const user = await userSchema.findById( userId )

            user.isBlocked = false;
            await user.updateOne({ $set: { isBlocked: false } });

            if (req.session.user === userId) {
                // If user is in same browser it deletes 
                delete req.session.user
            }

            const sessions = req.sessionStore.sessions;
            for (const sessionId in sessions) {
                const session = JSON.parse(sessions[sessionId]);
                if (session.user === userId) {
                    delete sessions[sessionId];
                    break;
                }
            }

            res.redirect('/admin/users');
        } catch (error) {
            console.log(error);
        }
    },


}