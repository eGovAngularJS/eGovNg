'use strict';

requirejs.config({

	baseUrl:'js',

	paths:{

		//뒤에 js 확장자는 생략한다.
		'text': '../lib/require/text', //HTML 데이터를 가져올때 text! 프리픽스를 붙여준다.
		'jquery': '../lib/jquery/jquery',
		'angular': '../lib/angular/angular',
		'angular-bootstrap-prettify': '../lib/angular/angular-bootstrap-prettify',
		'bootstrap': '../lib/bootstrap/bootstrap',
		'fractionslider': '../lib/fractionslider/jquery.fractionslider',
		'library': '../lib'
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
		},
		'fractionslider': {
			deps: ['jquery'] //fractionslider가 로드되기 전에 jquery가 로드 되어야 한다.
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
		'fractionslider',
		'app'
	],

	function () {
		
		//페이지가 완전히 로드된 뒤에 실행
		$(document).ready(function () {

			//임의로 앵귤러 부트스트래핑을 수행한다.
			angular.bootstrap(document, ['myApp']);

			//슬라이드 애니메이션 시작			
			$('.slider').fractionSlider({
				'fullWidth': true,
				'controls': false, 
				'pager': false
			});	
			
		});
	}
);