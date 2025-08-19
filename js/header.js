document.addEventListener('DOMContentLoaded', function () {
  let lastScroll = 0;
  const header = document.querySelector('#hd');
  const navBtn = document.querySelector('.hd-mo-nav-btn');
  const navWrap = document.querySelector('.hd-nav-wrap');

  // 모바일 메뉴 닫기
  function closeMenu() {
    navWrap.classList.remove('open');
    document.body.classList.remove('menu-open');
    document.querySelectorAll('.sub').forEach(sub => sub.classList.remove('show'));
    header.classList.remove('fixed');
    document.querySelectorAll('.hd-nav-wrap > .nav-link').forEach(link => link.classList.remove('active'));
  }

  // 메뉴 이벤트 초기화
  function initMenuEvents() {
    const isMobile = window.matchMedia("(max-width: 992px)").matches;
    const menuItems = document.querySelectorAll('.nav-list > li');

    // 이벤트 중복 방지용 (기존 이벤트 제거 후 새로 붙임)
    menuItems.forEach(item => item.replaceWith(item.cloneNode(true)));

    if (isMobile) {
      // 모바일: 클릭하면 드롭다운 토글
      document.querySelectorAll('.nav-list > li').forEach(item => {
        const subMenu = item.querySelector('.sub');
        const topLink = item.querySelector('.nav-link');

        if (subMenu) {
          item.addEventListener('click', function (e) {
            e.preventDefault();
            subMenu.classList.toggle('show');

            if (item.classList.contains('hd-nav-wrap') && topLink) {
              topLink.classList.toggle('active');
            }
          });
        }
      });

      // 모바일 메뉴 버튼
      if (navBtn && navWrap) {
        navBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const isOpen = navWrap.classList.toggle('open');
          document.body.classList.toggle('menu-open', isOpen);

          if (isOpen) {
            header.classList.add('fixed');
            header.classList.remove('hide');
          } else {
            header.classList.remove('fixed');
            document.querySelectorAll('.hd-nav-wrap > .nav-link').forEach(link => link.classList.remove('active'));
          }

          if (!isOpen) {
            document.querySelectorAll('.sub').forEach(sub => sub.classList.remove('show'));
          }
        });
      }
    } else {
      // 데스크탑: 호버 시 드롭다운
      document.querySelectorAll('.nav-list > li').forEach(item => {
        const subMenu = item.querySelector('.sub');
        const topLink = item.querySelector('.nav-link');

        if (subMenu) {
          item.addEventListener('mouseenter', () => {
            subMenu.classList.add('show');
            if (item.classList.contains('hd-nav-wrap') && topLink) {
              topLink.classList.add('active');
            }
          });
          item.addEventListener('mouseleave', () => {
            subMenu.classList.remove('show');
            if (item.classList.contains('hd-nav-wrap') && topLink) {
              topLink.classList.remove('active');
            }
          });
        }
      });
    }
  }

  // 외부 클릭 시 메뉴 닫기
  document.addEventListener('click', (e) => {
    if (navWrap.classList.contains('open')) {
      if (
        navWrap.contains(e.target) ||
        navBtn.contains(e.target) ||
        header.contains(e.target) ||
        e.target.closest('.nav-list > li > a') // 메뉴 링크 클릭 제외
      ) return;
      closeMenu();
    }
  });

  // 스크롤 시 header hide/show
  window.addEventListener('scroll', function () {
    if (header.classList.contains('fixed')) return; // 메뉴 열리면 스크롤 무시

    const curr = window.scrollY;

    if (curr > lastScroll) {
      header.classList.add('hide');
    } else {
      header.classList.remove('hide');
    }

    lastScroll = curr;
  });

  window.addEventListener('scroll', function () {
    const moSubMenu = document.querySelector('.hd-nav .sub'); // mo-sub-menu 선택

    if (window.scrollY > 50) {
      header.classList.add('active');
      document.querySelector('.gototop').classList.add('active');
      if (moSubMenu) moSubMenu.classList.add('active'); // active 추가
    } else {
      header.classList.remove('active');
      document.querySelector('.gototop').classList.remove('active');
      if (moSubMenu) moSubMenu.classList.remove('active'); // active 제거
    }
  });

  // 언어 선택 버튼
  document.querySelectorAll('.lang-btn-wrap').forEach(btnWrap => {
    btnWrap.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector('.hd-group .lang-btn-wrap').classList.toggle('active');
    });
  });

  // 트리거 버튼
  document.querySelectorAll('.trigger').forEach(trigger => {
    trigger.addEventListener('click', function () {
      this.classList.toggle('active');
      document.querySelector('.hd-nav').classList.toggle('open');
    });
  });

  // 섹션 클릭 시 메뉴 닫기 (헤더 고정 X)
  document.querySelectorAll('section, .menu a').forEach(element => {
    element.addEventListener('click', function () {
      document.querySelector('.hd-nav').classList.remove('open');
      document.querySelectorAll('.trigger').forEach(trigger => {
        trigger.classList.remove('active');
      });
      // header.fixed 제거 → 스크롤에 반응 유지
    });
  });

  // 초기 실행
  initMenuEvents();
  window.addEventListener('resize', initMenuEvents);
});
