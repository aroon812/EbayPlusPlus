'use strict';

/**
 * Module dependencies
 */
var mePolicy = require('../policies/me.server.policy'),
  me = require('../controllers/me.server.controller');

module.exports = function (app) {
  // User route registration first. Ref: #713
  require('./users.server.routes.js')(app);

  // Users collection routes
  app.route('/api/users')
    .get(mePolicy.isAllowed, me.list);

  // Single user routes
  app.route('/api/users/:userId')
    .get(mePolicy.isAllowed, me.read)
    .put(mePolicy.isAllowed, me.update)
    .delete(mePolicy.isAllowed, me.delete);

  // Finish by binding the user middleware
  app.param('userId', me.userByID);
};
