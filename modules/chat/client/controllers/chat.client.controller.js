(function () {
  'use strict';

  angular
    .module('chat')
    .controller('ChatController', ChatController);

  ChatController.$inject = ['$scope', '$state', 'Authentication', 'Socket'];

  function ChatController($scope, $state, Authentication, Socket) {
    var vm = this;

    vm.messages = [];
    vm.messageText = '';
    vm.recieverId = '';
    vm.sendMessage = sendMessage;

    init();

    function init() {

      // If user is not signed in then redirect back home
      if (!Authentication.user) {
        $state.go('home');
      }

      // Make sure the Socket is connected
      if (!Socket.socket) {
        Socket.connect();   
      }

      //Get friends list
      IdService.query(function(data) {
        vm.friends = data;
      });

      // connect socket id with user id
      IdService.query(function (iData) {
        vm.users = iData;
        var fullList = vm.users;
        var n = vm.users.length;
        var me = [];
        for(var i=0;i<n;i++) {
          if(fullList[i].username === user.username){
            me.push(fullList[i]);
          }
        }
        vm.me = me[0]._id;
        Socket.emit('connected', vm.me);
      });

      // Add an event listener to the 'chatMessage' event
      Socket.on('chatMessage', function (message) {
        vm.messages.unshift(message);

      });

      // Remove the event listener when the controller instance is destroyed
      $scope.$on('$destroy', function () {
        Socket.removeListener('chatMessage');
      });
    }

    // Create a controller method for sending messages
    function sendMessage() {
      // Create a new message object
      var message = {
        recieverId: vm.recieverId,
        text: vm.messageText
      };

      // Emit a 'chatMessage' message event
      Socket.emit('chatMessage', message);
      
      // Clear the message text
      vm.messageText = '';
    }
  }
}());
