const express = require('express');
const router = express.Router();

const authLayout = './layouts/userAuthLayout'
const userLayout = './layouts/userLayout'

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  res.render('auth/userLogin', {
    layout: authLayout
  })
});

router.get('/products', function(req, res, next) {
  
  const locals = {
    title: "Products Page"
  }
  
  res.render('users/products', {
    locals,
    layout: userLayout
  })
});

router.get('/productDetail', function(req, res, next) {
  
  const locals = {
    title: "Products Page"
  }
  
  res.render('users/productDetail', {
    locals,
    layout: userLayout
  })
});

router.get('/cart', function(req, res, next) {
  
  const locals = {
    title: "Products Page"
  }
  
  res.render('users/cart', {
    locals,
    layout: userLayout
  })
});

module.exports = router;
