(function () {
  'use strict';

  angular
    .module('chat.service.messages')
    .factory('MessageService', MessageService);

function MessageService($resource) {
return $resource('/api/messages/:messageId', {
  messageId: '@_id'
}, {
  update: {
    method: 'PUT'
  }
}());
