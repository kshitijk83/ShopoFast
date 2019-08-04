const path = require('path');

const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URI = 'mongodb+srv://kshitijk83:451422ere@paracticing-bfzmz.mongodb.net/shop?retryWrites=true';
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
})
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const AuthRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'blah', resave: false, saveUninitialized: false, store: store}));

app.use((req, res, next)=>{
  if(!req.session.user){
    return next();
  }
  User.findById(req.session.user._id)
  .then(user=>{
    req.user = user;
    next();
  })
  .catch(err=>{
    console.log(err);
  })
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(AuthRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    MONGODB_URI
  )
  .then(result => {
      User.findOne().then(user=>{
        if(!user){
          const user = new User({
            name: 'ksh',
            email: 'ksh@ksh.com',
            cart: {
              items: []
            }
          })
          user.save();
        }
      })
      console.log('connected');
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
