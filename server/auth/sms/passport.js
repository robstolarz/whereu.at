var passport = require('passport'),
  SMSstrat = require('./SMSstrat');
exports.setup = function(User, config){
  passport.use(new SMSstrat({
    
  });
};