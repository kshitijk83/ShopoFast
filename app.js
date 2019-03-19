// CORE MODULES
const express = require('express');
const bodyParser = require('express');
const path = require('path');

// OTHER FILES
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// UTILITY
const rootDir = require('./utility/path');

const app = express();

// SETTING GLOBAL CONFIG
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', adminData.routes);
app.use(shopRoutes);
app.use((req, res, next)=>{
    res.status(404).render('error', { pageTitle: 'Error', path: null });
});
app.listen(3000);