const express = require('express');
const path = require('path');
const router = express.Router();
const rootDir = require('../utility/path');

router.get('/add-product', (req, res, next)=>{
    res.sendFile(path.join(rootDir, 'views', 'addProduct.html'));
});

router.post('/add-product', (req, res, next)=>{
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;