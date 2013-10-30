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
	data-egov-select-list="selectList" 
	data-egov-select-name="name" 
	data-egov-select-value="value" 
	data-ng-model="selectValue"
	>
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
		scope.$watch("["+attrs.egovSelectList+","+attrs.ngModel+","+attrs.egovSelectValue+","+attrs.egovSelectName+"]" , action, true);

		function action(newObj, oldObj){
			var list = newObj[0] || [];
			var val = newObj[1] || "";
			var v = attrs.egovSelectValue || "value";
			var n = attrs.egovSelectName || "name";
			
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
    }]); // end of egovSelectList

/*
<div
	data-egov-checkbox-list="checklist" 
	data-egov-checkbox-name="name" 
	data-egov-checkbox-value="value" 
	data-egov-checkbox-direction="h"  
	data-egov-checkbox-selectall=""
	data-egov-checkbox-disabled="false" 
	data-ng-model="checkmodel">
</div> 
*/
eGovInput
    .directive('egovCheckboxList', ['$compile', '$rootScope', 'egovCommon', function($compile, $rootScope, egovCommon){
        return {
            restrict: 'A',
            link: function(scope, element, attrs, ctrl){
		var _defaultValue = [];
							
		if( angular.isUndefined( attrs.checkboxSelectall ) ){
			_defaultValue = [];
		}else{
			_defaultValue = [ attrs.checkboxSelectall ];
		}
		
		
		// 초기값이 선언 되지 않았다면 초기값을 적용한다.
		if( angular.isUndefined( scope[attrs.ngModel] ) ) {
			scope[attrs.ngModel] = _defaultValue;
		}
		
		//checkboxList 는 무조건 array 형
		if( !angular.isArray( scope[attrs.ngModel] ) ) {
			if( angular.isDefined( scope[attrs.ngModel] ) ) {
				scope[attrs.ngModel] = [scope[attrs.ngModel]];
			} else{
				scope[attrs.ngModel] = _defaultValue;
			}
		}
		
		// 속성 변경 감지 +","+attrs.checkboxValue+","+attrs.checkboxName+","+attrs.checkboxDirection
		scope.$watch("["+attrs.egovCheckboxList+","+attrs.ngModel+","+attrs.egovCheckboxDisabled+"]" , action, true);

		function action(newObj, oldObj){
			var list = newObj[0] || [];
			var val = newObj[1] || [];
			var v = attrs.egovCheckboxValue || "value";
			var n = attrs.egovCheckboxName || "name";
			var d = attrs.egovCheckboxDirection || "h";
			var selectall = attrs.egovCheckboxSelectall;
			var disabled = newObj[2] ? "disabled" : "";
			var len = list.length;
			
			//변수 선언
			var _template = "";
			var _id;
			var _obj;
			var _direction;
			var i;

			var agent = navigator.userAgent.toLowerCase();
            var browser = "webkit";
             if( agent.indexOf('msie') != -1 ) {
                browser = "ie";
            }
			
			if(d == "v"){
				_direction = " style=\"display:block;\"";
				element.css({display: 'block'});
			}else{
				if(browser == 'ie'){
					_direction = " style=\"display:inline;\"";
					element.css({display: 'inline'});
				}else{
					_direction = " style=\"display:-webkit-box;\"";
					element.css({display: '-webkit-box'});
				}
			}
			
			if( val.indexOf(selectall) != -1 ) {
				// 전체선택이 존재하면 전체선택만 체크
				for (i=0; i < len; i++) {
					_id = egovCommon.getUUID();
					_obj = list[i];
					_template += "<div"+_direction+">";
					_template += "<input type=\"checkbox\" class=\"checkbox\" " + "value=\"" + _obj[v] + "\" " + (_obj[v] == selectall ? "checked" : "") + " id=\"" + _id + "\"  "+ disabled +"/> <label for=\"" + _id + "\">" + _obj[n] + "</label>　";
					_template += "</div>";
				}
			}else{
				for (i=0; i < len; i++) {
					_id = egovCommon.getUUID();
					_obj = list[i];
					_template += "<div"+_direction+">";
					_template += "<input type=\"checkbox\" class=\"checkbox\" " + "value=\"" + _obj[v] + "\" " + (val.indexOf(_obj[v]) != -1 ? "checked" : "") + " id=\"" + _id + "\"  "+ disabled +"/> <label for=\"" + _id + "\">" + _obj[n] + "</label>　";
					_template += "</div>";
				}
			}
			
			//HTML 요소를 반영한다.
			element.html( $compile(_template)(scope) );
		}
		
		//체크박스의 값이 바뀌면,   >> 단위화면에서 사용하지 않을 경우 제거해 줘야 함. 즉 destory 구현 할 것.
		element.bind('change', changeVal);
		element.bind('$destroy', destory);
		
		function changeVal(e) {
			
			var targetValue = e.target.value;
			
			var val = scope[attrs.ngModel];
			var selectall =attrs.egovCheckboxSelectall; 
			
			if( e.target.checked ) {
				//전체선택을 체크한거라면,
				if( targetValue == selectall ) {
					//전체선택만 값 설정
					scope[attrs.ngModel] = [selectall];
				} else {
					if( val.indexOf(selectall) != -1 ){
						//전체값 제거
						val.splice(val.indexOf(selectall), 1);
					}
					val.push(e.target.value);
				}
			} else {
				//전체선택을 체크 해제한거라면,
				if( targetValue == selectall ) {
					//전체선택만 값 설정
					scope[attrs.ngModel] = [];
				} else {
					var len = val.length;
					for (var i=0; i<len; i++) {
						if(val[i] == targetValue) {
							val.splice(i, 1);
							break;
						}
					}
				}
			}
			$rootScope.$safeApply();
		}
		
		// 메모리 해지
		function destory() {
			element.unbind('change', changeVal);
			element.unbind('$destroy', destory);
		}
            }
        };
    }]); // end of egovCheckboxList

