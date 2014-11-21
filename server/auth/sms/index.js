module.exports  = (function(config,ipc){
  'use strict';

  var express = require('express');
  var passport = require('passport');
  var auth = require('../auth.service');
  var router = express.Router();
  var User = require('mongoose').model('User');

  router.post('/', function(req, res, next) {
    passport.authenticate('sms', function (err, user, info) {
      var error = err || info;
      if (error) return res.json(401, error);
      if (!user) return res.json(404, {message: 'Something went wrong, please try again.'});

      var token = auth.signToken(user._id, user.role);
      res.json({token: token});
    })(req, res, next)
  });
  router.post('/echo', function(req, res, next) {
    User.find({phone:req.body.From}).limit(1).exec(function(err,users){
      var u = users[0];
      console.log(u.conversation.convoStep);
      console.log(config.uuid);
      console.log(u.conversation.uuid);
      console.log(u.phone);
      console.log(ipc().get(u.phone));
      switch(u.conversation.convoStep){
      case 'login':
        //if(config.uuid == u.conversation.uuid) //forget this for now, we're not sharding yet
          ipc().get(u.phone)()
        break;
      default:
        break;
      }
    });
    console.log(req.body);
    console.log("IT WORKED");
    console.log("---------------------");
    console.log(req.body.Body);
    console.log("---------------------");
    res.send(200);
  });
  return router;
});