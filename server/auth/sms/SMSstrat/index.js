var passport = require('passport')
  , util = require('util')
  , User = require('mongoose').model('User');

function SMSstrat(sid, authToken, fromPhone, options) {
  
  passport.Strategy.call(this);
  this.client = require('twilio')(sid, authToken);
  this.fromPhone = fromPhone;
  this.name = 'sms';
  //TODO: start SMS read loop
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
    token = parts[1];
  
  User.find({phone:phone}).exec(function(err,users){
    if(err) throw err;
    
    if(users && users[0] && users[0].authToken == token) //if we find a user and their token works
      return self.success(user); //then we're good to go
    
    //even if we don't find a user, redirect... just don't do anything else :)
    this.redirect('/user/login/spinlock');
    //but if we actually find a user
    if(users && users[0]){
      this.client.messages.create({
        to: phone,
        from: this.fromPhone,
        body: "Hey there! It looks like someone's trying to log into your account. To finish logging in, just respond to this text. HELP for help, STOP to stop."
      });
      users[0].conversation = {token:token,convoStep:'login'};
    }
    
  });
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