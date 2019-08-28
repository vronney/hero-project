$(document).ready(function () {

  var topoffset = 55;

  // Use smooth scrolling when clicking on navigation
  $('.navbar a[href*=\\#]:not([href=\\#])').click(function () {
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

  $(window).on('activate.bs.scrollspy', function () {
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
    $(this)
      .find('.modal-content h5')
      .html(`<span>${$(event.relatedTarget).data("title")}</span>`);  
  });

}); //End of jQuery

// Service Worker
// Check if service worker is supported by browser

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./service-worker.js')
      .then(reg => console.log('Service Worker: Registered'))
      .catch(err => console.log(`Service Worker: Error: ${err}`))
  });
}

// Section that will display a random bible verse for the day
const url = "https://api.lsm.org/recver.php?String='Prov. 29:18; Acts 26:19; Eph. 4:4-6; Rev. 21:2, 9-10; Heb. 12:1; Isa. 45:3; Isa. 43:1-3; Eph. 1:3; 1 Pet. 1:7; 1 Pet. 3:10-11; 1 Pet. 5:7; 1 Pet. 5:8-9; John 14:6; John 8:12; Psa. 90:14-17; Psa. 91:2-4; Psa. 91:5-8; Psa. 91:9-13; Psa. 91:14-16; Rom. 12:2'&Out=json";

  fetch(url)
    .then((response) => {
      response.json()
        .then((data) => {
          const verseOfDay = [(data.verses)];

          // Grabs the array values -- [ref: & text:]
          const values = Object.values(verseOfDay);
          // console.log(values);

          // Looping through the array of values
          for (const value of values) {

            // A randomly selected index in the value array will be selected
            const verse = value[Math.floor(Math.random() * value.length)];
            // console.log(verse);

            // Verse is then broken down in to it values and then console separately
            const ref = Object.values(verse);
            console.log(ref[0]);
            console.log(ref[1]);

            const bibleVerse = () => {
              // will input api fetch here for verse of the day
              console.log("Bible Verse of the Day. Yay!!!!");

              document.getElementById('verseOfTheDay').innerText = `${ref[0]}`;
              document.getElementById('verseText').innerText = `${ref[1]}`;
            
            };

            document.getElementById('pickVerse').addEventListener('click', bibleVerse);
          }

        })

    });



