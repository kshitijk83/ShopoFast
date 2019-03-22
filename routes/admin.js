const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/adminController');

router.get('/add-product', adminControllers.getAddProduct);

router.get('/products', adminControllers.getAdminproducts);

router.post('/add-product', adminControllers.postAddProduct);

// module.exports = router;
module.exports = router;