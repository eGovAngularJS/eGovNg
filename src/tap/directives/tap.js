/**
* egov.ui.tab Module
*
* Description
*/
angular.module('egov.ui.tab', ['egov.ui.service'])

.controller('TabsetController', ['$scope', function TabsetCtrl($scope) {
  var ctrl = this,
      tabs = ctrl.tabs = $scope.tabs = [];

  ctrl.select = function(tab) {
    angular.forEach(tabs, function(tab) {
      tab.active = false;
    });
    tab.active = true;
  };

  ctrl.addTab = function addTab(tab) {
    tabs.push(tab);
    if (tabs.length === 1 || tab.active) {
      ctrl.select(tab);
    }
  };

  ctrl.removeTab = function removeTab(tab) {
    var index = tabs.indexOf(tab);
    //Select a new tab if the tab to be removed is selected
    if (tab.active && tabs.length > 1) {
      //If this is the last tab, select the previous tab. else, the next tab.
      var newActiveIndex = index == tabs.length - 1 ? index - 1 : index + 1;
      ctrl.select(tabs[newActiveIndex]);
    }
    tabs.splice(index, 1);
  };
}])

.directive('egovTab', function() {
  return {
    restrict: 'EA',
    transclude: true,
    replace: true,
    require: '^egovTab',
    scope: {},
    controller: 'TabsetController',
    template: '<div class="tabbable" ng-class="{\'tabs-right\': direction == \'right\', \'tabs-left\': direction == \'left\', \'tabs-below\': direction == \'below\'}"> \
        <div tabset-titles="tabsAbove"></div> \
        <div class="tab-content"> \
          <div class="tab-pane" \
               ng-repeat="tab in tabs" \
               ng-class="{active: tab.active}" \
               tab-content-transclude="tab"> \
          </div> \
        </div> \
        <div tabset-titles="!tabsAbove"></div> \
      </div>',
    // templateUrl: 'template/tabs/tabset.html',
    compile: function(elm, attrs, transclude) {
      return function(scope, element, attrs, tabCtrl) {
        scope.vertical = angular.isDefined(attrs.vertical) ? scope.$parent.$eval(attrs.vertical) : false;
        scope.type = angular.isDefined(attrs.type) ? scope.$parent.$eval(attrs.type) : 'tabs';
        scope.direction = angular.isDefined(attrs.direction) ? scope.$parent.$eval(attrs.direction) : 'top';
        scope.tabsAbove = (scope.direction != 'below');
        tabCtrl.$scope = scope;
        tabCtrl.$transcludeFn = transclude;
      };
    }
  };
})

.directive('egovPanel', ['$parse','$timeout', function($parse,$timeout) {
  return {
    require: '^egovTab',
    restrict: 'EA',
    replace: true,
    template: '<li ng-class="{active: active, disabled: disabled}"> \
        <a ng-click="select()" tab-heading-transclude>{{heading}}</a> \
      </li>',
    // templateUrl: 'template/tabs/tab.html',
    transclude: true,
    scope: {
      heading: '@',
      panelActive : '&',
      onSelect: '&select', //contentHeadingTransclude에서 호출 된다.
      onDeselect: '&deselect'
    },
    controller: function() {
      //빈 컨트롤러, tab안의 다른 지시자가 tab을 require할 수 있다.
    },
    compile: function(elm, attrs, transclude) {
      return function postLink(scope, elm, attrs, tabsetCtrl) {
        var getActive, setActive;
        if (attrs.active) {
          getActive = $parse(attrs.active);
          setActive = getActive.assign;
          scope.$parent.$watch(getActive, function updateActive(value, oldVal) {
            // Avoid re-initializing scope.active as it is already initialized
            // below. (watcher is called async during init with value ===
            // oldVal)
            if (value !== oldVal) {
              scope.active = !!value;
            }
          });
          scope.active = getActive(scope.$parent);
        } else {
          setActive = getActive = angular.noop;
        }

        scope.$watch('active', function(active) {
          // Note this watcher also initializes and assigns scope.active to the
          // attrs.active expression.
          setActive(scope.$parent, active);
          if (active) {
            tabsetCtrl.select(scope);
            scope.onSelect();
          } else {
            scope.onDeselect();
          }
        });

        scope.disabled = false;
        if ( attrs.disabled ) {
          scope.$parent.$watch($parse(attrs.disabled), function(value) {
            scope.disabled = !! value;
          });
        }

        scope.select = function() {
          if ( ! scope.disabled ) {
            scope.active = true;
            // resize 등을 위한 처리 추가
            $timeout(function(){
				if(attrs.panelActive){
					scope.panelActive();
				}
            }, 5);
          }
        };

        tabsetCtrl.addTab(scope);
        scope.$on('$destroy', function() {
          tabsetCtrl.removeTab(scope);
        });

        //We need to transclude later, once the content container is ready.
        //when this link happens, we're inside a tab heading.
        scope.$transcludeFn = transclude;
      };
    }
  };
}])

.directive('tabHeadingTransclude', [function() {
  return {
    restrict: 'A',
    require: '^egovPanel',
    link: function(scope, elm, attrs, tabCtrl) {
      scope.$watch('headingElement', function updateHeadingElement(heading) {
        if (heading) {
          elm.html('');
          elm.append(heading);
        }
      });
    }
  };
}])

.directive('tabContentTransclude', function() {
  return {
    restrict: 'A',
    require: '^egovTab',
    link: function(scope, elm, attrs) {
      var tab = scope.$eval(attrs.tabContentTransclude);

      //Now our tab is ready to be transcluded: both the tab heading area
      //and the tab content area are loaded.  Transclude 'em both.
      tab.$transcludeFn(tab.$parent, function(contents) {
        angular.forEach(contents, function(node) {
          if (isTabHeading(node)) {
            //Let tabHeadingTransclude know.
            tab.headingElement = node;
          } else {
            elm.append(node);
          }
        });
      });
    }
  };
  function isTabHeading(node) {
    return node.tagName &&  (
      node.hasAttribute('egov-tab-heading') ||
      node.hasAttribute('data-egov-tab-heading') ||
      node.tagName.toLowerCase() === 'egov-tab-heading' ||
      node.tagName.toLowerCase() === 'data-egov-tab-heading'
    );
  }
})

.directive('tabsetTitles', function($timeout) {
  return {
    restrict: 'A',
    require: '^egovTab',
    template: '<ul class="nav {{type && \'nav-\' + type}}" \
     ng-class="{\'nav-stacked\': vertical}"></ul>',
    replace: true,
    link: function(scope, elm, attrs, tabCtrl) {
      $timeout(function() {
        if (!scope.$eval(attrs.tabsetTitles)) {
          elm.remove();
        } else {
          tabCtrl.$transcludeFn(tabCtrl.$scope.$parent, function(node) {
            elm.append(node);
          });
        }
      });
    }
  };
});