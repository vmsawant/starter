angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.profile', {
    url: '/profile',
    views: {
      'side-menu21': {
        templateUrl: 'templates/profile.html',
        controller: 'profileCtrl'
      }
    }
  })

  .state('menu.checkStatus', {
    url: '/check-status',
    views: {
      'side-menu21': {
        templateUrl: 'templates/checkStatus.html',
        controller: 'checkStatusCtrl'
      }
    }
  })

  .state('menu.uploadPhotograph', {
    url: '/upload',
    views: {
      'side-menu21': {
    templateUrl: 'templates/uploadPhotograph.html',
    controller: 'uploadPhotographCtrl'
   }
  }
})

  .state('menu', {
    url: '/menu',
    templateUrl: 'templates/menu.html',
    abstract:true
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('menu.welcome', {
    url: '/welcome',
    views: {
      'side-menu21': {
        templateUrl: 'templates/welcome.html',
        controller: 'welcomeCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/login')

  

});