(() => {
  'use strict';

  function setupHomeNewsBoard() {
    const homeNewsBoard = document.querySelector('[data-home-news-board]');
    if (!homeNewsBoard) return;

    const newsEntries = Array.from(homeNewsBoard.querySelectorAll('[data-home-news-entry]'));
    const newsCovers = Array.from(homeNewsBoard.querySelectorAll('[data-home-news-cover]'));
    const showHomeNewsCover = (index) => {
      newsEntries.forEach((entry, entryIndex) => {
        entry.classList.toggle('is-active', entryIndex === index);
      });
      newsCovers.forEach((cover, coverIndex) => {
        cover.classList.toggle('is-active', coverIndex === index);
      });
    };

    newsEntries.forEach((entry, index) => {
      entry.addEventListener('mouseenter', () => showHomeNewsCover(index));
      entry.addEventListener('focus', () => showHomeNewsCover(index));
    });
    showHomeNewsCover(0);
  }

  function setupLabCarousel({ prefersReducedMotion }) {
    const labCarousel = document.querySelector('[data-lab-carousel]');
    if (!labCarousel) return;

    const slides = Array.from(labCarousel.querySelectorAll('.lab-slide'));
    const dots = Array.from(labCarousel.querySelectorAll('.lab-carousel-dot'));
    const dotsNav = labCarousel.querySelector('.lab-carousel-dots');
    const previousButton = labCarousel.querySelector('[data-carousel-prev]');
    const nextButton = labCarousel.querySelector('[data-carousel-next]');
    let activeIndex = 0;
    let autoplayTimer = 0;

    const showSlide = (index) => {
      activeIndex = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle('is-active', slideIndex === activeIndex);
        slide.setAttribute('aria-hidden', String(slideIndex !== activeIndex));
      });
      dots.forEach((dot, dotIndex) => {
        const isActive = dotIndex === activeIndex;
        dot.classList.toggle('is-active', isActive);
        if (isActive) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
      const planePosition = slides.length > 1
        ? 10 + (activeIndex / (slides.length - 1)) * 80
        : 50;
      dotsNav?.style.setProperty('--plane-position', `${planePosition}%`);
    };

    const stopAutoplay = () => {
      window.clearInterval(autoplayTimer);
      autoplayTimer = 0;
    };

    const startAutoplay = () => {
      stopAutoplay();
      if (prefersReducedMotion || slides.length < 2) return;
      autoplayTimer = window.setInterval(() => showSlide(activeIndex + 1), 5200);
    };

    dots.forEach((dot, index) => {
      const previewSlide = () => {
        stopAutoplay();
        showSlide(index);
      };
      dot.addEventListener('mouseenter', previewSlide);
      dot.addEventListener('focus', previewSlide);
      dot.addEventListener('mouseleave', startAutoplay);
      dot.addEventListener('blur', startAutoplay);
      dot.addEventListener('click', () => {
        showSlide(index);
        startAutoplay();
      });
    });
    previousButton?.addEventListener('click', () => {
      showSlide(activeIndex - 1);
      startAutoplay();
    });
    nextButton?.addEventListener('click', () => {
      showSlide(activeIndex + 1);
      startAutoplay();
    });

    showSlide(0);
    startAutoplay();
  }

  function init(options = {}) {
    setupHomeNewsBoard();
    setupLabCarousel(options);
  }

  window.TeamHomepageHomeInteractions = {
    init
  };
})();
