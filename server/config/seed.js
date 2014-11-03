/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');

User.find({}).remove(function() {
  User.create({
    provider: 'sms',
    name: 'Alexis LaSalle',
    phone: '+18606817213',
    token: 'blub-blub'
  }, {
    provider: 'sms',
    name: 'Rob Stolarz',
    phone: '+18606817216',
    token: 'blub-blub-blub',
    role: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});