const express = require('express');
const path = require('path');
const router = express.Router();
const rootDir = require('../utility/path');
const adminData = require('../routes/admin');

router.get('/', (req, res, next)=>{
    console.log('shop.js', adminData.data);
    res.render('shop', { prods: adminData.data, pageTitle: 'Shop'   , path: '/' });
});

module.exports = router;