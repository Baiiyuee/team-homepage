(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav-links');
  const links = Array.from(document.querySelectorAll('.nav-links a'));
  const sections = links
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  links.forEach((link) => {
    link.addEventListener('click', () => {
      nav?.classList.remove('is-open');
      toggle?.setAttribute('aria-expanded', 'false');
    });
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      const current = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!current) return;

      links.forEach((link) => {
        link.classList.toggle(
          'is-active',
          link.getAttribute('href') === `#${current.target.id}`
        );
      });
    }, {
      rootMargin: '-18% 0px -68% 0px',
      threshold: [0, 0.15, 0.45]
    });

    sections.forEach((section) => observer.observe(section));
  }

  window.addEventListener('scroll', () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 12);
  }, { passive: true });
})();
