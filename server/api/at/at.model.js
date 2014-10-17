'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.ObjectId,
    Mixed = mongoose.Schema.Mixed;

var AtSchema = new Schema({
  accepted:{
    latitude:Number,
    longitude:Number,
    altitude:Number,
    accuracy:Number
  },
  from:{type:ObjectId,ref:'User'},
  to:{type:ObjectId,ref:'User'},
  time:Date,
  viewed:Boolean,
  message:{
    default:"where u @?",
    type:String
  }
});

module.exports = mongoose.model('At', AtSchema);