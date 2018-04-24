'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Message = mongoose.model('MessagesSchema'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a message
 */
exports.create = function (req, res) {
  console.log('Hacker voice "im in"');
  console.log(req.body);
  var message = new Message(req.body);
  message.user = req.user;

  message.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(message);
    }
  });
};

/**
 * Show the current message
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var message = req.message ? req.message.toJSON() : {};

  // Add a custom field to the Message, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Message model.
  message.isCurrentUserOwner = !!(req.user && message.user && message.user._id.toString() === req.user._id.toString());

  res.json(message);
};

/**
 * Update a message
 */
exports.update = function (req, res) {
  var message = req.message;


  if (req.body.bidPrice > req.message.bidPrice) {
    message.messageName = req.body.messageName;
    message.bidPrice = req.body.bidPrice;
    message.lastBid = req.user;
    message.buyPrice = req.body.buyPrice;
    message.messageDetails = req.body.messageDetails;
    message.removalDate = req.body.removalDate;

    message.save(function (err) {
      if (err) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(message);
      }
    });
  } else {
    return res.status(422).send({
      message: 'Bid needs to be larger than previous bid'
    });
  }

};

/**
 * Delete an message
 */
exports.delete = function (req, res) {
  var message = req.message;

  message.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(message);
    }
  });
};

/**
 * List of Messages
 */
exports.list = function (req, res) {
  Message.find({ 'removalDate': { $gte: new Date() } }).sort('-created').populate('user', 'displayName').exec(function (err, messages) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(messages);
    }
  });
};

/**
 * Message middleware
 */
exports.messageByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Message is invalid'
    });
  }

  Message.findById(id).populate('user', 'displayName').exec(function (err, message) {
    if (err) {
      return next(err);
    } else if (!message) {
      return res.status(404).send({
        message: 'No message with that identifier has been found'
      });
    }
    req.message = message;
    next();
  });
};
