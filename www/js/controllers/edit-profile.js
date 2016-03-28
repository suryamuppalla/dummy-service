app.controller('EditProfileCtrl', ['$scope', '$state', '$location', '$auth', '$timeout', 

    '$rootScope', '$window', '$q', 'ionicToast','$ionicLoading' ,'$ionicHistory', function($scope, $state, $location, $auth, $timeout, 
    $rootScope, $window, $q, ionicToast,$ionicLoading, $ionicHistory) {
	    

      console.log('add car controller');

      var Cars = Parse.Object.extend("Cars");
      var query = new Cars();
      console.log(query)

      $scope.addCar = function () {
         /* body... */ 
         query.set('name', this.car.name);
         query.set('model', this.car.model);
         query.set('manufactured', this.car.manufactured);
         query.set('lastService', this.car.lastService);
         query.save().then(function (success) {
            /* body... */ 
            $timeout(function() {
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $state.go('app.view-cars')
            }, 1000);
         }, function (error) {
            /* body... */ 
            console.log('error', error)
         })

         console.log(this.car)
      }
}]);