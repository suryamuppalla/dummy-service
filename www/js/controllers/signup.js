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
        user.set('type', 'user');
        var self = this;
		user.signUp().then(function(response) {
            var Tenant = Parse.Object.extend("Tenant");
   			var tenant =  new Tenant()
   			tenant.set("UserPointer", response),
   			tenant.set("Civil_Id", self.civilid),
   			tenant.set("FirstName", self.firstname),
   			tenant.set("LastName", self.lastname),
			tenant.set("Company", self.companyname),
			tenant.set("Email", self.email),
			tenant.set("Contact_No", String(self.phone)),
			tenant.set("Company_Name", String(self.companyname)),
            tenant.set('active', true);
			tenant.save().then(function(response){
				console.log(response);
				ionicToast.show('Successfully registered', 'bottom', false, 4000);

				$timeout(function () {$state.go('app.login');}, 2000)
			}, function (h, error) {
				console.log(error)
			});
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