(function () {
  
    angular
      .module('chat.filters.messageFilter')
      .filter('messageColor', messageColor);

   messageColor.$inject = ['Authentication'];

    function messageColor (message) {
      console.log(user.username);
      console.log(message.user);
        return function () {
          $( "li#element" ).each(function() {
            
            if (message.user.username === user.username){
              this.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
            }
            else{
              this.style.backgroundColor = 'rgba(0, 0, 255, 0.2)';
            }
          });
        };
      }

  })();