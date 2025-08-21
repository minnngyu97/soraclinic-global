document.addEventListener('DOMContentLoaded', function () {
    // 1. DOM 요소 선언
    const header = document.querySelector('#hd');
    const navBtn = document.querySelector('.hd-mo-nav-btn');
    const navWrap = document.querySelector('.hd-nav');
    const hdDim = document.querySelector('.hd-dim');
    const gototopBtn = document.querySelector('.gototop');

    let lastScroll = 0;
    const isMobile = () => window.matchMedia('(max-width: 991px)').matches;

    // 2. 모바일 메뉴 열고 닫기
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

    // 3. 모바일 메뉴 클릭 이벤트
    function handleMobileMenuClick(e) {
        const topLink = e.currentTarget; // 클릭된 a 요소
        const subMenu = topLink.nextElementSibling;
        if (subMenu && subMenu.classList.contains('sub')) {
            e.preventDefault(); // 링크 이동 막음
            subMenu.classList.toggle('show');
            topLink.classList.toggle('active');
        }
    }

    // 4. 데스크탑 메뉴 호버 이벤트
    function handleDesktopMenuHover(item, enter) {
        const subMenu = item.querySelector('.sub');
        if (subMenu) subMenu.classList.toggle('show', enter);
    }

    // 5. 메뉴 이벤트 초기화
    function initMenuEvents() {
        const navItems = document.querySelectorAll('.nav-list > li');
        const navLinks = document.querySelectorAll('.nav-list > li > a');

        // 기존 이벤트 제거 → 완전히 새로운 노드로 교체
        navLinks.forEach(link => {
            const clone = link.cloneNode(true);
            link.parentNode.replaceChild(clone, link);
        });

        if (isMobile()) {
            // 모바일: 각 상위 메뉴 링크에 클릭 이벤트 연결
            document.querySelectorAll('.nav-list > li > a').forEach(link => {
                link.addEventListener('click', handleMobileMenuClick);
            });
        } else {
            // 데스크탑: hover 이벤트
            navItems.forEach(item => {
                item.addEventListener('mouseenter', () => handleDesktopMenuHover(item, true));
                item.addEventListener('mouseleave', () => handleDesktopMenuHover(item, false));
            });
        }
    }

    // 6. 스크롤 이벤트 함수 (별도 분리)
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

    // 7. 스크롤 이벤트 등록
    window.addEventListener('scroll', handleScroll);

    // ★ DOMContentLoaded 직후에도 한 번 실행 (새로고침 시 올바른 상태 적용)
    handleScroll();

    // 8. 모바일 메뉴 버튼 클릭
    if (navBtn) {
        navBtn.addEventListener('click', () => {
            const isOpen = !navWrap.classList.contains('open');
            toggleMobileMenu(isOpen);
        });
    }

    // 9. 딤드 클릭 시 메뉴 닫기
    if (hdDim) {
        hdDim.addEventListener('click', () => toggleMobileMenu(false));
    }

    // 10. 외부 클릭 시 메뉴 닫기
    document.addEventListener('click', (e) => {
        const isClickInside = navBtn.contains(e.target) || navWrap.contains(e.target);
        if (!isClickInside && navWrap.classList.contains('open')) {
            toggleMobileMenu(false);
        }
    });

    // 11. 언어 선택 버튼
    document.querySelectorAll('.lang-btn-wrap').forEach(btnWrap => {
        btnWrap.addEventListener('click', (e) => {
            e.stopPropagation();
            btnWrap.classList.toggle('active');
        });
    });

    // 12. 퀵메뉴 호버
    // document.querySelectorAll('.quick-item').forEach(item => {
    //     item.addEventListener('mouseenter', () => item.classList.add('active'));
    //     item.addEventListener('mouseleave', () => item.classList.remove('active'));
    // });

    // PC(마우스 있는 환경)에서만 실행
    if (window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.quick-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.classList.add('active');
            });
            item.addEventListener('mouseleave', () => {
                item.classList.remove('active');
            });
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

    // 13. 초기화 실행
    initMenuEvents();
    window.addEventListener('resize', initMenuEvents);
});
