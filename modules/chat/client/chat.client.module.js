(function (app) {
  'use strict';

  app.registerModule('chat', ['core']);
  app.registerModule('id', ['core']);
  app.registerModule('chat.routes', ['ui.router', 'core.routes']);
  app.registerModule('chat.service.messages');
}(ApplicationConfiguration));
