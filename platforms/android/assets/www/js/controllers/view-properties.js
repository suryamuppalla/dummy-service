app.controller('ViewPropertiesCtrl', ['$scope', '$location', '$rootScope', '$auth', '$q','$ionicHistory', '$filter', '$timeout',
	function ($scope, $location, $rootScope, $auth, $q,$ionicHistory, $filter, $timeout) {
	/*$ionicHistory.nextViewOptions({
	    historyRoot: true
	});*/
	console.log('ViewPropertiesCtrl');
	
	var currentUser = Parse.User.current();
	var Tenant = Parse.Object.extend("Tenant");
	var query = new Parse.Query(Tenant);
	query.equalTo("UserPointer", currentUser);

	// loading bar
	$scope.load = true;

	$q.all([
		 query.first().then(function(result) {	
		 	$rootScope.firstname = result.get("FirstName");
		 	$rootScope.lastname = result.get("LastName");
		 	
			var TenantProperties = Parse.Object.extend("TenantProperties");
			var Propertydata = new Parse.Query(TenantProperties);
			
			Propertydata.include('property');
			Propertydata.include('tenant');
			Propertydata.equalTo("tenant", result);
			Propertydata.find().then(function(response){
				var res = JSON.parse(JSON.stringify(response));
				$scope.properties = [];

				var promise = Parse.Promise.as();

				$.each(response, function(i) {

					promise = promise.then(function() {
						//get relation for each state
						var FuturePayments = Parse.Object.extend("FuturePayments");
						var paymentdata = new Parse.Query(FuturePayments);
						paymentdata.include('tenantProperty');
						paymentdata.include('tenantPointer');
						paymentdata.equalTo('tenantProperty', response[i]);
						return paymentdata.find().then(function(is) {
							var obj = {};
							obj.propertyid = response[i].get('property').id;
							obj.propertyname = response[i].get('property').get('name');
							obj.tenantId = response[i].get('tenant').id;
							obj.address = response[i].get('property').get("address");
							obj.tenantpropertyid = response[i].id;
							obj.list = JSON.parse(JSON.stringify(is));
							$scope.properties.push(obj);
							$scope.$apply();
							return is;
						}, function(error) {
							console.log(error);
						});
						// return JSON.parse(JSON.stringify(paymentdata.find()))
					});
				});

				$scope.items2 = $scope.properties;
                $scope.$apply($scope.properties);
                $timeout(function() {
                	console.log('data is --->>>', $scope.properties);
                	$scope.$apply($scope.properties);
                }, 200)
			})
		})
	]);
}])

app.directive('tooltip', function () {
    return {
        restrict: 'C',
        link: function (scope, element, attrs) {
            if (attrs.title) {
                var $element = $(element);
                $element.attr("title", attrs.title)
                $element.tooltipster({
                    animation: attrs.animation,
                    trigger: "click",
                    position: "top",
                    positionTracker: true,
                    maxWidth: 500,
                    contentAsHTML: true
                });
            }
        }
    };
});