const Order = require('../models/orderSchema')
const Cart = require('../models/cartSchema')
const Product = require('../models/productSchema')
const cartHelper = require('../helpers/cartHelper')

const adminLayout = './layouts/adminLayout'

module.exports = {
    
    // User Side

    placeOrder: async (req, res) => {

        const products = await cartHelper.totalCartPrice(req.user.id)
        const { addressId, paymentMethod } = req.body


        const productItems = products[0].items

        console.log(productItems);

        const cartProducts = productItems.map((items) => ({
            productId: items.productId,
            quantity: items.itemQuantity,
            price: (items.totalPrice / items.itemQuantity)
        }))

        console.log(cartProducts);

        const cart = await Cart.findOne({ userId: req.user.id })

        paymentMethod === 'COD' ? orderStatus = 'confirmed' : orderStatus = 'Pending';

        const order = new Order({
            userId: req.user.id,
            products: cartProducts,
            totalPrice: products[0].totalPriceOfCart,
            paymentMethod: paymentMethod,
            orderStatus: orderStatus,
            address: addressId
        })

        await order.save()

        // decrease stock quantity

        for (const items of cartProducts) {
            const { productId, quantity } = items
            await Product.updateOne({ 
                _id: productId 
            },{ 
                $inc: { 
                    quantity: -quantity 
                } 
            })
        }

        // delete cart

        await Cart.deleteOne({ userId: req.user.id })

        // console.log(productItems);

        res.json({
            message: 'Order Placed'
        })
    },

    getOrderConfirm: async (req, res) => {

        const orders = await Order.find({
            userId: req.user.id
        }).sort({
            createdAt: -1
        }).limit(1).populate({
            path: 'products.productId'
        }).populate(
            'address'
        )

        console.log(orders);

        res.render('shop/orderConfirm', {
            order: orders,
        })
    },

    getOrders : async (req,res) => {
        const orders = await Order.find({ userId: req.user.id })
        .sort({createdAt: -1})
        .populate('products.productId')
        .populate('address')

        res.render('user/orders', {
            orders: orders,
        })


    },

    cancelOrder : async (req,res) => {

    },


    // Admin Side

    getOrderList: async (req,res) => {
        
        try {
            const orders = await Order.find()
            .populate('userId')
            .populate('products.productId')
            .populate('address')
            
            const orderCount = await Order.countDocuments()

            res.render('admin/orders', {
                orders,
                orderCount,
                layout: adminLayout
            })

        } catch (error) {
            console.log(error);
        }

    },
    
    
    changeOrderStatus : async (req,res) => {
        try {
            const { status, orderId } = req.body
            
            // if order is cancelled
            if(status === 'Cancelled'){

                const order = await Order.findById(orderId)

                // if cancelled the product stock should be increased back
                order.products.forEach(async (products) => {
                    await Product.updateOne({_id: products.productId},{
                        $inc: {quantity: products.quantity}
                    })
                });

                await Order.updateOne({_id: orderId},{
                    $set: {
                        orderStatus: status
                    }
                })
                
            }else {
                // Set the status

                await Order.updateOne({_id: orderId},{
                    $set: {
                        orderStatus: status
                    }
                })

            }

            const newStatus = await Order.findById(orderId)
    
            res.status(200).json({message: newStatus.orderStatus})

        } catch (error) {
            console.log(error);
        }
    },

}