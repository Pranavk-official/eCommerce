const fs = require('fs');

const adminLayout = './layouts/adminLayout'

const Product = require('../models/productSchema')
const Category = require('../models/categorySchema')
const productSchema = require('../models/productSchema')

const {productUpload} = require('../middlewares/multer') 

module.exports = {
    getProductList : async (req,res) => {

        const locals = {
            title: 'Product Management'
        }

        try {
            let perPage = 12;
            let page = req.query.page || 1;

            const products = await Product.aggregate([{ $sort: { createdAt: -1 } }])
                .skip(perPage * page - perPage)
                .limit(perPage)
                .exec();

            const count = await Product.countDocuments()
            const nextPage = parseInt(page) + 1
            const hasNextPage = nextPage <= Math.ceil(count / perPage)

            // console.log(products[0].image[0]);

            res.render('admin/products', {
                locals,
                products,
                layout: adminLayout,
                success: req.flash('success'),
                err: req.flash('err')
            })
        } catch (error) {
            console.log(error);
        }
    },
    viewProduct : (req,res) => {

    },

    getAddProduct : async (req,res) => {
        try {

            const categories = await Category.find({status: true})

            res.render('admin/addProduct', {
                categories,
                layout: adminLayout,
                err: req.flash('error')
            })
        } catch (error) {
            console.log(error);
        }   
    },
    addProduct : async(req,res) => {
        try {
            // console.log(req.body);
            for(let file of req.files) {
                if( 
                    file.mimetype !== 'image/jpg' &&
                    file.mimetype !== 'image/jpeg' &&
                    file.mimetype !== 'image/png' &&
                    file.mimetype !== 'image/webp' &&
                    file.mimetype !== 'image/gif'
                    ){
                        req.flash('err','Check the image type')
                        return res.redirect('/admin/products/add-product')
                    }
            }

            const img = []

            console.log(req.files, req.body);
            
            for( let items of req.files) {
                img.push(items.filename)
            }
            
            const product = new productSchema( {
                name : req.body.name,
                description : req.body.description,
                brand : req.body.brand,
                image : img,
                category : req.body.id,
                quantity : req.body.quantity,
                price : req.body.price
            })
            await product.save()
            res.redirect('/admin/products')
            
        } catch (error) {
            console.log(error);
        }
    },

    getEditProduct : (req,res) => {
        try {
            res.render('admin/editProduct', {
                layout: adminLayout
            })
        } catch (error) {
            console.log(error);
        }
    },
    editProduct : async (req,res) => {
        try {
            const existingProduct = await productSchema.findById( req.body.productId )
            if( req.files ) {
                for( let file of req.files ) {
                    if( 
                        file.mimetype !== 'image/jpg' &&
                        file.mimetype !== 'image/jpeg' &&
                        file.mimetype !== 'image/png' &&
                        file.mimetype !== 'image/gif'
                        ){
                            req.flash( 'err','Check the image type' )
                            return res.redirect(`/admin/products/edit-product/${existingProduct._id}`)
                        }
                }
                const images = existingProduct.image
                req.files.forEach( element => {
                    images.push( element.filename )
                });
                var img = images
            }
            await productSchema.updateOne( { _id : req.body.productId },
                {
                    $set : {
                        name : req.body.name,
                        description : req.body.description,
                        brand : req.body.brand,
                        category : req.body.id,
                        quantity : req.body.quantity,
                        price : req.body.price,
                        image : img
                    }
                }
            )
            req.flash('success', 'Product Edited Successfully')
            res.redirect( '/admin/products' )
        } catch ( error ) {
            res.redirect('/500')

        }
    },

    deleteProduct : async (req,res) => {
        try {

            const product = await Product.findById(req.params.id)

            if(product.images) {
                product.images.forEach(image => {
                    fs.unlink( path.join( __dirname, '../public/images/product-images/' ) + image , ( err ) => {
                        if( err ) {
                            res.redirect('/500')
        
                        }
                    })    
                });
            }
            
            await product.deleteOne()
            res.status(200).json('Product was removed successfully!!')
        } catch (error) {
            console.log(error);
        }
    },
    unlistProduct : async (req,res) => {
        try {
            await Product.updateOne({_id: req.params.id},{$set: {status : false }})
            req.flash('success', 'Product removed/unlisted')
            res.redirect('/admin/products')
        } catch (error) {
            console.log(error);
        }
    },
    listProduct : async (req,res) => {
        
        await Product.updateOne({_id: req.params.id},{$set: {status : true }})
        req.flash('success', 'Product restored/listed')
        res.redirect('/admin/products')

    },

    deleteImage : (req,res) => {

    },
}