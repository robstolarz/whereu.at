'use strict';

var _ = require('lodash');
var At = require('./at.model');
var Model = require('mongoose').Model;
var ObjectId = require('mongoose').Types.ObjectId;

var popAt = function(res,ats,cb){
  At.populate(
    ats,
    {path: 'asker.user answerer.user', model:'User'},
    function(err, ats){
      if(err) { return handleError(res, err); }
      if(cb)return cb(ats);
      return res.json(200, ats);
    }
  );
}

// Get list of ats
exports.index = function(req, res) {
  console.log(req.headers['authorization']); //get rid of this
  console.log(req.user);
  At
  .find({
    $or:[
      {asker:{user:req.user._id}},
      {answerer:{user:req.user._id}}
    ]
  })
  .sort('when')
  .exec(function (err, ats) {
    if(err) { return handleError(res, err); }
    popAt(res,ats);
  });
};

// Get a single at
exports.show = function(req, res) {
  console.log(req.user);
  At
  .find({
    $and:[
      {$or:[
        {asker:{user:req.user._id}},
        {answerer:{user:req.user._id}}
      ]},
      {_id:req.params.id}
    ]
  })
  .exec(function (err, at) {
    console.log('noegw');
    if(err) { return handleError(res, err); }
    console.log(at);
    var at = at[0]; //shadowed. hopefully performant
    console.log(at);
    console.log('hello');
    if(!at) { return res.send(404); }
    console.log('noiusgaw');
    return popAt(res,at);
  });
};

// Creates a new at in the DB.
exports.create = function(req, res) {
  At.create(req.body, function(err, at) {
    if(err) { return handleError(res, err); }
    return res.json(201, at);
  });
};

// Updates an existing at in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; } // don't change id of object I guess (? I didn't write this)
  console.log("I swear, it's running! just not correctly :(");
  console.log(req.params.id);
  console.log(req.user._id);
  At
  .find({
    $and:[
      {$or:[
        {asker:{user:req.user._id}},
        {answerer:{user:req.user._id}}
      ]},
      {_id:req.params.id}
    ]
  })
  .exec(function (err,ats) { //#whocaresanymore
    console.log('dongs');
    console.log(err);
    var at = ats[0];
    console.log(at);
    if(!at)return res.send(404);
    var which; //kind of user respective to this At
    var i = req.user._id.toString(),
      hate = at.asker.user.toString(),
      myself = at.answerer.user.toString();
    if(i == hate){
      which = 'asker';
    }else if(i == myself){
      which = 'answerer';
    } else return res.send(500); // I wish for matching in ECMAScript 7
    //TODO: replace this stupid bottleneck with upsertion maybe? if possible?
    at[which].location = req.body[which].location;
    at.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, at);
    });
  });
};

// Deletes a at from the DB.
exports.destroy = function(req, res) {
  At.findById(req.params.id, function (err, at) {
    if(err) { return handleError(res, err); }
    if(!at) { return res.send(404); }
    at.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}