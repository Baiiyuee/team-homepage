(() => {
  'use strict';

  const revealSelector = [
    '.hero-content > *',
    '.home-news-heading > *',
    '.news-item > *',
    '.lab-gallery-heading > *',
    '.team-intro .intro-copy > *',
    '.lab-introduction > *',
    '.personnel-section-title',
    '.personnel-card',
    '.research-intro',
    '.research-topic-list > .research-topic-card',
    '.research-outro',
    '.achievement-publications > .publication-block',
    '.education-feature > *',
    '.recruitment-section > *',
    '.contact-title',
    '.contact-list > .contact-item',
    '.contact-recruitment > *'
  ].join(', ');

  const revealOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -8% 0px'
  };

  const prepareItems = (items) => {
    items.forEach((item, index) => {
      item.classList.add('reveal-on-scroll');
      item.style.setProperty('--reveal-delay', `${(index % 4) * 70}ms`);
    });
  };

  const observeItems = (items) => {
    if (!items.length) return;
    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      });
    }, revealOptions);
    items.forEach((item) => observer.observe(item));
  };

  const revealItems = (items) => {
    prepareItems(items);
    observeItems(items);
  };

  function init() {
    revealItems(Array.from(document.querySelectorAll(revealSelector)));

    document.addEventListener('publications:rendered', () => {
      revealItems(Array.from(
        document.querySelectorAll('.achievement-publications .publication-list > li')
      ));
    });
  }

  window.TeamHomepageScrollReveal = {
    init
  };
})();
