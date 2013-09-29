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


directive.jcfView = ['$http', '$templateCache', '$anchorScroll', '$compile', '$browser', '$rootScope', '$location',
 function($http,   $templateCache,   $anchorScroll,   $compile,  $browser, docsRootScope, $location) {
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

              if (childScope) childScope.$destroy();
              childScope = scope.$new();

              
              element.html(response);
              //setHtmlIe8SafeWay(element, response);
console.log("jcf.dv compile  !!!");

              //

              //testView(element, attr, $templateCache, $browser, docsRootScope, $location);

              $compile(element.contents())(childScope);
console.log("jcf.dv compile end !!!");
              // 
            // testView(element, attr, $templateCache, $browser, docsRootScope, $location);

              if (angular.isDefined(autoScrollExp) && (!autoScrollExp || scope.$eval(autoScrollExp))) {
                $anchorScroll();
              }

              console.log("jcf.dv emit  !!!");
              childScope.$emit('$includeContentLoaded2');
              scope.$eval(onloadExp);
              console.log("jcf.dv onloadExp  !!!");

              
            }).error(function() {
              if (thisChangeId === changeCounter) clearContent();
            });
          } else clearContent();
        });
      };
    }
  };
}];


function testView(element, attrs, $templateCache, $browser, docsRootScope, $location){
  var modules = [];
    modules.push(['$provide', function($provide) {
      $provide.value('$templateCache', $templateCache);
      $provide.value('$anchorScroll', angular.noop);
      $provide.value('$browser', $browser);
      $provide.provider('$location', function() {
        this.$get = ['$rootScope', function($rootScope) {
          docsRootScope.$on('$locationChangeSuccess', function(event, oldUrl, newUrl) {
            $rootScope.$broadcast('$locationChangeSuccess', oldUrl, newUrl);
          });
          return $location;
        }];
        this.html5Mode = angular.noop;
      });

      $provide.decorator('$rootScope', ['$delegate', function(embedRootScope) {
        docsRootScope.$watch(function embedRootScopeDigestWatch() {
          embedRootScope.$digest();
        });
        return embedRootScope;
      }]);
    }]);
    if (attrs.ngEmbedApp)  modules.push(attrs.ngEmbedApp);

    element.bind('click', function(event) {
      if (event.target.attributes.getNamedItem('ng-click')) {
        event.preventDefault();
      }
    });
    angular.bootstrap(element, modules);
}


/**
 * http://stackoverflow.com/questions/451486/pre-tag-loses-line-breaks-when-setting-innerhtml-in-ie
 * http://stackoverflow.com/questions/195363/inserting-a-newline-into-a-pre-tag-ie-javascript
 */
function setHtmlIe8SafeWay(element, html) {
  var newElement = angular.element('<pre>' + html + '</pre>');

  element.html('');
  element.append(newElement.contents());
  return element;
}


directive.ngEmbedApp = ['$templateCache', '$browser', '$rootScope', '$location',
  function($templateCache, $browser, docsRootScope, $location) {
  return {
    terminal: true,
    link: function(scope, element, attrs) {
      var modules = [];
      modules.push(['$provide', function($provide) {
        $provide.value('$templateCache', $templateCache);
        $provide.value('$anchorScroll', angular.noop);
        $provide.value('$browser', $browser);
        $provide.provider('$location', function() {
          this.$get = ['$rootScope', function($rootScope) {
            docsRootScope.$on('$locationChangeSuccess', function(event, oldUrl, newUrl) {
              $rootScope.$broadcast('$locationChangeSuccess', oldUrl, newUrl);
            });
            return $location;
          }];
          this.html5Mode = angular.noop;
        });

        $provide.decorator('$rootScope', ['$delegate', function(embedRootScope) {
          docsRootScope.$watch(function embedRootScopeDigestWatch() {
            embedRootScope.$digest();
          });
          return embedRootScope;
        }]);
      }]);
      if (attrs.ngEmbedApp)  modules.push(attrs.ngEmbedApp);

      element.bind('click', function(event) {
        if (event.target.attributes.getNamedItem('ng-click')) {
          event.preventDefault();
        }
      });
      angular.bootstrap(element, modules);
    }
  };
}];


directive.ngSetHtml = ['getEmbeddedTemplate', function(getEmbeddedTemplate) {
  return {
    restrict: 'CA',
    priority: 10,
    compile: function(element, attr) {
      setHtmlIe8SafeWay(element, getEmbeddedTemplate(attr.ngSetHtml));
    }
  }
}];

directive.ngEvalJavascript = ['$compile', 'getEmbeddedTemplate', function($compile, getEmbeddedTemplate) {
  return {
    compile: function (element, attr) {
      var script = getEmbeddedTemplate(attr.ngEvalJavascript);

      try {
        if (window.execScript) { // IE
          window.execScript(script || '""'); // IE complains when evaling empty string
        } else {
          window.eval(script);
        }
      } catch (e) {
        if (window.console) {
          window.console.log(script, '\n', e);
        } else {
          window.alert(e);
        }
      }
    }
  };
}];


// 코드 들여쓰기 역 처리
service.reindentCode = function() {
  return function (text, spaces) {
    if (!text) return text;
    var lines = text.split(/\r?\n/);
    var prefix = '      '.substr(0, spaces || 0);
    var i;

    // remove any leading blank lines
    while (lines.length && lines[0].match(/^\s*$/)) lines.shift();
    // remove any trailing blank lines
    while (lines.length && lines[lines.length - 1].match(/^\s*$/)) lines.pop();
    var minIndent = 999;
    for (i = 0; i < lines.length; i++) {
      var line = lines[0];
      var reindentCode = line.match(/^\s*/)[0];
      if (reindentCode !== line && reindentCode.length < minIndent) {
        minIndent = reindentCode.length;
      }
    }

    for (i = 0; i < lines.length; i++) {
      lines[i] = prefix + lines[i].substring(minIndent);
    }
    lines.push('');
    return lines.join('\n');
  }
};


service.getEmbeddedTemplate = ['reindentCode', function(reindentCode) {
  return function (id) {
    var element = document.getElementById(id);

    if (!element) {
      return null;
    }

    return angular.element(element).html();
    //return reindentCode(angular.element(element).html(), 0);
  }
}];


angular.module('jcf.dv', []).directive(directive).factory(service);


})(window, window.angular);

