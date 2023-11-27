const authLayout = './layouts/userAuthLayout'
// isAdmin, isAuthenticated, isVerified, isBlocked



module.exports = {
    isAuthenticated : (req,res,next) => {
        if (req.isAuthenticated()) {
            next()
        } else {
            return res.redirect('/login')
        }
    },
    isAdmin : (req,res,next) => {
        const errors = []

        if (req.isAuthenticated() && req.user.isAdmin) {
            next()
        } else {

            errors.push('Unauthorized')

            return res.render('auth/userLogin', {
                errorMessage: errors,
                layout: authLayout
            })
        }
    },
}