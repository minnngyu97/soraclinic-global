document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('#hd');
  const navBtn = document.querySelector('.hd-mo-nav-btn');
  const navWrap = document.querySelector('.hd-nav');
  const hdDim = document.querySelector('.hd-dim');
  const gototopBtn = document.querySelector('.gototop');

  let lastScroll = 0;
  const isMobile = () => window.matchMedia('(max-width: 991px)').matches;

  function toggleMobileMenu(isOpen) {
    navWrap.classList.toggle('open', isOpen);
    navBtn.classList.toggle('active', isOpen);
    document.body.classList.toggle('menu-open', isOpen);

    if (isOpen) {
      header.classList.add('fixed');
      header.classList.remove('hide');
      if (hdDim) hdDim.style.pointerEvents = 'auto';
    } else {
      header.classList.remove('fixed');
      document.querySelectorAll('.sub.show').forEach(sub => sub.classList.remove('show'));
      document.querySelectorAll('.hd-nav-wrap > .nav-link.active').forEach(link => link.classList.remove('active'));
      if (hdDim) hdDim.style.pointerEvents = 'none';
    }
  }

  function handleMobileMenuClick(e) {
    const topLink = e.currentTarget;
    const subMenu = topLink.nextElementSibling;
    if (subMenu && subMenu.classList.contains('sub')) {
      e.preventDefault();
      subMenu.classList.toggle('show');
      topLink.classList.toggle('active');
    }
  }

  function handleDesktopMenuHover(item, enter) {
    const subMenu = item.querySelector('.sub');
    if (subMenu) subMenu.classList.toggle('show', enter);
  }

  function initMenuEvents() {
    const navItems = document.querySelectorAll('.nav-list > li');
    const navLinks = document.querySelectorAll('.nav-list > li > a');

    navLinks.forEach(link => {
      const clone = link.cloneNode(true);
      link.parentNode.replaceChild(clone, link);
    });

    if (isMobile()) {
      document.querySelectorAll('.nav-list > li > a').forEach(link => {
        link.addEventListener('click', handleMobileMenuClick);
      });
    } else {
      navItems.forEach(item => {
        item.addEventListener('mouseenter', () => handleDesktopMenuHover(item, true));
        item.addEventListener('mouseleave', () => handleDesktopMenuHover(item, false));
      });
    }
  }

  function handleScroll() {
    const currentScroll = window.scrollY;

    if (!header.classList.contains('fixed')) {
      if (currentScroll > lastScroll) {
        header.classList.add('hide');
      } else {
        header.classList.remove('hide');
      }
    }
    lastScroll = currentScroll;

    if (currentScroll > 50) {
      header.classList.add('scrolled', 'active');
      if (gototopBtn) gototopBtn.classList.add('active');
    } else {
      header.classList.remove('scrolled', 'active');
      if (gototopBtn) gototopBtn.classList.remove('active');
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  if (navBtn) {
    navBtn.addEventListener('click', () => {
      const isOpen = !navWrap.classList.contains('open');
      toggleMobileMenu(isOpen);
    });
  }

  if (hdDim) {
    hdDim.addEventListener('click', () => toggleMobileMenu(false));
  }

  document.addEventListener('click', (e) => {
    const isClickInsideNav = navBtn.contains(e.target) || navWrap.contains(e.target);
    if (!isClickInsideNav && navWrap.classList.contains('open')) {
      toggleMobileMenu(false);
    }

    // ==================================
    // 언어 버튼 외부 클릭 시 닫기
    const langWraps = document.querySelectorAll('.lang-btn-wrap');
    langWraps.forEach(langWrap => {
      if (!langWrap.contains(e.target)) {
        langWrap.classList.remove('active');
      }
    });
    // ==================================
  });

  document.querySelectorAll('.lang-btn-wrap').forEach(btnWrap => {
    btnWrap.addEventListener('click', (e) => {
      e.stopPropagation(); // 클릭 시 이벤트 전파 막기
      btnWrap.classList.toggle('active');
    });
  });

  if (window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.quick-item').forEach(item => {
      item.addEventListener('mouseenter', () => item.classList.add('active'));
      item.addEventListener('mouseleave', () => item.classList.remove('active'));
    });
  }

  document.querySelectorAll('.trigger').forEach(trigger => {
    trigger.addEventListener('click', function () {
      this.classList.toggle('active');
      document.querySelectorAll('.gnb').forEach(gnb => {
        gnb.classList.toggle('active');
      });
    });
  });

  initMenuEvents();
  window.addEventListener('resize', initMenuEvents);
});
