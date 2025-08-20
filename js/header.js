document.addEventListener('DOMContentLoaded', function () {
    // 1. 모든 DOM 요소를 상단에서 한 번만 선언
    const header = document.querySelector('#hd');
    const navBtn = document.querySelector('.hd-mo-nav-btn');
    const navWrap = document.querySelector('.hd-nav'); // hd-nav로 변경 (CSS 선택자 일치)
    const hdDim = document.querySelector('.hd-dim');
    const gototopBtn = document.querySelector('.gototop');

    let lastScroll = 0;
    const isMobile = () => window.matchMedia('(max-width: 992px)').matches;

    // 2. 모바일 메뉴 열고 닫는 로직을 하나의 함수로 통합
    function toggleMobileMenu(isOpen) {
        navWrap.classList.toggle('open', isOpen);
        navBtn.classList.toggle('active', isOpen);
        document.body.classList.toggle('menu-open', isOpen);

        if (isOpen) {
            header.classList.add('fixed');
            header.classList.remove('hide');
            // 메뉴가 열리면 딤드 배경에 pointer-events를 auto로 설정
            if (hdDim) hdDim.style.pointerEvents = 'auto';
        } else {
            header.classList.remove('fixed');
            // 메뉴가 닫히면 모든 서브메뉴 닫기
            document.querySelectorAll('.sub.show').forEach(sub => sub.classList.remove('show'));
            document.querySelectorAll('.hd-nav-wrap > .nav-link.active').forEach(link => link.classList.remove('active'));
            // 메뉴가 닫히면 딤드 배경에 pointer-events를 none으로 설정
            if (hdDim) hdDim.style.pointerEvents = 'none';
        }
    }

    // 3. 데스크톱과 모바일 메뉴 이벤트를 한 함수에서 관리
    function initMenuEvents() {
        // 기존 이벤트 리스너 제거 (이벤트 재할당 방식 변경)
        navWrap.removeEventListener('click', handleMobileMenuClick);
        navWrap.removeEventListener('mouseenter', handleDesktopMenuHover);
        navWrap.removeEventListener('mouseleave', handleDesktopMenuHover);

        if (isMobile()) {
            navWrap.addEventListener('click', handleMobileMenuClick);
        } else {
            navWrap.addEventListener('mouseenter', handleDesktopMenuHover);
            navWrap.addEventListener('mouseleave', handleDesktopMenuHover);
        }
    }

    // 모바일 메뉴 클릭 이벤트 핸들러
    function handleMobileMenuClick(e) {
        const topLink = e.target.closest('.nav-list > li > a');
        if (!topLink) return;

        const subMenu = topLink.nextElementSibling;
        if (subMenu && subMenu.classList.contains('sub')) {
            e.preventDefault();
            subMenu.classList.toggle('show');
            topLink.classList.toggle('active');
        }
    }

    // 데스크톱 메뉴 호버 이벤트 핸들러
    function handleDesktopMenuHover(e) {
        const item = e.target.closest('.nav-list > li');
        if (!item) return;

        const subMenu = item.querySelector('.sub');
        if (subMenu) {
            if (e.type === 'mouseenter') {
                subMenu.classList.add('show');
            } else {
                subMenu.classList.remove('show');
            }
        }
    }

    // 4. 스크롤 이벤트를 하나로 통합
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        // 헤더 숨기기/보이기 로직
        // fixed 클래스가 없어야만 작동
        if (!header.classList.contains('fixed')) {
            if (currentScroll > lastScroll) {
                header.classList.add('hide');
            } else {
                header.classList.remove('hide');
            }
        }
        lastScroll = currentScroll;

        // 헤더 배경 및 gototop 버튼 표시 로직
        if (currentScroll > 50) {
            header.classList.add('scrolled', 'active');
            if (gototopBtn) gototopBtn.classList.add('active');
        } else {
            header.classList.remove('scrolled', 'active');
            if (gototopBtn) gototopBtn.classList.remove('active');
        }
    });

    // 5. 모든 이벤트 리스너를 한 곳에 모아 관리
    // 모바일 메뉴 버튼 클릭
    if (navBtn) {
        navBtn.addEventListener('click', () => {
            const isOpen = !navWrap.classList.contains('open');
            toggleMobileMenu(isOpen);
        });
    }

    // 딤드 배경 클릭 시 메뉴 닫기
    if (hdDim) {
        hdDim.addEventListener('click', () => {
            toggleMobileMenu(false);
        });
    }

    // 외부 클릭 시 메뉴 닫기
    document.addEventListener('click', (e) => {
        // 메뉴 버튼, 메뉴, 헤더 클릭 시 닫히지 않도록
        const isClickInside = navBtn.contains(e.target) || navWrap.contains(e.target);
        if (!isClickInside && navWrap.classList.contains('open')) {
            toggleMobileMenu(false);
        }
    });

    // 언어 선택 버튼 토글
    document.querySelectorAll('.lang-btn-wrap').forEach(btnWrap => {
        btnWrap.addEventListener('click', (e) => {
            e.stopPropagation(); // 외부 클릭 닫힘 방지
            btnWrap.classList.toggle('active');
        });
    });

    // 퀵메뉴 호버
    document.querySelectorAll('.quick-item').forEach(item => {
        item.addEventListener('mouseenter', () => item.classList.add('active'));
        item.addEventListener('mouseleave', () => item.classList.remove('active'));
    });

    // 초기화 함수 실행
    initMenuEvents();
    window.addEventListener('resize', initMenuEvents);
});