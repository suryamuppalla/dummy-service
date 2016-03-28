// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ionic-material','ionic.rating','satellizer', 'ionic-toast']);

app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)

        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})
app.config(function($ionicConfigProvider) {
  $ionicConfigProvider.views.maxCache(0);
})
// parse initialization
app.run(function($rootScope) {
    $rootScope.Parse = Parse.initialize("NnGUQnFBGpBZKvrJpGbmD72J1IgThJgE61CJX92f", "My3u99rElpcHlIeczfqd3HAfB5Hw6BM5Un3D84Vl");;
})
app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.property-details', {
        url: '/property-details/:tpId',
        views: {
            'menuContent': {
                templateUrl: 'templates/property-details.html',
                controller: 'PropertyCtrl'
            }
        }
    })

    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl',
                resolve: {
                    authenticated: function($location, $auth) {
                        if ($auth.isAuthenticated()) {
                
                            return $location.path('/app/view-vehicle');
                        }
                    }
                }
            }
        }
    })

    .state('app.signup', {
        url: '/signup',
        views: {
            'menuContent': {
                templateUrl: 'templates/signup.html',
                controller: 'SignupCtrl',
                resolve: {
                    authenticated: function($location, $auth) {
                        if ($auth.isAuthenticated()) {
                
                            return $location.path('/app/view-vehicle');
                        }
                    }
                }
            }
        }
    })

    .state('app.add-vehicle', {
        url: '/add-vehicle',
        views: {
            'menuContent': {
                templateUrl: 'templates/add-vehicle.html',
                controller: 'addVehicleCtrl',
                resolve: {
                    authenticated: function($location, $auth) {
                        if (!$auth.isAuthenticated()) {
                
                            return $location.path('/app/login');
                        }
                    }
                }
            }
        }
    })

    .state('app.car-problem', {
        url: '/car-problem',
        views: {
            'menuContent': {
                templateUrl: 'templates/car-problem.html',
                controller: 'CarProblemCtrl',
                resolve: {
                    authenticated: function($location, $auth) {
                        if (!$auth.isAuthenticated()) {
                
                            return $location.path('/app/login');
                        }
                    }
                }
            }
        }
    })

    .state('app.change-password', {
        url: '/change-password',
        views: {
            'menuContent': {
                templateUrl: 'templates/change-password.html',
                controller: 'ChangePasswordCtrl',
                resolve: {
                    authenticated: function($location, $auth) {
                        if (!$auth.isAuthenticated()) {
                
                            return $location.path('/app/login');
                        }
                    }
                }
            }
        }
    })

    .state('app.emergency', {
        url: '/emergency',
        views: {
            'menuContent': {
                templateUrl: 'templates/emergency.html',
                controller: 'EmergencyCtrl',
                resolve: {
                    authenticated: function($location, $auth) {
                        if (!$auth.isAuthenticated()) {
                
                            return $location.path('/app/login');
                        }
                    }
                }
            }
        }
    })

    .state('app.mypayment', {
        url: '/mypayment',
        views: {
            'menuContent': {
                templateUrl: 'templates/mypayment.html',
                controller: 'ViewPropertiesCtrl',
                resolve: {
                    authenticated: function($location, $auth) {
                        if (!$auth.isAuthenticated()) {
                
                            return $location.path('/app/login');
                        }
                    }
                }
            }
        }
    })

    .state('app.property-payment-dates', {
        url: '/property-payment-dates/:tpId',
        views: {
            'menuContent': {
                templateUrl: 'templates/property-payment-dates.html',
                controller: 'propertyPaymentDatesCtrl',
                resolve: {
                    authenticated: function($location, $auth) {
                        if (!$auth.isAuthenticated()) {
                
                            return $location.path('/app/login');
                        }
                    }
                }
            }
        }
    })

    .state('app.bill-rent', {
        url: '/bill-rent/:tpId/:paymentRowId',
        views: {
            'menuContent': {
                templateUrl: 'templates/bill-rent.html',
                controller: 'BillRentCtrl',
                resolve: {
                    authenticated: function($location, $auth) {
                        if (!$auth.isAuthenticated()) {
                
                            return $location.path('/app/login');
                        }
                    }
                }
            }
        }
    })

    .state('app.view-vehicle', {
        url: '/view-vehicle',
        views: {
            'menuContent': {
                templateUrl: 'templates/view-vehicle.html',
                controller: 'ViewPropertiesCtrl',
                resolve: {
                    authenticated: function($location, $auth) {
                        if (!$auth.isAuthenticated()) {
                
                            return $location.path('/app/login');
                        }
                    }
                }
            }
        }
    })

    .state('app.payment', {
        url: '/payment/:tpId/:paymentRowId',
        views: {
            'menuContent': {
                templateUrl: 'templates/payment.html',
                controller: 'BillRentCtrl', 
                resolve: {
                    authenticated: function($location, $auth) {
                        if (!$auth.isAuthenticated()) {
                
                            return $location.path('/app/login');
                        }
                    }
                }
            }
        }
    })

    .state('app.rating', {
        url: '/rating',
        views: {
            'menuContent': {
                templateUrl: 'templates/rating.html',
                controller: 'RatingCtrl',
                resolve: {
                    authenticated: function($location, $auth) {
                        if (!$auth.isAuthenticated()) {
                
                            return $location.path('/app/login');
                        }
                    }
                }
            }
        }
    })

    .state('app.paymenthistory', {
        url: '/paymenthistory',
        views: {
            'menuContent': {
                templateUrl: 'templates/paymenthistory.html',
                controller: 'PaymenthistoryCtrl',
                resolve: {
                    authenticated: function($location, $auth) {
                        if (!$auth.isAuthenticated()) {
                
                            return $location.path('/app/login');
                        }
                    }
                }
            }
        }
    })

    .state('app.aboutus', {
        url: '/aboutus',
        views: {
            'menuContent': {
                templateUrl: 'templates/aboutus.html',
                controller: 'AboutusCtrl',
                resolve: {
                    authenticated: function($location, $auth) {
                        if (!$auth.isAuthenticated()) {
                
                            return $location.path('/app/login');
                        }
                    }
                }
            }
        }
    })

    .state('app.contactus', {
        url: '/contactus',
        views: {
            'menuContent': {
                templateUrl: 'templates/contactus.html',
                controller: 'ContactusCtrl',
                resolve: {
                    authenticated: function($location, $auth) {
                        if (!$auth.isAuthenticated()) {
                
                            return $location.path('/app/login');
                        }
                    }
                }
            }
        }
    })

    .state('app.subscribenow', {
        url: '/subscribenow',
        views: {
            'menuContent': {
                templateUrl: 'templates/subscribenow.html',
                controller: 'SubscribeNowCtrl',
                resolve: {
                    authenticated: function($location, $auth) {
                        if (!$auth.isAuthenticated()) {
                
                            return $location.path('/app/login');
                        }
                    }
                }
            }
        }
    })

    .state('app.prty-fut-dts', {
        url: '/prty-fut-dts/:tpId',
        views: {
            'menuContent': {
                templateUrl: 'templates/prty-fut-dts.html',
                controller: 'PropertyFutureDetailsCtrl',
                resolve: {
                    authenticated: function($location, $auth) {
                        if (!$auth.isAuthenticated()) {
                
                            return $location.path('/app/login');
                        }
                    }
                }
            }
        }
    })
    .state('app.service-req', {
        url: '/service-req',
        views: {
            'menuContent': {
                templateUrl: 'templates/service-req.html',
                controller: 'ServiceReqCtrl',
                resolve: {
                    authenticated: function($location, $auth) {
                        if (!$auth.isAuthenticated()) {
                
                            return $location.path('/app/login');
                        }
                    }
                }
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
});
