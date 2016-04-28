angular.module('app.controllers', [])

  .controller('appCtrl', function($scope,ConnectivityMonitor){
    ConnectivityMonitor.startWatching();
  })

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

  .controller('fbloginCtrl', function($scope, $state, $q, UserService, $ionicLoading) {

  //This is the success callback from the login method
  var fbLoginSuccess = function(response) {
    if (!response.authResponse){
      fbLoginError("Cannot find the authResponse");
      return;
    }

    var authResponse = response.authResponse;

    getFacebookProfileInfo(authResponse)
    .then(function(profileInfo) {
      //for the purpose of this example I will store user data on local storage
      UserService.setUser({
        authResponse: authResponse,
        userID: profileInfo.id,
        name: profileInfo.name,
        email: profileInfo.email,
        picture : "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
      });

      $ionicLoading.hide();
      $state.go('app.home');

    }, function(fail){
      //fail get profile info
      console.log('profile info fail', fail);
    });
  };


  //This is the fail callback from the login method
  var fbLoginError = function(error){
    console.log('fbLoginError', error);
    $ionicLoading.hide();
  };

  //this method is to get the user profile info from the facebook api
  var getFacebookProfileInfo = function (authResponse) {
    var info = $q.defer();

    facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
      function (response) {
        console.log(response);
        info.resolve(response);
      },
      function (response) {
        console.log(response);
        info.reject(response);
      }
    );
    return info.promise;
  };

  //This method is executed when the user press the "Login with facebook" button
  $scope.facebookSignIn = function() {

    facebookConnectPlugin.getLoginStatus(function(success){
     if(success.status === 'connected'){
        // the user is logged in and has authenticated your app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed request, and the time the access token
        // and signed request each expire
        console.log('getLoginStatus', success.status);

        //check if we have our user saved
        var user = UserService.getUser('facebook');

        if(!user.userID)
        {
          getFacebookProfileInfo(success.authResponse)
          .then(function(profileInfo) {

            //for the purpose of this example I will store user data on local storage
            UserService.setUser({
              authResponse: success.authResponse,
              userID: profileInfo.id,
              name: profileInfo.name,
              email: profileInfo.email,
              picture : "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
            });

            $state.go('app.home');

          }, function(fail){
            //fail get profile info
            console.log('profile info fail', fail);
          });
        }else{
          $state.go('app.home');
        }

     } else {
        //if (success.status === 'not_authorized') the user is logged in to Facebook, but has not authenticated your app
        //else The person is not logged into Facebook, so we're not sure if they are logged into this app or not.
        console.log('getLoginStatus', success.status);

        $ionicLoading.show({
          template: 'Logging in...'
        });

        //ask the permissions you need. You can learn more about FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
        facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
      }
    });
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
  //ConnectivityMonitor.startWatching();

})

.controller('checkStatusCtrl', function($scope) {
  console.log(window.localStorage.getItem("status"));
  //$scope.status = window.localStorage.getItem("status");
  $scope.status = window.localStorage.getItem("status");
  //$scope.$apply();
  
  
  /*var options = {timeout: 10000, enableHighAccuracy: true};
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){
      var marker = new google.maps.Marker({
        map: $scope.map,
        animation: google.maps.Animation.DROP,
        position: latLng
      });      
    });
  }, function(error){
    console.log("Could not get location");
  });   
  

 
  /*$rootScope.$on('$cordovaNetwork:online', function(event, networkState){
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
  })*/




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

.controller('signupCtrl', function($scope,$state,$ionicPopup) {
      $scope.signup = function(data){
      if(data.password == data.password_confirmation){
            var alertmsg = $ionicPopup.alert({
            title:'Success',
            template:'Registered Successfully!'
          });
          $state.go('login');
        }
        else{
          var alertmsg = $ionicPopup.alert({
            title:'Error',
            template:'Password Mismatch'
          });
        }
      };
  })

  /*$scope.signup = function(data){
    if(data.password == data.password_confirmation){
      registration.newUser(data).then(function(response){
        if(response.success == true){
          window.localStorage.clear();
          var alertPopup = $ionicPopup.alert({
            title: 'Success',
            template:'Registered Successfully!'
          });
          $state.go('login');
        }else{
          var alertPopup = $ionicPopup.alert({
            title: 'Error!',
            template: 'Something went wrong!'
          });
        }
      });
    }else{
      var alertPopup = $ionicPopup.alert({
        title: 'Password Error!',
        template: "Password Mismatch"
      });
    }
  };*/

.controller('welcomeCtrl', function($scope) {
  //ConnectivityMonitor.startWatching();
})

.controller('contactsCtrl', function($scope, $cordovaContacts, $ionicPlatform) {
  $scope.getContacts = function() {
    $scope.phoneContacts = [];

    function onSuccess(contacts) {
      for (var i = 0; i < contacts.length; i++) {
        var contact = contacts[i];
        $scope.phoneContacts.push(contact);
      }
    };

    function onError(contactError) {
      alert(contactError);
    };

    var options = {};
    options.multiple = true;

    $cordovaContacts.find(options).then(onSuccess, onError);
  };

  /*$scope.addContact = function() {
    $cordovaContacts.save($scope.contactForm).then(function(result) {
      // Contact saved
    }, function(err) {
      // Contact error
    });
  };

  $scope.getAllContacts = function() {
    $cordovaContacts.find().then(function(allContacts) { //omitting parameter to .find() causes all contacts to be returned
      $scope.contacts = allContacts;
    });
  };

  $scope.findContactsBySearchTerm = function (searchTerm) {
    var opts = {                                           //search options
      filter : searchTerm,                                 // 'Bob'
      multiple: true,                                      // Yes, return any contact that matches criteria
      fields:  [ 'displayName', 'name' ],                   // These are the fields to search for 'bob'.
      desiredFields: [id] 
         //return fields.
    };

    if ($ionicPlatform.isAndroid()) {
      opts.hasPhoneNumber = true;         //hasPhoneNumber only works for android.
    };

    $cordovaContacts.find(opts).then(function (contactsFound) {
      $scope.contacts = contactsFound;
    });
  };

  $scope.pickContactUsingNativeUI = function () {
    $cordovaContacts.pickContact().then(function (contactPicked) {
      $scope.contact = contactPicked;
    });
  };*/

})



 