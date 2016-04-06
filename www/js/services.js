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

.factory('ConnectivityMonitor', function($rootScope, $cordovaNetwork){
 
  return {
    isOnline: function(){
      if(ionic.Platform.isWebView()){
        return $cordovaNetwork.isOnline();    
      } else {
        return navigator.onLine;
      }
    },
    isOffline: function(){
      if(ionic.Platform.isWebView()){
        return !$cordovaNetwork.isOnline();    
      } else {
        return !navigator.onLine;
      }
    },
    startWatching: function(){
        if(ionic.Platform.isWebView()){
 
          $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
            console.log("went online");
          });
 
          $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
            console.log("went offline");
          });
 
        }
        else {
 
          window.addEventListener("online", function(e) {
            console.log("went online");
          }, false);    
 
          window.addEventListener("offline", function(e) {
            console.log("went offline");
          }, false);  
        }       
    }
  }
})



