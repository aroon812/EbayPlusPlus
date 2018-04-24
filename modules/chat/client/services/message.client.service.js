(function () {
    'use strict';
    
angular
  .module('chat.service.messages')
  .factory('MessageService', MessageService);

MessageService.$inject = ['$resource'];

function MessageService($resource) {
return $resource('/api/messages/:messageId', {
  messageId: '@_id'
}, {
  update: {
    method: 'PUT'
  }
});
}
}());