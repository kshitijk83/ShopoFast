const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const AuthRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5ceae92a90de6513717c7474')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(AuthRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://kshitijk83:451422ere@paracticing-bfzmz.mongodb.net/shop?retryWrites=true'
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
