'use strict';

var _ = require('lodash');
var At = require('./at.model');

// Get list of ats
exports.index = function(req, res) {
  At.find(function (err, ats) {
    if(err) { return handleError(res, err); }
    return res.json(200, ats);
  });
};

// Get a single at
exports.show = function(req, res) {
  At.findById(req.params.id, function (err, at) {
    if(err) { return handleError(res, err); }
    if(!at) { return res.send(404); }
    return res.json(at);
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
  if(req.body._id) { delete req.body._id; }
  At.findById(req.params.id, function (err, at) {
    if (err) { return handleError(res, err); }
    if(!at) { return res.send(404); }
    var updated = _.merge(at, req.body);
    updated.save(function (err) {
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