'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

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
  console.log(req.body);
  console.log("IT WORKED");
  console.log("---------------------");
  console.log(req.body.Body);
  console.log("---------------------");
  res.send(200);
});
module.exports = router;