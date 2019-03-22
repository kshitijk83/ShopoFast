const Product = require('../models/product');

exports.getAddProduct =(req, res, next)=>{
    res.render('admin/addProduct', { title: 'Add Product', pageTitle: 'ADD PRODUCT', path: '/admin/add-product' });
}

exports.getAdminproducts=(req, res, next)=>{
    // console.log(req.body);
    Product.fetchAll(products=>{
        res.render('admin/adminProducts', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    });
}

exports.postAddProduct=(req, res, next)=>{
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const desc = req.body.desc;
    const price = req.body.price;
    const product = new Product(title, imageUrl, desc, price);
    product.save();
    res.redirect('/');
}