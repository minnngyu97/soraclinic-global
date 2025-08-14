document.addEventListener('DOMContentLoaded', function () {
    let lastScroll = 0;
    let header = document.querySelector('#hd');
    let navBtn = document.querySelector('.hd-mo-nav-btn');

    navBtn.addEventListener('click', function () {
        header.classList.toggle('fixed');
    });

    window.addEventListener('scroll', function () {
        if (header.classList.contains('fixed')) return;

        let curr = window.scrollY;

        if (curr > lastScroll) {
            header.classList.add('hide');
        } else {
            header.classList.remove('hide');
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

document.addEventListener('DOMContentLoaded', function () {
  const menuBtn = document.querySelector('.hd-mo-nav-btn');
  const navWrap = document.querySelector('.hd-nav-wrap');

  function closeMenu() {
    navWrap.classList.remove('open');
    document.body.classList.remove('menu-open');
    document.querySelectorAll('.sub').forEach(sub => sub.classList.remove('show'));
  }

  function initMenuEvents() {
    const isMobile = window.matchMedia("(max-width: 992px)").matches;
    const menuItems = document.querySelectorAll('.nav-list > li');

    menuItems.forEach(item => {
      item.replaceWith(item.cloneNode(true));
    });

    if (isMobile) {
      document.querySelectorAll('.nav-list > li').forEach(item => {
        const subMenu = item.querySelector('.sub');
        if (subMenu) {
          item.addEventListener('click', function (e) {
            e.preventDefault();
            subMenu.classList.toggle('show');
          });
        }
      });

      if (menuBtn && navWrap) {
        menuBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const isOpen = navWrap.classList.toggle('open');
          document.body.classList.toggle('menu-open', isOpen);

          if (!isOpen) {
            document.querySelectorAll('.sub').forEach(sub => sub.classList.remove('show'));
          }
        });
      }
    } else {
      document.querySelectorAll('.nav-list > li').forEach(item => {
        const subMenu = item.querySelector('.sub');
        if (subMenu) {
          item.addEventListener('mouseenter', () => subMenu.classList.add('show'));
          item.addEventListener('mouseleave', () => subMenu.classList.remove('show'));
        }
      });
    }
  }

  document.addEventListener('click', (e) => {
    if (navWrap.classList.contains('open') &&
        !navWrap.contains(e.target) &&
        !menuBtn.contains(e.target) &&
        !e.target.classList.contains('nav-link')
    ) {
      closeMenu();
    }
  });

  initMenuEvents();
  window.addEventListener('resize', initMenuEvents);
});

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.lang-btn-wrap').forEach(function (btnWrap) {
    btnWrap.addEventListener('click', function (e) {
      e.preventDefault();
      document
        .querySelector('.hd-group .lang-btn-wrap')
        .classList.toggle('active');
    });
  });
});

document.querySelectorAll('.trigger').forEach(trigger => {
  trigger.addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.hd-nav').classList.toggle('open');
  });
});

document.querySelectorAll('section, .menu a').forEach(element => {
  element.addEventListener('click', function() {
    document.querySelector('.hd-nav').classList.remove('open');
    document.querySelectorAll('.trigger').forEach(trigger => {
      trigger.classList.remove('active');
    });
  });
});