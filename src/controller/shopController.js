const Product = require('../models/productSchema')
const Category = require('../models/categorySchema')


// Home Page 
// Products Page 
// Category Page

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
        try {
            const products = await Product.find({status: true})
            const categories = await Category.find({status: true})
    
            res.render('shop/products', {
                products,
                categories,
                user: req.user
            })
        } catch (error) {
            console.log(error);
        }
    },
    getSingleProduct : async (req,res) => {
        try {
            const productId = req.params.id
            const product = await Product.findById(productId)

            const locals = {
                title: product.name
            }

            res.render('shop/productDetail',{
                locals,
                product
            })
        } catch (error) {
            console.log(error);
        }
    },

}