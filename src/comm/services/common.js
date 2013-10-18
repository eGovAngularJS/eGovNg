angular.module('egov.ui.common', [])

.factory('egovConfig', function () {
	// application 에서 사용될 기본 설정 
	// 확장 될 수 있다.
    var _config = {
locale : "ko",           // 다국어 설정
pageContext : "#content" // spa를 위한 cnotent 영역 설정
    };

	return {
		get : _config,
		extend : function (config){
			angular.extend(_config, config);
		}
	};
})
.service('egovCommon', ['egovConfig', function (egovConfig) {
	// application 에서 사용될 기본 서비스
	function getUUID() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
	return v.toString(16);
}); 
    }
    
	function round(val, precision){
		var v = Math.pow(10, precision);
		return Math.round(val * v) / v;
	}

    return {
        getUUID : getUUID,
        round	: round
    };
}]);