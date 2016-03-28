app.controller('ChangePasswordCtrl', ['$scope', '$state', '$location', '$auth', '$timeout', 
    '$rootScope', '$window', '$q', 'ionicToast','$ionicLoading','$ionicHistory', function($scope, $state, $location, $auth, $timeout, 
    $rootScope, $window, $q, ionicToast,$ionicLoading, $ionicHistory) {
    /*$ionicHistory.nextViewOptions({
        historyRoot: true
    });  */  
	$scope.cdata = {};
	$scope.ChangePassword =  function(){
		$scope.loginDisable = true;
		var C_User = Parse.User.current();
		C_User.set("password",$scope.cdata.password);
		C_User.set("autoPass", $scope.cdata.password);
		C_User.save()
		.then(function(user) {
		    return user.fetch();
		  }
		)
		.then(
		  function(user) {
		  	console.log(user);
		  	var token = user.getSessionToken();						
			$auth.setToken(token);
		    $timeout(function() {$scope.load = false}, 1000);
    		ionicToast.show('Password has been changed successfully...!', 'top', false, 5000);
    		$scope.loginDisable = false;
              $ionicHistory.nextViewOptions({
                  disableBack: true
              });
		    $state.go('app.view-properties');
		}, function(err) {
			console.log('err');
		});
	};
}]);

app.directive('nxEqualEx', function() {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, model) {
            if (!attrs.nxEqualEx) {
                console.error('nxEqualEx expects a model as an argument!');
                return;
            }
            scope.$watch(attrs.nxEqualEx, function (value) {
                // Only compare values if the second ctrl has a value.
                if (model.$viewValue !== undefined && model.$viewValue !== '') {
                    model.$setValidity('nxEqualEx', value === model.$viewValue);
                }
            });
            model.$parsers.push(function (value) {
                // Mute the nxEqual error if the second ctrl is empty.
                if (value === undefined || value === '') {
                    model.$setValidity('nxEqualEx', true);
                    return value;
                }
                var isValid = value === scope.$eval(attrs.nxEqualEx);
                model.$setValidity('nxEqualEx', isValid);
                return isValid ? value : undefined;
            });
        }
    };
});
function Ctrl($scope) {}