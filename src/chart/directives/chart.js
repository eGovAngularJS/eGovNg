/**
* egog.ui.chart Module
*
* Description
* 오픈소스 활용
* 
* 참조 site : http://cmaurer.github.io/angularjs-nvd3-directives/stacked.area.chart.html
* 확장 정보 : axis tickFormat 추가
* 
* angularjs-nvd3-directives - v0.0.0 - 2013-09-27
* Copyright (c) 2013 Christian Maurer; Licensed Apache
*/

(function() {
'use strict';

if((typeof(angular) === 'object') && (typeof(angular.version) === 'object')){

var configureXaxis = function (chart, scope, attrs){
    if(attrs.xaxisorient){
        chart.xAxis.orient(attrs.xaxisorient);
    }
    if(attrs.xaxisticks){
        chart.xAxis.scale().ticks(attrs.xaxisticks);
    }
    if(attrs.xaxistickvalues){
        if(Array.isArray(scope.$eval(attrs.xaxistickvalues))){
            chart.xAxis.tickValues(scope.$eval(attrs.xaxistickvalues));
        } else if(typeof scope.xaxistickvalues() === 'function'){
            chart.xAxis.tickValues(scope.xaxistickvalues());
        }
    }
    if(attrs.xaxisticksubdivide){
        chart.xAxis.tickSubdivide(scope.xaxisticksubdivide());
    }
    if(attrs.xaxisticksize){
        chart.xAxis.tickSize(scope.xaxisticksize());
    }
    if(attrs.xaxistickpadding){
        chart.xAxis.tickPadding(scope.xaxistickpadding());
    }
    if(attrs.xaxistickformat){
        chart.xAxis.tickFormat(scope.xaxistickformat());
    }
    if(attrs.xaxislabel){
        chart.xAxis.axisLabel(attrs.xaxislabel);
    }
    if(attrs.xaxisscale){
        chart.xAxis.xScale(scope.xaxisscale());
    }
    if(attrs.xaxisdomain){
        chart.xAxis.domain(scope.xaxisdomain());
    }
    if(attrs.xaxisrange){
        chart.xAxis.range(scope.xaxisrange());
    }
    if(attrs.xaxisrangeband){
        chart.xAxis.rangeBand(scope.xaxisrangeband());
    }
    if(attrs.xaxisrangebands){
        chart.xAxis.rangeBands(scope.xaxisrangebands());
    }
    if(attrs.xaxisshowmaxmin){
        chart.xAxis.showMaxMin((attrs.xaxisshowmaxmin === "true"));
    }
    if(attrs.xaxishighlightzero){
        chart.xAxis.highlightZero((attrs.xaxishighlightzero === "true"));
    }
    if(attrs.xaxisrotatelables){
        chart.xAxis.rotateLabels(attrs.xaxisrotatelables);
    }
//    if(attrs.xaxisrotateylabel){
//        chart.xAxis.rotateYLabel((attrs.xaxisrotateylabel === "true"));
//    }
    if(attrs.xaxisstaggerlabels){
        chart.xAxis.staggerLabels((attrs.xaxisstaggerlabels === "true"));
    }
};

var configureYaxis = function (chart, scope, attrs){
    if(attrs.yaxisorient){
        chart.yAxis.orient(attrs.yaxisorient);
    }
    if(attrs.yaxisticks){
        chart.yAxis.scale().ticks(attrs.yaxisticks);
    }
    if(attrs.yaxistickvalues){
        if(Array.isArray(scope.$eval(attrs.yaxistickvalues))){
            chart.yAxis.tickValues(scope.$eval(attrs.yaxistickvalues));
        } else if(typeof scope.yaxistickvalues() === 'function'){
            chart.yAxis.tickValues(scope.yaxistickvalues());
        }
    }
    if(attrs.yaxisticksubdivide){
        chart.yAxis.tickSubdivide(scope.yaxisticksubdivide());
    }
    if(attrs.yaxisticksize){
        chart.yAxis.tickSize(scope.yaxisticksize());
    }
    if(attrs.yaxistickpadding){
        chart.yAxis.tickPadding(scope.yaxistickpadding());
    }
    if(attrs.yaxistickformat){
        chart.yAxis.tickFormat(scope.yaxistickformat());
    }
    if(attrs.yaxislabel){
        chart.yAxis.axisLabel(attrs.yaxislabel);
    }
    if(attrs.yaxisscale){
        chart.yAxis.yScale(scope.yaxisscale());
    }
    if(attrs.yaxisdomain){
        chart.yAxis.domain(scope.yaxisdomain());
    }
    if(attrs.yaxisrange){
        chart.yAxis.range(scope.yaxisrange());
    }
    if(attrs.yaxisrangeband){
        chart.yAxis.rangeBand(scope.yaxisrangeband());
    }
    if(attrs.yaxisrangebands){
        chart.yAxis.rangeBands(scope.yaxisrangebands());
    }
    if(attrs.yaxisshowmaxmin){
        chart.yAxis.showMaxMin((attrs.yaxisshowmaxmin === "true"));
    }
    if(attrs.yaxishighlightzero){
        chart.yAxis.highlightZero((attrs.yaxishighlightzero === "true"));
    }
    if(attrs.yaxisrotatelables){
        chart.yAxis.rotateLables(attrs.yaxisrotatelables);
    }
    if(attrs.yaxisrotateylabel){
        chart.yAxis.rotateYLabel((attrs.yaxisrotateylabel === "true"));
    }
    if(attrs.yaxisstaggerlabels){
        chart.yAxis.staggerLabels((attrs.yaxisstaggerlabels === "true"));
    }
};


var configureY1axis = function (chart, scope, attrs){
    if(attrs.y1axisticks){
        chart.y1Axis.scale().ticks(attrs.y1axisticks);
    }
    if(attrs.y1axistickvalues){
        chart.y1Axis.tickValues(attrs.y1axistickvalues);
    }
    if(attrs.y1axisticksubdivide){
        chart.y1Axis.tickSubdivide(scope.y1axisticksubdivide());
    }
    if(attrs.y1axisticksize){
        chart.y1Axis.tickSize(scope.y1axisticksize());
    }
    if(attrs.y1axistickpadding){
        chart.y1Axis.tickPadding(scope.y1axistickpadding());
    }
    if(attrs.y1axistickformat){
        chart.y1Axis.tickFormat(scope.y1axistickformat());
    }
    if(attrs.y1axislabel){
        chart.y1Axis.axisLabel(attrs.y1axislabel);
    }
    if(attrs.y1axisscale){
        chart.y1Axis.yScale(scope.y1axisscale());
    }
    if(attrs.y1axisdomain){
        chart.y1Axis.domain(scope.y1axisdomain());
    }
    if(attrs.y1axisrange){
        chart.y1Axis.range(scope.y1axisrange());
    }
    if(attrs.y1axisrangeband){
        chart.y1Axis.rangeBand(scope.y1axisrangeband());
    }
    if(attrs.y1axisrangebands){
        chart.y1Axis.rangeBands(scope.y1axisrangebands());
    }
    if(attrs.y1axisshowmaxmin){
        chart.y1Axis.showMaxMin((attrs.y1axisshowmaxmin === "true"));
    }
    if(attrs.y1axishighlightzero){
        chart.y1Axis.highlightZero((attrs.y1axishighlightzero === "true"));
    }
    if(attrs.y1axisrotatelables){
        chart.y1Axis.highlightZero(scope.y1axisrotatelables);
    }
    if(attrs.y1axisrotateylabel){
        chart.y1Axis.rotateYLabel((attrs.y1axisrotateylabel === "true"));
    }
    if(attrs.y1axisstaggerlabels){
        chart.y1Axis.staggerlabels((attrs.y1axisstaggerlabels === "true"));
    }
};


var configureY2axis = function (chart, scope, attrs){
    if(attrs.y2axisticks){
        chart.y2Axis.scale().ticks(attrs.y2axisticks);
    }
    if(attrs.y2axistickvalues){
        chart.y2Axis.tickValues(scope.$eval(attrs.y2axistickvalues));
    }
    if(attrs.y2axisticksubdivide){
        chart.y2Axis.tickSubdivide(scope.y2axisticksubdivide());
    }
    if(attrs.y2axisticksize){
        chart.y2Axis.tickSize(scope.y2axisticksize());
    }
    if(attrs.y2axistickpadding){
        chart.y2Axis.tickPadding(scope.y2axistickpadding());
    }
    if(attrs.y2axistickformat){
        chart.y2Axis.tickFormat(scope.y2axistickformat());
    }
    if(attrs.y2axislabel){
        chart.y2Axis.axisLabel(attrs.y2axislabel);
    }
    if(attrs.y2axisscale){
        chart.y2Axis.yScale(scope.y2axisscale());
    }
    if(attrs.y2axisdomain){
        chart.y2Axis.domain(scope.y2axisdomain());
    }
    if(attrs.y2axisrange){
        chart.y2Axis.range(scope.y2axisrange());
    }
    if(attrs.y2axisrangeband){
        chart.y2Axis.rangeBand(scope.y2axisrangeband());
    }
    if(attrs.y2axisrangebands){
        chart.y2Axis.rangeBands(scope.y2axisrangebands());
    }
    if(attrs.y2axisshowmaxmin){
        chart.y2Axis.showMaxMin((attrs.y2axisshowmaxmin === "true"));
    }
    if(attrs.y2axishighlightzero){
        chart.y2Axis.highlightZero((attrs.y2axishighlightzero === "true"));
    }
    if(attrs.y2axisrotatelables){
        chart.y2Axis.highlightZero(scope.y2axisrotatelables);
    }
    if(attrs.y2axisrotateylabel){
        chart.y2Axis.rotateYLabel((attrs.y2axisrotateylabel === "true"));
    }
    if(attrs.y2axisstaggerlabels){
        chart.y2Axis.staggerlabels((attrs.y2axisstaggerlabels === "true"));
    }
};

// egov-ui-chart
var eGovChart = angular.module('egov.ui.chart', ['egov.ui.common']);
eGovChart
    .directive('egovLineChart', ['$window', '$timeout', function($window, $timeout){
        return {
            restrict: 'E',
            scope: {
                data: '=',
                width: '@',
                height: '@',
                id: '@',
                showlegend: '@',
                tooltips: '@',
                showxaxis: '@',
                showyaxis: '@',
                rightalignyaxis: '@',
                defaultstate: '@',
                nodata: '@',
                margin: '&',
                tooltipcontent: '&',
                color: '&',
                x: '&',
                y: '&',
                forcex: '@',
                forcey: '@',
                isArea: '@',
                interactive: '@',
                clipedge: '@',
                clipvoronoi: '@',
                interpolate: '@',

                //xaxis
                xaxisorient: '&',
                xaxisticks: '@',
                xaxistickvalues: '&xaxistickvalues',
                xaxisticksubdivide: '&',
                xaxisticksize: '&',
                xaxistickpadding: '&',
                xaxistickformat: '&',
                xaxislabel: '&',
                xaxisscale: '&',
                xaxisdomain: '&',
                xaxisrange: '&',
                xaxisrangeband: '&',
                xaxisrangebands: '&',
                xaxisshowmaxmin: '@',
                xaxishighlightzero: '@',
                xaxisrotatelables: '@',
                xaxisrotateylabel: '@',
                xaxisstaggerlabels: '@',

                //yaxis
                yaxisorient: '&',
                yaxisticks: '&',
                yaxistickvalues: '&yaxistickvalues',
                yaxisticksubdivide: '&',
                yaxisticksize: '&',
                yaxistickpadding: '&',
                yaxistickformat: '&',
                yaxislabel: '&',
                yaxisscale: '&',
                yaxisdomain: '&',
                yaxisrange: '&',
                yaxisrangeband: '&',
                yaxisrangebands: '&',
                yaxisshowmaxmin: '@',
                yaxishighlightzero: '@',
                yaxisrotatelables: '@',
                yaxisrotateylabel: '@',
                yaxisstaggerlabels: '@',

                //angularjs specific
                objectequality: '@',  //$watch(watchExpression, listener, objectEquality)

                //d3.js specific
                transitionduration: '@'

            },
            controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs){
                $scope.d3Call = function(data, chart){
                    d3.select('#' + $attrs.id + ' svg')
                        .attr('height', $scope.height)
                        .attr('width', $scope.width)
                        .datum(data)
                        .transition().duration(($attrs.transitionduration === undefined ? 500 : $attrs.transitionduration))
                        .call(chart);
                };
            }],
            link: function(scope, element, attrs){
                scope.$watch('data', function(data){
                    if(data){
                        //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
                        if(scope.chart){
                            return scope.d3Call(data, scope.chart);
                        }
                        nv.addGraph({
                            generate: function(){
                                var margin = (scope.$eval(attrs.margin) || {left:50, top:50, bottom:50, right:50});
                                scope.width = (attrs.width || element[0].parentElement.offsetWidth) - (margin.left + margin.right);
                                scope.height = (attrs.height || element[0].parentElement.offsetHeight) - (margin.top + margin.bottom);

                                var chart = nv.models.lineChart()
                                    .width(scope.width)
                                    .height(scope.height)
                                    .margin(margin)
                                    .x(attrs.x === undefined ? function(d){ return d[0]; } : scope.x())
                                    .y(attrs.y === undefined ? function(d){ return d[1]; } : scope.y())
                                    .forceX(attrs.forcex === undefined ? [] : scope.$eval(attrs.forcex)) // List of numbers to Force into the X scale (ie. 0, or a max / min, etc.)
                                    .forceY(attrs.forcey === undefined ? [0] : scope.$eval(attrs.forcey)) // List of numbers to Force into the Y scale
                                    .showLegend(attrs.showlegend === undefined ? false : (attrs.showlegend === "true"))
                                    .tooltips(attrs.tooltips === undefined ? false : (attrs.tooltips  === "true"))
                                    .showXAxis(attrs.showxaxis === undefined ? false : (attrs.showxaxis  === "true"))
                                    .showYAxis(attrs.showyaxis === undefined ? false : (attrs.showyaxis  === "true"))
                                    .rightAlignYAxis(attrs.rightalignyaxis === undefined ? false : (attrs.rightalignyaxis  === "true"))
                                    .noData(attrs.nodata === undefined ? 'No Data Available.' : scope.nodata)
                                    .interactive(attrs.interactive === undefined ? false : (attrs.interactive === "true"))
                                    .clipEdge(attrs.clipedge === undefined ? false : (attrs.clipedge === "true"))
                                    .clipVoronoi(attrs.clipvoronoi === undefined ? false : (attrs.clipvoronoi === "true"))
                                    .interpolate(attrs.interpolate === undefined ? 'linear' : attrs.interpolate)
                                    .color(attrs.color === undefined ? nv.utils.defaultColor()  : scope.color())
                                    .isArea(attrs.isarea === undefined ? function(){return false;} : function(){ return (attrs.isarea === "true"); });

                                if (chart.useInteractiveGuideline) {
                                    chart.useInteractiveGuideline(attrs.useinteractiveguideline === undefined ? false : (attrs.useinteractiveguideline === "true"));
                                }

                                if(attrs.tooltipcontent){
                                    chart.tooltipContent(scope.tooltipcontent());
                                }

                                configureXaxis(chart, scope, attrs);
                                configureYaxis(chart, scope, attrs);

                                scope.d3Call(data, chart);

                                var chartResize = function() {
                                    var currentWidth = parseInt(d3.select('#' + attrs.id + ' svg').attr('width'), 10),
                                        currentHeight = parseInt(d3.select('#' + attrs.id + ' svg').attr('height'), 10),
                                        newWidth = (attrs.width || element[0].parentElement.offsetWidth) - (margin.left + margin.right),
                                        newHeight = (attrs.height || element[0].parentElement.offsetHeight) - (margin.top + margin.bottom);

                                    if(newHeight < 0){
                                        newHeight = 0;
                                    }

                                    if(newWidth === currentWidth && newHeight === currentHeight) {
                                        return; //Nothing to do, the size is fixed or not changing.
                                    }

                                    d3.select('#' + attrs.id + ' svg').node().remove(); // remove old graph first
                                    nv.log('newWidth',newWidth, 'newHeight', newHeight );
                                    chart.width(newWidth).height(newHeight); //Update the dims
                                    d3.select(element[0]).append("svg")
                                        .attr('id', attrs.id)
                                        .attr('width', newWidth)
                                        .attr('height', newHeight)
                                        .datum(data)
                                        .transition()
                                        .duration(500)
                                        .call(chart);
                                };

                                var timeoutPromise;
                                var windowResize = function() {
                                    $timeout.cancel(timeoutPromise);
                                    timeoutPromise = $timeout(chartResize, 100);
                                };
                                $window.addEventListener('resize', windowResize);
                                scope.chart = chart;
                                return chart;
                            }
                        });
                    }
                }, (attrs.objectequality === undefined ? false : (attrs.objectequality === "true")));
            }
        };
    }])
    .directive('egovCumulativeLineChart', ['$window', '$timeout', function($window, $timeout){
        return {
            restrict: 'E',
            scope: {
                data: '=',
                width: '@',
                height: '@',
                id: '@',
                showlegend: '@',
                tooltips: '@',
                showxaxis: '@',
                showyaxis: '@',
                rightalignyaxis: '@',
                defaultstate: '@',
                nodata: '@',
                margin: '&',
                tooltipcontent: '&',
                color: '&',
                x: '&',
                y: '&',
                forcex: '@',
                forcey: '@',
                isArea: '@',
                interactive: '@',
                clipedge: '@',
                clipvoronoi: '@',
                usevoronoi: '@',
                average: '&',
                rescaley: '@',

                //xaxis
                xaxisorient: '&',
                xaxisticks: '&',
                xaxistickvalues: '&xaxistickvalues',
                xaxisticksubdivide: '&',
                xaxisticksize: '&',
                xaxistickpadding: '&',
                xaxistickformat: '&',
                xaxislabel: '&',
                xaxisscale: '&',
                xaxisdomain: '&',
                xaxisrange: '&',
                xaxisrangeband: '&',
                xaxisrangebands: '&',
                xaxisshowmaxmin: '@',
                xaxishighlightzero: '@',
                xaxisrotatelables: '@',
                xaxisrotateylabel: '@',
                xaxisstaggerlabels: '@',

                //yaxis
                yaxisorient: '&',
                yaxisticks: '&',
                yaxistickvalues: '&yaxistickvalues',
                yaxisticksubdivide: '&',
                yaxisticksize: '&',
                yaxistickpadding: '&',
                yaxistickformat: '&',
                yaxislabel: '&',
                yaxisscale: '&',
                yaxisdomain: '&',
                yaxisrange: '&',
                yaxisrangeband: '&',
                yaxisrangebands: '&',
                yaxisshowmaxmin: '@',
                yaxishighlightzero: '@',
                yaxisrotatelables: '@',
                yaxisrotateylabel: '@',
                yaxisstaggerlabels: '@',

                //angularjs specific
                objectequality: '@',  //$watch(watchExpression, listener, objectEquality)

                //d3.js specific
                transitionduration: '@'

            },
            controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs){
                $scope.d3Call = function(data, chart){
                    d3.select('#' + $attrs.id + ' svg')
                        .attr('height', $scope.height)
                        .attr('width', $scope.width)
                        .datum(data)
                        .transition().duration(($attrs.transitionduration === undefined ? 500 : $attrs.transitionduration))
                        .call(chart);
                };
            }],
            link: function(scope, element, attrs){
                scope.$watch('data', function(data){
                    if(data){
                        //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
                        if(scope.chart){
                            return scope.d3Call(data, scope.chart);
                        }
                        nv.addGraph({
                            generate: function(){
                                var margin = (scope.$eval(attrs.margin) || {left:50, top:50, bottom:50, right:50});
                                scope.width = (attrs.width || element[0].parentElement.offsetWidth) - (margin.left + margin.right);
                                scope.height = (attrs.height || element[0].parentElement.offsetHeight) - (margin.top + margin.bottom);

                                var chart = nv.models.cumulativeLineChart()
                                    .width(scope.width)
                                    .height(scope.height)
                                    .margin(margin)
                                    .x(attrs.x === undefined ? function(d){ return d[0]; } : scope.x())
                                    .y(attrs.y === undefined ? function(d){ return d[1]; } : scope.y())
                                    .forceX(attrs.forcex === undefined ? [] : scope.$eval(attrs.forcex)) // List of numbers to Force into the X scale (ie. 0, or a max / min, etc.)
                                    .forceY(attrs.forcey === undefined ? [0] : scope.$eval(attrs.forcey)) // List of numbers to Force into the Y scale
                                    .showLegend(attrs.showlegend === undefined ? false : (attrs.showlegend === "true"))
                                    .tooltips(attrs.tooltips === undefined ? false : (attrs.tooltips  === "true"))
                                    .showXAxis(attrs.showxaxis === undefined ? false : (attrs.showxaxis  === "true"))
                                    .showYAxis(attrs.showyaxis === undefined ? false : (attrs.showyaxis  === "true"))
                                    .rightAlignYAxis(attrs.rightalignyaxis === undefined ? false : (attrs.rightalignyaxis  === "true"))
                                    .noData(attrs.nodata === undefined ? 'No Data Available.' : scope.nodata)
                                    .interactive(attrs.interactive === undefined ? false : (attrs.interactive === "true"))
                                    .clipEdge(attrs.clipedge === undefined ? false : (attrs.clipedge === "true"))
                                    .clipVoronoi(attrs.clipvoronoi === undefined ? false : (attrs.clipvoronoi === "true"))
                                    .useVoronoi(attrs.usevoronoi === undefined ? false : (attrs.usevoronoi === "true"))
                                    .average(attrs.average === undefined ? function(d) { return d.average; } : scope.average())
                                    .color(attrs.color === undefined ? d3.scale.category10().range() : scope.color())
                                    .isArea(attrs.isarea === undefined ? false : (attrs.isarea === "true"));
                                    //.rescaleY(attrs.rescaley === undefined ? false : (attrs.rescaley === "true"));

                                if (chart.useInteractiveGuideline) {
                                    chart.useInteractiveGuideline(attrs.useinteractiveguideline === undefined ? false : (attrs.useinteractiveguideline === "true"));
                                }

                                if(attrs.tooltipcontent){
                                    chart.tooltipContent(scope.tooltipcontent());
                                }

                                configureXaxis(chart, scope, attrs);
                                configureYaxis(chart, scope, attrs);

                                scope.d3Call(data, chart);

                                var chartResize = function() {
                                    var currentWidth = parseInt(d3.select('#' + attrs.id + ' svg').attr('width'),10),
                                        currentHeight = parseInt(d3.select('#' + attrs.id + ' svg').attr('height'),10),
                                        newWidth = (attrs.width || element[0].parentElement.offsetWidth) - (margin.left + margin.right),
                                        newHeight = (attrs.height || element[0].parentElement.offsetHeight) - (margin.top + margin.bottom);

                                    if(newHeight < 0){
                                        newHeight = 0;
                                    }

                                    if(newWidth === currentWidth && newHeight === currentHeight) {
                                        return; //Nothing to do, the size is fixed or not changing.
                                    }

                                    d3.select('#' + attrs.id + ' svg').node().remove(); // remove old graph first
                                    nv.log('newWidth',newWidth, 'newHeight', newHeight );
                                    chart.width(newWidth).height(newHeight); //Update the dims
                                    d3.select(element[0]).append("svg")
                                        .attr('id', attrs.id)
                                        .attr('width', newWidth)
                                        .attr('height', newHeight)
                                        .datum(data)
                                        .transition()
                                        .call(chart);
                                };

                                var timeoutPromise;
                                var windowResize = function() {
                                    $timeout.cancel(timeoutPromise);
                                    timeoutPromise = $timeout(chartResize, 100);
                                };
                                $window.addEventListener('resize', windowResize);
                                scope.chart = chart;
                                return chart;
                            }
                        });
                    }
                }, (attrs.objectequality === undefined ? false : (attrs.objectequality === "true")));
            }
        };
    }])
    .directive('egovStackedAreaChart', ['$window', '$timeout', function($window, $timeout){
        return {
            restrict: 'E',
            scope: {
                data: '=',
                width: '@',
                height: '@',
                id: '@',
                showlegend: '@',
                tooltips: '@',
                showcontrols: '@',
                nodata: '@',
                margin: '&',
                tooltipcontent: '&',
                color: '&',
                x: '&',
                y: '&',
                forcex: '@', //List of numbers to Force into the X scale (ie. 0, or a max / min, etc.)
                forcey: '@', // List of numbers to Force into the Y scale
                forcesize: '@', // List of numbers to Force into the Size scale

                //

                interactive: '@',
                usevoronoi: '@',
                clipedge: '@',
                interpolate: '@',
                style: '@',     //stack, stream, stream-center, expand
                order: '@',     //default, inside-out
                offset: '@',    //zero, wiggle, silhouette, expand
                size: '&',      //accessor to get the point size
                xScale: '&',
                yScale: '&',
                xDomain: '&',
                yDomain: '&',
                xRange: '&',
                yRange: '&',
                sizeDomain: '&',
                // add xformat
                xformat: '&',

                //xaxis
                xaxisorient: '&',
                xaxisticks: '&',
                xaxistickvalues: '&xaxistickvalues',
                xaxisticksubdivide: '&',
                xaxisticksize: '&',
                xaxistickpadding: '&',
                xaxistickformat: '&',
                xaxislabel: '&',
                xaxisscale: '&',
                xaxisdomain: '&',
                xaxisrange: '&',
                xaxisrangeband: '&',
                xaxisrangebands: '&',
                xaxisshowmaxmin: '@',
                xaxishighlightzero: '@',
                xaxisrotatelables: '@',
                xaxisrotateylabel: '@',
                xaxisstaggerlabels: '@',

                //yaxis
                yaxisorient: '&',
                yaxisticks: '&',
                yaxistickvalues: '&yaxistickvalues',
                yaxisticksubdivide: '&',
                yaxisticksize: '&',
                yaxistickpadding: '&',
                yaxistickformat: '&',
                yaxislabel: '&',
                yaxisscale: '&',
                yaxisdomain: '&',
                yaxisrange: '&',
                yaxisrangeband: '&',
                yaxisrangebands: '&',
                yaxisshowmaxmin: '@',
                yaxishighlightzero: '@',
                yaxisrotatelables: '@',
                yaxisrotateylabel: '@',
                yaxisstaggerlabels: '@',

                //angularjs specific
                objectequality: '@',

                //d3.js specific
                transitionduration: '@'


            },
            controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs){
                $scope.d3Call = function(data, chart){
                    d3.select('#' + $attrs.id + ' svg')
                        .attr('height', $scope.height)
                        .attr('width', $scope.width)
                        .datum(data)
                        .transition().duration(($attrs.transitionduration === undefined ? 500 : $attrs.transitionduration))
                        .call(chart);
                };
            }],
            link: function(scope, element, attrs){
                scope.$watch('data', function(data){
                    if(data){
                        //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
                        if(scope.chart){
                            return scope.d3Call(data, scope.chart);
                        }
                        nv.addGraph({
                            generate: function(){
                                var margin = (scope.$eval(attrs.margin) || {left:50, top:50, bottom:50, right:50});
                                scope.width = (attrs.width || element[0].parentElement.offsetWidth) - (margin.left + margin.right);
                                scope.height = (attrs.height || element[0].parentElement.offsetHeight) - (margin.top + margin.bottom);

                                var chart = nv.models.stackedAreaChart()
                                    .width(scope.width)
                                    .height(scope.height)
                                    .margin(margin)
                                    .x(attrs.x === undefined ? function(d){ return d[0]; } : scope.x())
                                    .y(attrs.y === undefined ? function(d){ return d[1]; } : scope.y())
                                    .forceX(attrs.forcex === undefined ? [] : scope.$eval(attrs.forcex)) // List of numbers to Force into the X scale (ie. 0, or a max / min, etc.)
                                    .forceY(attrs.forcey === undefined ? [0] : scope.$eval(attrs.forcey)) // List of numbers to Force into the Y scale
                                    .size(attrs.size === undefined ? function(d) { return d.size || 1; } : scope.size())
                                    .forceSize(attrs.forcesize === undefined ? [] : scope.$eval(attrs.forcesize)) // List of numbers to Force into the Size scale
                                    .showLegend(attrs.showlegend === undefined ? false : (attrs.showlegend === "true"))
                                    .showControls(attrs.showcontrols === undefined ? false : (attrs.showcontrols === "true"))
                                    .tooltips(attrs.tooltips === undefined ? false : (attrs.tooltips  === "true"))
                                    .noData(attrs.nodata === undefined ? 'No Data Available.' : scope.nodata)
                                    .interactive(attrs.interactive === undefined ? false : (attrs.interactive === "true"))
                                    .clipEdge(attrs.clipedge === undefined ? false : (attrs.clipedge === "true"))
                                    .color(attrs.color === undefined ? nv.utils.defaultColor()  : scope.color());

                                if (chart.useInteractiveGuideline) {
                                    chart.useInteractiveGuideline(attrs.useinteractiveguideline === undefined ? false : (attrs.useinteractiveguideline === "true"));
                                }

                                if(attrs.usevoronoi){
                                    chart.useVoronoi((attrs.usevoronoi === "true"));
                                }

                                if(attrs.style){
                                    chart.style(attrs.style);
                                }

                                if(attrs.order){
                                    chart.order(attrs.order);
                                }

                                if(attrs.offset){
                                    chart.offset(attrs.offset);
                                }

                                if(attrs.interpolate){
                                    chart.interpolate(attrs.interpolate);
                                }

                                if(attrs.tooltipcontent){
                                    chart.tooltipContent(scope.tooltipcontent());
                                }

                                if(attrs.xscale){
                                    chart.xScale(scope.xscale());
                                }

                                if(attrs.yscale){
                                    chart.yScale(scope.yscale());
                                }

                                if(attrs.xdomain){
                                    chart.xDomain(scope.xdomain());
                                }

                                if(attrs.ydomain){
                                    chart.yDomain(scope.ydomain());
                                }

                                if(attrs.sizedomain){
                                    chart.sizeDomain(scope.sizedomain());
                                }

                                // add xTickFormat
                                if(attrs.xformat){
                                    chart.xAxis.tickFormat(scope.xformat());
                                }

                                configureXaxis(chart, scope, attrs);
                                configureYaxis(chart, scope, attrs);

                                scope.d3Call(data, chart);

                                var chartResize = function() {
                                    var currentWidth = parseInt(d3.select('#' + attrs.id + ' svg').attr('width'),10),
                                        currentHeight = parseInt(d3.select('#' + attrs.id + ' svg').attr('height'),10),
                                        newWidth = (attrs.width || element[0].parentElement.offsetWidth) - (margin.left + margin.right),
                                        newHeight = (attrs.height || element[0].parentElement.offsetHeight) - (margin.top + margin.bottom);

                                    if(newWidth === currentWidth && newHeight === currentHeight) {
                                        return; //Nothing to do, the size is fixed or not changing.
                                    }

                                    d3.select('#' + attrs.id + ' svg').node().remove(); // remove old graph first

                                    chart.width(newWidth).height(newHeight); //Update the dims
                                    d3.select(element[0]).append("svg")
                                        .attr('id', attrs.id)
                                        .attr('width', newWidth)
                                        .attr('height', newHeight)
                                        .datum(data)
                                        .transition()
                                        .duration(500)
                                        .call(chart);
                                };

                                var timeoutPromise;
                                var windowResize = function() {
                                    $timeout.cancel(timeoutPromise);
                                    timeoutPromise = $timeout(chartResize, 100);
                                };

                                $window.addEventListener('resize', windowResize);
                                scope.chart = chart;
                                return chart;
                            }
                        });
                    }
                }, (attrs.objectequality === undefined ? false : (attrs.objectequality === "true")));
            }
        };
    }])
    .directive('egovMultiBarChart', ['$window', '$timeout', function($window, $timeout){
        return {
            restrict: 'E',
            scope: {
                data: '=',
                width: '@',
                height: '@',
                id: '@',
                showlegend: '@',
                tooltips: '@',
                tooltipcontent: '&',
                color: '&',
                showcontrols: '@',
                nodata: '@',
                reducexticks: '@',
                staggerlabels: '@',
                rotatelabels: '@',
                margin: '&',
                x: '&',
                y: '&',
                //forcex is not exposed in the nvd3 multibar.js file.  it is not here on purpose.
                forcey: '@',
                delay: '@',
                stacked: '@',

                //xaxis
                xaxisorient: '&',
                xaxisticks: '&',
                xaxistickvalues: '&xaxistickvalues',
                xaxisticksubdivide: '&',
                xaxisticksize: '&',
                xaxistickpadding: '&',
                xaxistickformat: '&',
                xaxislabel: '&',
                xaxisscale: '&',
                xaxisdomain: '&',
                xaxisrange: '&',
                xaxisrangeband: '&',
                xaxisrangebands: '&',
                xaxisshowmaxmin: '@',
                xaxishighlightzero: '@',
                xaxisrotatelables: '@',
                xaxisrotateylabel: '@',
                xaxisstaggerlabels: '@',

                //yaxis
                yaxisorient: '&',
                yaxisticks: '&',
                yaxistickvalues: '&yaxistickvalues',
                yaxisticksubdivide: '&',
                yaxisticksize: '&',
                yaxistickpadding: '&',
                yaxistickformat: '&',
                yaxislabel: '&',
                yaxisscale: '&',
                yaxisdomain: '&',
                yaxisrange: '&',
                yaxisrangeband: '&',
                yaxisrangebands: '&',
                yaxisshowmaxmin: '@',
                yaxishighlightzero: '@',
                yaxisrotatelables: '@',
                yaxisrotateylabel: '@',
                yaxisstaggerlabels: '@',

                //angularjs specific
                objectequality: '@',

                //d3.js specific
                transitionduration: '@'


            },
            controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs){
                $scope.d3Call = function(data, chart){
                    d3.select('#' + $attrs.id + ' svg')
                        .attr('height', $scope.height)
                        .attr('width', $scope.width)
                        .datum(data)
                        .transition().duration(($attrs.transitionduration === undefined ? 500 : $attrs.transitionduration))
                        .call(chart);
                };
            }],
            link: function(scope, element, attrs){
                scope.$watch('data', function(data){
                    if(data){
                        //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
                        if(scope.chart){
                            return scope.d3Call(data, scope.chart);
                        }
                        nv.addGraph({
                            generate: function(){
                                var margin = (scope.$eval(attrs.margin) || {left:50, top:50, bottom:50, right:50});
                                scope.width = (attrs.width || element[0].parentElement.offsetWidth) - (margin.left + margin.right);
                                scope.height = (attrs.height || element[0].parentElement.offsetHeight) - (margin.top + margin.bottom);

                                var chart = nv.models.multiBarChart()
                                    .width(scope.width)
                                    .height(scope.height)
                                    .margin(margin)
                                    .x(attrs.x === undefined ? function(d){ return d[0]; } : scope.x())
                                    .y(attrs.y === undefined ? function(d){ return d[1]; } : scope.y())
                                    .forceY(attrs.forcey === undefined ? [0] : scope.$eval(attrs.forcey)) // List of numbers to Force into the Y scale
                                    .showLegend(attrs.showlegend === undefined ? false : (attrs.showlegend === "true"))
                                    .showControls(attrs.showcontrols === undefined ? false : (attrs.showcontrols === "true"))
                                    .tooltips(attrs.tooltips === undefined ? false : (attrs.tooltips  === "true"))
                                    .reduceXTicks(attrs.reducexticks === undefined ? false: (attrs.reducexticks === "true"))
                                    .staggerLabels(attrs.staggerlabels === undefined ? false : (attrs.staggerlabels === "true"))
                                    .noData(attrs.nodata === undefined ? 'No Data Available.' : scope.nodata)
                                    .rotateLabels(attrs.rotatelabels === undefined ? 0 : attrs.rotatelabels)
                                    .color(attrs.color === undefined ? nv.utils.defaultColor()  : scope.color())
                                    .delay(attrs.delay === undefined ? 1200 : attrs.delay)
                                    .stacked(attrs.stacked === undefined ? false : (attrs.stacked === "true"));

                                configureXaxis(chart, scope, attrs);
                                configureYaxis(chart, scope, attrs);

                                if(attrs.tooltipcontent){
                                    chart.tooltipContent(scope.tooltipcontent());
                                }

                                scope.d3Call(data, chart);

                                var chartResize = function() {
                                    var currentWidth = parseInt(d3.select('#' + attrs.id + ' svg').attr('width'),10),
                                        currentHeight = parseInt(d3.select('#' + attrs.id + ' svg').attr('height'),10),
                                        newWidth = (attrs.width || element[0].parentElement.offsetWidth) - (margin.left + margin.right),
                                        newHeight = (attrs.height || element[0].parentElement.offsetHeight) - (margin.top + margin.bottom);

                                    if(newWidth === currentWidth && newHeight === currentHeight) {
                                        return; //Nothing to do, the size is fixed or not changing.
                                    }

                                    d3.select('#' + attrs.id + ' svg').node().remove(); // remove old graph first

                                    chart.width(newWidth).height(newHeight); //Update the dims
                                    d3.select(element[0]).append("svg")
                                        .attr('id', attrs.id)
                                        .attr('width', newWidth)
                                        .attr('height', newHeight)
                                        .datum(data)
                                        .transition()
                                        .duration(500)
                                        .call(chart);
                                };

                                var timeoutPromise;
                                var windowResize = function() {
                                    $timeout.cancel(timeoutPromise);
                                    timeoutPromise = $timeout(chartResize, 100);
                                };

                                $window.addEventListener('resize', windowResize);
                                scope.chart = chart;
                                return chart;
                            }
                        });
                    }
                }, (attrs.objectequality === undefined ? false : (attrs.objectequality === "true")));
            }
        };
    }])
    .directive('egovDiscreteBarChart', ['$window', '$timeout', function($window, $timeout){
        return {
            restrict: 'E',
            scope: {
                data: '=',
                width: '@',
                height: '@',
                id: '@',
                tooltips: '@',
                tooltipcontent: '&',
                staggerlabels: '@',
                color: '&',
                margin: '&',
                nodata: '@',
                x: '&',
                y: '&',
                //forcex is not exposed in the nvd3 multibar.js file.  it is not here on purpose.
                forcey: '@',
                showvalues: '@',
                valueformat: '&',

                //xaxis
                xaxisorient: '&',
                xaxisticks: '&',
                xaxistickvalues: '&xaxistickvalues',
                xaxisticksubdivide: '&',
                xaxisticksize: '&',
                xaxistickpadding: '&',
                xaxistickformat: '&',
                xaxislabel: '&',
                xaxisscale: '&',
                xaxisdomain: '&',
                xaxisrange: '&',
                xaxisrangeband: '&',
                xaxisrangebands: '&',
                xaxisshowmaxmin: '@',
                xaxishighlightzero: '@',
                xaxisrotatelables: '@',
                xaxisrotateylabel: '@',
                xaxisstaggerlabels: '@',

                //yaxis
                yaxisorient: '&',
                yaxisticks: '&',
                yaxistickvalues: '&yaxistickvalues',
                yaxisticksubdivide: '&',
                yaxisticksize: '&',
                yaxistickpadding: '&',
                yaxistickformat: '&',
                yaxislabel: '&',
                yaxisscale: '&',
                yaxisdomain: '&',
                yaxisrange: '&',
                yaxisrangeband: '&',
                yaxisrangebands: '&',
                yaxisshowmaxmin: '@',
                yaxishighlightzero: '@',
                yaxisrotatelables: '@',
                yaxisrotateylabel: '@',
                yaxisstaggerlabels: '@',

                //angularjs specific
                objectequality: '@',

                //d3.js specific
                transitionduration: '@'

            },
            controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs){
                $scope.d3Call = function(data, chart){
                    d3.select('#' + $attrs.id + ' svg')
                        .attr('height', $scope.height)
                        .attr('width', $scope.width)
                        .datum(data)
                        .transition().duration(($attrs.transitionduration === undefined ? 500 : $attrs.transitionduration))
                        .call(chart);
                };
            }],
            link: function(scope, element, attrs){
                scope.$watch('data', function(data){
                    if(data){
                        //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
                        if(scope.chart){
                            return scope.d3Call(data, scope.chart);
                        }
                        nv.addGraph({
                            generate: function(){
                                var margin = (scope.$eval(attrs.margin) || {left:50, top:50, bottom:50, right:50});
                                scope.width = (attrs.width || element[0].parentElement.offsetWidth) - (margin.left + margin.right);
                                scope.height = (attrs.height || element[0].parentElement.offsetHeight) - (margin.top + margin.bottom);

                                var chart = nv.models.discreteBarChart()
                                    .width(scope.width)
                                    .height(scope.height)
                                    .margin(margin)
                                    .x(attrs.x === undefined ? function(d){ return d[0]; } : scope.x())
                                    .y(attrs.y === undefined ? function(d){ return d[1]; } : scope.y())
                                    .forceY(attrs.forcey === undefined ? [0] : scope.$eval(attrs.forcey)) // List of numbers to Force into the Y scale
                                    .showValues(attrs.showvalues === undefined ? false : (attrs.showvalues === "true"))
                                    .tooltips(attrs.tooltips === undefined ? false : (attrs.tooltips  === "true"))
                                    .noData(attrs.nodata === undefined ? 'No Data Available.' : scope.nodata)
                                    .staggerLabels(attrs.staggerlabels === undefined ? false : (attrs.staggerlabels === "true"))
                                    .color(attrs.color === undefined ? nv.utils.defaultColor()  : scope.color());

                                configureXaxis(chart, scope, attrs);
                                configureYaxis(chart, scope, attrs);

                                if(attrs.tooltipcontent){
                                    chart.tooltipContent(scope.tooltipcontent());
                                }

                                if(attrs.valueformat){
                                    chart.valueFormat(scope.valueformat());
                                }

                                scope.d3Call(data, chart);

                                var chartResize = function() {
                                    var currentWidth = parseInt(d3.select('#' + attrs.id + ' svg').attr('width'),10),
                                        currentHeight = parseInt(d3.select('#' + attrs.id + ' svg').attr('height'),10),
                                        newWidth = (attrs.width || element[0].parentElement.offsetWidth) - (margin.left + margin.right),
                                        newHeight = (attrs.height || element[0].parentElement.offsetHeight) - (margin.top + margin.bottom);

                                    if(newWidth === currentWidth && newHeight === currentHeight) {
                                        return; //Nothing to do, the size is fixed or not changing.
                                    }

                                    d3.select('#' + attrs.id + ' svg').node().remove(); // remove old graph first

                                    chart.width(newWidth).height(newHeight); //Update the dims
                                    d3.select(element[0]).append("svg")
                                        .attr('id', attrs.id)
                                        .attr('width', newWidth)
                                        .attr('height', newHeight)
                                        .datum(data)
                                        .transition()
                                        .duration(500)
                                        .call(chart);
                                };

                                var timeoutPromise;
                                var windowResize = function() {
                                    $timeout.cancel(timeoutPromise);
                                    timeoutPromise = $timeout(chartResize, 100);
                                };

                                $window.addEventListener('resize', windowResize);
                                scope.chart = chart;
                                return chart;
                            }
                        });
                    }
                }, (attrs.objectequality === undefined ? false : (attrs.objectequality === "true")));
            }
        };
    }])
    .directive('egovHistoricalBarChart', ['$window', '$timeout', function($window, $timeout){
        return {
            restrict: 'E',
            scope: {
                data: '=',
                width: '@',
                height: '@',
                id: '@',
                tooltips: '@',
                tooltipcontent: '&',
                color: '&',
                margin: '&',
                nodata: '@',
                x: '&',
                y: '&',
//                forcex: '@',
                forcey: '@',
                isarea: '@',
                interactive: '@',
                clipedge: '@',
                clipvoronoi: '@',
                interpolate: '@',
                highlightPoint: '@',
                clearHighlights: '@',

                //xaxis
                xaxisorient: '&',
                xaxisticks: '&',
                xaxistickvalues: '&xaxistickvalues',
                xaxisticksubdivide: '&',
                xaxisticksize: '&',
                xaxistickpadding: '&',
                xaxistickformat: '&',
                xaxislabel: '&',
                xaxisscale: '&',
                xaxisdomain: '&',
                xaxisrange: '&',
                xaxisrangeband: '&',
                xaxisrangebands: '&',
                xaxisshowmaxmin: '@',
                xaxishighlightzero: '@',
                xaxisrotatelables: '@',
                xaxisrotateylabel: '@',
                xaxisstaggerlabels: '@',

                //yaxis
                yaxisorient: '&',
                yaxisticks: '&',
                yaxistickvalues: '&yaxistickvalues',
                yaxisticksubdivide: '&',
                yaxisticksize: '&',
                yaxistickpadding: '&',
                yaxistickformat: '&',
                yaxislabel: '&',
                yaxisscale: '&',
                yaxisdomain: '&',
                yaxisrange: '&',
                yaxisrangeband: '&',
                yaxisrangebands: '&',
                yaxisshowmaxmin: '@',
                yaxishighlightzero: '@',
                yaxisrotatelables: '@',
                yaxisrotateylabel: '@',
                yaxisstaggerlabels: '@',

                //angularjs specific
                objectequality: '@',

                //d3.js specific
                transitionduration: '@'

            },
            controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs){
                $scope.d3Call = function(data, chart){
                    d3.select('#' + $attrs.id + ' svg')
                        .attr('height', $scope.height)
                        .attr('width', $scope.width)
                        .datum(data)
                        .transition().duration(($attrs.transitionduration === undefined ? 500 : $attrs.transitionduration))
                        .call(chart);
                };
            }],
            link: function(scope, element, attrs){
                scope.$watch('data', function(data){
                    if(data){
                        //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
                        if(scope.chart){
                            return scope.d3Call(data, scope.chart);
                        }
                        nv.addGraph({
                            generate: function(){
                                var margin = (scope.$eval(attrs.margin) || {left:50, top:50, bottom:50, right:50});
                                    scope.width = (attrs.width || element[0].parentElement.offsetWidth) - (margin.left + margin.right);
                                    scope.height = (attrs.height || element[0].parentElement.offsetHeight) - (margin.top + margin.bottom);

                                var chart = nv.models.historicalBarChart()
                                    .width(scope.width)
                                    .height(scope.height)
                                    .margin(margin)
                                    .x(attrs.x === undefined ? function(d){ return d[0]; } : scope.x())
                                    .y(attrs.y === undefined ? function(d){ return d[1]; } : scope.y())
                                    .forceY(attrs.forcey === undefined ? [0] : scope.$eval(attrs.forcey)) // List of numbers to Force into the Y scale
                                    .tooltips(attrs.tooltips === undefined ? false : (attrs.tooltips  === "true"))
                                    .noData(attrs.nodata === undefined ? 'No Data Available.' : scope.nodata)
                                    .interactive(attrs.interactive === undefined ? false : (attrs.interactive === "true"))
                                    .color(attrs.color === undefined ? nv.utils.defaultColor()  : scope.color());

                                configureXaxis(chart, scope, attrs);
                                configureYaxis(chart, scope, attrs);

                                if (chart.useInteractiveGuideline) {
                                    chart.useInteractiveGuideline(attrs.useinteractiveguideline === undefined ? false : (attrs.useinteractiveguideline === "true"));
                                }

                                if(attrs.tooltipcontent){
                                    chart.tooltipContent(scope.tooltipcontent());
                                }

                                if(attrs.valueformat){
                                    chart.valueFormat(scope.valueformat());
                                }

                                scope.d3Call(data, chart);

                                var chartResize = function() {
                                    var currentWidth = parseInt(d3.select('#' + attrs.id + ' svg').attr('width'),10),
                                        currentHeight = parseInt(d3.select('#' + attrs.id + ' svg').attr('height'),10),
                                        newWidth = (attrs.width || element[0].parentElement.offsetWidth) - (margin.left + margin.right),
                                        newHeight = (attrs.height || element[0].parentElement.offsetHeight) - (margin.top + margin.bottom);

                                    if(newWidth === currentWidth && newHeight === currentHeight) {
                                        return; //Nothing to do, the size is fixed or not changing.
                                    }

                                    d3.select('#' + attrs.id + ' svg').node().remove(); // remove old graph first

                                    chart.width(newWidth).height(newHeight); //Update the dims
                                    d3.select(element[0]).append("svg")
                                        .attr('id', attrs.id)
                                        .attr('width', newWidth)
                                        .attr('height', newHeight)
                                        .datum(data)
                                        .transition()
                                        .duration(500)
                                        .call(chart);
                                };

                                var timeoutPromise;
                                var windowResize = function() {
                                    $timeout.cancel(timeoutPromise);
                                    timeoutPromise = $timeout(chartResize, 100);
                                };

                                $window.addEventListener('resize', windowResize);
                                scope.chart = chart;
                                return chart;
                            }
                        });
                    }
                }, (attrs.objectequality === undefined ? false : (attrs.objectequality === "true")));
            }
        };
    }])
    .directive('egovMultiBarHorizontalChart', ['$window', '$timeout', function($window, $timeout){
        return {
            restrict: 'E',
            scope: {
                data: '=',
                width: '@',
                height: '@',
                id: '@',
                showlegend: '@',
                tooltips: '@',
                tooltipcontent: '&',
                color: '&',
                showcontrols: '@',
                margin: '&',
                nodata: '@',
                x: '&',
                y: '&',
                //forcex: '@',  //forcex is rebound from multibarhorizontalchart, but is not on multibar
                forcey: '@',
                stacked: '@',
                showvalues: '@',
                valueformat: '&',
                //'xDomain', 'yDomain',
                //state: '@', //stacked, grouped: same as stacked === true, or stacked === false

                //xaxis
                xaxisorient: '&',
                xaxisticks: '&',
                xaxistickvalues: '&xaxistickvalues',
                xaxisticksubdivide: '&',
                xaxisticksize: '&',
                xaxistickpadding: '&',
                xaxistickformat: '&',
                xaxislabel: '&',
                xaxisscale: '&',
                xaxisdomain: '&',
                xaxisrange: '&',
                xaxisrangeband: '&',
                xaxisrangebands: '&',
                xaxisshowmaxmin: '@',
                xaxishighlightzero: '@',
                xaxisrotatelables: '@',
                xaxisrotateylabel: '@',
                xaxisstaggerlabels: '@',

                //yaxis
                yaxisorient: '&',
                yaxisticks: '&',
                yaxistickvalues: '&yaxistickvalues',
                yaxisticksubdivide: '&',
                yaxisticksize: '&',
                yaxistickpadding: '&',
                yaxistickformat: '&',
                yaxislabel: '&',
                yaxisscale: '&',
                yaxisdomain: '&',
                yaxisrange: '&',
                yaxisrangeband: '&',
                yaxisrangebands: '&',
                yaxisshowmaxmin: '@',
                yaxishighlightzero: '@',
                yaxisrotatelables: '@',
                yaxisrotateylabel: '@',
                yaxisstaggerlabels: '@',

                //angularjs specific
                objectequality: '@',

                //d3.js specific
                transitionduration: '@'

            },
            controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs){
                $scope.d3Call = function(data, chart){
                    d3.select('#' + $attrs.id + ' svg')
                        .attr('height', $scope.height)
                        .attr('width', $scope.width)
                        .datum(data)
                        .transition().duration(($attrs.transitionduration === undefined ? 500 : $attrs.transitionduration))
                        .call(chart);
                };
            }],
            link: function(scope, element, attrs){
                scope.$watch('data', function(data){
                    if(data){
                        //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
                        if(scope.chart){
                            return scope.d3Call(data, scope.chart);
                        }
                        nv.addGraph({
                            generate: function(){
                                var margin = (scope.$eval(attrs.margin) || {left:50, top:50, bottom:50, right:50});
                                    scope.width = (attrs.width || element[0].parentElement.offsetWidth) - (margin.left + margin.right);
                                    scope.height = (attrs.height || element[0].parentElement.offsetHeight) - (margin.top + margin.bottom);

                                var chart = nv.models.multiBarHorizontalChart()
                                    .width(scope.width)
                                    .height(scope.height)
                                    .margin(margin)
                                    .x(attrs.x === undefined ? function(d){ return d[0]; } : scope.x())
                                    .y(attrs.y === undefined ? function(d){ return d[1]; } : scope.y())
                                    .forceY(attrs.forcey === undefined ? [0] : scope.$eval(attrs.forcey))
                                    .tooltips(attrs.tooltips === undefined ? false : (attrs.tooltips  === "true"))
                                    .noData(attrs.nodata === undefined ? 'No Data Available.' : scope.nodata)
                                    .color(attrs.color === undefined ? nv.utils.defaultColor()  : scope.color())
                                    .showLegend(attrs.showlegend === undefined ? false : (attrs.showlegend === "true"))
                                    .showControls(attrs.showcontrols === undefined ? false : (attrs.showcontrols === "true"))
                                    .showValues(attrs.showvalues === undefined ? false : (attrs.showvalues === "true"))
                                    .stacked(attrs.stacked === undefined ? false : (attrs.stacked === "true"));

                                configureXaxis(chart, scope, attrs);
                                configureYaxis(chart, scope, attrs);

                                if(attrs.tooltipcontent){
                                    chart.tooltipContent(scope.tooltipcontent());
                                }

                                if(attrs.valueformat){
                                    chart.valueFormat(scope.valueformat());
                                }

                                scope.d3Call(data, chart);

                                var chartResize = function() {
                                    var currentWidth = parseInt(d3.select('#' + attrs.id + ' svg').attr('width'),10),
                                        currentHeight = parseInt(d3.select('#' + attrs.id + ' svg').attr('height'),10),
                                        newWidth = (attrs.width || element[0].parentElement.offsetWidth) - (margin.left + margin.right),
                                        newHeight = (attrs.height || element[0].parentElement.offsetHeight) - (margin.top + margin.bottom);

                                    if(newWidth === currentWidth && newHeight === currentHeight) {
                                        return; //Nothing to do, the size is fixed or not changing.
                                    }

                                    d3.select('#' + attrs.id + ' svg').node().remove(); // remove old graph first

                                    chart.width(newWidth).height(newHeight); //Update the dims
                                    d3.select(element[0]).append("svg")
                                        .attr('id', attrs.id)
                                        .attr('width', newWidth)
                                        .attr('height', newHeight)
                                        .datum(data)
                                        .transition()
                                        .duration(500)
                                        .call(chart);
                                };

                                var timeoutPromise;
                                var windowResize = function() {
                                    $timeout.cancel(timeoutPromise);
                                    timeoutPromise = $timeout(chartResize, 100);
                                };

                                $window.addEventListener('resize', windowResize);
                                scope.chart = chart;
                                return chart;
                            }
                        });
                    }
                }, (attrs.objectequality === undefined ? false : (attrs.objectequality === "true")));
            }
        };
    }])
    .directive('egovPieChart', ['$window', '$timeout', function($window, $timeout){
        return {
            restrict: 'E',
            scope: {
                data: '=',
                width: '@',
                height: '@',
                id: '@',
                showlabels: '@',
                showlegend: '@',
                donutLabelsOutside: '@',
                pieLabelsOutside: '@',
                labelType: '@',
                nodata: '@',
                margin: '&',
                x: '&',
                y: '&',
                color: '&',
                donut: '@',
                donutRatio: '@',
                labelThreshold: '@',
                description: '&',
                tooltips: '@',
                tooltipcontent: '&',
                valueFormat: '&',

                //angularjs specific
                objectequality: '@',

                //d3.js specific
                transitionduration: '@'

            },
            controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs){
                $scope.d3Call = function(data, chart){
                    d3.select('#' + $attrs.id + ' svg')
                        .attr('height', $scope.height)
                        .attr('width', $scope.width)
                        .datum(data)
                        .transition().duration(($attrs.transitionduration === undefined ? 500 : $attrs.transitionduration))
                        .call(chart);
                };
            }],
            link: function(scope, element, attrs){
                scope.$watch('data', function(data){
                    if(data){
                        //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
                        if(scope.chart){
                            return scope.d3Call(data, scope.chart);
                        }
                        nv.addGraph({
                            generate: function(){
                                var margin = (scope.$eval(attrs.margin) || {left:50, top:50, bottom:50, right:50});
                                scope.width = (attrs.width || element[0].parentElement.offsetWidth) - (margin.left + margin.right);
                                scope.height = (attrs.height || element[0].parentElement.offsetHeight) - (margin.top + margin.bottom);

                                var chart = nv.models.pieChart()
                                    .x(attrs.x === undefined ? function(d){ return d[0]; } : scope.x())
                                    .y(attrs.y === undefined ? function(d){ return d[1]; } : scope.y())
                                    .width(scope.width)
                                    .height(scope.height)
                                    .margin(margin)
                                    .tooltips(attrs.tooltips === undefined ? false : (attrs.tooltips  === "true"))
                                    .noData(attrs.nodata === undefined ? 'No Data Available.' : scope.nodata)
                                    .showLabels(attrs.showlabels === undefined ? false : (attrs.showlabels === "true"))
                                    .labelThreshold(attrs.labelThreshold === undefined ? 0.02 : attrs.labelthreshold)
                                    .labelType(attrs.labeltype === undefined ? 'key' : attrs.labeltype)
                                    .pieLabelsOutside(attrs.pielabelsoutside === undefined ? true : (attrs.pielabelsoutside === "true"))
                                    .valueFormat(attrs.valueformat === undefined ? d3.format(',.2f') : attrs.valueformat)
                                    .showLegend(attrs.showlegend === undefined ? false : (attrs.showlegend === "true"))
                                    .description(attrs.description === undefined ?  function(d) { return d.description; } : scope.description())
                                    .color(attrs.color === undefined ? nv.utils.defaultColor()  : scope.color())
                                    .donutLabelsOutside(attrs.donutlabelsoutside === undefined ? false : (attrs.donutlabelsoutside === "true"))
                                    .donut(attrs.donut === undefined ? false : (attrs.donut === "true"))
                                    .donutRatio(attrs.donutratio === undefined ? 0.5 : (attrs.donutratio));

                                if(attrs.tooltipcontent){
                                    chart.tooltipContent(scope.tooltipcontent());
                                }

                                scope.d3Call(data, chart);

                                var chartResize = function() {
                                    var currentWidth = parseInt(d3.select('#' + attrs.id + ' svg').attr('width'),10),
                                        currentHeight = parseInt(d3.select('#' + attrs.id + ' svg').attr('height'),10),
                                        newWidth = (attrs.width || element[0].parentElement.offsetWidth) - (margin.left + margin.right),
                                        newHeight = (attrs.height || element[0].parentElement.offsetHeight) - (margin.top + margin.bottom);

//                                    if(newWidth === currentWidth && newHeight === currentHeight) {
//                                        return; //Nothing to do, the size is fixed or not changing.
//                                    }

                                    d3.select('#' + attrs.id + ' svg').node().remove(); // remove old graph first

                                    chart.width(newWidth).height(newHeight); //Update the dims
                                    d3.select(element[0]).append("svg")
                                        .attr('id', attrs.id)
                                        .attr('width', newWidth)
                                        .attr('height', newHeight)
                                        .datum(data)
                                        .transition()
                                        .duration((attrs.transitionduration === undefined ? 500 : attrs.transitionduration))
                                        .call(chart);
                                };

                                var timeoutPromise;
                                var windowResize = function() {
                                    $timeout.cancel(timeoutPromise);
                                    timeoutPromise = $timeout(chartResize, 100);
                                };

                                $window.addEventListener('resize', windowResize);
                                
                                scope.$on("resize", chartResize);

                                scope.chart = chart;
                                return chart;
                            }
                        });
                    }
                }, (attrs.objectequality === undefined ? false : (attrs.objectequality === "true")));
            }
        };
    }])
    .directive('egovScatterChart', ['$window', '$timeout', function($window, $timeout){
        return {
            restrict: 'E',
            scope: {
                data: '=',
                width: '@',
                height: '@',
                id: '@',
                showlegend: '@',
                tooltips: '@',
                showcontrols: '@',
                showDistX: '@',
                showDistY: '@',
                rightAlignYAxis: '@',
                fisheye: '@',
                xPadding: '@',
                yPadding: '@',
                tooltipContent: '&',
                tooltipXContent: '&',
                tooltipYContent: '&',
                color: '&',
                margin: '&',
                nodata: '@',
                transitionDuration: '@',
                shape: '&',
                onlyCircles: '@',
                interactive: '@',

                //xaxis
                xaxisorient: '&',
                xaxisticks: '&',
                xaxistickvalues: '&xaxistickvalues',
                xaxisticksubdivide: '&',
                xaxisticksize: '&',
                xaxistickpadding: '&',
                xaxistickformat: '&',
                xaxislabel: '&',
                xaxisscale: '&',
                xaxisdomain: '&',
                xaxisrange: '&',
                xaxisrangeband: '&',
                xaxisrangebands: '&',
                xaxisshowmaxmin: '@',
                xaxishighlightzero: '@',
                xaxisrotatelables: '@',
                xaxisrotateylabel: '@',
                xaxisstaggerlabels: '@',

                //yaxis
                yaxisorient: '&',
                yaxisticks: '&',
                yaxistickvalues: '&yaxistickvalues',
                yaxisticksubdivide: '&',
                yaxisticksize: '&',
                yaxistickpadding: '&',
                yaxistickformat: '&',
                yaxislabel: '&',
                yaxisscale: '&',
                yaxisdomain: '&',
                yaxisrange: '&',
                yaxisrangeband: '&',
                yaxisrangebands: '&',
                yaxisshowmaxmin: '@',
                yaxishighlightzero: '@',
                yaxisrotatelables: '@',
                yaxisrotateylabel: '@',
                yaxisstaggerlabels: '@',

                //angularjs specific
                objectequality: '@',

                //d3.js specific
                transitionduration: '@'

            },
            controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs){
                $scope.d3Call = function(data, chart){
                    d3.select('#' + $attrs.id + ' svg')
                        .attr('height', $scope.height)
                        .attr('width', $scope.width)
                        .datum(data)
                        .transition().duration(($attrs.transitionduration === undefined ? 500 : $attrs.transitionduration))
                        .call(chart);
                };
            }],
            link: function(scope, element, attrs){
                scope.$watch('data', function(data){
                    if(data){
                        //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
                        if(scope.chart){
                            return scope.d3Call(data, scope.chart);
                        }
                        nv.addGraph({
                            generate: function(){
                                var margin = (scope.$eval(attrs.margin) || {left:50, top:50, bottom:50, right:50});
                                    scope.width = (attrs.width || element[0].parentElement.offsetWidth) - (margin.left + margin.right);
                                    scope.height = (attrs.height || element[0].parentElement.offsetHeight) - (margin.top + margin.bottom);

                                var chart = nv.models.scatterChart()
                                    .width(scope.width)
                                    .height(scope.height)
                                    .margin(margin)
                                    .interactive(attrs.interactive === undefined ? false : (attrs.interactive === "true"))
                                    .tooltips(attrs.tooltips === undefined ? false : (attrs.tooltips  === "true"))
                                    .tooltipContent(attrs.tooltipContent === undefined ? null : scope.tooltipContent())
                                    .tooltipXContent(attrs.tooltipxcontent === undefined ? function(key, x) { return '<strong>' + x + '</strong>'; } : scope.tooltipXContent())
                                    .tooltipYContent(attrs.tooltipycontent === undefined ? function(key, x, y) { return '<strong>' + y + '</strong>'; } : scope.tooltipYContent())
                                    .showControls(attrs.showcontrols === undefined ? false : (attrs.showcontrols === "true"))
                                    .showLegend(attrs.showlegend === undefined ? false : (attrs.showlegend === "true"))
                                    .showDistX(attrs.showdistx === undefined ? false : (attrs.showdistx === "true"))
                                    .showDistY(attrs.showdisty === undefined ? false : (attrs.showdisty === "true"))
                                    .xPadding(attrs.xpadding === undefined ? 0 : (+attrs.xpadding))
                                    .yPadding(attrs.ypadding === undefined ? 0 : (+attrs.ypadding))
                                    .fisheye(attrs.fisheye === undefined ? 0 : (+attrs.fisheye))
                                    .noData(attrs.nodata === undefined ? 'No Data Available.' : scope.nodata)
                                    .color(attrs.color === undefined ? nv.utils.defaultColor()  : scope.color())
                                    .transitionDuration(attrs.transitionduration === undefined ? 250 : (+attrs.transitionduration));

                                if(attrs.shape){
                                    chart.scatter.onlyCircles(false);
                                    chart.scatter.shape(attrs.shape === undefined ? function(d) { return d.shape || 'circle'; } : scope.shape());
                                }


//'interactive', 'pointActive', 'x', 'y', 'shape', 'size', 'xScale', 'yScale', 'zScale', 'xDomain', 'yDomain', 'xRange', 'yRange', 'sizeDomain', 'sizeRange', 'forceX', 'forceY', 'forceSize', 'clipVoronoi', 'clipRadius', 'useVoronoi'

                                configureXaxis(chart, scope, attrs);
                                configureYaxis(chart, scope, attrs);

                                scope.d3Call(data, chart);

                                var chartResize = function() {
                                    var currentWidth = parseInt(d3.select('#' + attrs.id + ' svg').attr('width'),10),
                                        currentHeight = parseInt(d3.select('#' + attrs.id + ' svg').attr('height'),10),
                                        newWidth = (attrs.width || element[0].parentElement.offsetWidth) - (margin.left + margin.right),
                                        newHeight = (attrs.height || element[0].parentElement.offsetHeight) - (margin.top + margin.bottom);

                                    if(newWidth === currentWidth && newHeight === currentHeight) {
                                        return; //Nothing to do, the size is fixed or not changing.
                                    }

                                    d3.select('#' + attrs.id + ' svg').node().remove(); // remove old graph first

                                    chart.width(newWidth).height(newHeight); //Update the dims
                                    d3.select(element[0]).append("svg")
                                        .attr('id', attrs.id)
                                        .attr('width', newWidth)
                                        .attr('height', newHeight)
                                        .datum(data)
                                        .transition()
                                        .duration(500)
                                        .call(chart);
                                };

                                var timeoutPromise;
                                var windowResize = function() {
                                    $timeout.cancel(timeoutPromise);
                                    timeoutPromise = $timeout(chartResize, 100);
                                };

                                $window.addEventListener('resize', windowResize);
                                scope.chart = chart;
                                return chart;
                            }
                        });
                    }
                }, (attrs.objectequality === undefined ? false : (attrs.objectequality === "true")));
            }
        };
    }])
    .directive('egovLinePlusBarChart', ['$window', '$timeout', function($window, $timeout){
        return {
            restrict: 'E',
            scope: {
                data: '=',
                width: '@',
                height: '@',
                id: '@',
                showlegend: '@',
                tooltips: '@',
                showxaxis: '@',
                showyaxis: '@',
                rightalignyaxis: '@',
                defaultstate: '@',
                nodata: '@',
                margin: '&',
                tooltipcontent: '&',
                color: '&',
                x: '&',
                y: '&',
                clipvoronoi: '@',
                interpolate: '@',
//                'xScale', 'yScale', 'xDomain', 'yDomain', defined

                //xaxis
                xaxisorient: '&',
                xaxisticks: '&',
                xaxistickvalues: '&xaxistickvalues',
                xaxisticksubdivide: '&',
                xaxisticksize: '&',
                xaxistickpadding: '&',
                xaxistickformat: '&',
                xaxislabel: '&',
                xaxisscale: '&',
                xaxisdomain: '&',
                xaxisrange: '&',
                xaxisrangeband: '&',
                xaxisrangebands: '&',
                xaxisshowmaxmin: '@',
                xaxishighlightzero: '@',
                xaxisrotatelables: '@',
                xaxisrotateylabel: '@',
                xaxisstaggerlabels: '@',

                //yaxis
                yaxisorient: '&',
                yaxisticks: '&',
                yaxistickvalues: '&yaxistickvalues',
                yaxisticksubdivide: '&',
                yaxisticksize: '&',
                yaxistickpadding: '&',
                yaxistickformat: '&',
                yaxislabel: '&',
                yaxisscale: '&',
                yaxisdomain: '&',
                yaxisrange: '&',
                yaxisrangeband: '&',
                yaxisrangebands: '&',
                yaxisshowmaxmin: '@',
                yaxishighlightzero: '@',
                yaxisrotatelables: '@',
                yaxisrotateylabel: '@',
                yaxisstaggerlabels: '@',

                //yaxis
                y2axisorient: '&',
                y2axisticks: '&',
                y2axistickvalues: '&',
                y2axisticksubdivide: '&',
                y2axisticksize: '&',
                y2axistickpadding: '&',
                y2axistickformat: '&',
                y2axislabel: '&',
                y2axisscale: '&',
                y2axisdomain: '&',
                y2axisrange: '&',
                y2axisrangeband: '&',
                y2axisrangebands: '&',
                y2axisshowmaxmin: '@',
                y2axishighlightzero: '@',
                y2axisrotatelables: '@',
                y2axisrotateylabel: '@',
                y2axisstaggerlabels: '@',

                //angularjs specific
                objectequality: '@',

                //d3.js specific
                transitionduration: '@'

            },
            controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs){
                $scope.d3Call = function(data, chart){
                    d3.select('#' + $attrs.id + ' svg')
                        .attr('height', $scope.height)
                        .attr('width', $scope.width)
                        .datum(data)
                        .transition().duration(($attrs.transitionduration === undefined ? 500 : $attrs.transitionduration))
                        .call(chart);
                };
            }],
            link: function(scope, element, attrs){
                scope.$watch('data', function(data){
                    if(data){
                        //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
                        if(scope.chart){
                            return scope.d3Call(data, scope.chart);
                        }
                        nv.addGraph({
                            generate: function(){
                                var margin = (scope.$eval(attrs.margin) || {left:50, top:50, bottom:50, right:50});
                                    scope.width = (attrs.width || element[0].parentElement.offsetWidth) - (margin.left + margin.right);
                                    scope.height = (attrs.height || element[0].parentElement.offsetHeight) - (margin.top + margin.bottom);

                                var chart = nv.models.linePlusBarChart()
                                    .width(scope.width)
                                    .height(scope.height)
                                    .margin(margin)
                                    .x(attrs.x === undefined ? function(d){ return d[0]; } : scope.x())
                                    .y(attrs.y === undefined ? function(d){ return d[1]; } : scope.y())
                                    .showLegend(attrs.showlegend === undefined ? false : (attrs.showlegend === "true"))
                                    .tooltips(attrs.tooltips === undefined ? false : (attrs.tooltips  === "true"))
                                    .noData(attrs.nodata === undefined ? 'No Data Available.' : scope.nodata)
                                    .color(attrs.color === undefined ? nv.utils.defaultColor()  : scope.color());

                                if(attrs.tooltipcontent){
                                    chart.tooltipContent(scope.tooltipcontent());
                                }

                                configureXaxis(chart, scope, attrs);
                                configureY1axis(chart, scope, attrs);
                                configureY2axis(chart, scope, attrs);

                                scope.d3Call(data, chart);

                                var chartResize = function() {
                                    var currentWidth = parseInt(d3.select('#' + attrs.id + ' svg').attr('width'),10),
                                        currentHeight = parseInt(d3.select('#' + attrs.id + ' svg').attr('height'),10),
                                        newWidth = (attrs.width || element[0].parentElement.offsetWidth) - (margin.left + margin.right),
                                        newHeight = (attrs.height || element[0].parentElement.offsetHeight) - (margin.top + margin.bottom);

                                    if(newWidth === currentWidth && newHeight === currentHeight) {
                                        return; //Nothing to do, the size is fixed or not changing.
                                    }

                                    d3.select('#' + attrs.id + ' svg').node().remove(); // remove old graph first

                                    chart.width(newWidth).height(newHeight); //Update the dims
                                    d3.select(element[0]).append("svg")
                                        .attr('id', attrs.id)
                                        .attr('width', newWidth)
                                        .attr('height', newHeight)
                                        .datum(data)
                                        .transition()
                                        .duration(500)
                                        .call(chart);
                                };

                                var timeoutPromise;
                                var windowResize = function() {
                                    $timeout.cancel(timeoutPromise);
                                    timeoutPromise = $timeout(chartResize, 100);
                                };

                                $window.addEventListener('resize', windowResize);
                                scope.chart = chart;
                                return chart;
                            }
                        });
                    }
                }, (attrs.objectequality === undefined ? false : (attrs.objectequality === "true")));
            }
        };
    }])
    .directive('egovLineWithFocusChart', ['$window', '$timeout', function($window, $timeout){
        return {
            restrict: 'E',
            scope: {
                data: '=',
                width: '@',
                height: '@',
                id: '@',
                showlegend: '@',
                tooltips: '@',
                showxaxis: '@',
                showyaxis: '@',
                rightalignyaxis: '@',
                defaultstate: '@',
                nodata: '@',
                margin: '&',
                margin2: '&',
                tooltipcontent: '&',
                color: '&',
                x: '&',
                y: '&',
                clipvoronoi: '@',
                interpolate: '@',
//                'xScale', 'yScale', 'xDomain', 'yDomain', defined

                //xaxis
                xaxisorient: '&',
                xaxisticks: '&',
                xaxistickvalues: '&xaxistickvalues',
                xaxisticksubdivide: '&',
                xaxisticksize: '&',
                xaxistickpadding: '&',
                xaxistickformat: '&',
                xaxislabel: '&',
                xaxisscale: '&',
                xaxisdomain: '&',
                xaxisrange: '&',
                xaxisrangeband: '&',
                xaxisrangebands: '&',
                xaxisshowmaxmin: '@',
                xaxishighlightzero: '@',
                xaxisrotatelables: '@',
                xaxisrotateylabel: '@',
                xaxisstaggerlabels: '@',

                //yaxis
                yaxisorient: '&',
                yaxisticks: '&',
                yaxistickvalues: '&yaxistickvalues',
                yaxisticksubdivide: '&',
                yaxisticksize: '&',
                yaxistickpadding: '&',
                yaxistickformat: '&',
                yaxislabel: '&',
                yaxisscale: '&',
                yaxisdomain: '&',
                yaxisrange: '&',
                yaxisrangeband: '&',
                yaxisrangebands: '&',
                yaxisshowmaxmin: '@',
                yaxishighlightzero: '@',
                yaxisrotatelables: '@',
                yaxisrotateylabel: '@',
                yaxisstaggerlabels: '@',

                //yaxis
                y2axisorient: '&',
                y2axisticks: '&',
                y2axistickvalues: '&',
                y2axisticksubdivide: '&',
                y2axisticksize: '&',
                y2axistickpadding: '&',
                y2axistickformat: '&',
                y2axislabel: '&',
                y2axisscale: '&',
                y2axisdomain: '&',
                y2axisrange: '&',
                y2axisrangeband: '&',
                y2axisrangebands: '&',
                y2axisshowmaxmin: '@',
                y2axishighlightzero: '@',
                y2axisrotatelables: '@',
                y2axisrotateylabel: '@',
                y2axisstaggerlabels: '@',

                //angularjs specific
                objectequality: '@',

                //d3.js specific
                transitionduration: '@'

            },
            controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs){
                $scope.d3Call = function(data, chart){
                    d3.select('#' + $attrs.id + ' svg')
                        .attr('height', $scope.height)
                        .attr('width', $scope.width)
                        .datum(data)
                        .transition().duration(($attrs.transitionduration === undefined ? 500 : $attrs.transitionduration))
                        .call(chart);
                };
            }],
            link: function(scope, element, attrs){
                scope.$watch('data', function(data){
                    if(data){
                        //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
                        if(scope.chart){
                            return scope.d3Call(data, scope.chart);
                        }
                        nv.addGraph({
                            generate: function(){
                                var margin = (scope.$eval(attrs.margin) || {left:50, top:50, bottom:50, right:50});
                                    scope.width = (attrs.width || element[0].parentElement.offsetWidth) - (margin.left + margin.right);
                                    scope.height = (attrs.height || element[0].parentElement.offsetHeight) - (margin.top + margin.bottom);

                                var chart = nv.models.lineWithFocusChart()
                                    .width(scope.width)
                                    .height(scope.height)
                                    .margin(margin)
                                    .x(attrs.x === undefined ? function(d){ return d[0]; } : scope.x())
                                    .y(attrs.y === undefined ? function(d){ return d[1]; } : scope.y())
                                    .showLegend(attrs.showlegend === undefined ? false : (attrs.showlegend === "true"))
                                    .tooltips(attrs.tooltips === undefined ? false : (attrs.tooltips  === "true"))
                                    .noData(attrs.nodata === undefined ? 'No Data Available.' : scope.nodata);

                                if(attrs.tooltipcontent){
                                    chart.tooltipContent(scope.tooltipcontent());
                                }

                                configureXaxis(chart, scope, attrs);
                                configureY1axis(chart, scope, attrs);
                                configureY2axis(chart, scope, attrs);

                                scope.d3Call(data, chart);

                                var chartResize = function() {
                                    var currentWidth = parseInt(d3.select('#' + attrs.id + ' svg').attr('width'),10),
                                        currentHeight = parseInt(d3.select('#' + attrs.id + ' svg').attr('height'),10),
                                        newWidth = (attrs.width || element[0].parentElement.offsetWidth) - (margin.left + margin.right),
                                        newHeight = (attrs.height || element[0].parentElement.offsetHeight) - (margin.top + margin.bottom);

                                    if(newWidth === currentWidth && newHeight === currentHeight) {
                                        return; //Nothing to do, the size is fixed or not changing.
                                    }

                                    d3.select('#' + attrs.id + ' svg').node().remove(); // remove old graph first

                                    chart.width(newWidth).height(newHeight); //Update the dims
                                    d3.select(element[0]).append("svg")
                                        .attr('id', attrs.id)
                                        .attr('width', newWidth)
                                        .attr('height', newHeight)
                                        .datum(data)
                                        .transition()
                                        .duration(500)
                                        .call(chart);
                                };

                                var timeoutPromise;
                                var windowResize = function() {
                                    $timeout.cancel(timeoutPromise);
                                    timeoutPromise = $timeout(chartResize, 100);
                                };

                                $window.addEventListener('resize', windowResize);
                                scope.chart = chart;
                                return chart;
                            }
                        });
                    }
                }, (attrs.objectequality === undefined ? false : (attrs.objectequality === "true")));
            }
        };
    }])
    .directive('egovBulletChart', ['$window', '$timeout', function($window, $timeout){
        return {
            restrict: 'E',
            scope: {
                data: '=',
                width: '@',
                height: '@',
                id: '@',
                margin: '&',
                tooltips: '@',
                tooltipcontent: '&',
                orient: '@',
                ranges: '&',
                markers: '&',
                measures: '&',
                tickformat: '&',
                nodata: '@',

                //angularjs specific
                objectequality: '@',

                //d3.js specific
                transitionduration: '@'

            },
            controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs){
                $scope.d3Call = function(data, chart){
                    d3.select('#' + $attrs.id + ' svg')
                        .attr('height', $scope.height)
                        .attr('width', $scope.width)
                        .datum(data)
                        .transition().duration(($attrs.transitionduration === undefined ? 500 : $attrs.transitionduration))
                        .call(chart);
                };
            }],
            link: function(scope, element, attrs){
                scope.$watch('data', function(data){
                    if(data){
                        //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
                        if(scope.chart){
                            return scope.d3Call(data, scope.chart);
                        }
                        nv.addGraph({
                            generate: function(){
                                var margin = (scope.$eval(attrs.margin) || {left:50, top:50, bottom:50, right:50});
                                    scope.width = (attrs.width || element[0].parentElement.offsetWidth) - (margin.left + margin.right);
                                    scope.height = (attrs.height || element[0].parentElement.offsetHeight) - (margin.top + margin.bottom);

                                var chart = nv.models.bulletChart()
                                    .width(scope.width)
                                    .height(scope.height)
                                    .margin(margin)
                                    .orient(attrs.orient === undefined ? 'left' : attrs.orient)
                                    .ranges(attrs.ranges === undefined ? function(d){ return d.ranges; } : scope.ranges())
                                    .markers(attrs.markers === undefined ? function(d){ return d.markers; } : scope.markers())
                                    .measures(attrs.measures === undefined ? function(d){ return d.measures; } : scope.measures())
                                    .tickFormat(attrs.tickformat === undefined ? null : scope.tickformat())
                                    .tooltips(attrs.tooltips === undefined ? false : (attrs.tooltips  === "true"))
                                    .noData(attrs.nodata === undefined ? 'No Data Available.' : scope.nodata);

                                if(attrs.tooltipcontent){
                                    chart.tooltipContent(scope.tooltipcontent());
                                }

                                scope.d3Call(data, chart);

                                var chartResize = function() {
                                    var currentWidth = parseInt(d3.select('#' + attrs.id + ' svg').attr('width'),10),
                                        currentHeight = parseInt(d3.select('#' + attrs.id + ' svg').attr('height'),10),
                                        newWidth = (attrs.width || element[0].parentElement.offsetWidth) - (margin.left + margin.right),
                                        newHeight = (attrs.height || element[0].parentElement.offsetHeight) - (margin.top + margin.bottom);

                                    if(newWidth === currentWidth && newHeight === currentHeight) {
                                        return; //Nothing to do, the size is fixed or not changing.
                                    }

                                    d3.select('#' + attrs.id + ' svg').node().remove(); // remove old graph first

                                    chart.width(newWidth).height(newHeight); //Update the dims
                                    d3.select(element[0]).append("svg")
                                        .attr('id', attrs.id)
                                        .attr('width', newWidth)
                                        .attr('height', newHeight)
                                        .datum(data)
                                        .transition()
                                        .duration(500)
                                        .call(chart);
                                };

                                var timeoutPromise;
                                var windowResize = function() {
                                    $timeout.cancel(timeoutPromise);
                                    timeoutPromise = $timeout(chartResize, 100);
                                };

                                $window.addEventListener('resize', windowResize);
                                scope.chart = chart;
                                return chart;
                            }
                        });
                    }
                }, (attrs.objectequality === undefined ? false : (attrs.objectequality === "true")));
            }
        };
    }])
    .directive('egovSparkline', ['$window', '$timeout', function($window, $timeout){
        return {
            restrict: 'E',
            scope: {
                data: '=',
                width: '@',
                height: '@',
                id: '@',
                animate: '@',
                margin: '&',
                x: '&',
                y: '&',
                color: '&',
                xscale: '&',
                yscale: '&',
                xdomain: '&',
                ydomain: '&',
                xrange: '&',
                yrange: '&',

                //angularjs specific
                objectequality: '@',

                //d3.js specific
                transitionduration: '@'

            },
            controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs){
                $scope.d3Call = function(data, chart){
                    d3.select('#' + $attrs.id + ' svg')
                        .attr('height', $scope.height)
                        .attr('width', $scope.width)
                        .datum(data)
                        .transition().duration(($attrs.transitionduration === undefined ? 500 : $attrs.transitionduration))
                        .call(chart);
                };
            }],
            link: function(scope, element, attrs){
                scope.$watch('data', function(data){
                    if(data){
                        //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
                        if(scope.chart){
                            return scope.d3Call(data, scope.chart);
                        }
                        nv.addGraph({
                            generate: function(){
                                var margin = (scope.$eval(attrs.margin) || {left:50, top:50, bottom:50, right:50});
                                    scope.width = (attrs.width || element[0].parentElement.offsetWidth) - (margin.left + margin.right);
                                    scope.height = (attrs.height || element[0].parentElement.offsetHeight) - (margin.top + margin.bottom);

                                var chart = nv.models.bulletChart()
                                    .width(scope.width)
                                    .height(scope.height)
                                    .margin(margin)
                                    .x(attrs.x === undefined ? function(d){ return d[0]; } : scope.x())
                                    .y(attrs.y === undefined ? function(d){ return d[1]; } : scope.y())
                                    .animate(attrs.animate === undefined ? true : (attrs.animate === "true"))
                                    .color(attrs.color === undefined ? nv.utils.getColor(['#000']) : scope.color())
                                    .xscale(attrs.xscale === undefined ? null : scope.$eval(attrs.xscale))
                                    .yscale(attrs.yscale === undefined ? null : scope.$eval(attrs.yscale))
                                    .xdomain(attrs.xdomain === undefined ? null : scope.$eval(attrs.xdomain))
                                    .ydomain(attrs.ydomain === undefined ? null : scope.$eval(attrs.ydomain))
                                    .xrange(attrs.xrange === undefined ? null : scope.$eval(attrs.xrange))
                                    .yrange(attrs.yrange === undefined ? null : scope.$eval(attrs.yrange));

                                scope.d3Call(data, chart);

                                var chartResize = function() {
                                    var currentWidth = parseInt(d3.select('#' + attrs.id + ' svg').attr('width'),10),
                                        currentHeight = parseInt(d3.select('#' + attrs.id + ' svg').attr('height'),10),
                                        newWidth = (attrs.width || element[0].parentElement.offsetWidth) - (margin.left + margin.right),
                                        newHeight = (attrs.height || element[0].parentElement.offsetHeight) - (margin.top + margin.bottom);

                                    if(newWidth === currentWidth && newHeight === currentHeight) {
                                        return; //Nothing to do, the size is fixed or not changing.
                                    }

                                    d3.select('#' + attrs.id + ' svg').node().remove(); // remove old graph first

                                    chart.width(newWidth).height(newHeight); //Update the dims
                                    d3.select(element[0]).append("svg")
                                        .attr('id', attrs.id)
                                        .attr('width', newWidth)
                                        .attr('height', newHeight)
                                        .datum(data)
                                        .transition()
                                        .duration(500)
                                        .call(chart);
                                };

                                var timeoutPromise;
                                var windowResize = function() {
                                    $timeout.cancel(timeoutPromise);
                                    timeoutPromise = $timeout(chartResize, 100);
                                };

                                $window.addEventListener('resize', windowResize);
                                scope.chart = chart;
                                return chart;
                            }
                        });
                    }
                }, (attrs.objectequality === undefined ? false : (attrs.objectequality === "true")));
            }
        };
    }]).
    directive('egovLine2', ['$window', '$timeout', function($window, $timeout){
        return {
            restrict: 'EA',
            scope: {
                data: '=',
                width: '@',
                height: '@',
                id: '@',
                showlegend: '@',
                tooltips: '@',
                showxaxis: '@',
                showyaxis: '@',
                rightalignyaxis: '@',
                defaultstate: '@',
                nodata: '@',
                margin: '&',
                tooltipcontent: '&',
                color: '&',
                x: '&',
                y: '&',
                forcex: '@',
                forcey: '@',
                isArea: '@',
                interactive: '@',
                clipedge: '@',
                clipvoronoi: '@',
                interpolate: '@',
             // add xformat
                xformat: '&',

                //xaxis
                xaxisorient: '&',
                xaxisticks: '@',
                xaxistickvalues: '&xaxistickvalues',
                xaxisticksubdivide: '&',
                xaxisticksize: '&',
                xaxistickpadding: '&',
                xaxistickformat: '&',
                xaxislabel: '&',
                xaxisscale: '&',
                xaxisdomain: '&',
                xaxisrange: '&',
                xaxisrangeband: '&',
                xaxisrangebands: '&',
                xaxisshowmaxmin: '@',
                xaxishighlightzero: '@',
                xaxisrotatelables: '@',
                xaxisrotateylabel: '@',
                xaxisstaggerlabels: '@',

                //yaxis
                yaxisorient: '&',
                yaxisticks: '&',
                yaxistickvalues: '&yaxistickvalues',
                yaxisticksubdivide: '&',
                yaxisticksize: '&',
                yaxistickpadding: '&',
                yaxistickformat: '&',
                yaxislabel: '&',
                yaxisscale: '&',
                yaxisdomain: '&',
                yaxisrange: '&',
                yaxisrangeband: '&',
                yaxisrangebands: '&',
                yaxisshowmaxmin: '@',
                yaxishighlightzero: '@',
                yaxisrotatelables: '@',
                yaxisrotateylabel: '@',
                yaxisstaggerlabels: '@',

                //angularjs specific
                objectequality: '@',  //$watch(watchExpression, listener, objectEquality)

                //d3.js specific
                transitionduration: '@'

            },
            controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs){
                $scope.d3Call = function(data, chart){
                    //console.log("data", data);
                    d3.select('#' + $attrs.id + ' svg')
                        .attr('height', $scope.height)
                        //.attr('width', $scope.width)    
                        .datum(data)
                        .transition().duration(($attrs.transitionduration === undefined ? 500 : $attrs.transitionduration))
                        .call(chart);
                };
            }],
            link: function(scope, element, attrs){
                scope.$watch('data', function(data){
                    if(data){
                        //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
                        if(scope.chart){
                            return scope.d3Call(data, scope.chart);
                        }
                        nv.addGraph({
                            generate: function(){
                                var margin = (scope.$eval(attrs.margin) || {top: 0, bottom: 0, left: 0, right: 0});
                                //scope.height = (attrs.height || element[0].parentElement.offsetHeight) - (margin.top + margin.bottom);
                                //scope.width = 800;
                                scope.height = 300;

                                var chart = nv.models.lineChart()
                                    //.width(scope.width)
                                    .height(scope.height)
                                    .margin(margin)
                                    .x(attrs.x === undefined ? function(d){ return d[0]; } : scope.x())
                                    .y(attrs.y === undefined ? function(d){ return d[1]; } : scope.y())
                                    .forceX(attrs.forcex === undefined ? [] : scope.$eval(attrs.forcex)) // List of numbers to Force into the X scale (ie. 0, or a max / min, etc.)
                                    .forceY(attrs.forcey === undefined ? [0] : scope.$eval(attrs.forcey)) // List of numbers to Force into the Y scale
                                    .showLegend(attrs.showlegend === undefined ? true : (attrs.showlegend === "true"))
                                    .tooltips(attrs.tooltips === undefined ? true : (attrs.tooltips  === "true"))
                                    .showXAxis(attrs.showxaxis === undefined ? true : (attrs.showxaxis  === "true"))
                                    .showYAxis(attrs.showyaxis === undefined ? true : (attrs.showyaxis  === "true"))
                                    .rightAlignYAxis(attrs.rightalignyaxis === undefined ? false : (attrs.rightalignyaxis  === "true"))
                                    .noData(attrs.nodata === undefined ? 'No Data Available.' : scope.nodata)
                                    .interactive(attrs.interactive === undefined ? true : (attrs.interactive === "true"))
                                    .clipEdge(attrs.clipedge === undefined ? false : (attrs.clipedge === "true"))
                                    .clipVoronoi(attrs.clipvoronoi === undefined ? false : (attrs.clipvoronoi === "true"))
                                    .interpolate(attrs.interpolate === undefined ? 'linear' : attrs.interpolate)
                                    .color(attrs.color === undefined ? nv.utils.defaultColor()  : scope.color());
                                    // .isArea(attrs.isarea === undefined ? function(){return false;} : function(){ return (attrs.isarea === "true"); });

                                chart.legend.margin({top: 3});

                                if (chart.useInteractiveGuideline) {
                                    chart.useInteractiveGuideline(attrs.useinteractiveguideline === undefined ? false : (attrs.useinteractiveguideline === "true"));
                                }

                                if(attrs.tooltipcontent){
                                    chart.tooltipContent(scope.tooltipcontent());
                                }   
                                
                                // add xTickFormat
                                if(attrs.xformat){
                                    chart.xAxis.tickFormat(scope.xformat());
                                }

                                configureXaxis(chart, scope, attrs);
                                configureYaxis(chart, scope, attrs);

                                scope.d3Call(data, chart);

                                var chartResize = function() {
                                    chart.update();
                                    return;

                                    /*var currentWidth = parseInt(d3.select('#' + attrs.id + ' svg').attr('width'), 10),
                                        currentHeight = parseInt(d3.select('#' + attrs.id + ' svg').attr('height'), 10),
                                        newWidth = (attrs.width || element[0].parentElement.offsetWidth) - (margin.left + margin.right),
                                        newHeight = (attrs.height || element[0].parentElement.offsetHeight) - (margin.top + margin.bottom);

                                    if(newHeight < 0){
                                        newHeight = 0;
                                    }

                                    if(newWidth === currentWidth && newHeight === currentHeight) {
                                        return; //Nothing to do, the size is fixed or not changing.
                                    }

                                    d3.select('#' + attrs.id + ' svg').node().remove(); // remove old graph first
                                    nv.log('newWidth',newWidth, 'newHeight', newHeight );
                                    chart.width(newWidth).height(newHeight); //Update the dims
                                    d3.select(element[0]).append("svg")
                                        .attr('id', attrs.id)
                                        //.attr('width', newWidth)
                                        //.attr('height', newHeight)
                                        .datum(data)
                                        .transition()
                                        .duration(500)
                                        .call(chart);*/
                                };

                                var timeoutPromise;
                                var windowResize = function() {
                                    $timeout.cancel(timeoutPromise);
                                    timeoutPromise = $timeout(chartResize, 100);
                                };
                                $window.addEventListener('resize', windowResize);
                                scope.chart = chart;
                                return chart;
                            }
                        });
                    }
                }, (attrs.objectequality === undefined ? false : (attrs.objectequality === "true")));
            }
        } ; 
    }]);
