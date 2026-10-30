(() => {
  'use strict';

  // One initialization also prevents duplicate lead events if this file is loaded twice.
  if (window.__kdfHomePageInitialized) return;
  window.__kdfHomePageInitialized = true;

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

  /* ==========================================================================
     Source-based WhatsApp Prefilled Message Attribution
     ========================================================================== */
  const SOURCE_LABELS = {
    GOOGLE_ADS: 'Reference: Google Ads',
    GBP: 'Reference: Google Business Profile',
    GOOGLE_ORGANIC: 'Reference: Google Organic',
    UNKNOWN: 'Reference: Website \u2014 source unknown'
  };

  const SESSION_STORAGE_KEY = 'kdf_visitor_source';

  function detectVisitorSource() {
    let searchParams;
    try {
      searchParams = new URLSearchParams(window.location.search);
    } catch {
      searchParams = new URLSearchParams();
    }

    const hasParam = key => searchParams.has(key) && (searchParams.get(key) || '').trim() !== '';
    const getParam = key => (searchParams.get(key) || '').trim().toLowerCase();

    // 1. Google Ads identifiers & explicit paid parameters (Highest Precedence over Organic Referrer)
    const hasGclid = hasParam('gclid');
    const hasGbraid = hasParam('gbraid');
    const hasWbraid = hasParam('wbraid');
    const hasGadSource = hasParam('gad_source');

    const utmMedium = getParam('utm_medium');
    const utmSource = getParam('utm_source');
    const utmCampaign = getParam('utm_campaign');

    // Source Classification Helpers
    const isExplicitNonGoogle = /^(facebook|fb|instagram|ig|meta|bing|linkedin|twitter|x|tiktok|pinterest|youtube)$/i.test(utmSource) ||
      utmSource.includes('facebook') || utmSource.includes('instagram') || utmSource.includes('meta');

    const isGoogleSource = !isExplicitNonGoogle && (
      /^(google|google_ads|googleads|adwords|googlesearch|google-ads)$/i.test(utmSource) ||
      utmSource.includes('google') ||
      utmSource.includes('adwords')
    );

    // 1. Google Ads identifiers & explicit Google paid parameters (Highest Precedence over Organic Referrer)
    const hasGoogleClickId = hasGclid || hasGbraid || hasWbraid || hasGadSource;
    const isPaidMedium = /^(cpc|ppc|paid|paidsearch|cpm|cpv|cpa)$/i.test(utmMedium);
    const isGooglePaidCampaign = /(google_ads|googleads|adwords)/i.test(utmCampaign);

    // To be labeled Google Ads, it must have Google click ID OR (paid medium AND confirmed Google source/campaign).
    // Non-Google sources (Facebook, Instagram, Meta, Bing, etc.) must NEVER be labeled Google Ads.
    const isGoogleAdsPaid = !isExplicitNonGoogle && (
      hasGoogleClickId ||
      (isPaidMedium && (isGoogleSource || isGooglePaidCampaign))
    );

    if (isGoogleAdsPaid) {
      return SOURCE_LABELS.GOOGLE_ADS;
    }

    // 2. Google Business Profile (GBP) (Precedence 2)
    // Must NOT be labeled as Google Organic even if utm_source=google & utm_medium=organic
    const utmContent = getParam('utm_content');
    const isGbpCampaign = /(gbp|gmb|gbp_listing|google_business_profile|googlebusinessprofile|local)/i.test(utmCampaign);
    const isGbpContent = /(primary_website_button|gbp|gmb)/i.test(utmContent);
    const isGbpSource = /^(gbp|gmb|google_business_profile|googlebusinessprofile)$/i.test(utmSource);
    const isGbpMedium = /^(gbp|gmb|maps|local)$/i.test(utmMedium);

    if (!isExplicitNonGoogle && (isGbpCampaign || isGbpContent || isGbpSource || isGbpMedium)) {
      return SOURCE_LABELS.GBP;
    }

    // 3. Google Search referrer / Google Organic (Precedence 3)
    // Organic UTMs must specifically confirm that source is Google!
    const isGoogleOrganicUtm = isGoogleSource && utmMedium === 'organic';

    let referrerUrl = null;
    if (document.referrer) {
      try {
        referrerUrl = new URL(document.referrer);
      } catch {
        referrerUrl = null;
      }
    }

    const isCurrentHost = referrerUrl && referrerUrl.hostname === window.location.hostname;
    // Referrer from Google search, provided there is no explicit non-Google UTM source
    const isGoogleSearchReferrer = !isCurrentHost && !isExplicitNonGoogle && !utmSource && (
      (referrerUrl && /(^|\.)google\.[a-z.]+$/i.test(referrerUrl.hostname)) ||
      (document.referrer && /^android-app:\/\/com\.google\.android\.googlequicksearchbox(\/|$)/i.test(document.referrer))
    );

    if (isGoogleOrganicUtm || isGoogleSearchReferrer) {
      return SOURCE_LABELS.GOOGLE_ORGANIC;
    }

    return null;
  }

  function getPreservedSource() {
    try {
      return window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    } catch {
      return null;
    }
  }

  function setPreservedSource(source) {
    try {
      window.sessionStorage.setItem(SESSION_STORAGE_KEY, source);
    } catch {
      // sessionStorage unavailable in restricted/sandboxed contexts
    }
  }

  function resolveVisitorSource() {
    const detected = detectVisitorSource();
    if (detected) {
      // New incoming external attribution found; save to session storage
      setPreservedSource(detected);
      return detected;
    }

    // No new source in URL or referrer. Check session storage for internal navigation / refresh.
    const preserved = getPreservedSource();
    if (preserved) {
      return preserved;
    }

    // First visit in session with no identifiable source
    const unknownSource = SOURCE_LABELS.UNKNOWN;
    setPreservedSource(unknownSource);
    return unknownSource;
  }

  function updateWhatsAppLinks() {
    const sourceLabel = resolveVisitorSource();
    const waLinks = document.querySelectorAll('a[href*="wa.me"]');

    waLinks.forEach(link => {
      let destination;
      try {
        destination = new URL(link.getAttribute('href'), window.location.href);
      } catch {
        return;
      }

      // Preserve the base prefilled message and original href
      let baseText = link.getAttribute('data-base-text');
      if (baseText === null) {
        baseText = destination.searchParams.get('text') || '';
        link.setAttribute('data-base-text', baseText);
        link.setAttribute('data-original-href', link.getAttribute('href'));
      }

      const updatedText = baseText.trim()
        ? `${baseText.trim()}\n\n${sourceLabel}`
        : sourceLabel;

      // Construct clean URL preserving phone number / pathname and encoding text
      const cleanUrl = `${destination.origin}${destination.pathname}?text=${encodeURIComponent(updatedText)}`;
      link.setAttribute('href', cleanUrl);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateWhatsAppLinks);
  } else {
    updateWhatsAppLinks();
  }

  // Local previews and unrecognized hosts must never pollute the production property.
  const isProduction = ['krishnadancefactory.in', 'www.krishnadancefactory.in']
    .includes(window.location.hostname) && window.location.protocol === 'https:';
  const enableTracking = isProduction || Boolean(window.__kdfEnableTracking);
  if (!enableTracking) return;

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
      event_label: 'homepage'
    };
    track('scroll', parameters);
    track('scroll_70', parameters);
  }
  window.addEventListener('scroll', checkScroll70, { passive: true });
})();
