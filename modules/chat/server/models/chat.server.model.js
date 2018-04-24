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
<<<<<<< HEAD
var MessagesSchema = new Schema({
  message : String,
=======
var PrivateChatSchema = new Schema({
  message: String,
>>>>>>> 87749bbe693c0b42a302006a24e74615056ffffc
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
<<<<<<< HEAD
    name: 'Messages',
    schema: MessagesSchema
};
=======
  name: 'PrivateChatSchema',
  schema: PrivateChatSchema
};
>>>>>>> 87749bbe693c0b42a302006a24e74615056ffffc
