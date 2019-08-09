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


//Service Worker
//Check if service worker is supported
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
      .register('../service-worker.js')
      .then(reg => console.log('Service Worker: Registered'))
      .catch(err => console.log(`Service Worker: Error: ${err}`))
    });
  }


//       if ('serviceWorker' in navigator) {

//         navigator.serviceWorker
//         .register('~service-worker.js', { scope: '/' })
//         .then(function(registration) {
//         console.log("Service Worker Registered");
//       })
//         .catch(function(err) {
//         console.log("Service Worker Failed to Register", err);
//       })

//     }
//     // Function to perform HTTP request
//   var get = function(url) {
//   return new Promise(function(resolve, reject) {

//     var xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function() {
//         if (xhr.readyState === XMLHttpRequest.DONE) {
//             if (xhr.status === 200) {
//                 var result = xhr.responseText
//                 result = JSON.parse(result);
//                 resolve(result);
//             } else {
//                 reject(xhr);
//             }
//         }
//     };
    
//     xhr.open("GET", url, true);
//     xhr.send();

//   }); 
// };
