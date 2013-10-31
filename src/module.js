if (typeof jQuery === "undefined") {
  throw "eGovAngularJS는 jquery를 필요로 합니다. (eGovAngularJS requires jquery module to be loaded)";
}

/**
 * egov.ui Module
 *
 * Description
 */
 angular.module('egov.ui', [
	'egov.ui.service',
	'egov.ui.grid',
	'egov.ui.tab',
	'egov.ui.input',
	'egov.ui.chart']);

angular.module('egov.ui.filter',[
	]);

angular.module('egov.ui.service',[
	]);