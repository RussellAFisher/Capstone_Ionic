angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };
})

.controller('ResultsCtrl', function($scope, $stateParams, $http, $state, $ionicLoading) {
  $scope.starClicked = 1;
  $scope.click = function() {
    if ($scope.starClicked == 1) {
      $scope.starClicked = 0;
    } else {
      $scope.starClicked = 1;
    }
  };
  $ionicLoading.show();
  $scope.$on('$ionicView.enter', function() {
    var onSuccess = function(position) {
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
      $scope.lat = lat;
      $scope.long = long;
      var URL = 'https://fathomless-thicket-83996.herokuapp.com/geocode/json?lat=' + lat + '&lng=' + long;
      $http.get(URL).then(function(result) {
        $ionicLoading.hide();
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
      timeout: 5000,
      enableHighAccuracy: true
    });
  });
})

.controller('AddressResultsCtrl', function($scope, $stateParams, $http, $state, $ionicLoading) {
  $scope.showForm = 1;
  $scope.starClicked2 = 1;
  $scope.click2 = function() {
    if ($scope.starClicked2 == 1) {
      $scope.starClicked2 = 0;
    } else {
      $scope.starClicked2 = 1;
    }
  };
  $scope.searchAddress = function() {
    $ionicLoading.show();
    var street = $scope.searchAddress.street.replace(/\s/g, '+');
    var URL = 'https://fathomless-thicket-83996.herokuapp.com/address/json?street=' + street + '&city=' + $scope.searchAddress.city + '&state=' + $scope.searchAddress.state;
    $http.get(URL).then(function(result) {
      $scope.showForm = 0;
      $ionicLoading.hide();
      var address = result.data.SearchResults.response.results.result.address.street;
      var city = result.data.SearchResults.response.results.result.address.city;
      var state = result.data.SearchResults.response.results.result.address.state;
      $scope.addressSearch = (address + ' ' + city + ', ' + state);
      var imageDivAddress = angular.element(document.querySelector('#imageAddress'));
      imageDivAddress.append('<img style="-webkit-user-select: none" src="https://maps.googleapis.com/maps/api/streetview?size=375x375&amp;location=' + $scope.addressSearch + '&amp;key=AIzaSyCMMSXM_tmUW5ssFigrBJGU-HXyB958gOA">');
      $scope.addressBuiltYear = result.data.SearchResults.response.results.result.yearBuilt;
      $scope.addressLotSize = result.data.SearchResults.response.results.result.lotSizeSqFt;
      $scope.addressSqFoot = result.data.SearchResults.response.results.result.finishedSqFt;
      $scope.addressBathrooms = result.data.SearchResults.response.results.result.bathrooms;
      $scope.addressBedrooms = result.data.SearchResults.response.results.result.bedrooms;
      $scope.addressEstimate = result.data.SearchResults.response.results.result.zestimate.amount.$t;
    });
  };
})

.controller('LandingCtrl', function($scope, $ionicHistory, $state) {

  $scope.goToResults = function() {
    $ionicHistory.clearCache().then(function() {
      $state.go('app.results');
    });
  };
  $scope.searchByAddress = function() {
    $state.go('app.resultsAddress');
  };
});
