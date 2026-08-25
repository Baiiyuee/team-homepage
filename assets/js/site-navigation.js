(() => {
  'use strict';

  let links = [];
  let submenuItems = [];
  let nestedSubmenuGroups = [];
  let nav = null;
  let toggle = null;

  function setupCompactHeader() {
    const siteHeader = document.querySelector('.site-header');
    const brandBanner = document.querySelector('.brand-banner');
    let navDockPoint = 0;
    let navScrollFrame = 0;

    const measureNavDockPoint = () => {
      navDockPoint = (siteHeader?.offsetTop || 0) + (brandBanner?.offsetHeight || 0);
    };
    const updateCompactNavigation = () => {
      navScrollFrame = 0;
      siteHeader?.classList.toggle('is-nav-compact', window.scrollY >= navDockPoint);
    };
    const requestCompactNavigationUpdate = () => {
      if (navScrollFrame) return;
      navScrollFrame = window.requestAnimationFrame(updateCompactNavigation);
    };

    measureNavDockPoint();
    updateCompactNavigation();
    window.addEventListener('scroll', requestCompactNavigationUpdate, { passive: true });
    window.addEventListener('resize', () => {
      measureNavDockPoint();
      requestCompactNavigationUpdate();
    });
  }

  const closeMenus = () => {
    submenuItems.forEach((item) => {
      item.classList.remove('is-open');
      item.querySelector('.nav-parent')?.setAttribute('aria-expanded', 'false');
    });
    nestedSubmenuGroups.forEach((group) => {
      group.classList.remove('is-open');
      group.querySelector('.nav-submenu-parent')?.setAttribute('aria-expanded', 'false');
    });
  };

  const syncActive = ({ activeRoute, targetName }) => {
    links.forEach((link) => {
      const linkRoute = link.dataset.route || link.dataset.pageLink;
      link.classList.toggle('is-active', linkRoute === activeRoute);
    });
    submenuItems.forEach((item) => {
      const parentRoute = item.querySelector('.nav-parent')?.dataset.parentRoute;
      item.classList.toggle(
        'is-active',
        Boolean(item.querySelector('.is-active'))
          || parentRoute === activeRoute
          || (
            targetName === 'faculty'
            && Boolean(item.querySelector('[data-page-link="faculty"]'))
          )
      );
    });
    nestedSubmenuGroups.forEach((group) => {
      group.classList.toggle('is-active', Boolean(group.querySelector('.is-active')));
    });

    closeMenus();
    nav?.classList.remove('is-open');
    toggle?.setAttribute('aria-expanded', 'false');
  };

  function init({ showPage }) {
    toggle = document.querySelector('.nav-toggle');
    nav = document.querySelector('.nav-links');
    links = Array.from(document.querySelectorAll('[data-page-link]'));
    submenuItems = Array.from(document.querySelectorAll('.nav-item'));
    nestedSubmenuGroups = Array.from(document.querySelectorAll('.nav-submenu-group'));
    setupCompactHeader();

    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(isOpen));
      });
    }

    submenuItems.forEach((item) => {
      const button = item.querySelector('.nav-parent');
      button?.addEventListener('click', (event) => {
        event.stopPropagation();
        const shouldOpen = !item.classList.contains('is-open');
        if (button.dataset.parentRoute) showPage(button.dataset.parentRoute);
        submenuItems.forEach((otherItem) => {
          const isCurrent = otherItem === item && shouldOpen;
          otherItem.classList.toggle('is-open', isCurrent);
          otherItem.querySelector('.nav-parent')?.setAttribute('aria-expanded', String(isCurrent));
        });
      });
      item.addEventListener('mouseleave', () => {
        item.classList.remove('is-open', 'is-hover-suppressed');
        button?.setAttribute('aria-expanded', 'false');
        if (item.contains(document.activeElement)) {
          document.activeElement.blur();
        }
      });
    });

    nestedSubmenuGroups.forEach((group) => {
      const button = group.querySelector('.nav-submenu-parent');
      button?.addEventListener('click', (event) => {
        event.stopPropagation();
        const shouldOpen = !group.classList.contains('is-open');
        nestedSubmenuGroups.forEach((otherGroup) => {
          const isCurrent = otherGroup === group && shouldOpen;
          otherGroup.classList.toggle('is-open', isCurrent);
          otherGroup.querySelector('.nav-submenu-parent')?.setAttribute('aria-expanded', String(isCurrent));
        });
      });
    });

    document.addEventListener('click', closeMenus);
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenus();
    });

    links.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        link.closest('.nav-item')?.classList.add('is-hover-suppressed');
        showPage(link.dataset.route || link.dataset.pageLink);
      });
    });
  }

  window.TeamHomepageNavigation = {
    init,
    syncActive
  };
})();
