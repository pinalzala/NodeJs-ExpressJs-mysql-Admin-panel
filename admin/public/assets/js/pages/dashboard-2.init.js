/*
Template Name: Admiria - Admin & Dashboard Template
Author: Themesbrand
Website: https://themesbrand.com/
Contact: themesbrand@gmail.com
File: Dashboard-2
*/

!function ($) {
    "use strict";

    var Dashboard2 = function () {
    };


    //creates area chart
    Dashboard2.prototype.createAreaChart = function (element, pointSize, lineWidth, data, xkey, ykeys, labels, lineColors) {
        Morris.Area({
            element: element,
            pointSize: 0,
            lineWidth: 0,
            data: data,
            xkey: xkey,
            ykeys: ykeys,
            labels: labels,
            resize: true,
           gridLineColor: 'rgba(108, 120, 151, 0.1)',
            hideHover: 'auto',
            lineColors: lineColors,
            fillOpacity: .6,
            behaveLikeLine: true
        });
    },

        //creates Donut chart
        Dashboard2.prototype.createDonutChart = function (element, data, colors) {
            Morris.Donut({
                element: element,
                data: data,
                resize: true,
                colors: colors,
            });
        },


        //creates Stacked chart
        Dashboard2.prototype.createStackedChart  = function(element, data, xkey, ykeys, labels, lineColors) {
            Morris.Bar({
                element: element,
                data: data,
                xkey: xkey,
                ykeys: ykeys,
                stacked: true,
                labels: labels,
                hideHover: 'auto',
                resize: true, //defaulted to true
               gridLineColor: 'rgba(108, 120, 151, 0.1)',
                barColors: lineColors
            });
        },

        Dashboard2.prototype.init = function () {

            //creating area chart
            var $areaData = [
                {y: '2007', a: 0, b: 0, c:0},
                {y: '2008', a: 150, b: 45, c:15},
                {y: '2009', a: 60, b: 150, c:195},
                {y: '2010', a: 180, b: 36, c:21},
                {y: '2011', a: 90, b: 60, c:360},
                {y: '2012', a: 75, b: 240, c:120},
                {y: '2013', a: 30, b: 30, c:30}
            ];
            this.createAreaChart('morris-area-example', 0, 0, $areaData, 'y', ['a', 'b', 'c'], ['Series A', 'Series B', 'Series C'], ['#009688', '#fb8c00', '#6d60b0']);

            //creating donut chart
            var $donutData = [
                {label: "Marketing", value: 12},
                {label: "Online", value: 42},
                {label: "Offline", value: 20}
            ];
            this.createDonutChart('morris-donut-example', $donutData, ['#f0f1f4', '#6d60b0', '#009688']);

            var $stckedData  = [
                { y: '2005', a: 45, b: 180},
                { y: '2006', a: 75,  b: 65},
                { y: '2007', a: 100, b: 90},
                { y: '2008', a: 75,  b: 65},
                { y: '2009', a: 100, b: 90},
                { y: '2010', a: 75,  b: 65},
                { y: '2011', a: 50,  b: 40},
                { y: '2012', a: 75,  b: 65},
                { y: '2013', a: 50,  b: 40},
                { y: '2014', a: 75,  b: 65},
                { y: '2015', a: 100, b: 90},
                { y: '2016', a: 80, b: 65}
            ];
            this.createStackedChart('morris-bar-stacked', $stckedData, 'y', ['a', 'b'], ['Series A', 'Series B'], ['#47b8c6','#e8e7e7']);

            //Peity pie
            $('.peity-pie').each(function() {
                $(this).peity("pie", $(this).data());
            });

            //Peity donut
            $('.peity-donut').each(function() {
                $(this).peity("donut", $(this).data());
            });

        },
        //init
        $.Dashboard2 = new Dashboard2, $.Dashboard2.Constructor = Dashboard2
}(window.jQuery),

//initializing
    function ($) {
        "use strict";
        $.Dashboard2.init();
    }(window.jQuery);