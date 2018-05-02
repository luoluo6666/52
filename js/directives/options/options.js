/**
 * Created by Master on 2017/3/21.
 */

angular.module('admin').directive('picker', function () {
    return {
        restrict: 'E',
        // templateUrl: 'js/directives/options/options.html',
        scope: {
            options: '=',//传入数据
            selectedValue: '=ngModel',//输出当前选择值
            selectName: '@',//下拉选项名label
            optionClass: '@',//样式
            labelClass: '@',
            get: '@', //是否是请求数据
            obj:'@', // 数据是否是对象
            dis:'@',   //禁用
            opacity:'@', //是否显示 '全部'一项
            essential:'@'//是否必填
        },
        templateUrl: function (ele,attr) {
        if (attr.opacity == '{{true}}'){
            return  'js/directives/options/optionsTwo.html';
        }else {
            return 'js/directives/options/options.html';
        }
    },
        replace: true,
        link:function (scope, ele, attr) {
            if(scope.opacity){
                scope.selectedValue == undefined || scope.selectedValue == ''?
                    scope.selectedValue = 0:
                    scope.selectedValue = scope.selectedValue;
                }
                return scope.opacity

        }

    }
});