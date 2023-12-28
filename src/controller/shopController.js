const Product = require('../models/productSchema')
const User = require('../models/userSchema')
const Cart = require('../models/cartSchema')
const Category = require('../models/categorySchema')
const cartHelper = require('../helpers/cartHelper')


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

    getCheckout: async (req, res) => {
        try {

            const user = await User.findById(req.user.id).populate({
                path: 'address',
                model: 'Address',
                match: { status: true }
            }) 

            const cartTotal = await cartHelper.totalCartPrice(req.user.id)

            console.log(cartTotal[0]);
            const cart = await Cart.findOne({userId : req.user.id})

            // res.send(cartTotal[0])

            res.render('shop/checkout', {
                address : user.address,
                cartTotal: cartTotal[0]
            })

        } catch (error) {
            console.log(error);
        }
    },

    checkout : async (req,res) => {

    }

}