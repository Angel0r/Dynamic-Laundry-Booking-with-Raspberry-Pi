
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

var status = false
router.post('/register', (req, res, next)=>{
var newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user)=>{
    if(err){
      res.json({success: false, msg:'Failed to register user'})
    } else
      res.json({success: true, msg:'User registered'})

  });
});

//authenticate
router.post('/authenticate', (req, res, next)=>{
  const username = req.body.username
  const password = req.body.password
  User.getUserByUsername(username, (err,user)=>{
    if(err) throw err
    if(!user){
      return res.json({success: false, msg:'User not found'});
    }
    User.comparePassword(password,user.password, (err, isMatch)=>{
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(user, config.secret, {
          expiresIn: 3600
        });
        status = true
        console.log(status)
        res.json({
          success:true,
          token: 'JWT'+token,
          user:{
            id: user._id,
            name:user.name,
            username:user.email
          }
        });
      } else{
          return res.json({success: false, msg:'Invalid credentials'});
      }
    });
  });
});

//profile
router.get('/profile',passport.authenticate('jwt', {session:status}),(req, res, next) => {
  res.send({user: req.user});
});

module.exports = router