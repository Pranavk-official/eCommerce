const cartSchema = require('../models/cartSchema');
const mongoose = require('mongoose');

module.exports = {
 totalCartPrice: async (user) => {
 try {
  const totalPrice = await cartSchema.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(user)
      }
    },
    {
      $unwind: "$items"
    },
    {
      $lookup: {
        from: 'products', // assuming the product model name is 'Product'
        localField: 'items.productId',
        foreignField: '_id',
        as: 'productDetails'
      }
    },
    {
      $unwind: "$productDetails"
    },
    {
      $group: {
        _id: "$items.productId",
        totalPricePerItem: {
          $sum: {
            $multiply: ["$items.quantity", "$productDetails.price"]
          }
        },
        productName: { $first: "$productDetails.name" },
        itemQuantity: { $first: "$items.quantity" },
        userId: { $first: "$userId" }
      }
    },
    {
      $group: {
        _id: "$userId",
        items: {
          $push: {
            productId: '$_id',
            productName: '$productName',
            itemQuantity: '$itemQuantity',
            totalPrice: '$totalPricePerItem',
          }
        },
        totalPriceOfCart: {
          $sum: '$totalPricePerItem'
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
