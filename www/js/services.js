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



