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


directive.draggable = ['$document', function($document) {
  var startX=0, startY=0, x = 0, y = 0;
    return function(scope, element, attr) {

      element.css({
       position: 'relative',
       cursor: 'pointer'
      });
      element.bind('mousedown', function(event) {
        startX = event.screenX - x;
        startY = event.screenY - y;
        $document.bind('mousemove', mousemove);
        $document.bind('mouseup', mouseup);
      });
 
      function mousemove(event) {
        y = event.screenY - startY;
        x = event.screenX - startX;
        element.css({
          top: y + 'px',
          left:  x + 'px'
        });
      }
 
      function mouseup() {
        $document.unbind('mousemove', mousemove);
        $document.unbind('mouseup', mouseup);
      }
    }
}];


/**
 * popup + manager
 * - 다중 팝업 관리, depth, modal 관리등
 * - 팝업 template 관리
 * - api 제공
 */

/**
 jcf-popup -> $jcf$popup by provider
 http://angular-ui.github.com/bootstrap  참조 

*/
var popup = function(){

  // The default options for all dialogs.
  var defaults = {
    draggable : true,
    backdrop: true,
    modalClass: 'jcf-popup',
    backdropClass: 'jcf-popup-backdrop',
    transitionClass: 'fade',
    triggerClass: 'in',
    resolve:{},
    backdropFade: false,
    modalFade:false,
    keyboard: true, // close with esc key
    backdropClick: true // only in conjunction with backdrop=true
    /* other options: template, templateUrl, controller */
  };

  var globalOptions = {};

  var baseTemplate = 
    "<div class=\"jcf-popup-header draggable\">" +
    " <h1>test-{{ title }}</h1>" +
    "</div>" +
    "<div class=\"jcf-popup-body\">" +
    " <p>{{ message }}</p>" +
    "</div>" +
    "<div class=\"jcf-popup-footer\">" +
    " <button ng-repeat=\"btn in buttons\" ng-click=\"close(btn.result)\" class=btn ng-class=\"btn.cssClass\">{{ btn.label }}</button>" +
    "</div>" +
    "";

  var popTemplate = 
    "<div class=\"jcf-popup-header draggable\">" +
    " <h1>{{ title }}</h1>" +
    "</div>" +
    "<div class=\"jcf-popup-body\">" +
    " <p>{{ message }}</p>" +
    "</div>" +
    "<div class=\"jcf-popup-footer\">" +
    " <button ng-repeat=\"btn in buttons\" ng-click=\"close(btn.result)\" class=btn ng-class=\"btn.cssClass\">{{ btn.label }}</button>" +
    "</div>" +
    "";

  // The `options({})` allows global configuration of all dialogs in the application.
  //
  //      var app = angular.module('App', ['ui.bootstrap.dialog'], function($dialogProvider){
  //        // don't close dialog when backdrop is clicked by default
  //        $dialogProvider.options({backdropClick: false});
  //      });
  this.options = function(value){
    globalOptions = value;
  };

  // Returns the actual `$dialog` service that is injected in controllers
  this.$get = ["$http", "$document", "$compile", "$rootScope", "$controller", "$templateCache", "$q", "$transition",
  function ($http, $document, $compile, $rootScope, $controller, $templateCache, $q, $transition) {

    var body = $document.find('body');

    function createElement(clazz) {
      var el = angular.element("<div>");
      el.addClass(clazz);
      return el;
    }

    // The `Dialog` class represents a modal dialog. The dialog class can be invoked by providing an options object
    // containing at lest template or templateUrl and controller:
    // 
    //     var d = new Dialog({templateUrl: 'foo.html', controller: 'BarController'});
    // 
    // Dialogs can also be created using templateUrl and controller as distinct arguments:
    //
    //     var d = new Dialog('path/to/dialog.html', MyDialogController);
    function Dialog(opts) {

      var self = this, options = this.options = angular.extend({}, defaults, globalOptions, opts);

      this.backdropEl = createElement(options.backdropClass);
      if(options.backdropFade){
        this.backdropEl.addClass(options.transitionClass);
        this.backdropEl.removeClass(options.triggerClass);
      }

      this.modalEl = createElement(options.modalClass);
      if(options.modalFade){
        this.modalEl.addClass(options.transitionClass);
        this.modalEl.removeClass(options.triggerClass);
      }

      this.handledEscapeKey = function(e) {
        if (e.which === 27) {
          self.close();
          e.preventDefault();
          self.$scope.$apply();
        }
      };

      this.handleBackDropClick = function(e) {
        self.close();
        e.preventDefault();
        self.$scope.$apply();
      };

//드래그 가능 영역 처리 로직
      this.startX=0, this.startY=0, this.x = 0, this.y = 0;
      this.mousedown = function(event) {
        self.x = parseInt((""+self.modalEl.css("left")).replace("px",""), 10);
        self.y = parseInt((""+self.modalEl.css("top")).replace("px",""), 10);
        self.startX = event.screenX - self.x;
        self.startY = event.screenY - self.y;
        $document.bind('mousemove', self.mousemove);
        $document.bind('mouseup', self.mouseup);
      };

      this.mousemove = function(event) {
        self.y = event.screenY - self.startY;
        self.x = event.screenX - self.startX;
        self.modalEl.css({
          top: self.y + 'px',
          left:  self.x + 'px'
        });
      };
 
      this.mouseup = function(event) {
        $document.unbind('mousemove', self.mousemove);
        $document.unbind('mouseup', self.mouseup);
      };
    }

    // The `isOpen()` method returns wether the dialog is currently visible.
    Dialog.prototype.isOpen = function(){
      return this._open;
    };

    // The `open(templateUrl, controller)` method opens the dialog.
    // Use the `templateUrl` and `controller` arguments if specifying them at dialog creation time is not desired.
    Dialog.prototype.open = function(templateUrl, controller){
      var self = this, options = this.options;

      if(templateUrl){
        options.templateUrl = templateUrl;
      }
      if(controller){
        options.controller = controller;
      }
      
      if(!(options.template || options.templateUrl)) {
        //options.template = baseTemplate;
        throw new Error('Dialog.open expected template or templateUrl, neither found. Use options or open method to specify them.');
      }

      this._loadResolves().then(function(locals) {
        var $scope = locals.$scope = self.$scope = $rootScope.$new();

        self.modalEl.html(locals.$template);

        if (self.options.controller) {
          var ctrl = $controller(self.options.controller, locals);
          self.modalEl.contents().data('ngControllerController', ctrl);
        }

        $compile(self.modalEl.contents())($scope);
        self._addElementsToDom();

        // trigger tranisitions
        setTimeout(function(){
          if(self.options.modalFade){ self.modalEl.addClass(self.options.triggerClass); }
          if(self.options.backdropFade){ self.backdropEl.addClass(self.options.triggerClass); }
        });

        self._bindEvents();
      });

      this.deferred = $q.defer();
      return this.deferred.promise;
    };

    // closes the dialog and resolves the promise returned by the `open` method with the specified result.
    Dialog.prototype.close = function(result){
      var self = this;
      var fadingElements = this._getFadingElements();

      if(fadingElements.length > 0){
        for (var i = fadingElements.length - 1; i >= 0; i--) {
          $transition(fadingElements[i], removeTriggerClass).then(onCloseComplete);
        }
        return;
      }

      this._onCloseComplete(result);

      function removeTriggerClass(el){
        el.removeClass(self.options.triggerClass);
      }

      function onCloseComplete(){
        if(self._open){
          self._onCloseComplete(result);
        }
      }
    };

    Dialog.prototype._getFadingElements = function(){
      var elements = [];
      if(this.options.modalFade){
        elements.push(this.modalEl);
      }
      if(this.options.backdropFade){
        elements.push(this.backdropEl);
      }

      return elements;
    };

    Dialog.prototype._bindEvents = function() {
      if(this.options.keyboard){ body.bind('keydown', this.handledEscapeKey); }
      if(this.options.backdrop && this.options.backdropClick){ this.backdropEl.bind('click', this.handleBackDropClick); }

//드래그 가능 영역 처리 로직
      var dragEl = this.modalEl.find(".draggable");
      if(this.options.draggable && dragEl.length > 0){
        this.dragEl = angular.element(dragEl[0]);
        this.dragEl.css({
         cursor: 'pointer'
        });
        this.dragEl.bind('mousedown', this.mousedown);
      }
    };

    Dialog.prototype._unbindEvents = function() {
      if(this.options.keyboard){ body.unbind('keydown', this.handledEscapeKey); }
      if(this.options.backdrop && this.options.backdropClick){ this.backdropEl.unbind('click', this.handleBackDropClick); }

//드래그 가능 영역 처리 로직
      if(this.options.draggable && this.dragEl){
        this.dragEl.unbind('mousedown', this.mousedown);
      }
    };

    Dialog.prototype._onCloseComplete = function(result) {
      this._removeElementsFromDom();
      this._unbindEvents();

      if(this.deferred) {
        this.deferred.resolve(result);
      }
    };

    Dialog.prototype._addElementsToDom = function(){
      body.append(this.modalEl);
      if(this.options.backdrop) { body.append(this.backdropEl); }
      this._open = true;
    };

    Dialog.prototype._removeElementsFromDom = function(){
      this.modalEl.remove();
      if(this.options.backdrop) { this.backdropEl.remove(); }
      this._open = false;
    };

    // Loads all `options.resolve` members to be used as locals for the controller associated with the dialog.
    Dialog.prototype._loadResolves = function(){
      var values = [], keys = [], templatePromise, self = this;

      if (this.options.template) {
        templatePromise = $q.when(this.options.template);
      } else if (this.options.templateUrl) {
        templatePromise = $http.get(this.options.templateUrl, {cache:$templateCache})
        .then(function(response) { return response.data; });
      }

      angular.forEach(this.options.resolve || [], function(value, key) {
        keys.push(key);
        values.push(value);
      });

      keys.push('$template');
      values.push(templatePromise);

      return $q.all(values).then(function(values) {
        var locals = {};
        angular.forEach(values, function(value, index) {
          locals[keys[index]] = value;
        });
        // injection 후 popup 객체 전달
        locals.dialogParam = self;
        return locals;
      });
    };

    /*
    * jcf-popup
    */

    function Popup(opts) {
      this.prototype = Dialog;
    }

    // The actual `$dialog` service that is injected in controllers.
    return {
      // Creates a new `Dialog` with the specified options.
      dialog: function(opts){
        return new Dialog(opts);
      },

      popup: function(opts){
        return new Dialog(opts);
      },
      // creates a new `Dialog` tied to the default message box template and controller.
      //
      // Arguments `title` and `message` are rendered in the modal header and body sections respectively.
      // The `buttons` array holds an object with the following members for each button to include in the
      // modal footer section:
      //
      // * `result`: the result to pass to the `close` method of the dialog when the button is clicked
      // * `label`: the label of the button
      // * `cssClass`: additional css class(es) to apply to the button for styling
      messageBox: function(title, message, buttons){
        return new Dialog({template : baseTemplate, controller: 'baseController', resolve: {model: {
          title: title,
          message: message,
          buttons: buttons
        }, model2:{test:"test"}}
      });
      }
    };
  }];
};


