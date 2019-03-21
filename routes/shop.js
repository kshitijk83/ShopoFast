const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/productController');

router.get('/', productControllers.getProduct);

module.exports = router;