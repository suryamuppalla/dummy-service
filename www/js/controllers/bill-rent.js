app.controller('BillRentCtrl', ['$scope', 'property', 'pendingAmount', 'dueAmount', 
	'$location', '$rootScope', '$auth', '$http', '$q', '$stateParams', '$timeout', '$state', 'billPaymentDetails', '$ionicHistory', function ($scope, property, pendingAmount, dueAmount, 
	$location, $rootScope, $auth, $http, $q, $stateParams,$timeout, $state, billPaymentDetails, $ionicHistory) {
        $scope.tpid =  $stateParams.tpId;

        $scope.cardNumber = 15;
        $scope.cvvNumber = 02;
        $scope.monthNumber = 01;
        $scope.yearNumber = 01;
        // code of surya
        var FuturePayments =  Parse.Object.extend("FuturePayments");
        var FuturePaymentDates = new Parse.Query("FuturePayments");
        FuturePaymentDates.equalTo('objectId', $stateParams.paymentRowId);
        FuturePaymentDates.include('tenantPointer');
        FuturePaymentDates.include('tenantProperty');
        FuturePaymentDates.include('tenantProperty.property');
        FuturePaymentDates.first().then(function (success) {
            console.log(JSON.parse(JSON.stringify(success)));
            $scope.load = false;
            $scope.details = JSON.parse(JSON.stringify(success));

            $scope.$apply($scope.details);
        }, function(error) {
            console.log(error);
        });

        console.log($scope.tpid, $stateParams.paymentRowId);
        $scope.Payment = function(){
            $scope.load = true;
            $scope.loginDisable = true;

            var FuturePayments =  Parse.Object.extend("FuturePayments");
            var FuturePaymentDates = new Parse.Query("FuturePayments");
            FuturePaymentDates.equalTo('objectId', $stateParams.paymentRowId);
            FuturePaymentDates.include('tenantPointer');
            FuturePaymentDates.include('tenantProperty');
            FuturePaymentDates.first().then(function (success) {

                // console.log(JSON.parse(JSON.stringify(success)));
                var TenantProperties = Parse.Object.extend('TenantProperties');
                var tenantproperty = new  Parse.Query('TenantProperties');
                tenantproperty.equalTo('objectId', success.get('tenantProperty').id);
                tenantproperty.first().then(function(result) {
                    console.log(JSON.parse(JSON.stringify(result)));
                    result.set('rentDue', result.get('rentValue') - (result.get('rentPaid') + success.get('amountToBePaid')))
                    result.set('rentPaid', result.get('rentPaid') + success.get('amountToBePaid'));
                    result.save().then(function(pResult) {
                        success.set('status', 'paid');
                        success.save().then(function(fSuccess) {
                            // console.log(JSON.parse(JSON.stringify(fSuccess)));
                            $scope.load = false;

                            $timeout(function() {
                                $ionicHistory.nextViewOptions({
                                    disableBack: true
                                });
                                $state.go('app.property-details', {tpId: $stateParams.tpId})
                            }, 1000);
                        }, function (error) {
                            console.log(error);
                        });
                    }, function(error) {
                        console.log(error);
                    });
                }, function(error) {
                    console.log(error);
                });

            }, function(error) {
                console.log(error);
            });
		
	    };

	$scope.goPaymentUrl = function () {
		$state.go('app.payment', {tpId: $stateParams.tpId, paymentRowId: $stateParams.paymentRowId},  {location: 'replace'})
	};

	$scope.goBack = function (id) {

		console.log(id)
		$state.go('app.property-details', {tpId: $stateParams.tpId},  {location: 'replace'})
	}
}]);

app.directive('wmBlock', function ($parse) {
    return {
        scope: {
          wmBlockLength: '='
        },
        link: function (scope, elm, attrs) {
         
          elm.bind('keypress', function(e){
           
            if(elm[0].value.length > scope.wmBlockLength){
              e.preventDefault();
              return false;
            }
          });
        }
    }   
});