//angular.module("jcf.template", ["template/dialog/message2.html"]);
var jcfNew = angular.module('jcf.popup', ["ui.bootstrap.transition"]).directive(directive).factory(service);


var baseController = ['$scope', 'dialogParam', 'model', 'model2', function($scope, dialogParam, model, model2){
  $scope.title = model.title;
  $scope.message = model.message;
  $scope.buttons = model.buttons;
  $scope.test = model2.test;
  $scope.close = function(res){
    dialogParam.close(res);
  };
}];


jcfNew.controller("baseController", baseController)
.provider("$jcf$popup", popup);


// angular.module("template/dialog/message2.html", []).run(["$templateCache", function($templateCache){
//   $templateCache.put("template/dialog/message2.html",
//     "<div class=\"jcf-popup-header\">" +
//     " <h1>test-{{ title }}</h1>" +
//     "</div>" +
//     "<div class=\"jcf-popup-body\">" +
//     " <p>{{ message }}</p>" +
//     "</div>" +
//     "<div class=\"jcf-popup-footer\">" +
//     " <button ng-repeat=\"btn in buttons\" ng-click=\"close(btn.result)\" class=btn ng-class=\"btn.cssClass\">{{ btn.label }}</button>" +
//     "</div>" +
//     "");
// }]);

})(window, window.angular);

