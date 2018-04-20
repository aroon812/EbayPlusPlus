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
var PrivateChatSchema = new Schema({
  myMessages : [String],
  theirMessages: [String],
  corresponder: {
    type : String,
    required: "can not send a message to no one"
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
    });

mongoose.model('PrivateChatSchema', PrivateChatSchema);

return {
    name: 'PrivateChatSchema',
    schema: PrivateChatSchema
};