/**
 * @license JCF-UI  v0.0.1
 * (c) 2010-2013 Daewoo Information System, Inc.
 * License: MIT
 *
 */
(function(window, angular, undefined) {
'use strict';

var directive = {};
var service = { value: {} };

//
// 전역 오염 문제 및 메모리 릭
// root scpoe 증가 문제 ..
// 동적 로딩시 문제..

// root는 하나만 남기고 나머지는 child로 부탁 해서 메모리 관리

// complie 이후 
// ? string: ? >> renderUnknownOption  

/*
http://angular-ui.github.com/bootstrap/#/modal
http://angular-ui.github.com/
http://angular-ui.github.com/lib/maskedinput/jquery.maskedinput.js
http://mgcrea.github.com/angular-strap/
https://github.com/jquery/jquery-migrate

http://twitter.github.com/bootstrap/customize.html#components
*/


directive.jcfView = ['$http', '$templateCache', '$anchorScroll', '$compile', '$browser', '$rootScope', '$location', '$controller', 
 function($http,   $templateCache,   $anchorScroll,   $compile,  $browser, $rootScope, $location, $controller) {
  return {
    restrict: 'EA',
    terminal: true,
    compile: function(element, attr) {
      var srcExp = attr.jcfView || attr.src,
          onloadExp = attr.onload || '',
          autoScrollExp = attr.autoscroll;

      return function(scope, element) {
        var changeCounter = 0,
            childScope;

        var clearContent = function() {
          if (childScope) {
            angular.jcf$scope = {}; // 스코프 초기화
            childScope.$destroy();
            childScope = null;
          }

          element.html('');
        };

        scope.$watch(srcExp, function jcfViewWatchAction(src) {
          var thisChangeId = ++changeCounter;

          if (src) {
            $http.get(src, {cache: $templateCache}).success(function(response) {
              if (thisChangeId !== changeCounter) return;

              angular.jcf$scope = {}; // 스코프 초기화

              if (childScope) childScope.$destroy();
              childScope = scope.$new();

              element.html(response);

              //testView(element, attr, $templateCache, $browser, docsRootScope, $location);
              //
              //var $scope = locals.$scope = self.$scope = $rootScope.$new();
              var locals = {};
              locals.$scope = childScope;
               var scopes = angular.jcf$scope;

               // if(!scopes){
               //    scopes = angular.jcf$scope = {};
               // }

               if(!scopes.scope){
                scopes.scope = angular.noop;
              }

              jcfNew.controller("scope", scopes["scope"]);

              for(var arg in scopes){
                var queue = angular.module("jcf.dv")._invokeQueue;
                for(var i=0;i<queue.length;i++) {
                  var call = queue[i];
                  if(call[0] == "$controllerProvider" && call[1] == "register") { // && call[2][0] == "scope"
                    controllerProvider.register(arg, scopes[arg]);//call[2][1]);
                  }
                }
              };

              var ctrl = $controller("scope", locals);
              element.contents().data('ngControllerController', ctrl);

              $compile(element.contents())(childScope);
// console.log("jcf.dv compile end !!!");
            // testView(element, attr, $templateCache, $browser, docsRootScope, $location);

              if (angular.isDefined(autoScrollExp) && (!autoScrollExp || scope.$eval(autoScrollExp))) {
                $anchorScroll();
              }

              // console.log("jcf.dv emit  !!!");
              childScope.$emit('$jcf$includeContentLoaded');
              scope.$eval(onloadExp);
              // console.log("jcf.dv onloadExp  !!!");

              
            }).error(function() {
              if (thisChangeId === changeCounter) clearContent();
            });
          } else clearContent();
        });
      };
    }
  };
}];




var controllerProvider = null;
var jcfNew = angular.module('jcf.dv', [], function($controllerProvider) {
    controllerProvider = $controllerProvider;
}).directive(directive).factory(service);

// var baseController = ['$scope', 'dialogParam', 'model', 'model2', function($scope, dialogParam, model, model2){
//   $scope.title = model.title;
//   $scope.message = model.message;
//   $scope.buttons = model.buttons;
//   $scope.test = model2.test;
//   $scope.close = function(res){
//     dialogParam.close(res);
//   };
// }];

// jcfNew.controller("baseController", baseController);

})(window, window.angular);

