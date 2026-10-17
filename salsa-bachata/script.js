(() => {
  'use strict';

  // One initialization also prevents duplicate lead events if this file is loaded twice.
  if (window.__kdfSalsaPageInitialized) return;
  window.__kdfSalsaPageInitialized = true;

  const menuToggle = document.querySelector('.menu-toggle');
  const mainNavigation = document.querySelector('#main-navigation');

  function closeNavigation() {
    mainNavigation.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
  }

  if (menuToggle && mainNavigation) {
    menuToggle.addEventListener('click', () => {
      const open = menuToggle.getAttribute('aria-expanded') !== 'true';
      mainNavigation.classList.toggle('is-open', open);
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });

    mainNavigation.addEventListener('click', event => {
      if (event.target.closest?.('a')) closeNavigation();
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        closeNavigation();
        menuToggle.focus();
      }
    });

    window.matchMedia('(min-width: 1051px)').addEventListener('change', event => {
      if (event.matches) closeNavigation();
    });
  }

  // Local previews and unrecognized hosts must never pollute the production property.
  const productionHost = ['krishnadancefactory.in', 'www.krishnadancefactory.in']
    .includes(window.location.hostname);
  if (!productionHost || window.location.protocol !== 'https:') return;

  function track(name, parameters) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, { ...parameters, transport_type: 'beacon' });
    }
  }

  function linkLocation(link) {
    if (link.closest('.mobile-contact')) return 'mobile_sticky';
    if (link.closest('header')) return 'header';
    if (link.closest('footer')) return 'footer';
    return link.closest('section[id]')?.id || 'page';
  }

  document.addEventListener('click', event => {
    const link = event.target.closest?.('a[href]');
    if (!link) return;

    let destination;
    try {
      destination = new URL(link.href, window.location.href);
    } catch {
      return;
    }

    const parameters = { event_category: 'Leads', link_location: linkLocation(link) };
    if (destination.protocol === 'tel:') {
      track('click_call', { ...parameters, event_label: destination.href });
    } else if (destination.hostname === 'wa.me') {
      // Preserve the existing event name, without collecting a WhatsApp message or query.
      track('click_whatsapp', {
        ...parameters,
        event_label: destination.origin + destination.pathname
      });
    } else if (destination.hostname === 'www.google.com' && destination.pathname === '/maps/dir/') {
      track('click_directions', {
        event_category: 'engagement',
        event_label: 'studio_directions',
        link_location: parameters.link_location
      });
    }
  });

  // Keep both existing 70% event contracts, once per page view, for historical reports.
  let scrolled70 = false;
  function checkScroll70() {
    if (scrolled70 || typeof window.gtag !== 'function') return;
    const root = document.documentElement;
    const body = document.body;
    const scrollTop = window.pageYOffset || root.scrollTop || body.scrollTop || 0;
    const scrollableHeight = Math.max(
      body.scrollHeight, root.scrollHeight, body.offsetHeight, root.offsetHeight
    ) - window.innerHeight;
    if (scrollableHeight <= 0 || scrollTop / scrollableHeight < 0.7) return;

    scrolled70 = true;
    window.removeEventListener('scroll', checkScroll70);
    const parameters = {
      percent_scrolled: 70,
      event_category: 'engagement',
      event_label: 'salsa-bachata'
    };
    track('scroll', parameters);
    track('scroll_70', parameters);
  }
  window.addEventListener('scroll', checkScroll70, { passive: true });
})();
