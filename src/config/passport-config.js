const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/userSchema');

const customFields = {
    usernameField: 'email',
    passwordField: 'password',
}

const verifyCallback = async (email, password, done) => {

    const user = await User.findOne({ email })

    if(!user){
        return done(null, false)
    }

    const isValid = await bcrypt.compare(password, user.password)
    
    console.log(isValid);

    if (!isValid) {
        return done(null, false)
    } else {
        return done(null, user)
    }
}


passport.use(new LocalStrategy(customFields,verifyCallback))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
 });
 

module.exports = passport