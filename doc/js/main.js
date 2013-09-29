 /*
	user strict 명령은 엄격하게 JavaScript 룰을 적용하라는 의미이다.
	일부 브라우저의 경우 use strict 명령을 통해 보다 빠르게 동작하는 경우도 존재하는 것 같다.
	잘못된 부분에 대한 검증도 보다 엄격하게 동작한다.
	하지만, 일부 라이브러리의 경우 use strict 명령을 사용하면 동작하지 않는 경우도 있으므로 주의해야 한다.
 */
'use strict';


//requireJS 기본 설정 부분
requirejs.config({
/*
	baseUrl:
	JavaScript 파일이 있는 기본 경로를 설정한다.
	만약 data-main 속성이 사용되었다면, 그 경로가 baseUrl이 된다.
	data-main 속성은 require.js를 위한 특별한 속성으로 require.js는 스크립트 로딩을 시작하기 위해 이 부분을 체크한다.
*/
	baseUrl:'js',



/*
	paths: 
	path는 baseUrl 아래에서 직접적으로 찾을 수 없는 모듈명들을 위해 경로를 매핑해주는 속성이다.
	"/"로 시작하거나 "http" 등으로 시작하지 않으면, 기본적으로는 baseUrl에 상대적으로 설정하게 된다.
	
	paths: {
		"some": "some/v1.0"
	}
	
	의 형태로 설정한 뒤에, define에서 "some/module" 로 불러오게 되면, 스크립트 태그에서는 실제로는 src="/another/path/some/v1.0/module.js" 로 잡을 것이다.
	path는 또한 확장자를 명시하지 않은 module명을 위해 사용될 수 있는데, path 매핑 코드는 자동적으로 .js 확장자를 붙여서 모듈명을 매핑한다.
*/
	paths:{

		//뒤에 js 확장자는 생략한다.
		'text': '../lib/require/text', //HTML 데이터를 가져올때 text! 프리픽스를 붙여준다.
		'jquery': '../lib/jquery/jquery',
		'jquery-ui': '../lib/jquery/jquery-ui-1.10.2.min',
		'jquery-event-drag': '../lib/jquery/jquery.event.drag-2.0.min',
		'angular': '../lib/angular/angular',
		'angular-ui-bootstrap': '../lib/angular/ui-bootstrap-0.3.0.min',
		'angular-bootstrap-prettify': '../lib/angular/angular-bootstrap-prettify',
		'bootstrap': '../lib/bootstrap/bootstrap',
		'fractionslider': '../lib/fractionslider/jquery.fractionslider',
		'library': '../lib'
	},
	
/*
	shim:
	AMD 형식을 지원하지 않는 라이브러리의 경우 아래와 같이 SHIM을 사용해서 모듈로 불러올 수 있다.
	참고 : http://gregfranko.com/blog/require-dot-js-2-dot-0-shim-configuration/
	
	requirejs.config({
		shim: {
			'backbone': {
				//These script dependencies should be loaded before loading
				//backbone.js
				deps: ['underscore', 'jquery'],
				//Once loaded, use the global 'Backbone' as the
				//module value.
				exports: 'Backbone'
			},
			'underscore': {
				exports: '_'
			},
			'foo': {
				deps: ['bar'],
				exports: 'Foo',
				init: function (bar) {
					//Using a function allows you to call noConflict for
					//libraries that support it, and do other cleanup.
					//However, plugins for those libraries may still want
					//a global. "this" for the function will be the global
					//object. The dependencies will be passed in as
					//function arguments. If this function returns a value,
					//then that value is used as the module export value
					//instead of the object found via the 'exports' string.
					return this.Foo.noConflict();
				}
			}
		}
	});

*/
	shim:{
		'angular':{
			deps: ['jquery'], //angular가 로드되기 전에 jquery가 로드 되어야 한다.
			exports:'angular'
		},
		'bootstrap':{
			deps: ['jquery'] //bootstrap이 로드되기 전에 jquery가 로드 되어야 한다.
		},
		'angular-ui-bootstrap':{
			deps: ['jquery', 'angular'] //bootstrap이 로드되기 전에 jquery가 로드 되어야 한다.
		},
		'angular-bootstrap-prettify':{
			deps: ['jquery', 'angular'] //bootstrap이 로드되기 전에 jquery가 로드 되어야 한다.
		},
		'app': {
			deps: ['angular'] //app이 로드되기 전에 angular가 로드 되어야 한다.
		},
		'fractionslider': {
			deps: ['jquery'] //fractionslider가 로드되기 전에 jquery가 로드 되어야 한다.
		},
		'jquery-ui': {
			deps: ['jquery'] 
		},
		'jquery-event-drag': {
			deps: ['jquery'] 
		}
	},
	
/*
	[그 외의 옵션들]

	packages:
	configures loading modules from CommonJS packages. See the packages topic for more information.
	
	waitSeconds:
	The number of seconds to wait before giving up on loading a script. Setting it to 0 disables the timeout. The default is 7 seconds.
	
	context:
	A name to give to a loading context. This allows require.js to load multiple versions of modules in a page, as long as each top-level require call specifies a unique context string. To use it correctly, see the Multiversion Support section.
	
	deps:
	An array of dependencies to load. Useful when require is defined as a config object before require.js is loaded, and you want to specify dependencies to load as soon as require() is defined. Using deps is just like doing a require([]) call, but done as soon as the loader has processed the configuration. It does not block any other require() calls from starting their requests for modules, it is just a way to specify some modules to load asynchronously as part of a config block.
	
	callback:
	A function to execute after deps have been loaded. Useful when require is defined as a config object before require.js is loaded, and you want to specify a function to require after the configuration's deps array has been loaded.
	
	enforceDefine:
	If set to true, an error will be thrown if a script loads that does not call define() or have a shim exports string value that can be checked. See Catching load failures in IE for more information.
	
	xhtml:
	If set to true, document.createElementNS() will be used to create script elements.
	
	urlArgs:
	Extra query string arguments appended to URLs that RequireJS uses to fetch resources. Most useful to cache bust when the browser or server is not configured correctly. Example cache bust setting for urlArgs:
	
		urlArgs: "bust=" +  (new Date()).getTime()

	During development it can be useful to use this, however be sure to remove it before deploying your code.
	
	scriptType:
	Specify the value for the type="" attribute used for script tags inserted into the document by RequireJS. Default is "text/javascript". To use Firefox's JavaScript 1.8 features, use "text/javascript;version=1.8".
*/
	
	//urlArgs:'v=1.1'
});


