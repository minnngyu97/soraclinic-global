const slide1 = new Swiper(".slide1", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  speed: 1000
  // on: {
  //   slideChangeTransitionEnd: function () {
  //     const activeSlide = document.querySelector(".slide1 .swiper-slide-active");
  //     const scSlide = document.querySelector(".sc-slide");
  //     if (activeSlide && scSlide) {
  //       scSlide.style.backgroundColor = activeSlide.dataset.bgColor || "#ffffff";
  //     }
  //   },
  // },
});

