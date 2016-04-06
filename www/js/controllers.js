angular.module('app.controllers', [])

	.controller('loginCtrl', function($scope,$state,$ionicPopup){
			
			$scope.login = function(username,password){
				
				console.log(username);
				console.log(password);
				if(username =="" && password==""){
					var fill = $ionicPopup.alert({
					title:'Blank',
					template:'Fill the credentials'
				});

				}
				else if((username == 'admin' && password == 'admin123') || (username == 'user' && password == 'user123')){
				var success = $ionicPopup.alert({
					title:'Suceess',
					template:'Logged in successfully'
				});
				$state.go('menu.welcome');
			}
			else{
				var failure = $ionicPopup.alert({
					title:'Failure',
					template:'Login failed'
				});
			 }
		 };
		})
		
  //$scope.login = function(data.username,data.password){
    /*user.signIn(JSON.stringify(data)).then(function(response){
      console.log("cont resp : " + response.success);
      if(response.success == true){
        window.localStorage['email'] = response.email;
        window.localStorage['user_id'] = response.user_id;
        
        $state.go('menu.welcome');
      }
    },*/
    /*console.log($scope.username),
    console.log($scope.password),
    $scope.login= function($scope.username,$scope.password){
    	if(username == "admin" && password == "admin"){
    		var success = $ionicPopup.alert({
    			title:'Success',
    			template:'Logged in successfully'
				});
				$state.go(menu.welcome);
			}

			else
			{
				var failure = $ionicPopup.alert({
					title:'Failure',
					template:'Login Failed'
				});
			}
    };

    /*var login = function(data.username,data.password) {
    if ((data.username == 'admin' && data.password == '1') || (data.username == 'user' && data.password == '1')) {
        // Make a request and receive your auth token from your server
        var success =$ionicPopup.alert({
        	title:'Success',
        	template:'Logged in successfully'
        })
        $state.go

      } 
      else {
        var failure =$ionicPopup.alert({
        	title:'Failure',
        	template:'Login Failed'
        })
      }
			function(err){
      var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: 'Please check credentials!.'
      });
    });
  };*/


	


  
.controller('profileCtrl', function($scope) {

})

.controller('checkStatusCtrl', function($state,$scope,$cordovaNetwork,$rootScope,$ionicPopup,ConnectivityMonitor) {

  $scope.type=$cordovaNetwork.getNetwork();
  $scope.onlineStatus = ConnectivityMonitor.isOnline();
  $scope.offlineStatus = ConnectivityMonitor.isOffline();
  /*$scope.checkStatus = function(){
    if(ConnectivityMonitor.isOnline() == true)
    {
      var deviceStatus = $ionicPopup.alert({
        title:'Status',
        template:'Device is online'
      });
    }
    else
    {
      var deviceStatus = $ionicPopup.alert({
        title:'Status',
        template:'Device is offline'
    });
  };

  document.addEventListener("deviceready", function () {
    

    $scope.network = $cordovaNetwork.getNetwork();
    console.log(network);
    $scope.isOnline = $cordovaNetwork.isOnline()
     console.log(isOnline);
     $scope.apply();

     // listen for Online event
        $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
            $scope.isOnline = true;
            $scope.network = $cordovaNetwork.getNetwork();
            
            $scope.$apply();
        })

        // listen for Offline event
        $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
            console.log("got offline");
            $scope.isOnline = false;
            $scope.network = $cordovaNetwork.getNetwork();
            
            $scope.$apply();
        })

        if(isOffnline == true)
        {
          var status = $ionicPopup.alert({
          title:'Message',
          template:'You are offline'
        });
      }


    /*var isOffline = $cordovaNetwork.isOffline()
     console.log(isOffline);


    // listen for Online event
    $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
      var isOnline = networkState;
    })

    // listen for Offline event
    $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
      var isOffline = networkState;
    })*/

  //}, false)
})
   
/*.controller('checkStatusCtrl',function($scope,$cordovaNetwork,$rootScope) {
    document.addEventListener("deviceready", function () {

        $scope.network = $cordovaNetwork.getNetwork();
        $scope.isOnline = $cordovaNetwork.isOnline();
        $scope.$apply();
        
        // listen for Online event
        $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
            $scope.isOnline = true;
            $scope.network = $cordovaNetwork.getNetwork();
            console.log(networkState);
            $scope.status="I am online";
            $scope.$apply();
        })

        // listen for Offline event
        $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
            console.log("got offline");
            $scope.isOnline = false;
            $scope.network = $cordovaNetwork.getNetwork();
            console.log(networkState);
            $scope.status="I am offline";
            $scope.$apply();
        })

  }, false);
})*/
    
   
.controller('uploadPhotographCtrl', function($scope,Camera) {
    $scope.takePicture = function (options) {
    var options = {
         quality : 75,
         targetWidth: 200,
         targetHeight: 200,
         sourceType: 1
      };
    Camera.getPicture(options).then(function(imageData) {
         $scope.picture = imageData;;
      }, function(err) {
         console.log(err);
      });
    };
})


      
.controller('signupCtrl', function($scope) {

})
   
.controller('welcomeCtrl', function($scope) {

})
 