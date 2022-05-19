/*
Template Name: Admiria - Responsive Bootstrap 5 Admin Dashboard
Author: Themesbrand
Website: https://themesbrand.com/
Contact: themesbrand@gmail.com
File: Form Advanced
*/

!function($) {
  "use strict";

  var AdvancedForm = function() {};
  
  AdvancedForm.prototype.init = function() {

      // Select2
      $(".select2").select2();

      $(".select2-limiting").select2({
          maximumSelectionLength: 2
      });

  //     // $('.selectpicker').selectpicker();
  // $(".file").filestyle({input: false});
      //creating various controls

      //colorpicker start
    $("#colorpicker-default").spectrum();

    $("#colorpicker-showalpha").spectrum({
      showAlpha: true
    });

    $("#colorpicker-showpaletteonly").spectrum({
      showPaletteOnly: true,
      showPalette: true,
      color: '#34c38f',
      palette: [
        ['#556ee6', 'white', '#34c38f',
          'rgb(255, 128, 0);', '#50a5f1'],
        ['red', 'yellow', 'green', 'blue', 'violet']
      ]
    });

    $("#colorpicker-togglepaletteonly").spectrum({
      showPaletteOnly: true,
      togglePaletteOnly: true,
      togglePaletteMoreText: 'more',
      togglePaletteLessText: 'less',
      color: '#556ee6',
      palette: [
          ["#000","#444","#666","#999","#ccc","#eee","#f3f3f3","#fff"],
          ["#f00","#f90","#ff0","#0f0","#0ff","#00f","#90f","#f0f"],
          ["#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#cfe2f3","#d9d2e9","#ead1dc"],
          ["#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#9fc5e8","#b4a7d6","#d5a6bd"],
          ["#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6fa8dc","#8e7cc3","#c27ba0"],
          ["#c00","#e69138","#f1c232","#6aa84f","#45818e","#3d85c6","#674ea7","#a64d79"],
          ["#900","#b45f06","#bf9000","#38761d","#134f5c","#0b5394","#351c75","#741b47"],
          ["#600","#783f04","#7f6000","#274e13","#0c343d","#073763","#20124d","#4c1130"]
      ]
  });

  $("#colorpicker-showintial").spectrum({
    showInitial: true
  });

  $(".colorpicker-showinput-intial").spectrum({
    showInitial: true,
    showInput: true
  });


        // Date Picker
        $('#datepicker').datepicker();
        $('#datepicker-inline').datepicker();
        $('#datepicker-multiple').datepicker({
            numberOfMonths: 3,
            showButtonPanel: true
        });
        
        $('#datepicker').datepicker();
        $('#datepicker-autoclose').datepicker({
            autoclose: true,
            todayHighlight: true
        });
        $('#datepicker-multiple-date').datepicker({
            format: "mm/dd/yyyy",
            clearBtn: true,
            multidate: true,
            multidateSeparator: ","
        });
        $('#date-range').datepicker({
            toggleActive: true
        });


      //Bootstrap-TouchSpin
      var defaultOptions = {
      };

      // touchspin
      $(".vertical-spin").TouchSpin({
          verticalbuttons: true,
          verticalupclass: 'ion-plus-round',
          verticaldownclass: 'ion-minus-round',
          buttondown_class: 'btn btn-primary',
          buttonup_class: 'btn btn-primary'
      });

      $("input[name='demo1']").TouchSpin({
          min: 0,
          max: 100,
          step: 0.1,
          decimals: 2,
          boostat: 5,
          maxboostedstep: 10,
          postfix: '%',
          buttondown_class: 'btn btn-primary',
          buttonup_class: 'btn btn-primary'
      });
      $("input[name='demo2']").TouchSpin({
          min: -1000000000,
          max: 1000000000,
          stepinterval: 50,
          maxboostedstep: 10000000,
          prefix: '$',
          buttondown_class: 'btn btn-primary',
          buttonup_class: 'btn btn-primary'
      });
      $("input[name='demo3']").TouchSpin({
          buttondown_class: 'btn btn-primary',
          buttonup_class: 'btn btn-primary'
      });
      $("input[name='demo3_21']").TouchSpin({
          initval: 40,
          buttondown_class: 'btn btn-primary',
          buttonup_class: 'btn btn-primary'
      });
      $("input[name='demo3_22']").TouchSpin({
          initval: 40,
          buttondown_class: 'btn btn-primary',
          buttonup_class: 'btn btn-primary'
      });

      $("input[name='demo5']").TouchSpin({
          prefix: "pre",
          postfix: "post",
          buttondown_class: 'btn btn-primary',
          buttonup_class: 'btn btn-primary'
      });
      $("input[name='demo0']").TouchSpin({
          buttondown_class: 'btn btn-primary',
          buttonup_class: 'btn btn-primary'
      });

      //Bootstrap-MaxLength
      $('input#defaultconfig').maxlength({
          warningClass: "badge bg-info",
          limitReachedClass: "badge bg-warning"
      });

      $('input#thresholdconfig').maxlength({
          threshold: 20,
          warningClass: "badge bg-info",
          limitReachedClass: "badge bg-warning"
      });

      $('input#moreoptions').maxlength({
          alwaysShow: true,
          warningClass: "badge bg-success",
          limitReachedClass: "badge bg-danger"
      });

      $('input#alloptions').maxlength({
          alwaysShow: true,
          warningClass: "badge bg-success",
          limitReachedClass: "badge bg-danger",
          separator: ' out of ',
          preText: 'You typed ',
          postText: ' chars available.',
          validate: true
      });

      $('textarea#textarea').maxlength({
          alwaysShow: true,
          warningClass: "badge bg-info",
          limitReachedClass: "badge bg-warning"
      });

      $('input#placement').maxlength({
          alwaysShow: true,
          placement: 'top-left',
          warningClass: "badge bg-info",
          limitReachedClass: "badge bg-warning"
      });


  },
  //init
  $.AdvancedForm = new AdvancedForm, $.AdvancedForm.Constructor = AdvancedForm
}(window.jQuery),

//initializing
function ($) {
  "use strict";
  $.AdvancedForm.init();
}(window.jQuery);