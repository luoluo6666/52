'use strict';
angular.module('admin')
    .factory('path', function (commonUtil) {
        return {
            //login
            login: "/a/login",
            logout: "/a/logout",
            //manager
            manager: function (mid) {
                if (mid == undefined || mid == "") {
                    return "/a/u/manager";
                } else {
                    return "/a/u/manager/" + mid;
                }
            },
            managerList: "/a/u/manager/list",
            managerMultiDetail: function (params) {
                return "/a/u/multi/manager" + commonUtil.concactArrayParam("ids", params);
            },
            //pwd
            changePwd: "/a/u/pwd",
            //role
            role: function (rid) {

                if (rid == undefined || rid == "") {
                    return "/a/u/role";
                } else {
                    return "/a/u/role/" + rid;
                }

            },
            roleList: "/a/u/role/",
            roleMultiDetail: function (params) {
                return "/a/u/multi/role" + commonUtil.concactArrayParam("ids", params);
            },
            roleModule: function (rid) {
                return "/a/u/role/" + rid + "/module"
            },
            roleManager: function (rid) {
                return "/a/u/role/" + rid + "/manager"
            },
            //module
            module: function (mid) {
                if (mid == undefined || mid == "") {
                    return "/a/u/module";
                } else {
                    return "/a/u/module/" + mid
                }
            },
            moduleList: "/a/u/module/",
            moduleMultiDetail: function (params) {
                return "/a/u/multi/module" + commonUtil.concactArrayParam("ids", params);
            },

            //article
            article: function (aid) {
                if (aid == undefined || aid == "") {
                    return "/a/u/article";
                } else {
                    return "/a/u/article/" + aid;
                }


            }
        }
    })


    .factory('loginService', function ($http, path) {
        return {
            login: function (params) {
                return $http.post(path.login, params);
            },
            logout: function () {
                return $http.post(path.logout);
            },
            changePwd: function (params) {
                // params: id|password
                return $http.put(path.changePwd, params);
            }
        }
    })

    .factory('pwdService', function ($http, path, recordCookies) {
        return {

            changePwd: function (params) {
                // params: id|password
                return $http.put(path.changePwd, params);
            }


        }
    })
    .factory('managerService', function ($http, path, commonUtil, recordCookies) {
        return {

            getManager: function (mid) {
                return $http.get(path.manager(mid));
            },
            addManager: function (params) {
                return $http.post(path.manager(), params);
            },
            updateManager: function (mid, params) {
                recordCookies({targetID: mid});
                return $http.put(path.manager(mid), params);
            },
            deleteManager: function (mid) {
                recordCookies({targetID: mid});
                return $http.delete(path.manager(mid));
            },
            getManagerList: function (params) {
                return $http.get(path.managerList, commonUtil.process4Page(params)).then(function (res) {
                    return commonUtil.processPageResult(res);
                });
            },
            batchGetManager: function (params) {
                return $http.get(path.managerMultiDetail(params));
            },

            saveOrUpdateManager: function (mid, params, url) {
                recordCookies({targetID: mid});
                if (mid == undefined || mid == "") {
                    this.addManager(params).then(function (res) {
                        commonUtil.showReturnMsg(res, url);
                    });
                } else {
                    this.updateManager(mid, params).then(function (res) {
                        commonUtil.showReturnMsg(res, url);
                    });

                }

            },

            saveSelfDetail: function (manager) {
                localStorage["self"] = JSON.stringify(manager);
            },

            getSelfDetail: function () {

                if (localStorage["self"] === undefined) {
                    console.log("not get ptteng-paging data ,relogin ");
                    return undefined;
                } else {

                    console.log();
                    return JSON.parse(localStorage["self"]);
                }

            },
            clearSelfDetail: function () {
                localStorage["self"] = undefined;
            }


        }
    })

    .factory('roleService', function ($http, path, moduleService, commonUtil, recordCookies) {
        return {
            getRole: function (rid) {
                return $http.get(path.role(rid));
            },
            addRole: function(params) {
                return $http.post(path.role(), params);
            },
            updateRole: function(rid,params) {
                    recordCookies({targetID: rid});
                    return $http.put(path.role(rid), params);
            },
            deleteRole: function (rid) {
                recordCookies({targetID: rid});
                return $http.delete(path.role(rid));
            },
            getRoleList: function (params) {

                return $http.get(path.roleList, commonUtil.process4Page(params)).then(function (res) {
                    return commonUtil.processPageResult(res);
                });
            },
            getRoleModule: function (rid) {
                return $http.get(path.roleModule(rid));
            },
            getRoleManager: function (rid) {
                return $http.get(path.roleManager(rid));
            },
            getRoleModuleDetail: function (rid) {
                var res = this.getRoleModule(rid);
                var moduleIDS = res.data;
                return moduleService.batchGetModule(moduleIDS);

            },
            batchGetRole: function (params) {
                return $http.get(path.roleMultiDetail(params));
            },
            saveOrUpdateRole: function (mid, params, url) {
                recordCookies({targetID: mid});
                if (mid == undefined || mid == "") {
                    this.addRole(params).then(function (res) {
                        commonUtil.showReturnMsg(res, url);
                    });
                } else {
                    this.updateRole(mid, params).then(function (res) {
                        commonUtil.showReturnMsg(res, url);
                    });

                }

            }
        }
    })
    .factory('moduleService', function ($http, path, commonUtil, recordCookies) {
        return {
            getModule: function (mid) {
                return $http.get(path.module(mid));
            },
            addModule: function (params) {
                return $http.post(path.module(), params);
            },
            updateModule: function (mid, params) {
                recordCookies({targetID: mid});
                return $http.put(path.module(mid), params);
            },
            deleteModule: function (mid) {
                recordCookies({targetID: mid});
                return $http.delete(path.module(mid));
            },
            getModuleList: function (params) {
                return $http.get(path.moduleList, commonUtil.process4Page(params)).then(function (res) {
                    return commonUtil.processPageResult(res);
                });
            },
            batchGetModule: function (params) {


                return $http.get(path.moduleMultiDetail(params));
            },

            saveOrUpdateModule: function (mid, params, url) {
                recordCookies({targetID: mid});
                if (mid == undefined || mid == "") {
                    this.addModule(params).then(function (res) {
                        commonUtil.showReturnMsg(res, url);
                    });
                } else {
                    this.updateModule(mid, params).then(function (res) {
                        commonUtil.showReturnMsg(res, url);
                    });

                }

            }


        }
    })


;


