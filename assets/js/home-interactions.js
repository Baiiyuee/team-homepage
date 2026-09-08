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

  function setupHomeDirectionCards({ prefersReducedMotion }) {
    const cards = Array.from(document.querySelectorAll('[data-home-direction-card]'));
    if (!cards.length) return;
    const rotatingCards = cards.filter((card) => card.querySelector('h3')?.textContent.trim());
    let activeIndex = 0;
    let autoplayTimer = 0;
    const closingTimers = new WeakMap();

    const closeCard = (card) => {
      const existingTimer = closingTimers.get(card);
      if (existingTimer) window.clearTimeout(existingTimer);
      if (!card.open) {
        card.classList.remove('is-closing');
        return;
      }
      card.classList.add('is-closing');
      const timer = window.setTimeout(() => {
        card.open = false;
        card.classList.remove('is-closing');
        closingTimers.delete(card);
      }, 540);
      closingTimers.set(card, timer);
    };

    const openCard = (card) => {
      const existingTimer = closingTimers.get(card);
      if (existingTimer) {
        window.clearTimeout(existingTimer);
        closingTimers.delete(card);
      }
      cards.forEach((otherCard) => {
        if (otherCard !== card) closeCard(otherCard);
      });
      card.classList.remove('is-closing');
      card.open = true;
      const rotatedIndex = rotatingCards.indexOf(card);
      if (rotatedIndex >= 0) activeIndex = rotatedIndex;
    };

    const stopAutoplay = () => {
      window.clearInterval(autoplayTimer);
      autoplayTimer = 0;
    };

    const startAutoplay = () => {
      stopAutoplay();
      if (prefersReducedMotion || rotatingCards.length < 2) return;
      autoplayTimer = window.setInterval(() => {
        activeIndex = (activeIndex + 1) % rotatingCards.length;
        openCard(rotatingCards[activeIndex]);
      }, 3600);
    };

    cards.forEach((card) => {
      const summary = card.querySelector('summary');
      summary?.addEventListener('click', (event) => {
        event.preventDefault();
        stopAutoplay();
        if (card.open && !card.classList.contains('is-closing')) closeCard(card);
        else openCard(card);
        startAutoplay();
      });
      card.addEventListener('mouseenter', () => {
        stopAutoplay();
        openCard(card);
      });
      card.addEventListener('focusin', () => {
        stopAutoplay();
        openCard(card);
      });
      card.addEventListener('mouseleave', () => {
        if (!card.contains(document.activeElement)) startAutoplay();
      });
      card.addEventListener('focusout', () => {
        window.setTimeout(() => {
          if (!card.contains(document.activeElement)) startAutoplay();
        }, 0);
      });
    });

    if (rotatingCards.length) openCard(rotatingCards[activeIndex]);
    startAutoplay();
  }

  function init(options = {}) {
    setupHomeNewsBoard();
    setupLabCarousel(options);
    setupHomeDirectionCards(options);
  }

  window.TeamHomepageHomeInteractions = {
    init
  };
})();
