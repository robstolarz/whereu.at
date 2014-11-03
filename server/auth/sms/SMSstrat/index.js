var passport = require('passport')
  , util = require('util');

function SMSstrat(options) {
  
  passport.Strategy.call(this);
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
  var authorization = req.headers['authorization'];
  if (!authorization) { return this.fail(401); }
  
  var parts = authorization.split(' ')
  if (parts.length < 2) { return this.fail(400); }
  
  var scheme = parts[0]
    , credentials = new Buffer(parts[1], 'base64').toString().split(':');

  if (!/Basic/i.test(scheme)) { return this.fail(this._challenge()); }
  if (credentials.length < 2) { return this.fail(400); }
  
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