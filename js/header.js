document.addEventListener('DOMContentLoaded', function () {
  let lastScroll = 0;
  let header = document.querySelector('#hd');
  let navBtn = document.querySelector('.hd-mo-nav-btn');
  const navWrap = document.querySelector('.hd-nav-wrap');

  // 모바일 메뉴 닫기
  function closeMenu() {
    navWrap.classList.remove('open');
    document.body.classList.remove('menu-open');
    document.querySelectorAll('.sub').forEach(sub => sub.classList.remove('show'));
  }

  // ✅ 메뉴 이벤트 초기화
  function initMenuEvents() {
    const isMobile = window.matchMedia("(max-width: 992px)").matches;
    const menuItems = document.querySelectorAll('.nav-list > li');

    // 이벤트 중복 방지용 (기존 이벤트 날리고 새로 붙임)
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

      if (navBtn && navWrap) {
        navBtn.addEventListener('click', (e) => {
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

  // ✅ 외부 클릭 시 메뉴 닫기 (예외처리 확실하게)
  document.addEventListener('click', (e) => {
    if (navWrap.classList.contains('open')) {
      // navWrap 내부 클릭 or 메뉴버튼 클릭 or 헤더(.hd-group) 내부 클릭 → 닫지 않음
      if (
        navWrap.contains(e.target) ||
        navBtn.contains(e.target) ||
        header.contains(e.target)
      ) {
        return;
      }
      closeMenu();
    }
  });

  // ✅ 스크롤 시 header hide/show
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

  // ✅ 스크롤 시 active 클래스 추가
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      document.querySelector('#hd').classList.add('active');
      document.querySelector('.gototop').classList.add('active');
    } else {
      document.querySelector('#hd').classList.remove('active');
      document.querySelector('.gototop').classList.remove('active');
    }
  });

  // ✅ 언어 선택 버튼
  document.querySelectorAll('.lang-btn-wrap').forEach(function (btnWrap) {
    btnWrap.addEventListener('click', function (e) {
      e.preventDefault();
      document
        .querySelector('.hd-group .lang-btn-wrap')
        .classList.toggle('active');
    });
  });

  // ✅ trigger 버튼
  document.querySelectorAll('.trigger').forEach(trigger => {
    trigger.addEventListener('click', function () {
      this.classList.toggle('active');
      document.querySelector('.hd-nav').classList.toggle('open');
    });
  });

  // ✅ section 클릭 시 메뉴 닫기
  document.querySelectorAll('section, .menu a').forEach(element => {
    element.addEventListener('click', function () {
      document.querySelector('.hd-nav').classList.remove('open');
      document.querySelectorAll('.trigger').forEach(trigger => {
        trigger.classList.remove('active');
      });
    });
  });

  // ✅ 초기 실행
  initMenuEvents();
  window.addEventListener('resize', initMenuEvents);
});
