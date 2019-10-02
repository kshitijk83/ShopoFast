const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const User = require('../models/user');

const transporter = nodemailer.createTransport(sendgridTransport({
  auth:{
    api_key: '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'
  }
}))

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({email: email})
  .then(user=>{
    if(!user){
      return res.redirect('/login');
    }
    return bcrypt.compare(password, user.password)
    .then(isMatched=>{
      if(isMatched){
        req.session.isLoggedIn = true;
        req.session.user = user;
        return req.session.save(err => {
          console.log(err);
          res.redirect('/');
        });
      } return res.redirect('/login');
    })
  })
  .catch(err=>{
    console.log(err);
  })
  User.findById('5bab316ce0a7c75f783cb8a8')
    .then(user => {
      
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  User.findOne({email:email})
  .then(userDoc=>{
    if(userDoc){
      return res.redirect('/signup');
    }
    return bcrypt.hash(password, 12)
    .then(hashedPass=>{
      const user = new User({
        email: email,
        password: hashedPass,
        cart: {items:[]}
      })
  
      return user.save();
    })
    .then(result=>{
      res.redirect('/login');
      return transporter.sendMail({
        to: email,
        from: 'blah@blah.com',
        subject: 'test',
        html: '<h1>blah</>'
      })
    })
  })
  .catch(err=>{
    console.log(err);
  })
  

};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