//requireJS를 활용하여 모듈 로드
requirejs( [
		//디펜던시가 걸려있으므로, 아래 두개의 디펜던시가 먼저 로드된 뒤에 아래 콜백이 수행된다.
		'text', //미리 선언해둔 path, css나 html을 로드하기 위한 requireJS 플러그인
		'jquery', //미리 선언해둔 path, jQuery는 AMD를 지원하기 때문에 이렇게 로드해도 jQuery 또는 $로 호출할 수 있다.
		'jquery-ui',
		'jquery-event-drag',
		'angular', //미리 선언해둔 path
		'angular-ui-bootstrap',
		'angular-bootstrap-prettify',
		'bootstrap',
		'app'
	],

	//디펜던시 로드뒤 콜백함수
	function () {
		//이 함수는 위에 명시된 모든 디펜던시들이 다 로드된 뒤에 호출된다.
		//주의해야할 것은, 디펜던시 로드 완료 시점이 페이지가 완전히 로드되기 전 일 수도 있다는 사실이다.
		//이 콜백함수는 선택사항이다.
		
		//페이지가 완전히 로드된 뒤에 실행
		$(document).ready(function () {

			//임의로 앵귤러 부트스트래핑을 수행한다.
			//위의 디펜던시 중 myApp이 포함된 app.js가 로드된 이후에 아래가 수행되는 것이다.
			angular.bootstrap(document, ['myApp']);
			
			//차후에 인젝션을 고려한다면, 여기에서 위의 라인 리턴값을 저장해두는 것도 좋지 않을까?
			
		});
	}
);