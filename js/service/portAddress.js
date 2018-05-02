angular.module("admin").factory("address",function ($state,$http){
    return {

        //上传图片接口
        uploadUrl: function () {
            return "/a/u/img/thumb"
        },

        /********************
         * 运营管理
         *****************************/
        //常量管理
        // 获取参数列表
         getConstantList:function(){
            return "/a/u/constant/search"
        },
        // 获取常量详情
        getConstantDetails:function(id){
            return "/a/u/constant/"+id
        },
        //编辑常量
        putConstant:function(id){
            return "/a/u/constant/"+id;
        },
        //添加常量
        addConstant:function () {
            return '/a/u/constant';
        },
        // 消息列表
        messageListUrl:function(){
            return "/a/u/message/list"
        },
        // 消息详情
        messageDetailsUrl:function(id){
            return "/a/u/message/"+id
        },
        // 新增消息
        newMessageUrl:function (){
            return "/a/u/message"
        },
        // 编辑消息
        putMessageUrl:function (id){
            return "/a/u/message/"+id
        },
        // 删除消息
        deleteMessageUrl:function (id){
            return "/a/u/message/"+id
        },
        // 意见反馈列表
        opinionListUrl:function(){
            return "/a/feedback/search"
        },
        // 意见反馈详情
        opinionDetailsUrl:function(id){
            return "/a/feedback/"+id
        },
        // 删除意见反馈
        opinionDeleteUrl:function(id){
            return "/a/u/feedback/"+id
        },

        /********************
         * 客户管理
         *****************************/
        //用户管理
         getUserList:function () {
            return '/a/u/search/user';
        },
        getUserDetails:function (id) {
            return '/a/u/user/'+id;
        },
        //编辑用户状态
        putUserStatus:function (id) {
            return '/a/u/user/'+id+'/status';
        },
        //编辑用户
        putUserDetails:function (id) {
            return '/a/u/user/'+id;
        },
        //医院列表
        getHospitalList:function () {
            return '/a/u/search/hospital';
        },
        //审核医院
        putHospitalAudit:function (id) {
            return '/a/u/hospital/'+id+'/audit';
        },
        //医院详情
        getHospitalDetails:function (id) {
            return '/a/u/hospital/'+id;
        },
        //编辑医院
        putHospital:function (id) {
            return '/a/u/hospital/'+id;
        },
        /****************************************
         * 设备管理
         *****************************/
        //设备列表
        getEquipmentList:function () {
            return '/a/u/search/equipment';
        },
        //添加设备
        addEquipment:function () {
            return '/a/u/equipment';
        },
        //编辑设备
         putEquipment:function (id) {
            return '/a/u/equipment/'+id;
        },
        //删除设备
        delEquipment:function (id) {
            return '/a/u/equipment/'+id;
        },
        //获取设备详情
        getEquipmentDetails:function (id) {
            return '/a/u/equipment/'+id;
        },
        //修改设备状态
        putEquipmentDetails:function (id) {
            return '/a/u/equipment/'+id+'/status';
        },
        //分期管理列表
        getOrdersList:function () {
            return '/a/u/search/orders';
        },
        //分期编辑
        putOrder:function (id) {
            return '/a/u/orders/'+id;
        },
        //分期详情
        getOrderDetails:function (id) {
            return '/a/u/orders/'+id;
        },
        //订单审核
        putOrdersAudit:function (id) {
            return '/a/u/orders/'+ id+'/audit'
        },
        //删除订单
        delOrders:function (id) {
            return '/a/u/orders/'+ id
        },
        //提前还款申请
        putPrepayment:function (id) {
            return '/a/u/orders/'+id+'/prepayment'
        }

    }
});