// end angularjs-nvd3-directives

/**!
 * easyPieChart
 * Lightweight plugin to render simple, animated and retina optimized pie charts
 *
 * @license Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 * @author Robert Fleischmann <rendro87@gmail.com> (http://robert-fleischmann.de)
 * @version 2.0.3
 * 
 * 참조 site : http://rendro.github.io/easy-pie-chart/
 * 확장 정보 : 차트 중앙 수치 표시
 **/

eGovChart
    .directive('egovEasyPieChart', ['egovCommon', function(egovCommon) {
_egovCommon = egovCommon;
        return {
            restrict: 'A',
//            require: '?ngModel',
//            scope: {
//                percent: '@'
//            },
            link: function (scope, element, attrs) {
                var options = {};
                var fx = attrs.egovEasyPieChart;
                if (fx.length > 0) {
                    fx = fx.split(';'); // CSS like syntax
                    var REkey = new RegExp('[a-z]+', 'i');
                    var REvalue = new RegExp(':.+');
                    // Parse Effects
                    for (var i in fx) {
                        var value = fx[i].match(REkey);
                        var key = fx[i].match(REvalue);
                        value = value[0];
                        key = key[0].substring(1);
                        if (!isNaN(parseInt(key, 10))) {
                            options[value] = parseFloat(key);
                        } else{
                            switch (key) {
                                case 'true':
                                    options[value] = true;
                                    break;
                                case 'false':
                                    options[value] = false;
                                    break;
                                default:
                                    options[value] = key;
                            }
                        }
                    }
                }
                var pieChart = new EasyPieChart(element[0], options);

                // initial pie rendering
                // if (scope.percent) {
                //     pieChart.update(scope.percent);
                // }
                //console.log("easy-chart", attrs.percent, scope[attrs.percent], scope.percent);
                if (attrs.percent) {
                    pieChart.update(scope[attrs.percent]);
                }

                // on change of value
                var timer = null;
                scope.$watch(attrs.percent, function(oldVal, newVal) {
                    pieChart.update(newVal);

                    // this is needed or the last value won't be updated
                    clearTimeout(timer);
                    timer = setTimeout(function() {
                        //pieChart.update(scope.percent);
                        pieChart.update(scope[attrs.percent]);
                    }, 1000 / 60);
                });
            }
        };
    }]);

