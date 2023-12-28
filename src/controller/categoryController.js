const fs = require('fs');
const path = require('path');

const Category = require('../models/categorySchema')
const adminLayout = './layouts/adminLayout'
const { check, validationResult } = require('express-validator');

const { addCategorySchema } = require('../helpers/validationHelper')



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
            const categories = await Category.aggregate([{ $sort: { createdAt: -1 } }])
            res.render('admin/category', {
                layout: adminLayout,
                categories,
                success: req.flash('success'),
                err: req.flash('err')
            })

        } catch (error) {
            console.log(error);
        }
    },
    getAddCategory: (req, res) => {
        const locals = {
            title: 'Add Category'
        }

        try {
            res.render('admin/addCategory', {
                locals,
                layout: adminLayout,
                err: req.flash('err')
            })

        } catch (error) {
            console.log(error);
        }
    },
    getEditCategory: async (req, res) => {

        const locals = {
            title: 'Edit Category'
        }

        try {

            const category = await Category.findById(req.params.id)

            res.render('admin/editCategory', {
                category,
                layout: adminLayout,
            })

        } catch (error) {
            console.log(error);
        }
    },
    addCategory: async (req, res) => {
        try {

            const { name } = req.body

            const categoryExist = await Category.findOne({ name: name.toUpperCase() })


            if (categoryExist) {
                req.flash('err', 'Category already exist')
                req.session.save(() => res.json({ redirect: '/admin/category/add-category' }));                
            } else {
                console.log(req.body, req.file, req.file.filename.split(':')[0]);


    
                const category = new Category({
                    name: name.toUpperCase(),
                    image: req.file.filename.split(':')[0],
                    status: true
                })
                
                await category.save()
                
                req.flash('success', 'Category Added')
                req.session.save(() => res.json({ redirect: '/admin/category' }));
            }


        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'An error occurred while adding the category.' });
        }
    },
    editCategory: async (req, res) => {
        try {
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'An error occurred while editing the category.' });
        }
    },
    viewCategory: async (req, res) => {

        const locals = {
            title: 'View Category'
        }

        try {
            const category = await Category.findById(req.params.id)

            res.render('admin/viewCategory', {
                locals,
                category,
                layout: adminLayout
            })

        } catch (error) {
            console.log(error);
        }
    },
    changeCategoryStatus: async (req, res) => {
        try {
            const { status } = req.body

            if (status === 'list') {
                await Category.updateOne({ _id: req.params.id }, { $set: { status: true } })
                res.status(200).json('Category was successfully added/listed!!');
            } else {
                await Category.updateOne({ _id: req.params.id }, { $set: { status: false } })
                res.status(200).json('Category was successfully removed/unlisted!!');
            }


        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'An error occurred while listing the category.' });
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const categoryId = req.params.id

            const category = await Category.findById(categoryId)

            console.log(category);

            fs.unlink(path.join(__dirname, '../../public/uploads/category-images/') + category.image, (err) => {
                if (err) {
                    console.log(err);
                }
            })

            await category.deleteOne()

            res.status(200).json('Category was successfully deleted!!');
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'An error occurred while deleting the category.' });
        }
    },

    deleteImage: async (req, res) => {
        try {

            console.log(req.query);

            const categoryId = req.query.id
            const categoryImage = req.query.image

            await Category.updateOne({ _id: categoryId }, {
                $pull: {
                    image: categoryImage
                }
            })

            fs.unlink(path.join(__dirname, '../../public/uploads/category-images/') + categoryImage, (err) => {
                if (err) {
                    console.log(err);
                    throw err
                }
            })

            res.status(200).json({ error: 'Successfully removed the Category Image.' });

        } catch (error) {
            res.status(500).json({ error: 'An error occurred while deleting the Category Image.' });
        }
    }
}