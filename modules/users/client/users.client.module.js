(function (app) {
  'use strict';

  app.registerModule('users');
  app.registerModule('users.me');
  app.registerModule('users.me.routes', ['ui.router', 'core.routes', 'users.me.services']);
  app.registerModule('users.me.services');
  app.registerModule('users.admin');
  app.registerModule('users.admin.routes', ['ui.router', 'core.routes', 'users.admin.services']);
  app.registerModule('users.admin.services');
  app.registerModule('users.routes', ['ui.router', 'core.routes']);
  app.registerModule('users.services');
}(ApplicationConfiguration));
