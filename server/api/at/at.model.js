'use strict';

require('es6-shim');

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.ObjectId,
    Mixed = mongoose.Schema.Mixed;
var positionInterface = {
  coords: {
    latitude:Number,
    longitude:Number,
    accuracy:Number, 
    altitude:Number, 
    altitudeAccuracy:Number, 
    heading:Number, 
    speed:Number
  },
  timestamp:Date
};

var AtSchema = new Schema({
  asker:{
    user:{type:ObjectId,ref:'User'},
    location:positionInterface
  },
  answerer:{
    user:{type:ObjectId,ref:'User'},
    location:positionInterface
  },
  when:Date
});

AtSchema.static('areFriends',function(u1,u2){
  return At.aggregate([
    {$match:{
        $and:[
          {$or:[
            {asker:{user:u1},answerer:{user:u2}},
            {asker:{user:u2},answerer:{user:u1}},
          ]},
          {answerer:{location:{timestamp:{$exists:true}}}}
        ]
      }
    },
    {$limit:1}
  ]);
});

AtSchema.pre('save', function (next) {
  this.when = Math.max(this.asker.location.timestamp||0,this.answerer.location.timestamp||0);
  next();
});

module.exports = mongoose.model('At', AtSchema);