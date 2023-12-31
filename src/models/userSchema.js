const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userSchema = Schema({
    avatar: {
        type : String,
    },
    username: {
        type : String,
        required: true
    },
    firstName: {
        type : String,
        required: true
    },
    lastName: {
        type : String,
        required: true
    },
    email: {
        type : String,
        required: true
    },
    phone: {
        type : Number,
        required: true
    },
    password: {
        type : String,
        required: true
    },
    isAdmin: {
        type : Boolean,
        default: false
    },
    isVerified: {
        type : Boolean,
        default: false
    },
    isBlocked: {
        type : Boolean,
        default: false
    },
    registrationDate: {
        type : Date,
        default: Date.now
    },
    token : {
        otp: {
            type: Number
        },
        generatedTime : {
            type: Date
        }
    },
    address: [{
        type: Schema.Types.ObjectId,
        ref: 'Address'
    }],
}, {
    timestamps: true
})



module.exports = mongoose.model('User', userSchema)