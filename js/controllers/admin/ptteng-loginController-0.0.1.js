'use strict';
angular.module('admin')
    .controller('LoginCtrl',['$scope', 'loginService', 'managerService','$state', '$timeout', '$cookies','$http',LoginCtrl]);
        function LoginCtrl($scope, loginService, managerService,$state, $timeout, $cookies,$http) {
        var vm = $scope.vm = {};
        vm.name = "";
        vm.pwd = "";
        $scope.submit = function() {
             // $http.get('JSON/treeMenu.json').then(function (res) {
             //     console.log(res)
            loginService.login({name: vm.name, pwd: vm.pwd}).then(function(res) {
                if (res.data.code == 0) {
                    $cookies.login = "true";
                    $state.go("field.dashboard");

                    managerService.saveSelfDetail(res.data.data);
                } else {
                    vm.errorTip = res.data.message;
                    $timeout(function() {
                        vm.errorTip = "";
                    }, 3000);
                }
            });
        };
    }