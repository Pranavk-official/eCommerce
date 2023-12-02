const Product = require('../models/productSchema')
const Category = require('../models/categorySchema')


// Products Page 
// Category Page
// Checkout ??

module.exports = {
    getShop : async (req,res) => {
        const products = Product.find({status: true})
        const categories = Product.find({status: true})


    }
}