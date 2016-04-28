angular.module('app.services', [])

/*.factory('user', [function(){
	return{
    signIn: function(data){
      var promise = $http({
        url: server url address
        method: 'POST',
        data: {"user": data}
      }).then(function(response){
        return response.data;
      });
      return promise;
    },
    signOut: function(data){
      
      var promise = $http({
        url: server url address
        method: 'DELETE',
        data: {user: data}
      }).then(function(response){
        return response.data;
      });
      return promise;      
    }
  }
})

}])*/
.factory('Camera', function($q) {

   return {
      getPicture: function(options) {
         var q = $q.defer();
        navigator.camera.getPicture(function(result) {
            q.resolve(result);
         }, function(err) {
            q.reject(err);
         }, options);

         return q.promise;
      }
   }

})


/*.factory('registration',function($http, RESOURCES){
  return{
   
    newUser: function(data){
      var promise = $http({
        url: RESOURCES.API_URL+"signup/new_entity.json",
        method: "GET"
      }).then(function(response){
        return response.data;
      });
      return promise;
    },
    saveNewData: function(data){
      var entity = window.localStorage["regi"];
      var promise = $http({
        url: RESOURCES.API_URL+"signup/save_new.json",
        method: "POST",
        data: {userinfo: data, entity: entity}
      }).then(function(response){
        return response.data;
      });
      return promise;
    }
  }
})*/

.service('UserService', function() {

//for the purpose of this example I will store user data on ionic local storage but you should save it on a database

  var setUser = function(user_data) {
    window.localStorage.starter_facebook_user = JSON.stringify(user_data);
  };

  var getUser = function(){
    return JSON.parse(window.localStorage.starter_facebook_user || '{}');
  };

  return {
    getUser: getUser,
    setUser: setUser
  };
});






