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
        return $cordovaNetwork.isOffline();    
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





