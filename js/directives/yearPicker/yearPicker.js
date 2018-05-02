/**
 * Created by Administrator on 2018\1\31 0031.
 */
angular.module('admin')
.directive('yearPicker',function () {
    return{
        register:'E',
        replace:true,
        templateUrl:'js/directives/yearPicker/yearPicker.html',
        scope:{
           selectTime:'=ngModel',
            // maxValue:'@',
            minValue:'@'
        },
      link:function (scope, ele, attr) {
           scope.show = false;
          var year = 1900;
          var addNumber = 20;
          scope.initYear = function (tg) {
              scope.data = [];
            if(tg){
                for (var i = 0; i<addNumber; i++){
                    if(year>new Date().getFullYear()){
                        return;
                    }
                    scope.data.push(year++);
                }
            }else {
                for (var i = 0; i<addNumber; i++){
                    if(year<1900){
                        return;
                    }
                    scope.data.push(year++);
                }
            }
          };


          setTimeout(function () {
              if(scope.selectTime){
                  var flag = true;
                  while (flag){
                      if(year>scope.selectTime){
                          year = year -20;
                          scope.initYear(1);
                          flag = false;
                      }
                      else {
                          year = year+20;
                      }
                  }
              }else {
                  scope.initYear(1);
              }
          },1000);
          scope.left = function (e) {
              year = year-(scope.data.length + 20);
              if(year<1900){
                  year = year+(scope.data.length + 20);
                  return;
              }
              scope.initYear(0);
              stopBubble(e)
              // scope.show = false;
          };
          scope.right = function (e) {
              if(year>new Date().getFullYear()){
                  return;
              }
              scope.initYear(1);
              stopBubble(e)
              // scope.show = false;
          };
          scope.showYearTemplate = function (e) {
              scope.show = true;
              stopBubble(e)
          };
          scope.selectValue =function (value) {
              scope.show = false;
              scope.index = value;
              // scope.selectTime =new Date(value+'').getTime();
              scope.selectTime =value;
          };
          scope.$watch('selectTime',function (newValue) {
              if(newValue){
                  var flag = true;
                  while (flag){
                      if(year>scope.selectTime){
                          year = year -scope.data.length;
                          scope.initYear(1);
                          flag = false;
                      }
                      else {
                          year = year+20;
                      }
                  }
              }
          });
          $('body').on('click',function (e) {
              scope.show = false;
              scope.$apply()
          });

          //js阻止事件冒泡
          function stopBubble(e) {
              var oEvent = e || event;

              oEvent.cancelBubble = true;
              oEvent.stopPropagation();
          }

      }
    }
});
