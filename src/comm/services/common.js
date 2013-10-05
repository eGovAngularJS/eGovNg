angular.module('egov.ui.common', [])
  // application 에서 사용될 기본 설정 
  // 확장 될 수 있다.
  .factory('egovConfig', function () {
    var _config = {
      locale : "ko",          // 다국어 설정
      pageContext : "#content"// spa를 위한 cnotent 영역 설정
    };

    return {
      get : _config,
      extend : function (config){
        angular.extend(_config, config);
      }
    };
  })
  // application 에서 사용될 기본 서비스
	.service('egovCommon', ['egovConfig', function (egovConfig) {

    function getUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                        return v.toString(16);
                    }); 
    }


    return {
        getUUID : getUUID
    };
	}]);