var _egovCommon;
/**
 * Renderer to render the chart on a canvas object
 * @param {DOMElement} el      DOM element to host the canvas (root of the plugin)
 * @param {object}     options options object of the plugin
 */
var CanvasRenderer = function(el, options) {
    var cachedBackground;
    var innerLabel = document.createElement('span');    // pie 차트 내부 text 추가
    var canvas = document.createElement('canvas');

    if (typeof(G_vmlCanvasManager) !== 'undefined') {
        G_vmlCanvasManager.initElement(canvas);
    }

    var ctx = canvas.getContext('2d');

    canvas.width = canvas.height = options.size;

    el.appendChild(innerLabel); // innerLabel add
    el.appendChild(canvas);

    // canvas on retina devices
    var scaleBy = 1;
    if (window.devicePixelRatio > 1) {
        scaleBy = window.devicePixelRatio;
        canvas.style.width = canvas.style.height = [options.size, 'px'].join('');
        canvas.width = canvas.height = options.size * scaleBy;
        ctx.scale(scaleBy, scaleBy);
    }

    // move 0,0 coordinates to the center
    ctx.translate(options.size / 2, options.size / 2);

    // rotate canvas -90deg
    ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI);

    var radius = (options.size - options.lineWidth) / 2;
    if (options.scaleColor && options.scaleLength) {
        radius -= options.scaleLength + 2; // 2 is the distance between scale and bar
    }

    // IE polyfill for Date
    Date.now = Date.now || function() {
        return +(new Date());
    };

    /**
     * Draw a circle around the center of the canvas
     * @param  {strong} color     Valid CSS color string
     * @param  {number} lineWidth Width of the line in px
     * @param  {number} percent   Percentage to draw (float between 0 and 1)
     */
    var drawCircle = function(color, lineWidth, percent) {
        percent = Math.min(Math.max(0, percent || 1), 1);

        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);

        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;

        ctx.stroke();
    };

    /**
     * Draw the scale of the chart
     */
    var drawScale = function() {
        var offset;
        var length;
        //var i = 24;

        ctx.lineWidth = 1;
        ctx.fillStyle = options.scaleColor;

        ctx.save();
        for (var i = 24; i > 0; --i) {
            if (i%6 === 0) {
                length = options.scaleLength;
                offset = 0;
            } else {
                length = options.scaleLength * 0.6;
                offset = options.scaleLength - length;
            }
            ctx.fillRect(-options.size/2 + offset, 0, length, 1);
            ctx.rotate(Math.PI / 12);
        }
        ctx.restore();
    };

    /**
     * Request animation frame wrapper with polyfill
     * @return {function} Request animation frame method or timeout fallback
     */
    var reqAnimationFrame = (function() {
        return  window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                function(callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
    }());

    /**
     * Draw the background of the plugin including the scale and the track
     */
    var drawBackground = function() {
        if(options.scaleColor) {
            drawScale();
        }
        if(options.trackColor){
            drawCircle(options.trackColor, options.lineWidth);
        }
        //options.scaleColor && drawScale();
        //options.trackColor && drawCircle(options.trackColor, options.lineWidth);
    };

    /**
     * Clear the complete canvas
     */
    this.clear = function() {
        ctx.clearRect(options.size / -2, options.size / -2, options.size, options.size);
    };

    /**
     * Draw the complete chart
     * @param  {number} percent Percent shown by the chart between 0 and 100
     */
    this.draw = function(percent) {
        // do we need to render a background
        if (!!options.scaleColor || !!options.trackColor) {
            // getImageData and putImageData are supported
            if (ctx.getImageData && ctx.putImageData) {
                if (!cachedBackground) {
                    drawBackground();
                    cachedBackground = ctx.getImageData(0, 0, options.size * scaleBy, options.size * scaleBy);
                } else {
                    ctx.putImageData(cachedBackground, 0, 0);
                }
            } else {
                this.clear();
                drawBackground();
            }
        } else {
            this.clear();
        }

        ctx.lineCap = options.lineCap;

        // if barcolor is a function execute it and pass the percent as a value
        var color;
        if (typeof(options.barColor) === 'function') {
            color = options.barColor(percent);
        } else {
            color = options.barColor;
        }

        // draw bar
        if (percent > 0) {
            drawCircle(color, options.lineWidth, percent / options.maxValue);
        }
        // innerLabel add
        //console.log("percent=",innerLabel);
        innerLabel.innerText = _egovCommon.round(percent, options.precision) + options.addText;


    }.bind(this);

    /**
     * Animate from some percent to some other percentage
     * @param  {number} from Starting percentage
     * @param  {number} to   Final percentage
     */
    this.animate = function(from, to) {
        var startTime = Date.now();
        options.onStart(from, to);
        var animation = function() {
            var process = Math.min(Date.now() - startTime, options.animate);
            var currentValue = options.easing(this, process, from, to - from, options.animate);
            this.draw(currentValue);
            options.onStep(from, to, currentValue);
            if (process >= options.animate) {
                options.onStop(from, to);
            } else {
                reqAnimationFrame(animation);
            }
        }.bind(this);

        reqAnimationFrame(animation);
    }.bind(this);
};

