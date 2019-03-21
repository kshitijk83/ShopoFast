// CORE MODULES
const express = require('express');
const bodyParser = require('express');
const path = require('path');

// OTHER FILES
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorControllers = require('./controllers/error');

// UTILITY
const rootDir = require('./utility/path');

const app = express();

// SETTING GLOBAL CONFIG
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorControllers.err404);
app.listen(3000);