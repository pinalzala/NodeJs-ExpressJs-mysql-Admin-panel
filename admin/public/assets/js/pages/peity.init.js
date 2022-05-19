/*
Template Name: Admiria - Admin & Dashboard Template
Author: Themesbrand
Website: https://themesbrand.com/
Contact: themesbrand@gmail.com
File: Chartist
*/

!function ($) {
    "use strict";

    var PeietyCharts = function () {
    };

    PeietyCharts.prototype.init = function () {

        // line
        $('.peity-line').each(function () {
            $(this).peity("line", $(this).data());
        });

        // bar
        $('.peity-bar').each(function () {
            $(this).peity("bar", $(this).data());
        });

        //pie
        $('.peity-pie').each(function () {
            $(this).peity("pie", $(this).data());
        });

        //donut
        $('.peity-donut').each(function () {
            $(this).peity("donut", $(this).data());
        });

    },
        $.PeietyCharts = new PeietyCharts, $.PeietyCharts.Constructor = PeietyCharts

}(window.jQuery),

//initializing
    function ($) {
        "use strict";
        $.PeietyCharts.init()
    }(window.jQuery);







   