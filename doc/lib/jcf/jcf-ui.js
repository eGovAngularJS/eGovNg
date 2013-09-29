/**
 * @license JCF-UI  v0.0.1
 * (c) 2010-2013 Daewoo Information System, Inc.
 * License: MIT
 *
 * 2013-01-25
 */
(function(window, document, undefined) {
'use strict';

// angular 체크 - 필수사항
if(!angular) {
	throw Error('angularJS 는 필수입니다.'); 
}

// naming rule
// _ 	: private var - 지역
// _v_ 	: private var
// _s_ 	: private service
// _f_ 	: private function 
// s_ 	: public service
// f_	: public function


// angular global APIs 
var 
  bind				= angular.bind
, bootstrap			= angular.bootstrap
, copy				= angular.copy
, isElement		= angular.element
, equals			= angular.equals
, extend			= angular.extend
, forEach			= angular.forEach
, fromJson		= angular.fromJson
, identity			= angular.identity
, injector			= angular.injector
, isArray			= angular.isArray
, isDate			= angular.isDate
, isDefined 		= angular.isDefined
, isElement		= angular.isElement
, isFunction		= angular.isFunction
, isNumber		= angular.isNumber
, isObject			= angular.isObject
, isString			= angular.isString
, isUndefined		= angular.isUndefined
, lowercase		= angular.lowercase
, mock				= angular.mock
, module			= angular.module
, noop				= angular.noop
, toJson			= angular.toJson
, uppercase		= angular.uppercase
;

/**
 * 해당 key 보유 확인 (Object.hasOwnProperty 사용 하지 않고 쓰는 이유 : FF 대응)
 * @param obj : Object - 보유 하고 있는 Object(obj 값이 Object 가 아닌 경우 false)
 * @param key : String - 보유 확인 명칭(key)
 * @returns boolean - 보유 여부
 */
function hasOwnProperty(obj, key) {
	var v = false;
	if(obj && typeof(obj) === "object" && typeof(obj[key]) !== 'undefined'){
		v = true;
	}
	return v;
}





var s_globalConfig = function(){
	var config = {};
	config.version = {
		full: '0.0.1',  // all of these placeholder strings will be replaced by rake's
		major: 0,     // compile task
		minor: 0,
		dot: 1,
		codeName: 'jcf-ui'
	};

    	return config;
}();


angular.module( 'jcf.config', [] ).value( 'jcf.config', {} )
.factory('jcfVersion', function jcfVersion(){
	var version = {
		full: '0.0.1',  // all of these placeholder strings will be replaced by rake's
		major: 0,     // compile task
		minor: 0,
		dot: 1,
		codeName: 'jcf-ui'
	};
	return version;
});

angular.module( 'jcf.filters', ['jcf.config'] );
angular.module( 'jcf.directives', ['jcf.config'] );

angular.module( 'jcf', ['jcf.filters', 'jcf.directives', 'jcf.config', 'jcf.model'] );

//s_utils.getHierarchyData({list : data})
var s_utils = function() {

  function getHierarchyData(info) {
    if(!info || !isArray(info.list)){
      return {};
    }

    var idName = info.id ? info.id : "id"
      , pidName = info.pid ? info.pid : "pid"
      , rootValue = info.root ? info.root : "root"
      , children = info.children ? info.v : "children"
      , hasChildren = info.hasChildren ? info.hasChildren : "hasChildren"
      , list = info.list;
    ;
    var treeList = []
       , pidMap = {}
       , obj
       , ci = 0
       , i
       , id
       , pid
       , length;

        length = list.length;
        for(i = 0; i < length; i++){
          obj = list[i];
          id = obj[idName];
          pid = obj[pidName];
          obj[hasChildren] = false;

          if(pid && !hasOwnProperty(pidMap, pid)) {
            pidMap[pid] = [];
            ci++;
          }
          if(pid) {
            pidMap[pid].push(obj);
          }
        }

        for(i = 0; i < length; i++) {
          obj = list[i];
          id = obj[idName];
          pid = obj[pidName];

          if(hasOwnProperty(pidMap, id)) {
            obj[children] = pidMap[id];
            obj[hasChildren] = true;
            pidMap[id] = null;
            delete pidMap[id];
            ci--;
            if(ci==0)
              break;
          }
        }

        if(hasOwnProperty(pidMap, rootValue)) {
          var rootAry = pidMap[rootValue];
          var rootLen = rootAry.length;
          for(var ri = 0; ri < rootLen; ri++) {
            treeList.push(rootAry[ri]);
          }
          pidMap[rootValue] = null;
          delete pidMap[rootValue];
        }

        return treeList;
        // var rootObj = {};
        // rootObj[child] = treeList;
        // rootObj[hasChildren] = true;
        // return rootObj;
  }
  return {
    getHierarchyData : getHierarchyData
  }
}();

var test = function() {

  function ex1() {
    // var grid;
    // var columns = [
    //   {id: "title", name: "Title", field: "title"},
    //   {id: "duration", name: "Duration", field: "duration"},
    //   {id: "%", name: "% Complete", field: "percentComplete"},
    //   {id: "start", name: "Start", field: "start"},
    //   {id: "finish", name: "Finish", field: "finish"},
    //   {id: "effort-driven", name: "Effort Driven", field: "effortDriven"}
    // ];

    // var options = {
    //   enableCellNavigation: true,
    //   enableColumnReorder: false
    // };

    //   var data = [];
    //   for (var i = 0; i < 500; i++) {
    //     data[i] = {
    //       title: "Task " + i,
    //       duration: "5 days",
    //       percentComplete: Math.round(Math.random() * 100),
    //       start: "01/01/2009",
    //       finish: "01/05/2009",
    //       effortDriven: (i % 5 == 0)
    //     };
    //   }

    //   grid = new Slick.Grid("#myGrid", data, columns, options);
  }

  return {
    ex1 : ex1
  }
}();


var DS = function(id){
  var _id = id;
  var a = 1;

  this.get = function(){
    return a;
  };
  this.set = function(val){
    a = val;
  };

  this.print = function(){
    console.log(this);
  };

  this.push2 = function(){
    this.push(a);
  };

  this.setData = function(data){
    if(data){
      if(angular.isArray(data)){
        this.view = data;
      }else if(angular.isObject(data)){
        this.view = [data];
      }else{
        this.view = [];
      }
    }else{
      this.view = [];
    }
  };

  var _index = -1;

  this.setIndex = function(idx) {
    _index = idx;
    this.view.current = angular.copy(this.view[_index]);
  };


  this.view = new DS_ROW;
}

var DS_ROW = function(){
  this.current = null;
}
DS_ROW.prototype = [];

//DS.prototype = [];

angular.module('jcf.directives')
  .provider('jcf_ds',function() {
    var ds;// = new DS;

    this.$get = function() {
      return {
        DataSet : function(name, data){
          ds = new DS(name);
          if(data) {
            ds.setData(data);
          }
          return ds;
        }
      }
    };
});

angular.module('jcf.directives')
  .provider('jcf_dsManager', function() {
    var globalOption = {};
    var gv;
    // this.$get = [ '$scope', function($scope) {
    this.$get = function() {

      var newValue;
      var oldValue;
      var preFunc;
      var postFunc;
      var nm;
      var value;
      var isValueChange = false;

      var onWatch = function(scope, name){
        scope.$watch(name, function(newVal, oldVal){
            console.log('watch', newVal, gv);
            gv = newValue = newVal;
            oldValue = oldVal;

            if(!isValueChange) {
              //value = oldValue;
              scope[name]  = oldValue;
              console.log("== old == ", value);
              console.log("== scp == ", scope[name]);
              //runBind();
            }
         },true);
      }

      var watchFunc = function(scope, name, pre, post){
          if(name && typeof name == 'string') {
            nm = name;
            preFunc = pre;
            postFunc = post;
            value = scope[name];
            onWatch(scope, name);
          }
        }

        var runBind = function(){
            isValueChange = true;

            var isPre = true;
            if(preFunc && typeof preFunc == 'function') {
               isPre = preFunc(nm, newValue, oldValue);
            }
            if(isPre){
              // 값 변경
              value = newValue;

              if(post && typeof post == 'function') {
                post(nm, newValue, oldValue);
              }
            }

            isValueChange = false;
        }

      return {
        watch : watchFunc
      }
    };
});


// 함수 값 처리
function valueFn(value) {return function() {return value;};}

function isDefined(value){return typeof value != 'undefined';}

/**************************************************************************************
* NgModelController
***************************************************************************************/

var NON_ASSIGNABLE_MODEL_EXPRESSION = 'Non-assignable model expression: ';

var VALID_CLASS = 'ng-valid',
    INVALID_CLASS = 'ng-invalid',
    PRISTINE_CLASS = 'ng-pristine',
    DIRTY_CLASS = 'ng-dirty';

var nullFormCtrl = {
  $addControl: noop,
  $removeControl: noop,
  $setValidity: noop,
  $setDirty: noop
};

var jqLite = angular.element;
var lowercase = angular.lowercase;
var bootstrap = angular.bootstrap,
    copy = angular.copy,
    extend = angular.extend,
    equals = angular.equals,
    element = angular.jqLite,
    forEach = angular.forEach,
    injector = angular.createInjector,
    noop = angular.noop,
    bind = angular.bind,
    toJson = angular.toJson,
    fromJson = angular.fromJson,
    identity = angular.identity,
    isUndefined = angular.isUndefined,
    isDefined = angular.isDefined,
    isString = angular.isString,
    isFunction = angular.isFunction,
    isObject = angular.isObject,
    isNumber = angular.isNumber,
    isElement = angular.isElement,
    isArray = angular.isArray,
    version = angular.version,
    isDate = angular.isDate,
    lowercase = angular.lowercase,
    uppercase = angular.uppercase,
    callbacks = {counter: 0};


function isEmpty(value) {
  return isUndefined(value) || value === '' || value === null || value !== value;
}

function trim(value) {
  return isString(value) ? value.replace(/^\s*/, '').replace(/\s*$/, '') : value;
}

/**
 * @returns {string} Returns the string representation of the element.
 */
function startingTag(element) {
  element = jqLite(element).clone();
  try {
    // turns out IE does not let you set .html() on elements which
    // are not allowed to have children. So we just ignore it.
    element.html('');
  } catch(e) {}
  return jqLite('<div>').append(element).html().
      match(/^(<[^>]+>)/)[1].
      replace(/^<([\w\-]+)/, function(match, nodeName) { return '<' + lowercase(nodeName); });
}

var JcfModelController = ['$scope', '$exceptionHandler', '$attrs', '$element', '$parse',
    function($scope, $exceptionHandler, $attr, $element, $parse) {
  this.$viewValue = Number.NaN;
  this.$modelValue = Number.NaN;
  this.$parsers = [];
  this.$formatters = [];
  this.$viewChangeListeners = [];
  this.$pristine = true;
  this.$dirty = false;
  this.$valid = true;
  this.$invalid = false;
  this.$name = $attr.name;

  var ngModelGet = $parse($attr.jcfModel),
      ngModelSet = ngModelGet.assign;

  if (!ngModelSet) {
    throw Error(NON_ASSIGNABLE_MODEL_EXPRESSION + $attr.ngModel +
        ' (' + startingTag($element) + ')');
  }

  /**
   * @ngdoc function
   * @name ng.directive:ngModel.NgModelController#$render
   * @methodOf ng.directive:ngModel.NgModelController
   *
   * @description
   * Called when the view needs to be updated. It is expected that the user of the ng-model
   * directive will implement this method.
   */
  this.$render = noop;

  var parentForm = $element.inheritedData('$formController') || nullFormCtrl,
      invalidCount = 0, // used to easily determine if we are valid
      $error = this.$error = {}; // keep invalid keys here


  // Setup initial state of the control
  $element.addClass(PRISTINE_CLASS);
  toggleValidCss(true);

  // convenience method for easy toggling of classes
  function toggleValidCss(isValid, validationErrorKey) {
    validationErrorKey = validationErrorKey ? '-' + snake_case(validationErrorKey, '-') : '';
    $element.
      removeClass((isValid ? INVALID_CLASS : VALID_CLASS) + validationErrorKey).
      addClass((isValid ? VALID_CLASS : INVALID_CLASS) + validationErrorKey);
  }

  /**
   * @ngdoc function
   * @name ng.directive:ngModel.NgModelController#$setValidity
   * @methodOf ng.directive:ngModel.NgModelController
   *
   * @description
   * Change the validity state, and notifies the form when the control changes validity. (i.e. it
   * does not notify form if given validator is already marked as invalid).
   *
   * This method should be called by validators - i.e. the parser or formatter functions.
   *
   * @param {string} validationErrorKey Name of the validator. the `validationErrorKey` will assign
   *        to `$error[validationErrorKey]=isValid` so that it is available for data-binding.
   *        The `validationErrorKey` should be in camelCase and will get converted into dash-case
   *        for class name. Example: `myError` will result in `ng-valid-my-error` and `ng-invalid-my-error`
   *        class and can be bound to as  `{{someForm.someControl.$error.myError}}` .
   * @param {boolean} isValid Whether the current state is valid (true) or invalid (false).
   */
  this.$setValidity = function(validationErrorKey, isValid) {
    if ($error[validationErrorKey] === !isValid) return;

    if (isValid) {
      if ($error[validationErrorKey]) invalidCount--;
      if (!invalidCount) {
        toggleValidCss(true);
        this.$valid = true;
        this.$invalid = false;
      }
    } else {
      toggleValidCss(false);
      this.$invalid = true;
      this.$valid = false;
      invalidCount++;
    }

    $error[validationErrorKey] = !isValid;
    toggleValidCss(isValid, validationErrorKey);

    parentForm.$setValidity(validationErrorKey, isValid, this);
  };


  /**
   * @ngdoc function
   * @name ng.directive:ngModel.NgModelController#$setViewValue
   * @methodOf ng.directive:ngModel.NgModelController
   *
   * @description
   * Read a value from view.
   *
   * This method should be called from within a DOM event handler.
   * For example {@link ng.directive:input input} or
   * {@link ng.directive:select select} directives call it.
   *
   * It internally calls all `formatters` and if resulted value is valid, updates the model and
   * calls all registered change listeners.
   *
   * @param {string} value Value from the view.
   */
  this.$setViewValue = function(value) {
    this.$viewValue = value;

    // change to dirty
    if (this.$pristine) {
      this.$dirty = true;
      this.$pristine = false;
      $element.removeClass(PRISTINE_CLASS).addClass(DIRTY_CLASS);
      parentForm.$setDirty();
    }

    forEach(this.$parsers, function(fn) {
      value = fn(value);
    });

    if (this.$modelValue !== value) {
      this.$modelValue = value;
      ngModelSet($scope, value);
      forEach(this.$viewChangeListeners, function(listener) {
        try {
          listener();
        } catch(e) {
          $exceptionHandler(e);
        }
      })
    }
  };

  // model -> value
  var ctrl = this;

  $scope.$watch(function ngModelWatch() {
    var value = ngModelGet($scope);

    // if scope model value and ngModel value are out of sync
    if (ctrl.$modelValue !== value) {

      var formatters = ctrl.$formatters,
          idx = formatters.length;

      ctrl.$modelValue = value;
      while(idx--) {
        value = formatters[idx](value);
      }

      if (ctrl.$viewValue !== value) {
        ctrl.$viewValue = value;
        ctrl.$render();
      }
    }
  });
}];

function textInputType(scope, element, attr, ctrl, $sniffer, $browser) {

  var listener = function() {
    var value = trim(element.val());

    if (ctrl.$viewValue !== value) {
      scope.$apply(function() {
        ctrl.$setViewValue(value);
      });
    }
  };

  // if the browser does support "input" event, we are fine - except on IE9 which doesn't fire the
  // input event on backspace, delete or cut
  if ($sniffer.hasEvent('input')) {
    element.bind('input', listener);
  } else {
    var timeout;

    element.bind('keydown', function(event) {
      var key = event.keyCode;

      // ignore
      //    command            modifiers                   arrows
      if (key === 91 || (15 < key && key < 19) || (37 <= key && key <= 40)) return;

      if (!timeout) {
        timeout = $browser.defer(function() {
          listener();
          timeout = null;
        });
      }
    });

    // if user paste into input using mouse, we need "change" event to catch it
    element.bind('change', listener);
  }


  ctrl.$render = function() {
    element.val(isEmpty(ctrl.$viewValue) ? '' : ctrl.$viewValue);
  };

  // pattern validator
  var pattern = attr.ngPattern,
      patternValidator;

  var validate = function(regexp, value) {
    if (isEmpty(value) || regexp.test(value)) {
      ctrl.$setValidity('pattern', true);
      return value;
    } else {
      ctrl.$setValidity('pattern', false);
      return undefined;
    }
  };

  if (pattern) {
    if (pattern.match(/^\/(.*)\/$/)) {
      pattern = new RegExp(pattern.substr(1, pattern.length - 2));
      patternValidator = function(value) {
        return validate(pattern, value)
      };
    } else {
      patternValidator = function(value) {
        var patternObj = scope.$eval(pattern);

        if (!patternObj || !patternObj.test) {
          throw new Error('Expected ' + pattern + ' to be a RegExp but was ' + patternObj);
        }
        return validate(patternObj, value);
      };
    }

    ctrl.$formatters.push(patternValidator);
    ctrl.$parsers.push(patternValidator);
  }

  // min length validator
  if (attr.ngMinlength) {
    var minlength = int(attr.ngMinlength);
    var minLengthValidator = function(value) {
      if (!isEmpty(value) && value.length < minlength) {
        ctrl.$setValidity('minlength', false);
        return undefined;
      } else {
        ctrl.$setValidity('minlength', true);
        return value;
      }
    };

    ctrl.$parsers.push(minLengthValidator);
    ctrl.$formatters.push(minLengthValidator);
  }

  // max length validator
  if (attr.ngMaxlength) {
    var maxlength = int(attr.ngMaxlength);
    var maxLengthValidator = function(value) {
      if (!isEmpty(value) && value.length > maxlength) {
        ctrl.$setValidity('maxlength', false);
        return undefined;
      } else {
        ctrl.$setValidity('maxlength', true);
        return value;
      }
    };

    ctrl.$parsers.push(maxLengthValidator);
    ctrl.$formatters.push(maxLengthValidator);
  }
}

var inputType = {
  'text': textInputType
  };


angular.module( 'jcf.model', [] )
.directive( 'jcfModel', [
   function(){
  return {
      require: ['jcfModel', '^?form'],
      controller: JcfModelController,
      link: function(scope, element, attr, ctrls) {
        // notify others, especially parent forms

        var modelCtrl = ctrls[0],
            formCtrl = ctrls[1] || nullFormCtrl;

        formCtrl.$addControl(modelCtrl);

        element.bind('$destroy', function() {
          formCtrl.$removeControl(modelCtrl);
        });
      }
    };
  }]
).directive( 'input', [ '$browser', '$sniffer', 
   function($browser, $sniffer){
  return {
      restrict: 'E',
      require: '?jcfModel',
      link: function(scope, element, attr, ctrl) {
        if (ctrl) {
          (inputType[lowercase(attr.type)] || inputType.text)(scope, element, attr, ctrl, $sniffer,
                                                              $browser);
        }
      }
    };
  }]
);


/**************************************************************************************
* NgModelController
***************************************************************************************/

// function 를 받아 실행 후 결과를 리턴
// 실행하는 함수의 결과가 없는 경우 true 처리
function getFnResult(fn, value){
  var result = true;
  if(isFunction(fn)){
    result = fn(value);
    if(typeof result == 'undefined' || result === null){
      result = true;
    }
  }
  return result;
}
// 함수 실행
function runFn(fn, value){
  if(isFunction(fn)){
    fn(value);
  }
}

// 통신 전역 옵션 
var _senderGlobalOption = {
  pre : null,
  post : null, 
  domain : "localhost:8080",
  subPath : "",
  protocol : "http",
  contentType : "application/json; charset=utf-8"
};

// 통신 전역 옵션 get/set 서비스 
var s_senderGlobalOption = function(){
    var option = angular.copy(_senderGlobalOption);

    return {
      setOption : function(key, value){
        if(key && angular.isString(key)) {
          option[key] = value;
        }
      },

      getGlobalOption : function(){
        return option; 
      },

      init : function(){
        option = angular.copy(_senderGlobalOption);
        return option;
      }
    }
}();

// angular.module('jcf.directives')
// .service('jcf_sender_globalOption', function(){
    
// });

// 통신관리자.
var _s_senderManager = function(){
  var list = [];

  return {
    add : function(){

    }
  }

}();

// 통신 
angular.module('jcf.directives')
  .provider('jcf_sender',function() {

    var headersInfo = {
      'Content-Type' : 'application/json; charset=utf-8'
    };
    // var headersInfo = {'Accept':'application/extJs+sua','Content-Type':'application/extJs+sua'};

    this.setHeading = function(arg) {
      headersInfo = arg;
    };

    this.$get = function($http) {
      function send (option) {
        // 통신 전 체크   
        var isSend = true;
        var globalOption = s_senderGlobalOption.getGlobalOption();
        if(!globalOption) {
          new Error("JCF Error [sender] :: 통신 필수요소인 전역 옵션이 존재하지 않습니다.");
        }

        // 전역 통신 전 체크 
        isSend = getFnResult(globalOption.pre, option);
        
        if(isSend){
          // 사용자 통신 전 체크 
          isSend = getFnResult(option.pre, option);
          // 통신 진행
          if(isSend) {
            $http.post(option.url, option.data, {
              headers: option.headers,
              params: option.param
            }).success(function(data, status, headers, config) {
              // 통신 성공 또는 실패시 전역 post 처리 
              // 전역 post에 의해 사용자 post 진행 처리 결정 
              if(getFnResult(globalOption.post, {data : data, status : status, option : option})){
                runFn(option.post, {data : data, status : status, option : option});
              }
            }).
            error(function(data, status, headers, config) {
              if(getFnResult(globalOption.post, {data : data, status : status, option : option})){
                runFn(option.post, {data : data, status : status, option : option});
              }
            });
          }
        }
      }
      return send;
    };
});

/*
by jaedo
angular.module('jcf.directives')
  .provider('jcf_sender',function() {

    var headersInfo = {
      'Content-Type' : 'application/json; charset=utf-8'
    };
    // var headersInfo = {'Accept':'application/extJs+sua','Content-Type':'application/extJs+sua'};

    this.setHeading = function(arg) {
      headersInfo = arg;
    };

    this.$get = function($http) {
      function transaction (url,receivingObjList,writtingObjList,paramObj) {
        var objToServer = nomalize(writtingObjList);
        
        return $http.post(url,objToServer,{
          headers: headersInfo,
          params: paramObj
        });
      }

      function getChanged (arg, onlyChanged) {
        if(onlyChanged === true){
          return _.filter(arg, function(obj) {
            return _.has(obj,'rowStatus');
          });
        }else{
          return(arg);
        }
      }

      function nomalize (writtingObjList) {
        var objToServer = {};
        if(_.isArray(writtingObjList)){
          _.each(writtingObjList,function(value, index) {
            var keyList = _.keys(value),
                key = _.filter(keyList,function(key) {return key !== 'onlyChanged';});
            objToServer[key] = getChanged(value[key], value['onlyChanged']);
          });
        }else{
          var key = _.filter(_.keys(writtingObjList),function(obj) {
            return obj !== "onlyChanged";
          });
          objToServer[key] = getChanged(writtingObjList[key], writtingObjList['onlyChanged']);
        }
        return objToServer;
      }

      return transaction;
    };
});
*/
angular.module('jcf.directives')
.directive('jcfUiModal', ['$timeout','$http','jcf.config','$compile', function($timeout, $http, uiConfig, $compile){

	(function ($) {

// jshint ;_;

		 /* MODAL CLASS DEFINITION
		  * ====================== */
		  var Modal = function (element, options) {
		    this.options = options;
	    	this.$element = $(element).delegate('[data-dismiss="modal"]', 'click.dismiss.modal', $.proxy(this.hide, this));
		    //this.options.draggable && this.$element.find('.jcf-modal-header').draggable();

		  };

		  Modal.prototype = {
	      constructor: Modal,
				toggle: function () {
	        return this[!this.isShown ? 'show' : 'hide']();
	      },
	      show: function () {
	        var that = this,
	        		e = $.Event('show');
	        this.$element.trigger(e)
	        if (this.isShown || e.isDefaultPrevented()) return
	
	        $('body').addClass('jcf-modal-open');
	        this.isShown = true;
	        this.escape();
	        this.backdrop(function () {
	          var transition = $.support.transition && that.$element.hasClass('fade');
	          if (!that.$element.parent().length) {
	            that.$element.appendTo(document.body) //don't move modals dom position
	          }

	          that.$element.show()

	          if (transition) {
	            that.$element[0].offsetWidth // force reflow
	          }

	          that.$element
	            .addClass('in')
	            .attr('aria-hidden', false)
	            .focus();

	          that.enforceFocus();

	          transition ?
	            that.$element.one($.support.transition.end, function () { that.$element.trigger('shown') }) :
	            that.$element.trigger('shown');

	        })
	      },
	      hide: function (e) {
	        e && e.preventDefault()
	        var that = this
	        e = $.Event('hide')
	        this.$element.trigger(e)
	        if (!this.isShown || e.isDefaultPrevented()) return
	        this.isShown = false
	        $('body').removeClass('jcf-modal-open')
	        this.escape()
	        $(document).off('focusin.modal')
	        this.$element
	          .removeClass('in')
	          .attr('aria-hidden', true)
	        $.support.transition && this.$element.hasClass('fade') ?
	          this.hideWithTransition() :
	          this.hideModal()
	      },
	      enforceFocus: function () {
	        var that = this
	        // $(document).on('focusin.modal', function (e) {
	        //   if (that.$element[0] !== e.target && !that.$element.has(e.target).length) {
	        //     that.$element.focus();
	        //   }
	        // })
	      },
	      escape: function () {
	        var that = this
	        if (this.isShown && this.options.keyboard) {
	          this.$element.on('keyup.dismiss.modal', function ( e ) {
	            e.which == 27 && that.hide();
	          })
	        } else if (!this.isShown) {
	          this.$element.off('keyup.dismiss.modal');
	          $(document).off('keyup.dismiss.modal');
	        }
	        
	      },
	      hideWithTransition: function () {
	        var that = this,
	        		timeout = setTimeout(function () {
	              that.$element.off($.support.transition.end)
	              that.hideModal()
	            }, 500);

	        this.$element.one($.support.transition.end, function () {
	          clearTimeout(timeout)
	          that.hideModal();
	        });
	      },
	      hideModal: function (that) {
	        this.$element.hide()
	          .trigger('hidden');
	        this.backdrop();
	      },
	      removeBackdrop: function () {
	        this.$backdrop.remove();
	        this.$backdrop = null;
	      },
	      backdrop: function (callback) {
	        var that = this,
	        		animate = this.$element.hasClass('fade') ? 'fade' : '';

	        if (this.isShown && this.options.backdrop) {
	          var doAnimate = $.support.transition && animate

	          this.$backdrop = $('<div class="jcf-modal-backdrop ' + animate + '" />')
	            .appendTo(document.body)

	          if (this.options.backdrop != 'static') {
	            this.$backdrop.click($.proxy(this.hide, this))
	          }

	          if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

	          this.$backdrop.addClass('in')

	          doAnimate ?
	            this.$backdrop.one($.support.transition.end, callback) :
	            callback()

	        } else if (!this.isShown && this.$backdrop) {
	          this.$backdrop.removeClass('in')

	          $.support.transition && this.$element.hasClass('fade')?
	            this.$backdrop.one($.support.transition.end, $.proxy(this.removeBackdrop, this)) :
	            this.removeBackdrop()

	        } else if (callback) {
	          callback()
	        }
	      }
	  };

	 /* MODAL PLUGIN DEFINITION
	  * ======================= */
	  $.fn.modal = function (option) {
	    return this.each(function () {
	      var $this = $(this),
	      	data = $this.data('modal'),
	      	options = $.extend({}, $.fn.modal.defaults, $this.data(), typeof option == 'object' && option);
	      if (!data) $this.data('modal', (data = new Modal(this, options)))
	      if (typeof option == 'string') data[option]()
	      else if (options.show) data.show()
	    })
	  };

	  $.fn.modal.defaults = {
	      backdrop: true,
	      keyboard: true,
	      show: true
	  };

	  $.fn.modal.Constructor = Modal;

	 // /* MODAL DATA-API
	 //  * ============== */
	 //  $(function () {
	 //    $('body').on('click.modal.data-api', '[data-toggle="modal"]', function ( e ) {
	 //      var $this = $(this)
	 //        , href = $this.attr('href')
	 //        , $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
	 //        , option = $target.data('modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

	 //      e.preventDefault()

	 //      $target
	 //        .modal(option)
	 //        .one('hide', function () {
	 //          $this.focus()
	 //        })
	 //    })
	 //  })
	})(window.jQuery);

	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, elm, attrs, model) {
	  	var draggable = Boolean(elm.attr('draggable')) || false,
	  			gridEl = '',
	  			onlyCenter = elm.attr('onlyCenter') || false,
	  			backdrop = elm.attr('backdrop') || true,
	  			contentsUrl = attrs.contentsUrl,
	  			flag = false;

	  	if(attrs.contentsUrl){
				$http.get(contentsUrl).then(function(response){
			 		//elm.html(response.data);
			 		gridEl = $(response.data);
			  	// $compile(gridEl)(scope);

				});
	  	}

		  elm.addClass('jcf-modal jcf-hide');
	  	
	  	if (draggable) elm.draggable({ handle : '.jcf-modal-header' });
	  	if (backdrop === "false") { 
	  		elm.modal({ backdrop : false }); 
	  	}else if(backdrop === "static"){
	  		elm.modal({ backdrop : "static" }); 
	  	}else {
	  		elm.modal({ backdrop : true }); 
	  	}

	  	elm.modal({
	  		keyboard : false
	  	});

	  	scope.$watch(attrs.ngModel, function(value) {
	    	elm.modal(value && 'show' || 'hide');
	  	},true);


			elm.on(jQuery.support.transition && 'shown' || 'show', function() {
				$timeout(function() {
					model.$setViewValue(true);
					
					if(onlyCenter === "true") $(elm).css('left','').css('top','');

					if(attrs.contentsUrl && (flag===false)) {
						elm.html(gridEl);
						$compile(elm.contents())(scope);
						flag=true;
					}
				});
			});

			elm.on(jQuery.support.transition && 'hidden' || 'hide', function() {
				$timeout(function() {
					model.$setViewValue(false);
				});
			});
		}
	}
}]);

// 서비스 객체 등록 
angular.module( 'jcf').provider('jcf', function(){
	this.$get = function(
		jcf_sender, 				// sender
		jcf_ds, jcf_dsManager		// ds
	  ){
		return {
			  sender 			: jcf_sender
			, senderOption 	: s_senderGlobalOption
			, ds 				: jcf_ds
			, jcf_dsManager 	: jcf_dsManager
			, globalConfig		: s_globalConfig
			, utils 				: s_utils
			, test				: test
		}
	}
});
 

})(window, document);