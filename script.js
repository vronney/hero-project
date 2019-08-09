$(document).ready(function() {

  var topoffset = 55;
  
  // Use smooth scrolling when clicking on navigation
  $('.navbar a[href*=\\#]:not([href=\\#])').click(function() {
    if (location.pathname.replace(/^\//, '') === 
    this.pathname.replace(/^\//, '') && 
    location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top - topoffset + 2
        }, 500);
        return false;
      } //target.length
    } //click function
  }); //smooth scrolling

  $(window).on('activate.bs.scrollspy', function(){
    var hash = $('.site-nav')
    .find('a.active')
    .attr('href');

    if (hash !== '#page-hero') {
      $('header nav').addClass('inbody');
    } else {
      $('header nav').removeClass('inbody');
    }

    $('#page-multicolumn .layout-animation').css('visibility: hidden');

    if ($(window).width() > 768 && hash === '#page-multicolumn') {
      $('#page-multicolumn .layout-animation').addClass('animated fadeInRight');
      $('#page-multicolumn .layout-animation').removeClass('invisible');
    }

    $('#page-floater .layout-animation').css('visibility: hidden');

    if ($(window).width() > 768 && hash === '#page-icons') {
      $('#page-floater .layout-animation').addClass('animated rotateInDownLeft');
      $('#page-floater .layout-animation').removeClass('invisible');
    }

  });

  $('#site-modal').on('show.bs.modal', function (event) {
    $(this)
      .find('.modal-content img')
      .attr('src', $(event.relatedTarget).data('highres'));
  });
});
