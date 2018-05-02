angular.module("admin")
    .factory("portService",function ($http,address) {
    return {

        // 运营管理
        // 获取参数列表
        getConstantList:function(param){
            return $http.get(address.getConstantList(),{params:param})
        },
        // 获取常量详情
        getConstantDetails:function(id){
            return $http.get(address.getConstantDetails(id))
        },
        //编辑常量
        putConstant:function(id,data){
            return id?  $http.put(address.putConstant(id),data) :$http.post(address.addConstant(),data);
        },
        // // 新增常量
        // addConstant:function(data){
        //     return
        // },
        // 获取信息列表
        getMessageList:function(param){
            return $http.get(address.messageListUrl(),{params:param})
        },
        // 获取信息列表
        getMessageDetails:function(id){
            return $http.get(address.messageDetailsUrl(id))
        },
        // 新增信息
        postMessage:function(data){
            return $http.post(address.newMessageUrl(),data)
        },
        // 编辑信息
        putMessage:function(id,data){
            return id?$http.put(address.putMessageUrl(id),data):$http.post(address.newMessageUrl(),data);
        },
        // 删除信息
        deleteMessage:function(id){
            return $http.delete(address.deleteMessageUrl(id))
        },

    }
    })
    .factory('customerService',function ($http, address) {
        return{
            //用户管理
            getUserList:function (params) {
              return $http.get(address.getUserList(),{params:params})
            },
            getUserDetails:function (id) {
                return $http.get(address.getUserDetails(id))
            },
            //编辑用户状态
            putUserStatus:function (id,obj) {
                return $http.put(address.putUserStatus(id),obj)
            },
            //编辑用户
            putUserDetails:function (id,params) {
                return $http.put(address.putUserDetails(id),params)
            },
            //医院列表
            getHospitalList:function (params) {
                return $http.get(address.getHospitalList(),{params:params})
            },
            //审核医院
            putHospitalAudit:function (id,data) {
                return $http.put(address.putHospitalAudit(id),data)
            },
            //医院详情
            getHospitalDetails:function (id) {
                return $http.get(address.getHospitalDetails(id))
            },
            //编辑医院
            putHospital:function (id,params) {
                return $http.put(address.putHospital(id),params)
            },
        }
    })
    .factory('equipmentService',function ($http,address) {
        return {
            //设备列表
            getEquipmentList:function (params) {
                return $http.get(address.getEquipmentList(),{params:params})
            },
            //添加设备
            addEquipment:function (id,params) {
               return id ?$http.put(address.putEquipment(id),params): $http.post(address.addEquipment(id),params);
            },
            //删除色备
            delEquipment:function (id) {
                return $http.delete(address.delEquipment(id))
            },
            //获取设备详情
            getEquipmentDetails:function (id) {
                return $http.get(address.getEquipmentDetails(id))
            },
            //修改设备状态
            putEquipmentDetails:function (id,obj) {
                return $http.put(address.putEquipmentDetails(id),obj)
            },
            //编辑色备
            putEquipment:function (id,params) {
                return $http.put(address.putEquipment(id),params)
            },
            //分期管理列表
            getOrdersList:function (params) {
                return $http.get(address.getOrdersList(),{params:params})
            },
            //分期编辑
            putOrder:function (id,params) {
                return $http.put(address.putOrder(id),params)
            },
            //分期详情
            getOrderDetails:function (id) {
                return $http.get(address.getOrderDetails(id))
            },
            //删除订单
            delOrders:function (id) {
                return $http.delete(address.delOrders(id))
            },
            //订单审核
            putOrdersAudit:function (id,params) {
                return $http.put(address.putOrdersAudit(id),params)
            },
            //提前还款申请
            putPrepayment:function (id,params) {
                return $http.put(address.putPrepayment(id),params)
            }
        }
    })
    .factory('uploadService', function ($http,address) {
        return {
            uploadFile: function (FileUploader, alias) {
                var param = {url: address.uploadUrl()};
                if (alias) {
                    angular.extend(param, {alias: alias});
                }
                return new FileUploader(param);
            }
        }
    });





