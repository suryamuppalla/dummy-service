app.controller('SignupCtrl', ['$scope', '$state', '$interval', '$timeout', 'ionicToast','$ionicHistory', function ($scope, $state, $interval, $timeout, ionicToast,$ionicHistory) {
	/*$ionicHistory.nextViewOptions({
        historyRoot: true
    });*/
	$scope.UserRegister = function(){
		// console.log(this.email);
		
		$scope.load = true;
		$scope.loginDisable = true;
		var user = new Parse.User();
        user.set("username", this.email);
        user.set("password", this.password);
        user.set("autoPass", this.password);
        user.set('firstName', this.firstName);
        user.set('lastName', this.lastName);
        user.set('phone', this.phone)
        user.set('type', 'user');
		user.signUp().then(function(response) {
        	ionicToast.show('Successfully registered', 'bottom', false, 4000);

			$timeout(function () {$state.go('app.login');}, 2000)
		
		}, function (error) {
			$scope.loginDisable = false;
			console.log(error);
			ionicToast.show(error.message, 'bottom',false, 4000);
			$timeout(function () {$scope.load = false;}, 3000);
		});
	};
	// goto login page
	$scope.go_login = function () {
		$state.go('app.login');
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