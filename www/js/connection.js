angular.module('app.connection', [])

.factory('ConnectivityMonitor', function($rootScope, $cordovaNetwork,$ionicPopup){
 
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
            console.log("went offline");
            var alertMsg = $ionicPopup.alert({
            	title:'',
            	template:'You are online!'
            });
					});
 
          $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
            console.log("went offline");
            var alertMsg = $ionicPopup.alert({
            	title:'Error',
            	template:'Oops!you are offline'
            });
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
