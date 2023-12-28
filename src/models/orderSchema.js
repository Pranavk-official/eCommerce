const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = Schema({

    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },

    products : [{
        productId : {
            type : Schema.Types.ObjectId,
            ref : 'Product',
            required : true
        },
        quantity : {
            type : Number,
            required : true
        },
        price : {
            type : Number,
            required : true
        }
    }],

    totalPrice : {
        type : Number,
        required : true
    },

    paymentMethod : {
        type : String,
        required : true
    },


    orderStatus : {
        type : String,
        default : 'Pending'
    },

    address : {
        type : Schema.Types.ObjectId,
        ref : 'Address',
        required : true
    },

    date : {
        type : Date,
        default : Date.now
    },

}, {
    timestamps: true
})

module.exports = mongoose.model('Order',orderSchema)