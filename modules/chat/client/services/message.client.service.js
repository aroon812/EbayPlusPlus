(function () {
  'use strict';

  angular
    .module('chat.service.messages')
    .factory('MessageService', MessageService);

  MessageService.$inject = ['$resource'];

  function MessageService($resource) {
    return $resource('/api/messages/:userId', {
      userId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
