/**
* egog.ui.chart Module
*
* Description
* 
*/

(function() {
'use strict';

if((typeof(angular) === 'object') && (typeof(angular.version) === 'object')){
// egov-ui-chart
var eGovInput = angular.module('egov.ui.input', ['egov.ui.common']);
/*
<select
	data-select-list="selectList" 
	data-select-name="name" 
	data-select-value="value" 
	data-ng-model="selectValue"
	data-select-change="changed()">
</select> 
*/
eGovInput
    .directive('egovSelectList', [function(){
        return {
            restrict: 'A',
            require: ['select', '?ngModel'],
            transclude: true,
            scope: false,//{ ngModel:'&', selectValue:'&', selectName:'&', egovSelectList: '&' },
            link: function(scope, element, attrs, ctrl){
				if(ctrl && ctrl[0]){
					ctrl[0].renderUnknownOption = angular.noop;
				}
				
				var _defaultValue = "";
				
				// 초기값이 선언 되지 않았다면 초기값을 적용한다.
				if(angular.isUndefined( scope[attrs.ngModel] )) {
					scope[attrs.ngModel] = _defaultValue;
				}
				
				// 속성 변경 감지
				scope.$watch("["+attrs.egovSelectList+","+attrs.ngModel+","+attrs.selectValue+","+attrs.selectName+"]" , action, true);

				function action(newObj, oldObj){
					var list = newObj[0] || [];
					var val = newObj[1] || "";
					var v = attrs.selectValue || "value";
					var n = attrs.selectName || "name";
					
					var s = "";
					var i = 0;
					var len = list.length;
					var o;
					var isVal = false;
					
					// value 체크
					for(i = 0; i < len; i++) {
						o = list[i];
						if(o[v] === null){
							o[v] = "";
						}
						if(val === o[v]){
							isVal = true;
							break;
						}
					}
					// ngModel 값이 없는 경우 첫번째 값을 선택
					if(!isVal){
						if(len > 0){
							scope[attrs.ngModel] = list[0][v];
						}
					}
					
					// html 생성
					for(i = 0; i < len; i++) {
						o = list[i];
						if(val == o[v]){
							s += '<option value="'+o[v]+'" selected="selected">'+o[n]+'</option>';
						}else{
							s += '<option value="'+o[v]+'" >'+o[n]+'</option>';
						}
					}
					
					element.html(s);
				}
				
				element.bind('change', changeVal);
				element.bind('$destroy', destory);
				
				function changeVal(){
					scope.$apply(function() {
						scope[attrs.ngModel] = element.val();
					});
				}
				
				// 메모리 해지
				function destory() {
					element.unbind('change', changeVal);
					element.unbind('$destroy', destory);
				}
            }
        };
    }]);
    
} else{
    // angualr가 없는 경우     
    console.log('Angular not detected.');
}

}()); // end