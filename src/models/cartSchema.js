const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cartSchema = Schema({
    
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },

    items : [{
        productId : {
            type : Schema.Types.ObjectId,
            ref : 'Product',
            required : true
        },

        quantity : {
            type : Number,
            default : 1
        }
    }],

})

module.exports = mongoose.model('Cart', cartSchema)