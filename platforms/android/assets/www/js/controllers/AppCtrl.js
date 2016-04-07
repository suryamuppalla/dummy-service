app.controller('AppCtrl', ['$scope', '$state', '$ionicScrollDelegate', '$ionicModal',
    '$ionicPopover', '$timeout', '$auth', '$window','$ionicHistory', 
    'VehicleService', 'ionicToast', '$cordovaMedia',
    function ($scope, $state, $ionicScrollDelegate, $ionicModal, $ionicPopover, $timeout, $auth,
              $window, $ionicHistory, VehicleService, ionicToast, $cordovaMedia) {
        /*$ionicHistory.nextViewOptions({
            historyRoot: true
        });*/

        $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
        // Form data for the login modal
        $scope.loginData = {};
        var navIcons = document.getElementsByClassName('ion-navicon');
        for (var i = 0; i < navIcons.length; i++) {
            navIcons.addEventListener('click', function () {
                this.classList.toggle('active');
            });
        }
        $scope.isAuthenticated = function() {
            $scope.user = JSON.parse(JSON.stringify(Parse.User.current()));
            return $auth.isAuthenticated();
        };
        $scope.logout = function() {
            Parse.User.logOut();
            $auth.logout();
            $window.location.reload();
        };
        // report issue of the vehicle main Js code
        VehicleService.getVehicles().then(function (list) {
            /* body... */
            $scope.vehicles = [];
            // console.log(list);

            for (var i = 0; i < list.length; i++) {
                // console.log(list[i]);
                if (list[i].userPointer.objectId) {
                    if (list[i].userPointer.objectId == Parse.User.current().id) {
                        $scope.vehicles.push(list[i])
                    }
                }
            }

            // console.log($scope.vehicles)
        }, function (error) {
            /* body... */
            console.log(error)
        });

        /* =========== audio recording code ========= */
        var captureError = function(e) {
            console.log('captureError' ,e);
        }
        $scope.sound = {file: undefined};
        var captureSuccess = function(e) {
            
            console.log('captureSuccess');console.dir(e);
            $scope.sound.file = e[0].localURL;
            $scope.sound.filePath = e[0].fullPath;

            console.log('sound file is --->>>>', $scope.sound.file);
            $scope.$apply($scope.sound);
        }

        $scope.record = function() {
            navigator.device.capture.captureAudio(
                captureSuccess,captureError,{duration:10});
        };

        $scope.play = function() {
            console.log('file path is -->>>', $scope.sound)
            if(!$scope.sound.file) {
                ionicToast.show('Record audio first!', 'top', false, 2500)
                return;
            }
            var media = new Media($scope.sound.file, function(e) {
            media.release();
            }, function(err) {
            console.log("media err", err);
            });


            console.log('media is -->>>>', media)
            media.play();
        }

        // send service problem is --->>>
        $scope.sendProblem = function () {
            var recordPromise = [];
            if ($scope.sound.file) {
                console.log('full sound path is --????', $scope.sound)
                var record = new Media($scope.sound.file, function (success) {
                     /* body... */ 
                     console.log('on success media', success)
                }, function (error) {
                     /* body... */
                     console.log('error on media ', error) 
                });
                var name = "recording.mp3";
                var file = new Parse.File(name, record);

                recordPromise.push(
                    file.save().then(function (recordFile) {
                         /* body... */ 
                         console.log('recordFile is -->>>', recordFile);
                         $scope.finalAudio = recordFile;
                    }, function (error) {
                         /* body... */
                         console.log('error is -->>', error) 
                    })
                )

            } else {
                $scope.finalAudio = '';
                recordPromise.push({
                    demo: 'data'
                })
            }
            var fileList = [];
            var fileSavePromises = [];
            var filelist = document.getElementById("fileUpload").files || [];
            if (filelist.length) {
                for (var i = 0; i < filelist.length; i++) {
                    console.log('found file ' + i + ' = ' + filelist[i].name);
                    var fileElement = filelist[i];
                    var fileName = filelist[i].name;
                    var file = fileElement.files;

                    console.log('fileElement', fileElement, '----', 'fileName', fileName);

                    // console.log('file is----->>>>', file);
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
                Parse.Promise.when(fileSavePromises, recordPromise).then(function() {
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
                        request.set('audio', $scope.finalAudio);
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
