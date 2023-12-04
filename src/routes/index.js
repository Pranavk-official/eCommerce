const express = require('express');
const router = express.Router();
const Category = require('../models/categorySchema')
const Product = require('../models/productSchema')


/* GET home page. */
router.get('/', async function(req, res, next) {
  
  const categories = await Category.find({status: true})
  const products = await Product.find({status: true})

  res.render('index', { 
    title: 'Shopper',
    user: req.user,
    categories,
    products
   });
});

router.get('/profile', function(req, res, next) {
  res.render('users/viewProfile', { title: 'Express' });
});

module.exports = router;
