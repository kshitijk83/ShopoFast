const Product = require('../models/product');
const Cart = require('../models/cart');
const User = require('../models/user');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {
  req.user.getCart()
    .then(cartProducts=>{
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      });
    })
    .catch(err=>{
      console.log(err);
    })
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    req.user.addToCart(product)
    .then(result=>{
      console.log(result);
      res.redirect('/cart');
    })
    .catch(err=>{
      console.log(err);
    })
  });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.deleteCart(prodId)
    .then(result=>{
      res.redirect('/cart');
    }).catch(err=>{
      console.log(err);
    })
};

exports.getOrders = (req, res, next) => {
  req.user.getOrders()
  .then(result=>{
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders: result
  //   });
  // })
  // .catch(err=>{
  //   console.log(err);
  })
})
};

exports.postOrders=(req, res, next)=>{
  req.user.createOrder()
  .then(result=>{
    res.redirect('/create-order');
  })
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
