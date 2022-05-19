/*
Template Name: Admiria - Admin & Dashboard Template
Author: Themesbrand
Website: https://themesbrand.com/
Contact: themesbrand@gmail.com
File: Widgets
*/


!function($) {
    "use strict";

    var Widgets = function() {};

    Widgets.prototype.init = function () {

        //Peity pie
        $('.peity-pie').each(function() {
            $(this).peity("pie", $(this).data());
        });

        //Peity donut
        $('.peity-donut').each(function() {
            $(this).peity("donut", $(this).data());
        });


        //C3 Donut Chart
        c3.generate({
            bindto: '#donut-chart',
            data: {
                columns: [
                    ['Desktops', 78],
                    ['Mobiles', 40],
                    ['Tablets', 25]
                ],
                type : 'donut'
            },
            donut: {
                title: "Candidates",
                width: 40,
                label: {
                    show:false
                }
            },
            color: {
                pattern: ["#f06292", "#6d60b0","#009688"]
            }
        });

        // Knob chart
        $(".knob").knob();

    },
        $.Widgets = new Widgets, $.Widgets.Constructor = Widgets

}(window.jQuery),

//initializing
    function($) {
        "use strict";
        $.Widgets.init()
    }(window.jQuery);
