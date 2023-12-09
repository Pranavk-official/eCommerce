const cartSchema = require('../models/cartSchema');
const mongoose = require('mongoose');

module.exports = {
  totalCartPrice: async (user) => {
    try {
      const totalPrice = await cartSchema.aggregate([
        {
          $match: { userId: new mongoose.Types.ObjectId(user) }
        },
        {
          $unwind: '$items'
        },
        {
          $lookup: {
            from: 'products',
            localField: 'items.productId',
            foreignField: '_id', 
            as: 'product'
          }
        }, 
        {
          $unwind: '$product'
        },
        {
          $group: {
            _id: '$_id',
            userId: { $first: '$userId' },
            items: {
              $push: {
                _id: '$items._id',
                productId: '$items.productId', 
                productName: '$product.name',
                quantity: '$items.quantity',
                totalPrice: { 
                  $multiply: ['$product.price', '$items.quantity']
                }  
              }
            },
            total: {  
              $sum: {
                $sum: {
                  $map: {
                    input: {
                      $objectToArray: "$items"
                    },
                    as: "item",
                    in: {
                      $multiply: ["$item.product.price", "$item.quantity"]
                    }
                  }
                }  
              }
            }
          }
        }
      ]);

      return totalPrice;

    } catch (error) {
      console.log(error);
    }
  }
}