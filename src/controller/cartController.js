// Add to Cart 

const Cart = require('../models/cartSchema')
const Product = require('../models/productSchema')

const cartHelper = require('../helpers/cartHelper')


module.exports = {
    getCart: async (req, res) => {

        const locals = {
            title: 'Cart'
        }

        try {

            const userId = req.user.id
            const updatedCart = await Cart.findOne({ userId: userId }).populate({
                path: 'items.productId',
            })

            // Check if the cart exist
            if (updatedCart) {
                
                if (updatedCart.items.length === 0) {
                    await Cart.deleteOne({ userId: userId })
                    req.flash({ success: 'Cart Deleted' })
                }

                // item total price and cart total
                const totalCartPrice = await cartHelper.totalCartPrice(userId)
 
                console.log(totalCartPrice);                 

                res.render('shop/cart', {
                    locals,
                    user: req.user,
                    cartItems: updatedCart,
                    cartTotalPrice: totalCartPrice

                })
            } else {
                res.render('shop/cart', {
                    locals,
                    user: req.user,
                    cartItems: null
                })
            }




        } catch (error) {
            console.log(error);
        }
    },

    addToCart: async (req, res) => {

        try {
            console.log('api called');

            const userId = req.user.id
            const productId = req.params.id

            const userCart = await Cart.findOne({ userId: userId })
            const productStock = await Product.findOne({ _id: productId }, {
                quantity: 1
            })

            const stock = productStock.quantity

            if (stock > 0) {


                if (userCart) {

                    const exist = userCart.items.find(item => item.productId == productId)

                    console.log(exist);

                    if (exist) {
                        const availableStock = stock - exist.quantity

                        if (availableStock > 0) {
                            await Cart.updateOne({ userId: userId, 'items.productId': productId }, {
                                $inc: {
                                    'items.$.quantity': 1
                                }
                            })


                            req.flash({ success: 'Product Added to Cart' })
                            res.redirect('/shop')

                        } else {
                            req.flash({ errmsg: "Oops! It seems you've reached the maximum quantity of products available for purchase." })
                            res.redirect('/shop')
                        }
                    } else {

                        await Cart.updateOne({ userId: userId }, {
                            $push: {
                                items: {
                                    productId: productId
                                }
                            }
                        })
                    }

                } else {
                    const productId = req.params.id

                    const newCart = new Cart({
                        userId: userId,
                        items: [{
                            productId: productId
                        }]
                    })

                    await newCart.save()

                    req.flash({ success: 'Product Added to Cart' })
                    res.redirect('/shop')
                }
            }
        } catch (error) {
            console.log(error.message);
        }



    },

    deleteCart: async (req, res) => {

        try {
            const userId = req.user.id
            await Cart.deleteOne({ userId: userId })
            req.flash({ success: 'Cart Deleted' })
            res.redirect('/shop')

        } catch (error) {
            console.log(error);
        }
    },

    increaseCartItem: async (req, res) => {
        try {
            const userId = req.user.id
            const productId = req.params.id

            const userCart = await Cart.findOne({ userId: userId })
            const productStock = await Product.findOne({ _id: productId }, {
                quantity: 1
            })

            const stock = productStock.quantity

            if (stock > 0) {
                const exist = userCart.items.find(item => item.productId == productId)

                if (exist) {
                    const availableStock = stock - exist.quantity

                    if (availableStock > 0) {
                        await Cart.updateOne({ userId: userId, 'items.productId': productId }, {
                            $inc: {
                                'items.$.quantity': 1
                            }
                        })

                        req.flash({ success: 'Product Quantity Increased' })
                        res.redirect('/cart')
                    } else {
                        req.flash({ errmsg: "Oops! It seems you've reached the maximum quantity of products available for purchase." })
                        res.redirect('/cart')
                    }
                } else {
                    req.flash({ errmsg: "Oops! The product is not in your cart." })
                    res.redirect('/cart')
                }
            }
        } catch (error) {
            console.log(error);
        }
    },
    decreaseCartItem: async (req, res) => {
        try {
            const userId = req.user.id
            const productId = req.params.id

            const userCart = await Cart.findOne({ userId: userId })
            const productStock = await Product.findOne({ _id: productId }, { quantity: 1 })

            const stock = productStock.quantity
            const exist = userCart.items.find(item => item.productId == productId)

            if (exist) {
    
                if (exist.quantity > 0) {
                    const availableStock = stock - exist.quantity
    
                    if (availableStock > 0) {
                        await Cart.updateOne({ userId: userId, 'items.productId': productId }, {
                            $inc: { 'items.$.quantity': -1 }
                        })
    
                        req.flash({ success: 'Product Quantity Decreased' })
                        res.redirect('/cart')
                    }
                }
            }
            else {
                res.redirect('/cart')
            }
        } catch (error) {
            console.log(error)
        }
    },

    deleteCartItem: async (req, res) => {
        try {
            const userId = req.user.id
            const productId = req.params.id
            await Cart.updateOne({ userId: userId }, {
                $pull: {
                    items: {
                        productId: productId
                    }
                }
            })
            req.flash({ success: 'Product Removed from Cart' })
            res.redirect('/cart')
        } catch (error) {
            console.log(error);
        }
    },
}