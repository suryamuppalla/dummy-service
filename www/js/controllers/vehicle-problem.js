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

        var fileList = [];
        var fileSavePromises = [];
        var filelist = document.getElementById("fileUpload").files || [];
        if (filelist.length) {
          for (var i = 0; i < filelist.length; i++) {
            console.log('found file ' + i + ' = ' + filelist[i].name);
            var fileElement = filelist[i];
            var fileName = filelist[i].name;
            var file = fileElement.files

            console.log('fileElement', fileElement, '----', 'fileName', fileName);

            console.log('file is----->>>>', file);
            var newFile = new Parse.File(fileName, fileElement);

            // added line
            fileSavePromises.push(
              newFile.save({
                  success: function(success) {
                      console.log("success file upload function", success);
                  }, error: function(obj, error) {
                      console.log("file upload error:"+error.code, error.message);
                  }
              }).then(function(response) {
                  console.log('file response is--->>>', response);
                  fileList.push(response);
              })
            );
          }; // end for loop
          $scope.info = this.vehicle;
          Parse.Promise.when(fileSavePromises).then(function() {
            /* body... */
            var Vehicle = Parse.Object.extend("Vehicle");
            var query = new Parse.Query(Vehicle);
            query.equalTo('objectId', $scope.info.type);
            query.first().then(function (vehPointer) {
                 /* body... */
                var ServiceRequest = Parse.Object.extend("ServiceRequest");
                var request = new ServiceRequest();

                request.set('vehiclePointer', vehPointer);
                request.set('description', $scope.info.description);
                request.set('files', fileList);
                request.save().then(function (success) {
                     /* body... */
                     ionicToast.show('Request saved successfully!', 'top', false, 2500)
                     console.log('after final upload of all the deatails -->>>', JSON.parse(JSON.stringify(success)));
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
            }); // end function
          }); // end parse promise function
        } else {
          alert('please upload the files!');
        };
    }; // end function

}]);
