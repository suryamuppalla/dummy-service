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
            console.log(JSON.parse(JSON.stringify(user.fetch())))
		    var data = user.fetch();
            $timeout(function() {
                $scope.load = false;
                $auth.getToken(data.getSessionToken());
                ionicToast.show('Password has been changed successfully...!', 'top', false, 5000);
                $scope.loginDisable = false;
                  $ionicHistory.nextViewOptions({
                      disableBack: true
                  });
                $state.go('app.view-vehicle');
            }, 1000);
            
		}, function (error) {
               /* body... */
            console.log(error);
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