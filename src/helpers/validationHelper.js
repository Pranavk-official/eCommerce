const { check, validationResult } = require('express-validator');
const User = require('../models/userSchema')
const Product = require('../models/productSchema')
const Category = require('../models/categorySchema')


const addCategorySchema = [
    check('name')
        .notEmpty()
        .withMessage('Category name is required')
        .custom(async (value, { req }) => {
            // Convert name to uppercase
            const name = value.toUpperCase();
            req.body.name = name;

            // Check if category already exists
            const category = await Category.findOne({ name: name });
            if (category) {
                throw new Error('Category name already exists');
            }
        })
];


module.exports = {
    addCategorySchema
}