'use strict';
angular.module('admin').config(projectRouteConfig);
function projectRouteConfig($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $locationProvider) {
    var _lazyLoad = function (loaded) {
        return function ($ocLazyLoad) {
            return $ocLazyLoad.load(loaded, {serie: true});
        }
    };

    $ocLazyLoadProvider.config({
        debug: false,
        events: true
    });

    // 更改url格式配置为html5，去掉#号
    // $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/dashboard');
    $stateProvider

        .state('field', {
            url: '',
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            controllerAs: 'vm',
            abstract: true, // true 表明此状态不能被显性激活，只能被子状态隐性激活
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/admin/ptteng-mainController-0.0.1.js',
                    'js/directives/ptteng-sidebar/ptteng-sidebar-0.0.1.js',
                    'js/directives/searchParams/search-params.js',
                    'js/directives/ptteng-user/ptteng-user-0.0.1.js',
                    'page',
                    "js/directives/numberic/numberic.js"
                ])
            }
        })
        //欢迎页面
        .state('field.dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashboard.html'
        })


        // 公共管理模块 (此处可以配置 但是不要删除 若操作记录没有的话 可以删除掉)
        // 登录登出

        .state('login', {
            url: '/login',
            templateUrl: 'views/admin/login.html',
            controller: 'LoginCtrl',
            resolve: {
                loadMyFile: _lazyLoad(
                    'js/controllers/admin/ptteng-loginController-0.0.1.js')
            }
        })

        //后台管理开始
        //用户管理
        .state('field.manager', {
            url: '/manager/:page/:size/:next',
            templateUrl: 'views/admin/manager.html',
            controller: 'ManagerCtrl',
            resolve: {
                loadMyFile: _lazyLoad('js/controllers/admin/ptteng-managerController-0.0.1.js')
            }
        })
        //用户新增
        .state('field.managerDetail', {
            url: '/managerDetail/:id',
            templateUrl: 'views/admin/managerDetail.html',
            controller: 'ManagerDetailCtrl',
            resolve: {
                loadMyFile: _lazyLoad('js/controllers/admin/ptteng-managerDetailController-0.0.1.js')
            }
        })
        // .state('field.managerCheck', {
        //     url: '/managerCheck/:id',
        //     templateUrl: 'views/admin/managerCheck.html',
        //     controller: 'ManagerDetailCtrl',
        //     resolve: {
        //         loadMyFile: _lazyLoad('js/controllers/admin/ptteng-managerDetailController-0.0.1.js')
        //     }
        // })
        //角色管理
        .state('field.role', {
            url: '/role/:page/:size/:next',
            templateUrl: 'views/admin/role.html',
            controller: 'RoleCtrl',
            resolve: {
                loadMyFile: _lazyLoad('js/controllers/admin/ptteng-roleController-0.0.1.js')
            }
        })
        //角色新增
        .state('field.roleDetail', {
            url: '/roleDetail/:id/:name',
            templateUrl: 'views/admin/roleDetail.html',
            controller: 'RoleDetailCtrl',
            resolve: {
                loadMyFile: _lazyLoad('js/controllers/admin/ptteng-roleDetailController-0.0.1.js')
            }
        })
        //模块管理
        .state('field.module', {
            url: '/module/:page/:size/:next',
            templateUrl: 'views/admin/module.html',
            controller: 'ModuleCtrl',
            resolve: {
                loadMyFile: _lazyLoad('js/controllers/admin/ptteng-moduleController-0.0.1.js')
            }
        })
        //模块新增
        .state('field.moduleDetail', {
            url: '/moduleDetail/:id',
            templateUrl: 'views/admin/moduleDetail.html',
            controller: 'ModuleDetailCtrl',
            resolve: {
                loadMyFile: _lazyLoad('js/controllers/admin/ptteng-moduleDetailController-0.0.1.js')
            }
        })
        //密码修改
        .state('field.pwd', {
            url: '/pwd',
            templateUrl: 'views/admin/pwd.html',
            controller: 'PwdCtrl',
            resolve: {
                loadMyFile: _lazyLoad('js/controllers/admin/ptteng-pwdController-0.0.1.js')
            }
        })
        //后台管理结束

        // 运营管理开始
        .state('field.parameterSetting', {
            url: '/parameterSetting/:page/:size?type&value&name&startAt&endAt&id&updateStartAt&updateEndAt&comments',
            templateUrl: 'views/operation/parameterSetting.html',
            controller: 'ParameterSettingCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/operation/paranmeterSetting.js',
                ])
            }
        })
        .state('field.parameterSettingEdit', {
            url: '/parameterSettingEdit/:id',
            templateUrl: 'views/operation/parameterSettingEdit.html',
            controller: 'ParameterSettingEditCtrl',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/operation/paranmeterSettingEdit.js',
                ])
            }
        })

        // 运营管理结束

     /************************************************************
       设备管理

      */
      // 设备管理
        .state('field.deviceManagement', {
            url: '/deviceManagement?page&size&factory&equipmentAmount&status&name',
            templateUrl: 'views/deviceManagement/deviceManagement.html',
            controller: 'DeviceManagement',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/deviceManagement/deviceManagement.js',
                ])
            }
        })
        // 设备管理 新增、/编辑/查看
        .state('field.deviceAdd', {
            url: '/deviceAdd?id&edit',
            templateUrl: 'views/deviceManagement/deviceManagementAdd.html',
            controller: 'DeviceAdd',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/deviceManagement/deviceManagementAdd.js',
                ])
            }
        })
        // 分期管理
        .state('field.stagingManagement', {
            url: '/stagingManagement?id&name&equipmentAmount&factory&hospitalName&mobile&address&totalRepayment' +
            '&securityDeposit&stagingPeriod&monthlyRepayment&status&prepayment&page&size&isPrepayment&startAt&endAt',
            templateUrl: 'views/deviceManagement/stagingManagement.html',
            controller: 'StagingManagement',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/deviceManagement/stagingManagement.js'
                ])
            }
        })
        // 分期管理 新增、/编辑/查看
        .state('field.stagingManagementAdd', {
            url: '/stagingManagementAdd?id&editId',
            templateUrl: 'views/deviceManagement/stagingManagementAdd.html',
            controller: 'StagingManagementAdd',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/deviceManagement/stagingManagementAdd.js',
                ])
            }
        })


    /************************************************************
     客户管理

     ***********************/
        // 用户管理
        .state('field.userManagement', {
            url: '/userManagement?mobile&startAt&endAt&status&buyStatus',
            templateUrl: 'views/customer/userManagement.html',
            controller: 'UserManagement',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/customer/userManagement.js',
                ])
            }
        })
        // 用户详情
        .state('field.userManagementDetails', {
            url: '/userManagementDetails?id',
            templateUrl: 'views/customer/userManagementDetails.html',
            controller: 'UserManagementDetails',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/customer/userManagementDetails.js',
                ])
            }
        })
        // 医院注册
        .state('field.stagingApply', {
            url: '/stagingApply?id&name&address&startAts&endAts&legalPerson&status&employees&area',
            templateUrl: 'views/customer/stagingApply.html',
            controller: 'StagingApply',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/customer/stagingApply.js'
                ])
            }
        })
        // 医院注册编辑 /查看
        .state('field.stagingApplyAdd', {
            url: '/stagingApplyAdd?id&editId',
            templateUrl: 'views/customer/stagingApplyAdd.html',
            controller: 'StagingApplyAdd',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/customer/stagingApplyAdd.js',
                ])
            }
        })
        // 消息管理
        .state('field.Msg', {
            url: '/Msg?id&page&size&title&startAt&endAt&createBy&personType&status',
            templateUrl: 'views/customer/Msg.html',
            controller: 'Msg',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/customer/Msg.js',
                ])
            }
        })
        // 消息/编辑/新增/查看
        .state('field.MsgAdd', {
            url: '/MsgAdd?id&edit',
            templateUrl: 'views/customer/MsgAdd.html',
            controller: 'MsgAdd',
            controllerAs: 'vm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/customer/MsgAdd.js',
                ])
            }
        })

}