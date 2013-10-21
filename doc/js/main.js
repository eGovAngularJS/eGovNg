'use strict';

requirejs.config({

	baseUrl:'js',

	paths:{

		//뒤에 js 확장자는 생략한다.
		'text': 'vendor/require/text', //HTML 데이터를 가져올때 text! 프리픽스를 붙여준다.
		'jquery': 'vendor/jquery/jquery',
		'angular': 'vendor/angular/angular',
		'angular-bootstrap-prettify': 'vendor/angular/angular-bootstrap-prettify',
		'bootstrap': 'vendor/bootstrap/bootstrap.min',
		'library': 'vendor'
	},
	
	
	shim:{
		'angular':{
			deps: ['jquery'], //angular가 로드되기 전에 jquery가 로드 되어야 한다.
			exports:'angular'
		},
		'bootstrap':{
			deps: ['jquery'] //bootstrap이 로드되기 전에 jquery가 로드 되어야 한다.
		},
		'angular-bootstrap-prettify':{
			deps: ['jquery', 'angular'] //bootstrap이 로드되기 전에 jquery가 로드 되어야 한다.
		},
		'app': {
			deps: ['angular'] //app이 로드되기 전에 angular가 로드 되어야 한다.
		}
	}
	
});


//requireJS 모듈
requirejs( [
		'text', 
		'jquery', 
		'angular', 
		'angular-bootstrap-prettify',
		'bootstrap',
		'app'
	],

	function () {
		
		//페이지가 완전히 로드된 뒤에 실행
		$(document).ready(function () {

			//임의로 앵귤러 부트스트래핑을 수행한다.
			angular.bootstrap(document, ['myApp']);

		});
	}
);