'use strict';

angular.module('admin')
    .directive('sidebar', ['$location','$http', function ($location,$http) {
        return {
            templateUrl: 'js/directives/ptteng-sidebar/ptteng-sidebar-0.0.1.html',
            restrict: 'E',
            replace: true,
            scope: {},
            controller: function ($scope, roleService, managerService, $rootScope, $state, moduleService, commonUtil) {

                // var self = managerService.getSelfDetail();
                // if (self == undefined) {
                //     $rootScope.alert("您还未登录", function () {
                //         $state.go("login");
                //     });
                //     return false;
                // } else {
                //     $rootScope.uid = self.role.id;
                // }
                // 请求模块
                $http({
                    method: 'GET',
                    url: 'https://www.easy-mock.com/mock/5a9ca7a19a5a7f4b8ba1f3d0/demo/sidebar'
                }).then(function (res) {

                    if(res.data.code==0){
                        $scope.sidelist=res.data.data.sidelist;
                        console.log(res.data.data)

                    }
                });
                // roleService.getRoleModule(self.role.id).then(function (res) {
                //
                //     if (res.data.code == 0) {
                //         if (sessionStorage.mineSide == '' || sessionStorage.mineSide == undefined) {
                //             moduleService.batchGetModule(res.data.data.mids).then(function (res) {
                //                 if (res.data.code == 0) {
                //                     //存入模板信息用于验证
                //                     localStorage["moduleList"] = JSON.stringify(res.data.data.moduleList);
                //                     $scope.sideList = commonUtil.buildTree(res.data.data.moduleList);
                //                 }
                //             });
                //         }
                //         else {
                //             $scope.sideList = JSON.parse(sessionStorage["mineSide"]);
                //         }
                //     }
                // });
                // $http.get('JSON/mannerTree.json').then(function (res) {
                //     $scope.sideList =res.data;
                // })
                // 刷新后
                // 自动选中刷新前的侧边栏
                $scope.sideClick = function (id) {
                    var stopId = '';
                    angular.forEach($scope.sidelist, function (items, index) {
                        angular.forEach(items.nodes, function (item) {
                            console.log(id);
                            console.log(item.id);
                            if (id == item.id) {
                                $scope.collapseVar = index;
                                item.selected = true;
                                items.se = true;
                                //stopid值是记录了应该展开的模块id
                                stopId = items.id;
                            }
                            else if (stopId != items.id) {
                                item.selected = false;
                                items.se = false;
                            }
                            else if (id != item.id && stopId == items.id) {
                                item.selected = false;
                            }
                        })
                    });

                    sessionStorage.mineSide = JSON.stringify($scope.sidelist);
                };
                $scope.dashboard = function () {
                    var li = $('.in').find('a').removeClass('navActive')

                }

            }

        }
    }]);
