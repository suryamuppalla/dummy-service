app
// for getting the cars list
.service('VehicleService', ['$q', function($q) {

    var service = {
        getVehicles: getVehicles
    }

    return service;

    function getVehicles(value) {
        var def = $q.defer();
        var Vehicle = Parse.Object.extend("Vehicle");
        var query = new Parse.Query(Vehicle);

        // query.startsWith('name', value);
        query.find().then(function (list) {
            /* body... */
            def.resolve(JSON.parse(JSON.stringify(list)));
        }, function(error) {
            console.log(error)
            return def.reject(error)
        });

        return def.promise;
    };
}])
// search functionality using autocomplete
.service('InstanceSearchHistory', ['$http', function($http) {

    this.get = function(query) {

        return $http.get('/api/all-urls/'+query+'/?format=json');
    };
}])
// get all selectors using
.service('getSelector', ['$http', '$rootScope', '$q', '$timeout', function($http, $rootScope, $q, $timeout) {

    Parse.initialize("Y7wJNJuOzAxtB7EIVvT1Db0QO2aALBGZhilpyo4m", "z0yTOvwZKlBw6Yyvs92t8aTiTzTPxiRHLvQEe9qo");


    this.get = function(id) {
        console.log('======= retrieving list of sub admins ========');

        var Role = Parse.Object.extend('_Role');

        var UserInfo = Parse.Object.extend('UserInfo')

        var query = new Parse.Query(Role);
        query.equalTo('objectId', 'lL1WuHN4YH');
        query.descending('createdAt')

        var user_info = new Parse.Query(UserInfo)

        query.include(user_info)

        $q.all([
            query.first().then(function(role) {
                var relation = role.relation("UsersList");
                console.log('user relation list for sub admins is -->', relation)
                var rel = relation.query();
                rel.descending('updatedAt')
                return rel.find().then(function(users) {

                    $scope.subAdminListUsers = []
                    var promise = Parse.Promise.as();
                    $.each(users, function(i) {
                        var obj = {};
                        promise = promise.then(function() {
                            obj.lastName = users[i].get('lastName')
                            obj.firstName = users[i].get('firstName')
                            obj.id = users[i].id;
                            obj.user = users[i];
                        })
                        $scope.subAdminListUsers.push(obj)

                        console.log('obj is---->', obj)
                    })

                    console.log($scope.subAdminListUsers)
                    return $scope.subAdminListUsers;
                }, function(error) {
                    console.log(error);
                })
            }, function(error) {
                console.log(error)
            }).then(function(users) {
                console.log('second then function for list of sub admins --')
                console.log('------->>>', users)

                return users;
            })

        ])
    }

    var de;
    this.get = function(id) {
        var all_selectors = [];
        $http({
            method: 'GET',
            url: '/api/all-selectors/'+id+'/?format=json'
        })
        .success(function (out) {
            for(var i=0; i<out.length; i++) {
                all_selectors.push(out[i])
            }
        }, function(error) {
            console.log("selector get function error", error);
        })
        de = all_selectors;
        return all_selectors;
    };
}])


// this factory is used for getting the whole property details of the user

.factory("PropertyDetails", ['$q', function ($q){

        var PropertyDetails  = function(){
            this.properties = []
            this.TenantPropertiesClass = Parse.Object.extend("TenantProperties");
            this.TenantClass = Parse.Object.extend("Tenant");
            var self = this;
            // getting all properties
            var currentUser = Parse.User.current();
            var query = new Parse.Query(self.TenantClass);
            query.equalTo("UserPointer", currentUser);
            $q.all([ 
                query.first().then(function(result) {           
                    
                    var Propertydata = new Parse.Query(self.TenantPropertiesClass);

                    Propertydata.include('property');
                    Propertydata.include('tenant')
                    Propertydata.equalTo("tenant", result);
                    $q.all([ 
                        Propertydata.find().then(function(response){
                            var properties = [];
                            
                            $.each(response, function(i) {
                                var obj = {};
                                obj.propertyid = response[i].get('property').id;
                                obj.propertyname = response[i].get('property').get('name');
                                obj.tenantId = response[i].get('tenant').id;
                                obj.address = response[i].get('property').get("address");
                                obj.tenantpropertyid = response[i].id                   ;
                                self.properties.push(obj)
                                
                            })                            
                        })
                    ])

                })
            ])
        }

        return PropertyDetails
}])


// this factory is used for getting the whole details of the property

