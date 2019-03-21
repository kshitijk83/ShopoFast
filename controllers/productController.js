const Product = require('../models/product');

exports.getAddProduct =(req, res, next)=>{
    res.render('addProduct', { title: 'Add Product', pageTitle: 'ADD PRODUCT', path: '/admin/add-product' });
}

exports.postAddProduct=(req, res, next)=>{
    // console.log(req.body);
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}

exports.getProduct = (req, res, next)=>{
    Product.fetchAll(products=>{
        res.render('shop', {
            prods: products, pageTitle: 'Shop',
            path: '/'
        });
    });
}