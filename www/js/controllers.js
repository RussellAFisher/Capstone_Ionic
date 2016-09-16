angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Create the login modal that we will use later
  // $ionicModal.fromTemplateUrl('templates/login.html', {
  //   scope: $scope
  // }).then(function(modal) {
  //   $scope.modal = modal;
  // });

  // Triggered in the login modal to close it
  // $scope.closeLogin = function() {
  //   $scope.modal.hide();
  // };
})

.controller('ResultsCtrl', function($scope, $stateParams, $http, $state) {
  $scope.search = function() {
    var onSuccess = function(position) {
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
      $scope.lat = lat;
      $scope.long = long;
      var URL = 'https://fathomless-thicket-83996.herokuapp.com/geocode/json?lat=' + lat + '&lng=' + long;
      $http.get(URL).then(function(result) {
        var stringifyIt = JSON.stringify(result.data);
        var replaceErrant = stringifyIt.replace("SearchResults:searchresults", "SearchResults");
        var reJSON = JSON.parse(replaceErrant);
        $scope.resultsJSON = reJSON.SearchResults.response.results.result.address.street;
      });
      // alert('Latitude: ' + position.coords.latitude + '\n' +
      //   'Longitude: ' + position.coords.longitude + '\n' +
      //   'Accuracy: ' + position.coords.accuracy + '\n' +
      //   'Timestamp: ' + position.timestamp + '\n');
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
      alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
      timeout: 10000,
      enableHighAccuracy: true
    });
  };
})

.controller('LandingCtrl', function($scope, $stateParams, $http, $state) {

  $scope.goToResults = function() {
    $state.go('app.results');
  };
  //   var posOptions = {
  //     timeout: 10000,
  //     enableHighAccuracy: true
  //   };
  //   $cordovaGeolocation
  //     .getCurrentPosition(posOptions)
  //     .then(function(position) {
  //         var lat = position.coords.latitude;
  //         var long = position.coords.longitude;
  //       },
  //       function(err) {
  //         // error
  //       });

});
