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
            window.localStorage.setItem("status","online");
            console.log(window.localStorage.getItem("status"));
              var alertMsg = $ionicPopup.alert({
            	title:'Online',
            	template:'Connected to the internet!'
            });
					});
 
          $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
            console.log("went offline");
            window.localStorage.setItem("status","offline");
            console.log(window.localStorage.getItem("status"));
            var alertMsg = $ionicPopup.alert({
            	title:'Offline',
            	template:'Oops!no internet connectivity'
            });
          });
 
        }
        else {
 
          window.addEventListener("online", function(e) {
            console.log("went online");
            window.localStorage.setItem("status","online");
            console.log(window.localStorage.getItem("status"));
            var alertMsg = $ionicPopup.alert({
            	title:'Online',
            	template:'Internet connectivity regained!'
            });
          }, false);    
 
          window.addEventListener("offline", function(e) {
            console.log("went offline");
            window.localStorage.setItem("status","offline");
            console.log(window.localStorage.getItem("status"));
            var alertMsg = $ionicPopup.alert({
            	title:'Offline',
            	template:'Oops!no internet connectivity'
            });

          }, false);  
        }       
    }
  }
})
