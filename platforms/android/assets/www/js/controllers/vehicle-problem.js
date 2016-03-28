app.controller('VehicleProblemCtrl', ['$scope', 'VehicleService', 'ionicToast', '$ionicHistory', '$state', 
    function ($scope, VehicleService, ionicToast, $ionicHistory, $state) {
	
    VehicleService.getVehicles().then(function (list) {
         /* body... */
         $scope.vehicles = [];
         console.log(list)

         for (var i = 0; i < list.length; i++) {
              console.log(list[i])
              if (list[i].userPointer.objectId) {
                
                if (list[i].userPointer.objectId == Parse.User.current().id) {
                    $scope.vehicles.push(list[i])
                }
              }
          }

         console.log($scope.vehicles)
    }, function (error) {
         /* body... */
         console.log(error) 
    });


    // send service problem is --->>>
    $scope.sendProblem = function () {
         /* body... */ 
        $scope.info = this.vehicle;
        var Vehicle = Parse.Object.extend("Vehicle");
        var query = new Parse.Query(Vehicle);
        query.equalTo('objectId', $scope.info.type);
        query.first().then(function (vehPointer) {
             /* body... */ 
            var ServiceRequest = Parse.Object.extend("ServiceRequest");
            var request = new ServiceRequest();

            request.set('vehiclePointer', vehPointer);
            request.set('description', $scope.info.description);

            request.save().then(function (success) {
                 /* body... */ 
                 $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $state.go('app.view-vehicle');

            }, function (error) {
                 /* body... */ 
                 console.log(error)
            })

        }, function (error) {
             /* body... */
             console.log(error); 
        });
    }

}]);