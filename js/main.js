(function($) {
"use strict";

/*------------------------------------------------------------------
[Table of contents]


1.KENT RESPONSIVE MENU JS
2.KENT CONTENT POPUP JS
3.KENT TAB JS


-------------------------------------------------------------------*/

/*--------------------------------------------------------------
CUSTOM PRE DEFINE FUNCTION
------------------------------------------------------------*/
/* is_exist() */
jQuery.fn.is_exist = function(){
  return this.length;
}


$(function(){


/*--------------------------------------------------------------
 1.KENT RESPONSIVE MENU JS
------------------------------------------------------------*/
  $('.menu_toggle').on('click', function(){
     event.preventDefault()
    $('.kent-header-menu').slideToggle(300);
  });

/*--------------------------------------------------------------
 2.KENT CONTENT POPUP JS
------------------------------------------------------------*/
if($('.popup-with-form').length > 0){
 $('.popup-with-form').magnificPopup({
        type: 'inline',
        removalDelay: 500, //delay removal by X to allow out-animation
          callbacks: {
            beforeOpen: function() {
               this.st.mainClass = 'mfp-zoom-in';
            }
          },
          midClick: true
    });
}


/*--------------------------------------------------------------
 3.KENT TAB JS
------------------------------------------------------------*/
$('ul.tabs li').click(function(){
  var tab_id = $(this).attr('data-tab');

$('ul.tabs li').removeClass('current');
  $('.tab-content').removeClass('current');

$(this).addClass('current');
  $("#"+tab_id).addClass('current');
})


/*--------------------------------------------------------------
9.kent SINGLE SERVICE SLIDER JS SYNC1,SYNC2
------------------------------------------------------------*/
if ($('#kent-sync1 ,#kent-sync2').length > 0) {

    var sync1 = $("#kent-sync1");
    var sync2 = $("#kent-sync2");
    var slidesPerPage = 4;
    var syncedSecondary = true;

    sync1.owlCarousel({
      items : 1,
      slideSpeed : 2000,
      nav: false,
      // autoplay: true,
      dots: false,
      loop: true,
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      responsiveRefreshRate : 200,
    }).on('changed.owl.carousel', syncPosition);

    sync2
      .on('initialized.owl.carousel', function () {
        sync2.find(".owl-item").eq(0).addClass("current");
      })
      .owlCarousel({
      items : slidesPerPage,
      dots: false,
      nav: false,
      margin: 20,
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      smartSpeed: 200,
      slideSpeed : 500,
      slideBy: slidesPerPage, 
      responsiveRefreshRate : 100
    }).on('changed.owl.carousel', syncPosition2);

    function syncPosition(el) {
      var count = el.item.count-1;
      var current = Math.round(el.item.index - (el.item.count/2) - .5);
      
      if(current < 0) {
        current = count;
      }
      if(current > count) {
        current = 0;
      }

      sync2
        .find(".owl-item")
        .removeClass("current")
        .eq(current)
        .addClass("current");
      var onscreen = sync2.find('.owl-item.active').length - 1;
      var start = sync2.find('.owl-item.active').first().index();
      var end = sync2.find('.owl-item.active').last().index();
      
      if (current > end) {
        sync2.data('owl.carousel').to(current, 100, true);
      }
      if (current < start) {
        sync2.data('owl.carousel').to(current - onscreen, 100, true);
      }
    }
    
    function syncPosition2(el) {
      if(syncedSecondary) {
        var number = el.item.index;
        sync1.data('owl.carousel').to(number, 100, true);
      }
    }
    
    sync2.on("click", ".owl-item", function(e){
      e.preventDefault();
      var number = $(this).index();
      sync1.data('owl.carousel').to(number, 300, true);
    });

}



});/*End document ready*/


})(jQuery);

