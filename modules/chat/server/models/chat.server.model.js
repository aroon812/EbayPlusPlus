'use strict';
/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  path = require('path'),
  config = require(path.resolve('./config/config')),
  chalk = require('chalk');

/**
 *  Private Chat schema
 */
var MessagesSchema = new Schema({
  message : String,
  corresponder: {
    type: String,
    required: 'can\'t send a message to no one'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('MessagesSchema', MessagesSchema);

return {
    name: 'Messages',
    schema: MessagesSchema
};
