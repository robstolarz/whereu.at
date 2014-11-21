'use strict';

var express = require('express');
var passport = require('passport');
var config = require('../config/environment');
var User = require('../api/user/user.model');

/**
 * this table holds callbacks for success for every user response 
 * they should be deleted
 */
require('es6-shim');
var ipc = new Map();
function retrieveIPC(){
  return ipc;
}

// Passport Configuration
require('./local/passport').setup(User, config);
require('./sms/passport').setup(User, config, retrieveIPC);

var router = express.Router();

router.use('/local', require('./local'));
router.use('/sms', require('./sms')(config,retrieveIPC)); // TODO: http://expressjs.com/api.html#app.locals

module.exports = router;