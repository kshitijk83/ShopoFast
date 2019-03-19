const express = require('express');
const path = require('path');
const router = express.Router();
const rootDir = require('../utility/path');

var data = [];

router.get('/add-product', (req, res, next)=>{
    res.render('addProduct', { title: 'Add Product', pageTitle: 'ADD PRODUCT', path: '/admin/add-product' });
});

router.post('/add-product', (req, res, next)=>{
    // console.log(req.body);
    data.push({ title: req.body.title });
    res.redirect('/');
});

// module.exports = router;
exports.routes = router;
exports.data = data;