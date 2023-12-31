const mongoose = require( 'mongoose' )

const Schema = mongoose.Schema

const productSchema = Schema({

    name : {
        type : String,
        required : true
    },

    description : {
        type : String,
        required : true
    },

    brand : {
        type : String,
        enum: ['Nike', 'Puma', 'Addidas'],
        required : true
    },

    category : {
        type : Schema.Types.ObjectId,
        ref : 'Category', 
        required : true
    },

    quantity : {
        type : Number,
        required : true
    },

    price : {
        type : Number,
        required : true
    },

    image : {
        type : Array,
        // required : true
    }, 

    status : {
        type : Boolean,
        default : true
    },

    // offer : {
    //     type : mongoose.Schema.Types.ObjectId,
    //     ref : 'offer'
    // }
    
})


module.exports = mongoose.model('Product', productSchema)   