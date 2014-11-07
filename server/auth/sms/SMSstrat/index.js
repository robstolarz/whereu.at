var passport = require('passport')
  , util = require('util')
  , User = require('mongoose').model('User');

function SMSstrat(sid, authToken, fromPhone, options) {
  
  passport.Strategy.call(this);
  this.client = require('twilio')(accountSid, authToken);
  this.fromPhone = fromPhone;
  this.name = 'sms';
}

/**
 * Inherit from `passport.Strategy`.
 */
util.inherits(SMSstrat, passport.Strategy);

/**
 * Authenticate request based on the token
 *
 * @param {Object} req
 * @api protected
 */
SMSstrat.prototype.authenticate = function(req) {
  /* check if the user is authorized */
  var authorization = req.headers['authorization'];
  if (!authorization) { return this.fail(401); }
  
  /* check for a malformed request */
  var parts = authorization.split(' ')
  if (parts.length < 2) { return this.fail(400); }
  
  /* split credentials from thing */
  var phone = parts[0],
  random = parts[1];

  /* verify TODO */
  if (!/Basic/i.test(scheme)) { return this.fail(this._challenge()); }
  if (credentials.length < 2) { return this.fail(400); }
  
  /* test username and password */
  var userid = credentials[0];
  var password = credentials[1];
  if (!userid || !password) {
    return this.fail(this._challenge());
  }
  
  var self = this;
  
  function verified(err, user) {
    if (err) { return self.error(err); }
    if (!user) { return self.fail(self._challenge()); }
    self.success(user);
  }
  
  if (self._passReqToCallback) {
    this._verify(req, userid, password, verified);
  } else {
    this._verify(userid, password, verified);
  }
}

/**
 * Authentication challenge.
 *
 * @api private
 */
SMSstrat.prototype._challenge = function() {
  return 'Basic realm="' + this._realm + '"';
}


/**
 * Expose `SMSstrat`.
 */ 
module.exports = SMSstrat;