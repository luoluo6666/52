'use strict';
angular.module('admin')
    //色备管理
    .filter('deviceFilter', function (deviceConstant) {
        return function (num, key) {
            try {
                return deviceConstant[key][num].name
            }catch (e){
                return ;
            }

        }
    })
    //客服管理
    .filter('customerFilter', function (customerConstant) {
        return function (num, key) {
            try {
                return customerConstant[key][num].name
            }catch (e){
                return ;
            }

        }
    })
    //付费状态过滤
    .filter('personTypeFilter', function (customerConstant) {
        return function (num, key) {
            try {
                return customerConstant[key][num-1].name
            }catch (e){
                return ;
            }

        }
    })
//app版本
    .filter('appFilter', function(appVersion){
        return function(app){
            if(app !== '' && app !== undefined){
                return appVersion[app];
            }
        }
    })

    //把毫秒转为年，用于根据出生日期时间戳算年龄
    .filter('ageFilter', ["commonUtil", function(commonUtil){
        return function(time){
            var age = parseInt(time / 24 / 60 / 60 / 1000 / 365);
            return age;
        }
    }])

    .filter('freezedStatusFilter', function(freezedStatus){
        return function(freezed){
            if(freezed !== '' && freezed !== undefined){
                return freezedStatus[freezed];
            }
        }
    })

    .filter('changeFreezedStatusFilter', function(changeFreezedStatus){
        return function(freezed){
            if(freezed !== '' && freezed !== undefined){
                return changeFreezedStatus[freezed];
            }
        }
    })


    // 认证管理-认证列表-认证状态
    .filter('approvedListStatusFilter', function(approvedStatus){
        return function(status){
            if(status !== '' && status !== undefined){
                return approvedStatus[status];
            }
        }
    })

    //交易类型
    .filter('dealTypeFilter', function(dealType){
        return function(type){
            if(type !== '' && type !== undefined){
                return dealType[type];
            }
        }
    })
    //交易状态
    .filter('dealStatusFilter', function(dealStatus){
        return function(status){
            if(status !== '' && status !== undefined){
                return dealStatus[status];
            }
        }
    })

    //合作医院管理
    //合作医院列表状态
    .filter('hospitalListStatusFilter', function(hospitalStatus){
        return function(status){
            if(status !== '' && status !== undefined){
                return hospitalStatus[status];
            }
        }
    })
    //合作医院列表等级
    .filter('hospitalGradeFilter', function(hospitalGrade){
        return function(type){
            if(type !== '' && type !== undefined){
                return hospitalGrade[type];
            }
        }
    })
    // 合作医院列表上下线
    .filter('changeHospitalStatusFilter', function(changeHospitalStatus){
        return function(status){
            if(status !== '' && status !== undefined){
                return changeHospitalStatus[status];
            }
        }
    })
    // 合作医院医生列表
    .filter('doctorPositionFilter', function(doctorPosition){
        return function(status){
            if(status !== '' && status !== undefined){
                return doctorPosition[status];
            }
        }
    })

    // 内容管理
    //     内容列表
    .filter('contentListStatusFilter', function(contentStatus){
        return function(status){
            if(status !== '' && status !== undefined){
                return contentStatus[status];
            }
        }
    })

    // 运营管理
    //     信息状态
    .filter('messageListStatusFilter', function(messageStatus){
        return function(status){
            if(status !== '' && status !== undefined){
                return messageStatus[status];
            }
        }
    })
    // 发送人群状态
    .filter('messagePeoplesStatusFilter', function(messagePeople){
        return function(status){
            if(status !== '' && status !== undefined){
                return messagePeople[status];
            }
        }
    })
    //     强制更新
    .filter('forceUpdate', function(){
        return function(status){
            if(status){
                return "是"
            } else {
                return "否"
            }
        }
    })
    //     支付方式
    .filter('dealWayFilter', function(dealWay){
        return function(id){
            if(id != undefined && id !== ''){
                return dealWay[id - 1].name;
            }
        }
    })
    //     硬度时间
    .filter('hardnessTimeFilter', function(){
        return function(time){
            if(time){
                return Math.floor(time / 60) + '分' + time % 60 + '秒'
            }
        }
    })
    //     版本名称
    .filter('appVersionFilter', function(appVersionType){
        return function(item){
            if(item !== '' && item !== undefined){
                return appVersionType[item];
            }
        }
    })
;