var EasyPieChart = function(el, opts) {
    var defaultOptions = {
        barColor: '#ef1e25',
        trackColor: '#f9f9f9',
        scaleColor: '#dfe0e0',
        scaleLength: 5,
        lineCap: 'round',
        lineWidth: 3,
        size: 110,
        // add
        maxValue : 100,
        addText : "",
        precision : 0,
        rotate: 0,
        animate: 1000,
        easing: function (x, t, b, c, d) { // more can be found here: http://gsgd.co.uk/sandbox/jquery/easing/
            var _t = (t /= d/2);
            if (_t < 1) {
                return c/2*t*t + b;
            }
            return -c/2 * ((--t)*(t-2) - 1) + b;
        },
        onStart: function(from, to) {
            return;
        },
        onStep: function(from, to, currentValue) {
            return;
        },
        onStop: function(from, to) {
            return;
        }
    };

    // detect present renderer
    if (typeof(CanvasRenderer) !== 'undefined') {
        defaultOptions.renderer = CanvasRenderer;
    } else if (typeof(SVGRenderer) !== 'undefined') {
        defaultOptions.renderer = SVGRenderer;
    } else {
        throw new Error('Please load either the SVG- or the CanvasRenderer');
    }

    var options = {};
    var currentValue = 0;

    /**
     * Initialize the plugin by creating the options object and initialize rendering
     */
    var init = function() {
        this.el = el;
        this.options = options;

        // merge user options into default options
        for (var i in defaultOptions) {
            if (defaultOptions.hasOwnProperty(i)) {
                options[i] = opts && typeof(opts[i]) !== 'undefined' ? opts[i] : defaultOptions[i];
                if (typeof(options[i]) === 'function') {
                    options[i] = options[i].bind(this);
                }
            }
        }

        // check for jQuery easing
        if (typeof(options.easing) === 'string' && typeof(jQuery) !== 'undefined' && jQuery.isFunction(jQuery.easing[options.easing])) {
            options.easing = jQuery.easing[options.easing];
        } else {
            options.easing = defaultOptions.easing;
        }

        // create renderer
        this.renderer = new options.renderer(el, options);

        // initial draw
        this.renderer.draw(currentValue);

        // initial update
        if (el.dataset && el.dataset.percent) {
            this.update(parseInt(el.dataset.percent, 10));
        }
    }.bind(this);

    /**
     * Update the value of the chart
     * @param  {number} newValue Number between 0 and 100
     * @return {object}          Instance of the plugin for method chaining
     */
    this.update = function(newValue) {
        newValue = parseInt(newValue, 10);
        if (options.animate) {
            this.renderer.animate(currentValue, newValue);
        } else {
            this.renderer.draw(newValue);
        }
        currentValue = newValue;
        return this;
    }.bind(this);

    init();
};
// end easyPieChart

} else{
    // angualr가 없는 경우     
    alert('Angular not detected.');
}

}()); // end