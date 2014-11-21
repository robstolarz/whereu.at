var passport = require('passport'),
  SMSstrat = require('./SMSstrat');
  
var sid = 'AC3f0966166c60e93751e3ac7e81f7100e'; 
var authToken = 'ede32556793994b9e246afe8658af1f1',
  fromPhone = '+18603225003';

exports.setup = function(User, config, ipc){
  passport.use(new SMSstrat(sid,authToken,fromPhone,ipc,{
    
  }));
};