/*
<div 
	data-egov-radio-list="radiolist" 
	data-egov-radio-name="name" 
	data-egov-radio-value="value" 
	data-egov-radio-direction="default"  
	data-ng-model="radiomodel">
</div>
*/
eGovInput
    .directive('egovRadioList', ['$compile', '$parse', 'egovCommon', function($compile, $parse, egovCommon){
        return {
	restrict: 'A', //Attribute(속성)
	link: function (scope, element, attrs) {
			
		var fn;
		if(angular.isDefined(attrs['ngChange'])){
			fn = $parse(attrs['ngChange']);
		}
		
		
		var _defaultValue = "";
		
		// 초기값이 선언 되지 않았다면 초기값을 적용한다.
		if(angular.isUndefined( scope[attrs.ngModel] )) {
			scope[attrs.ngModel] = _defaultValue;
		}
		
		// 속성 변경 감지  +","+attrs.radioValue+","+attrs.radioName+","+attrs.radioDirection
		scope.$watch("["+attrs.egovRadioList+","+attrs.ngModel+","+attrs.egovRadioDisabled+"]" , action, true);

		function action(newObj, oldObj){
			var list = newObj[0] || [];
			//var val = newObj[1] || "";
			var v = attrs.egovRadioValue || "value";
			var n = attrs.egovRadioName || "name";
			var d = attrs.egovRadioDirection || "h";
			var disabled = newObj[2] ? "disabled" : "";
			var len = list.length;
			
			//변수 선언
			var _template = "";
			var _id;
			var _obj;
			var _direction;
			
			var agent = navigator.userAgent.toLowerCase();
            var browser = "webkit";
             if( agent.indexOf('msie') != -1 ) {
                browser = "ie";
            }
			
			if(d == "v"){
				_direction = " style=\"display:block;\"";
				element.css({display: 'block'});
			}else{
				if(browser == 'ie'){
					_direction = " style=\"display:inline;\"";
					element.css({display: 'inline'});
				}else{
					_direction = " style=\"display:-webkit-box;\"";
					element.css({display: '-webkit-box'});
				}
			}
			
			for (var i=0; i < len; i++) {
				_id = egovCommon.getUUID();
				_obj = list[i];
				_template += "<div"+_direction+">";
				_template += "<input type=\"radio\" class=\"radio\" data-ng-model=\"" + attrs.ngModel + "\" value=\"" + _obj[v] + "\" id=\"" + _id + "\"  "+ disabled +" /> <label for=\"" + _id + "\">" + _obj[n] + "</label>　";
				_template += "</div>";
			}
			
			//HTML 요소를 반영한다.
			element.html( $compile(_template)(scope) );
			
			if(fn){// scope[attrs.ngModel]
				// custom event 생성, 필요시 항목 추가
				var _e = {};
				_e.currentTarget = _e.target = element.context;
				_e.value = scope[attrs.ngModel];
				fn(scope, {$event:_e});
			}
		}
		
	}
};
    }]); // end of egovRadioList

} else{
    // angualr가 없는 경우     
    console.log('Angular not detected.');
}

}()); // end