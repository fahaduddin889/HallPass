﻿angular.module('HallPass.controllers', [])


.controller('LoginController', function ($scope, $state, $cordovaOauth, $localStorage, $location, $http, $ionicPopup, $firebaseAuth, $firebaseObject, $log, Auth, FURL, Utils) {

    var auth = $firebaseAuth();
    var ref = firebase.database().ref();
    var userkey = "";


    $scope.signIn = function (user) {
        // $log.log("Sent");
        if (angular.isDefined(user)) {
            Utils.show();
            Auth.login(user)
              .then(function (authData) {

                  // $log.log("User ID:" + authData);
                  Utils.hide();
                  $state.go('main.forum');
                  $scope.setCurrentUsername(data.username);
                  //var username = $scope.setCurrentUsername(data.username);
                  //$log.log("Starter page","Home");

              }, function (err) {
                  Utils.hide();
                  Utils.errMessage(err);
              });
        }
    };

    $scope.checkUser = function () {
        var firebaseUser = auth.$getAuth();

        if (firebaseUser) {
            //$log.log("Signed in as:", firebaseUser.uid);
            $state.go('main.forum');
        } else {
            //$log.log("Signed out");
            //$location.path("/login");
            $state.go('login');
        }

    }

})

.controller('RegisterController', function ($scope, $state, $cordovaOauth, $localStorage, $location, $http, $ionicPopup, $firebaseObject, Auth, FURL, Utils) {

    $scope.register = function (user) {
        if (angular.isDefined(user)) {
            Utils.show();
            Auth.register(user)
              .then(function () {
                  Utils.hide();
                  console.log("Before Logging In:" + JSON.stringify(user));
                  $location.path('/');
              }).catch(function (error) {
                  $log.log("Error: " + error);
              });
        }
    };

})

.controller('ForgotController', function ($scope, $state, $cordovaOauth, $localStorage, $location, $http, $ionicPopup, $firebaseObject, Auth, FURL, Utils) {

    $scope.resetpassword = function (user) {
        if (angular.isDefined(user)) {
            Auth.resetpassword(user.email)
              .then(function () {
                  //console.log("Password reset email sent successfully!");
                  $location.path('/login');
              }, function (err) {
                  //console.error("Error: ", err);
              });
        }
    };
})

.controller('ChatsCtrl', function($scope, Chats, $ionicPopup){
  $scope.chats = Chats.all();
  $scope.remove = function(chat){
    Chats.remove(chat);
  };

  $scope.showAddPost = function(){

    var popUp = $ionicPopup.show({
      templateUrl: './templates/addPost.html',
      title: 'Post below',
      scope: $scope,
      buttons: [
      {text: 'Cancel'},
      {
        text: '<b>Save<b>',
        type: 'button-positive',
        onTap: function(e){
          var firebaseObject = new Firebase("https://hallpass-66cd0.firebaseio.com/posts");
          var sync = firebaseObject.set(firebaseObject);
          $scope.posts = sync.$firebaseArray();
        }
    }]
    })

  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats){
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope){
  $scope.settings = {
    enableFriends: true
  };
})

// .controller('AddPostCtrl',['$scope', '$state','SessionData', '$firebase', function($scope, $state, SessionData, $firebase){
//   $scope.showUserHome = function(){
//     $state.go('main.forum');
//   }

//   $scope.user = {};

//   $scope.add = function(){
//     var firebaseObject = new Firebase("https://hallpass-66cd0.firebaseio.com/posts")
//     var fb = $firebase(firebaseObject);
//     var user = SessionData.getUser();

//     fb.$push({
//       post: $scope.user.post,
//       email: user
//     }).then(function(ref){
//       console.log(ref);
//      $state.go('main.forum');
//     }, function(error){
//         console.log("Error:", error);
//     });
//   }

// }])



// .controller('ForumController', ['$scope','$state', function($scope,$state){
//  //SessionData.setUser(user);

//   $scope.showAddPost = function(){
//     $state.go('addPost');
//   }

//   var firebaseObject = new Firebase("https://hallpass-66cd0.firebaseio.com/posts");

//   var sync = firebaseObject.set((firebaseObject);
//   $scope.posts = sync.$firebaseArray();
// }])


// .controller('ForumController', function ($scope, $state, $cordovaOauth, $localStorage, $log, $location, $http, $ionicPopup, $firebaseObject, $firebaseAuth, Auth, FURL, Utils, Items) {
//     var ref = firebase.database().ref('items');
//     console.log(ref);
//     $scope.authObj = $firebaseAuth();


//     $scope.items = Items;
//     $scope.addPost = function(){
//       var name = prompt('Where is study group?');
//       if(name){
//         $scope.items.$add({
//           'name': name
//         });
//       }
//     };

//     $scope.recentPosts = function(item){
//       var itemRef = firebase.database().ref('items/'+item.$id);
//       // itemRef.child('status').set('recent');

//     }
//     $scope.logOut = function () {
//         Auth.logout();
//         $state.go('login');
//     };

// })

// .controller('MapController', function($scope, $cordovaGeolocation, $ionicLoading, $ionicPlatform) {
     
//     $ionicPlatform.ready(function() {
         
//         $ionicLoading.show({
//             template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
//         });
         
//         var posOptions = {
//             enableHighAccuracy: true,
//             timeout: 20000,
//             maximumAge: 0
//         };
//         $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
//             var lat  = position.coords.latitude;
//             var long = position.coords.longitude;
             
//             var myLatlng = new google.maps.LatLng(lat, long);
             
//             var mapOptions = {
//                 center: myLatlng,
//                 zoom: 16,
//                 mapTypeId: google.maps.MapTypeId.ROADMAP
//             };          
             
//             var map = new google.maps.Map(document.getElementById("map"), mapOptions);          
             
//             $scope.map = map;   
//             $ionicLoading.hide();           
             
//         }, function(err) {
//             $ionicLoading.hide();
//             console.log(err);
//         });

//     });  
                 
// })

// .service('SessionData', function(){
//   var user = '';

//   return{
//     getUser: function(){
//       return user;
//     },
//     setUser: function(value){
//       user = value;
//     }
//   };
// });
