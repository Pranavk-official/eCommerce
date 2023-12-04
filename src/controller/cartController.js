// Add to Cart 


module.exports = {
    getCart: async (req,res) => {

        const locals = {
            title: 'Cart'
        }

        try {
            res.render('shop/cart', {
                locals
            })
        } catch (error) {
            console.log(error);
        }
    },
}