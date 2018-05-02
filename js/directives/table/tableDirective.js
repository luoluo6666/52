/**
 * Created by Administrator on 2017\12\23 0023.
 */
angular.module('admin')
.directive('dTable',function ($compile) {
    return{
        register:'E',
        replace:true,
        templateUrl:'js/directives/table/tableDirective.html',
        scope:{
            vm:'=',
            pageInit:'='
        },
        link:function (scope, ele, attr) {
            scope.$watch('pageInit',function (newValue){
                scope.data = newValue.table.tableData;
            });
            var page = scope.pageInit;
            scope.headData = page.table.tableHead;
            scope.data = page.table.tableData;
            scope.totalPage = page.totalPage;
            scope.add = page.add;
            //开关拖动排序
            scope.draggable=true;
            if(!page.isSort){
                scope.draggable=false;
            }
            var btnName = page.table.tableButton;
            var tableName = page.table.tableName;
            var td =page.isIndex ? ' <td ng-bind="$index+1"></td>':'';
            var btn='';
            for(var i = 0; i<tableName.length;i++){
                if(tableName[i].type === 'text'){
                    td = td+'<td ng-class="'+tableName[i].tdNgClass+'" >'+tableName[i].value+'</td>';
                }else  if(tableName[i].type === 'img'){
                    td = td+'<td ><img ng-src="'+ tableName[i].value+'"></td>';
                } else  if(tableName[i].type === 'music'){
                    td = td+'<td ><audio ng-src="'+ tableName[i].value+'"></td>';
                }

              }
            for(var  i = 0; i <btnName.length; i++){
                if(btnName[i].btnName && btnName[i].btnClick){
                    btn = btn+'<button ng-class="'+btnName[i].ngClass+'" class="'+btnName[i].btnStyle+'" ng-click="'+ btnName[i].btnClick+'">'+btnName[i].btnName+'</button> '
                } else if(btnName[i].btnNameBind && btnName[i].btnClick){
                    btn = btn+'<button ng-class="'+btnName[i].ngClass+'" class="'+btnName[i].btnStyle+'" ng-click="'+ btnName[i].btnClick+'" ng-bind="'+ btnName[i].btnNameBind +'"></button> '

                }else if(btnName[i].btnName && btnName[i].btnUi_sref) {
                    btn = btn+'<button ng-class="'+btnName[i].ngClass+'" class="'+btnName[i].btnStyle+'" ui-sref="'+ btnName[i].btnUi_sref+'">'+btnName[i].btnName+'</button> '
                }
            }
            var html = '<table class="table  table-bordered  table-striped" >' +
                '<thead>' +
                '<tr align="center" valign="middle">' +
                '<th ng-repeat="head in headData">{{head}}</th>' +
                '</tr>'+
                '<tbody dnd-list="data"  class="ul-table table-responsive table-striped">'+
                '<tr ng-repeat="item in data " ' +
                ' dnd-draggable="item" ' +
                    'dnd-disable-if="draggable == false"'+
                'data-dnd-moved="data.splice($index, 1)" ' +
                'data-dnd-effect-allowed="move" data-dnd-selected="data.selected == stu?data.selected = \'\':data.selected = item" ' +
                'ng-class="{\'\': vm.data.selected == item}" align="center" valign="middle" >'+
                td+
                '<td>'+
                btn+
                '</td>'+
                '</tr>'+
                '</tbody>'+
                '</thead>'+
                '</table>'+
               '<pagination ng-if="vm.total" total="{{vm.total}}"></pagination>';
            angular.element('#table').before($compile(html)(scope))
        }
    }
})
.directive('dLable',function () {
    return{
        register:'E',
        templateUrl:'js/directives/table/tbodyTemplate.html',
        scope:{
          labelClass:'@',  //label 样式
            labelTitle:'@', //标题
            divClass:'@', // div 样式
            inputClass:'@', //input 样式
            selectedValue: '=ngModel',//输出当前选择值

        },
        replace:true
    }
})
.directive('labelInput',function () {
    return{
        register:'E',
        templateUrl:'js/directives/table/labelInput.html',
        scope:{
            labelTitle:'@', //标题
            selectedValue: '=ngModel',//输出当前选择值,
            dis:"@"
        },
        replace:true
    }
})
.directive('labelInputFor',function ($compile) {
    return{
        register:'E',
        templateUrl:'js/directives/table/labelInputFor.html',
        scope:{
            // labelTitle:'@', //标题
            // selectedValue: '=',//输出当前选择值
            vm:'=',
            data: '='//输出当前选择值
        },
        replace:true,
        link:function (scope, ele, attr) {
            var  vm = scope.vm;
            var data = scope.data;
            var  html ='';
            for(var i = 0; i<data.length;i++){
                var model = 'ng-model="vm.params[" '+ data[i].s + ' "]"';
                html = html+' <div class="col-md-4">'+
                    '<div class="form-group">'+
                    '<label class="control-label col-md-4 word-spacing-25 pd-right-10">'+data[i].title+'</label>'+
                    '<div class="col-md-8">'+
                    '<input type="text" '+model+' class="form-control">'+
                    '</div>'+
                    '</div>'+
                    '</div>';
            }
            angular.element('#labelFor').before($compile(html)(scope))
        }
    }
});


// .directive('dLabelTime',function () {
//     return{
//         register:'E',
//         templateUrl:'js/directives/table/dLabelTime.html',
//         scope:{
//             labelClass:'@',  //label 样式
//             labelTitle:'@', //标题
//             divClass:'@', // div 样式
//             inputClass:'@', //input 样式
//             selectedStart: '=ngModel',//输出当前选择值
//             selectedEnd: '=ngModel',//输出当前选择值
//
//         },
//         replace:true,
//         link:function (scope,ele,attr) {
//
//         }
//     }
// })