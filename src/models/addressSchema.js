const mongoose = require('mongoose')

const Schema = mongoose.Schema

const addressSchema = Schema({

    firstName: {
        type : String,
        required : true
    },
    lastName: {
        type : String,
        required : true
    },
    mobile : {
        type : Number,
        required : true
    },
    
    address1 : {
        type : String,
        required : true
    },
    address2 : {
        type : String,
        required : true
    },

    
    
    street : {
        type : String,
        required : true
    },
    landmark :{
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    state : {
        type : String,
        required : true
    },
    country : {
        type : String,
        requred : true
    },
    
    zipcode : {
        type : Number,
        required : true
    },

    status : {
        type : Boolean,
        default : true,
        required : true
    },

    userId : {
        type : Schema.Types.ObjectId,
        required : true
    }

})

module.exports = mongoose.model( 'Address', addressSchema )