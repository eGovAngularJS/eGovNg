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

        // 기본 처리
        var _slice = Array.prototype.slice; 
        // IE 호환성 처리
        // indexOf
        if( angular.isUndefined(Array.prototype.indexOf) ) {
                Array.prototype.indexOf = function(object) { 
                        for (var i = 0, length = this.length; i < length; i++) 
                                if (this[i] == object) return i; 
                        return -1; 
                };
        }
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
}])
/**
 * Copyright (C) 2012 by Matias Niemela
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
.run(function($rootScope) {
    //https://github.com/yearofmoo/AngularJS-Scope.SafeApply
  $rootScope.$safeApply = function() {
    var $scope, fn, force = false;
    if(arguments.length == 1) {
      var arg = arguments[0];
      if(typeof arg == 'function') {
        fn = arg;
      }
      else {
        $scope = arg;
      }
    }
    else {
      $scope = arguments[0];
      fn = arguments[1];
      if(arguments.length == 3) {
        force = !!arguments[2];
      }
    }
    $scope = $scope || this;
    fn = fn || function() { };
    if(force || !$scope.$$phase) {
      //$scope.$apply ? $scope.$apply(fn) : $scope.apply(fn);
      if($scope.$apply){
        $scope.$apply(fn);
      }else{
        $scope.apply(fn);
      }
    }
    else {
      fn();
    }
  };

});