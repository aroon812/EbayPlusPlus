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
 * SocketId schema
 */
var SocketIdSchema = new Schema({
  userId: {
      type: String,
      default: ''
      },
    socketId: {
        type: String,
        default: ''
      } 
    });

mongoose.model('SocketId', SocketIdSchema);

return {
    name: 'SocketIdSchema',
    schema: SocketIdSchema
};