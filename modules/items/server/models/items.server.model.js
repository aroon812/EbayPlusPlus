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
 * Item Schema
 */
var ItemSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  itemName: {
    type: String,
    default: '',
    trim: true,
    required: 'What is your item'
  },
  bidPrice: {
    type: Number,
    default: '',
    trim: true,
    required: 'Must set a bid price'
  },
  buyPrice: {
    type: Number,
    default: ''
  },
  itemDetails: {
    type: String,
    default: '',
    trim: true,
    required: 'Item cannot have no description'
  },
  removalDate: {
    type: Date,
    default: Date.now,
    required: 'Item needs removal date'
  },
  itemImageURL: {
    type: String,
    default: '/modules/items/client/img/default.png'
  },
  lastBid: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  watchedItems: {
  type: [String],
  default: []
},
watch: {
type: String,
default: "false"
}
});

ItemSchema.statics.seed = seed;

mongoose.model('Item', ItemSchema);

/**
* Seeds the User collection with document (Item)
* and provided options.
*/
function seed(doc, options) {
  var Item = mongoose.model('Item');

  return new Promise(function (resolve, reject) {

    skipDocument()
      .then(findAdminUser)
      .then(add)
      .then(function (response) {
        return resolve(response);
      })
      .catch(function (err) {
        return reject(err);
      });

    function findAdminUser(skip) {
      var User = mongoose.model('User');

      return new Promise(function (resolve, reject) {
        if (skip) {
          return resolve(true);
        }

        User
          .findOne({
            roles: { $in: ['admin', 'me'] }
          })
          .exec(function (err, admin) {
            if (err) {
              return reject(err);
            }

            doc.user = admin;

            return resolve();
          });
      });
    }

    function skipDocument() {
      return new Promise(function (resolve, reject) {
        Item
          .findOne({
            title: doc.title
          })
          .exec(function (err, existing) {
            if (err) {
              return reject(err);
            }

            if (!existing) {
              return resolve(false);
            }

            if (existing && !options.overwrite) {
              return resolve(true);
            }

            // Remove Article (overwrite)

            existing.remove(function (err) {
              if (err) {
                return reject(err);
              }

              return resolve(false);
            });
          });
      });
    }

    function add(skip) {
      return new Promise(function (resolve, reject) {
        if (skip) {
          return resolve({
            message: chalk.yellow('Database Seeding: Item\t' + doc.title + ' skipped')
          });
        }

        var item = new Item(doc);

        Item.save(function (err) {
          if (err) {
            return reject(err);
          }

          return resolve({
            message: 'Database Seeding: Iteme\t' + item.title + ' added'
          });
        });
      });
    }
  });
}
