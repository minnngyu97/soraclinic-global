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