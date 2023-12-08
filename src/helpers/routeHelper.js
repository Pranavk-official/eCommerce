const Cart = require('../models/cartSchema')


module.exports = { 
    isActiveRoute: (route, cuurentRoute) => {
        return route === cuurentRoute ? 'active' : ''
    }, 
    getCartCount: async (user) => {

        if (user) {

            const cartItems = await Cart.findOne({userId :user.id})
            
            if(cartItems != null){
                return cartItems.items.length
            }else {
                return 0
            }
        }
        
    } 
}