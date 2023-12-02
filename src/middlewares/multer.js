const multer = require( 'multer' )
const path = require('path')

const storage = multer.diskStorage({
    destination : ( req, file, cb ) => {
        cb( null, './public/uploads/images/')
    },
    filename : ( req, file, cb ) => {
        const uniqueName = Date.now() + '-' + file.originalname
        cb( null, uniqueName )
    }
})

const categoryStorage = multer.diskStorage({
    destination : ( req, file, cb ) => {
        cb( null, './public/uploads/category-images/')
    },
    filename : ( req, file, cb ) => {
        const uniqueName = Date.now() + '-' + file.originalname
        cb( null, uniqueName )
    }
})

const profileStorage = multer.diskStorage({
    destination : ( req, file, cb ) => {
        cb( null, './public/uploads/profile-images/')
    },
    filename : ( req, file, cb ) => {
        const uniqueName = Date.now() + '-' + file.originalname
        cb( null, uniqueName )
    }
})

const productStorage = multer.diskStorage({
    destination : ( req, file, cb ) => {
        cb( null, './public/uploads/product-images/')
    },
    filename : ( req, file, cb ) => {
        const uniqueName = Date.now() + '-' + file.originalname
        cb( null, uniqueName )
    }
})


module.exports  = {
    upload: multer({storage : storage}),
    categoryUpload: multer({storage : categoryStorage}),
    profileUpload: multer({storage : profileStorage}),
    productUpload: multer({storage : productStorage}),
}