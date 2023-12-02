const Category = require('../models/categorySchema')
const adminLayout = './layouts/adminLayout'




// View Category List
// Add Category
// Edit Category
// View Category
// Delete Category
// list Category
// unlist Category
// unlist Category
// addOffer 
// removeOffer 

module.exports = {
    getCategoryList: async (req, res) => {
        try {
            const categories =  await Category.aggregate([{ $sort: { createdAt: -1 } }])
            res.render('admin/category', {
                layout: adminLayout,
                categories
            })
    
        } catch (error) {
            console.log(error);
        }
    },
    getAddCategory: (req, res) => {
        try {
            res.render('admin/addCategory', {
                layout: adminLayout,
            })

        } catch (error) {
            console.log(error);
        }
    },
    addCategory: async (req, res) => {
        try {
            const category = new Category({
                name: req.body.name,
                image: req.file.filename,
                status: true
            })

            await category.save()

            req.flash('success', 'Category Added')
            res.redirect('/admin/category')

        } catch (error) {
            console.log(error);
        }
    },
    editCategory: async (req, res) => {
        
    },
    viewCategory: (req, res) => {

    },
    listCategory: async (req, res) => {
        try {
            await Category.updateOne({_id: req.params.id},{$set: {status : true }})
            req.flash('success', 'Category removed/unlisted')
            res.redirect('/admin/products')
        } catch (error) {
            console.log(error);
        }
    },
    unlistCategory: async (req, res) => {
        try {
            await Category.updateOne({_id: req.params.id},{$set: {status : false }})
            req.flash('success', 'Category removed/unlisted')
            res.redirect('/admin/products')
        } catch (error) {
            console.log(error);
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const categoryId = req.params.id
            await Category.deleteOne({_id: categoryId})

            req.flash('success', 'Category was deleted')
            res.redirect('/admin/category');
        } catch (error) {
            console.log(error);
        }
    },
}