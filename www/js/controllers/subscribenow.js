
app.controller('SubscribeNowCtrl', ['$scope', '$state', '$location', '$auth', '$timeout',
    '$rootScope', '$window', '$q', 'ionicToast','$ionicHistory', function($scope, $state, $location, $auth, $timeout,
    $rootScope, $window, $q, ionicToast,$ionicHistory) {
	$scope.subdata = {};
	$scope.subscribe = function (){
		$scope.loginDisable = true;
	  var Subscriptions = Parse.Object.extend("Subscriptions");
		var sobj =  new Subscriptions();
		sobj.set("user", Parse.User.current());
		sobj.set("email", $scope.subdata.email);
		$scope.load = sobj.save().then(function(result){
			$timeout(function() {$scope.load = false}, 1000);
  		ionicToast.show('Subscriptions enabled...', 'top', false, 5000);
  		$scope.loginDisable = false;
  		$ionicHistory.nextViewOptions({
      		disableBack: true
  		});
  		$state.go('app.view-vehicle');
			console.log("Subscriptions");
		}, function(error){
			$timeout(function() {$scope.load = false}, 1000);
      ionicToast.show('Something went wrong:', 'top', false, 5000);
		});
	}; // end of the function

}]);
