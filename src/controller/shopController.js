const Product = require('../models/productSchema')
const Category = require('../models/categorySchema')


// Home Page 
// Products Page 
// Category Page
// Cart 
// Checkout ??

module.exports = {
    getHome: async (req,res) => {
        try {
            const products = await Product.find({status: true})
            const categories = await Category.find({status: true})
            
            res.render('index', {
                products,
                categories,
                user: req.user
            })

        } catch (error) {
            console.log(error);
        }
    },
    getShop : async (req,res) => {
        const products = await Product.find({status: true})
        const categories = await Category.find({status: true})

        res.render('shop/products', {
            products,
            categories,
            user: req.user
        })
    },
    getCart : async (req,res) => {

    },

    // Add to Cart

    

}