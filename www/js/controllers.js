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
        $scope.rawr = result.data.SearchResults;
        var address = result.data.SearchResults.response.results.result.address.street;
        var city = result.data.SearchResults.response.results.result.address.city;
        var state = result.data.SearchResults.response.results.result.address.state;
        $scope.address = (address + ' ' + city + ', ' + state);
        var imageDiv = angular.element(document.querySelector('#image'));
        imageDiv.append('<img style="-webkit-user-select: none" src="https://maps.googleapis.com/maps/api/streetview?size=375x375&amp;location=' + $scope.address + '&amp;key=AIzaSyAdHCKzz0HaCkqDeutlhY7w1TWNTDEA9aY">');
        $scope.builtYear = result.data.SearchResults.response.results.result.yearBuilt;
        $scope.lotSize = result.data.SearchResults.response.results.result.lotSizeSqFt;
        $scope.sqFoot = result.data.SearchResults.response.results.result.finishedSqFt;
        $scope.bathrooms = result.data.SearchResults.response.results.result.bathrooms;
        $scope.bedrooms = result.data.SearchResults.response.results.result.bedrooms;
        $scope.estimate = result.data.SearchResults.response.results.result.zestimate.amount.$t;
      });
    };

    function onError(error) {
      alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
      timeout: 3000,
      enableHighAccuracy: true
    });
  };
})

.controller('LandingCtrl', function($scope, $stateParams, $http, $state) {

  $scope.goToResults = function() {
    $state.go('app.results');
  };
});