.factory("property" , ['$q', function ($q){
    var PropertyData =  function (tpId){
        this.propertydata =  {};
        this.tpid  = tpId;
        var self = this;
        this.TenantProperties = Parse.Object.extend("TenantProperties");
        var Propertydata = new Parse.Query(self.TenantProperties);
        Propertydata.include("property")
        Propertydata.include("tenant")
        $q.all([
            Propertydata.get(self.tpid).then(function(result){
                self.propertydata['propertyname'] = result.get("property").get('name');
                self.propertydata['address'] = result.get("property").get('address');
                self.propertydata['rentvalue'] = result.get('rentValue');
                self.propertydata['rentpaid'] = result.get('rentPaid');
                self.propertydata['startdate'] = result.get('startDate');
                self.propertydata['enddate'] = result.get('endDate');
                self.propertydata['paymentcycle'] = result.get('paymentFreaquency');
                self.propertydata['amount'] = result.get("paymentAmount");
                this.FuturePayments = Parse.Object.extend("FuturePayments");
                var FuturePaymantDates = new Parse.Query("FuturePayments");
                FuturePaymantDates.equalTo("tenantPointer", result.get("tenant"));
                FuturePaymantDates.equalTo("tenantProperty", result);
                FuturePaymantDates.equalTo("status", "due");
                FuturePaymantDates.first().then(function(obj){
                    self.propertydata['dueDate'] = obj.get("dueDate");
                })

            })
        ])
    }
    return PropertyData
}])
.factory('billPaymentDetails', ['$q', function($q){
    var PropertyData =  function (tpId){
        this.data =  {};
        this.tpid  = tpId;
        var self = this;
        self.FuturePayments = Parse.Object.extend("FuturePayments");
        var Propertydata = new Parse.Query(self.FuturePayments);
        Propertydata.include("tenantProperty");
        Propertydata.include("tenantPointer");
        Propertydata.equalTo(self.tpid);
        $q.all([
            Propertydata.find().then(function(result){
                self.data.totaAmount = 0;
                self.propertydata = JSON.parse(JSON.stringify(result));
                $.each(self.propertydata, function (i) {
                    // console.log(self.propertydata[i])

                    if (self.propertydata[i].status == 'paid') {
                        console.log('-=================')
                        self.data.totaAmount +=self.propertydata[i].amountToBePaid
                    }

                    // console.log(self.data.totaAmount);
                });
                // console.log('totaAmount is -->>>', self.data.totaAmount)

            })
        ])
    }
    return PropertyData
}])

//  this factory is used for calculating the whole pending amount of a property if any.

.factory("pendingAmount", ['$q', function($q){
    var pendingAmount = function(tpId){
        this.amountdata =  {};
        this.tpid  = tpId;
        var self = this;
        this.TenantProperties = Parse.Object.extend("TenantProperties");
        var Propertydata = new Parse.Query(self.TenantProperties);
        Propertydata.include("property")
        Propertydata.include("tenant")
        var deffered = $q.defer()
        $q.all([
            Propertydata.get(self.tpid).then(function(result){
                this.FuturePayments = Parse.Object.extend("FuturePayments");
                var FuturePaymantDates = new Parse.Query("FuturePayments");
                FuturePaymantDates.equalTo("tenantPointer", result.get("tenant"));
                FuturePaymantDates.equalTo("tenantProperty", result);
                FuturePaymantDates.equalTo("status", "pending");
                FuturePaymantDates.find().then(function(obj){
                    
                    if (obj.length == 0){                      
                        self.amountdata['pendingAmount'] = 0
                    }
                    else{                        
                        self.amountdata['pendingAmount'] = 0                    
                        for(var i in obj){
                            self.amountdata['pendingAmount'] += obj[i].get("amountToBePaid");                           
                        }
                        
                    }
                    deffered.resolve();
                    return deffered.promise;
                    
                })

            })
        ])        
    }
    return pendingAmount;
}])


.factory("dueAmount", ['$q', 'pendingAmount', function($q, pendingAmount){
    var DueAmount = function(tpId){
        this.amountobepaid = new pendingAmount()
        this.duedata =  {};
        this.tpid  = tpId;
        var self = this;
        this.TenantProperties = Parse.Object.extend("TenantProperties");
        var Propertydata = new Parse.Query(self.TenantProperties);
        Propertydata.include("property")
        Propertydata.include("tenant")
        var deffered = $q.defer()
        $q.all([
            Propertydata.get(self.tpid).then(function(result){
                console.log(JSON.parse(JSON.stringify(result)))
                this.FuturePayments = Parse.Object.extend("FuturePayments");
                var FuturePaymantDates = new Parse.Query("FuturePayments");
                FuturePaymantDates.equalTo("tenantPointer", result.get("tenant"));
                FuturePaymantDates.equalTo("tenantProperty", result);
                FuturePaymantDates.equalTo("status", "due");
                FuturePaymantDates.first().then(function(obj){
                    self.duedata['dueamount'] = obj.get("amountToBePaid")                    
                    deffered.resolve();
                    return deffered.promise;
                })
            })
        ])
    }
    return DueAmount
}]);