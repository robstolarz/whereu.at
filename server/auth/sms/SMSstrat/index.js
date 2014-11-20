var passport = require('passport')
  , util = require('util')
  , User = require('mongoose').model('User')
  , moment = require('moment');

function SMSstrat(sid, authToken, fromPhone, options) {
  
  passport.Strategy.call(this);
  this.client = require('twilio')(sid, authToken);
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
  var self = this; //I hate JS.
  
  if(req.body['authorization']){
    User.find({token:req.body['authorization'].match(/^Bearer (.+)$/)})
    .exec(function(err,users){
      if(err) throw err;
      if(users && users[0]) //if we find a user with the token
        return self.success(users[0]); //then we're good to go
      return self.fail(401); //or get out
    });
  }
  
  /* otherwise try logging them in */
  var phone = req.body['phone'];
  if (!phone) { return this.fail(400); }
  var stopid = setTimeout(function(){self.fail(401)},60000);
  User.find({phone:phone}).exec(function(err,users){
    if(err) throw err;
    
    //but if we actually find a user
    if(users && users[0] &&  //is there a user?
      !(users[0].conversation.convoStep == 'login' //have they not attempted to login less than 1 minute ago?
      && moment().subtract(1,'m').diff(users[0].conversation.time) < 0 ) 
    ){
      self.client.messages.create({
        to: phone,
        from: self.fromPhone,
        body: "Hey there! It looks like someone's trying to log into your account. To finish logging in, just respond to this text. HELP for help, STOP to stop."
      },console.log);
      users[0].conversation = {convoStep:'login',time:new Date};
      users[0].save();
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