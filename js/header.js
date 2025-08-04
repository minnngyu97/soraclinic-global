document.addEventListener('DOMContentLoaded', function () {
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        let curr = window.scrollY;

        if (curr > lastScroll) {
            document.querySelector('header').classList.add('hide');
        } else {
            document.querySelector('header').classList.remove('hide');
        }

        lastScroll = curr;
    });
});

window.addEventListener('scroll', function () {
   if (window.scrollY > 50) {
   document.querySelector('#header').classList.add('active');
   document.querySelector('.gototop').classList.add('active');
   } else {
   document.querySelector('#header').classList.remove('active');
   document.querySelector('.gototop').classList.remove('active');
   }
});