/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var At = require('../api/at/at.model');

User.find({}).remove(function() {
  User.create({
    provider: 'sms',
    name: 'Alexis LaSalle',
    phone: '+18606817213',
    token: 'blub-blub',
    role: 'user',
    jade: true
  }, {
    provider: 'sms',
    name: 'Rob Stolarz',
    phone: '+18606817216',
    token: 'blub-blub-blub',
    role: 'admin',
    jade:true
  }, {
    provider: 'sms',
    name: 'Admin McBubberton',
    phone: '+19118675309',
    token: 'blub-blub-blub-blub',
    role: 'admin',
    jade:true
  }).then(function(a,b,c){
    At.create([
      {
        asker:{user:b},
        answerer:{user:a}
      },{
        asker:{user:b},
        answerer:{user:c,location:{timestamp:new Date}}
      }
    ]);
  },console.error);
  
});