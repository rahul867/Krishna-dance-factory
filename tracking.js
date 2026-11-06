(() => {
  'use strict';
  if (window.__kdfTrackingInitialized) return;
  window.__kdfTrackingInitialized = true;
  const production = window.location.protocol === 'https:' &&
    ['krishnadancefactory.in', 'www.krishnadancefactory.in'].includes(window.location.hostname);
  const key = 'kdf-consent-v1';
  const lifetime = 180 * 24 * 60 * 60 * 1000;
  let choice = { analytics: false, marketing: false };
  let saved = false;
  try {
    const stored = JSON.parse(localStorage.getItem(key));
    if (stored && stored.version === 1 && Number.isFinite(stored.time) &&
        stored.time <= Date.now() && Date.now() - stored.time < lifetime &&
        typeof stored.analytics === 'boolean' && typeof stored.marketing === 'boolean') {
      choice = stored; saved = true;
    }
  } catch (_) { /* Missing or blocked storage leaves optional tracking off. */ }
  const ids = {
    ga4: 'G-9EC735TX9M',
    clarity: 'yuydpk0804',
    meta: '2382786972494968'
  };

  let gaLoaded = false, clarityLoaded = false, metaLoaded = false;
  window.dataLayer = window.dataLayer || [];
  const enqueue = function () { window.dataLayer.push(arguments); };
  // Discard pre-consent interactions instead of replaying them after acceptance.
  window.gtag = function () {
    if (arguments[0] === 'event' && !choice.analytics) return;
    enqueue.apply(null, arguments);
  };
  enqueue('consent', 'default', {
    analytics_storage: 'denied', ad_storage: 'denied',
    ad_user_data: 'denied', ad_personalization: 'denied'
  });
  function load(src) {
    const script = document.createElement('script');
    script.async = true; script.src = src; document.head.appendChild(script);
  }
  function apply() {
    const analytics = choice.analytics ? 'granted' : 'denied';
    const marketing = choice.marketing ? 'granted' : 'denied';
    window['ga-disable-' + ids.ga4] = !choice.analytics;
    enqueue('consent', 'update', { analytics_storage: analytics,
      ad_storage: marketing, ad_user_data: marketing, ad_personalization: marketing });
    enqueue('set', { allow_google_signals: choice.marketing,
      allow_ad_personalization_signals: choice.marketing });
    if (!production) return;
    if (choice.analytics && !gaLoaded) {
      gaLoaded = true; enqueue('js', new Date());
      enqueue('config', ids.ga4, { allow_google_signals: choice.marketing,
        allow_ad_personalization_signals: choice.marketing });
      load('https://www.googletagmanager.com/gtag/js?id=' + ids.ga4);
    }
    if (choice.analytics && !clarityLoaded) {
      clarityLoaded = true;
      window.clarity = window.clarity || function () {
        (window.clarity.q = window.clarity.q || []).push(arguments);
      };
      window.clarity('consentv2', { analytics_Storage: analytics, ad_Storage: marketing });
      load('https://www.clarity.ms/tag/' + ids.clarity);
    } else if (clarityLoaded) {
      window.clarity('consentv2', { analytics_Storage: analytics, ad_Storage: marketing });
    }
    if (choice.marketing && !metaLoaded) {
      metaLoaded = true;
      if (!window.fbq) {
        const fbq = window.fbq = function () {
          if (fbq.callMethod) fbq.callMethod.apply(fbq, arguments);
          else fbq.queue.push(arguments);
        };
        window._fbq = window._fbq || fbq;
        fbq.push = fbq; fbq.loaded = true; fbq.version = '2.0'; fbq.queue = [];
        load('https://connect.facebook.net/en_US/fbevents.js');
      }
      window.fbq('consent', 'grant'); window.fbq('init', ids.meta);
      window.fbq('trackSingle', ids.meta, 'PageView');
    } else if (metaLoaded) window.fbq('consent', choice.marketing ? 'grant' : 'revoke');
  }
  apply();
  let dialog, banner, previousFocus;
  function clearOptionalCookies() {
    const paths = new Set(['/']);
    const parts = window.location.pathname.split('/').filter(Boolean);
    let path = ''; for (const part of parts) { path += '/' + part; paths.add(path); paths.add(path + '/'); }
    for (const entry of document.cookie.split(';')) {
      const name = entry.split('=')[0].trim();
      if (!/^(_ga($|_)|_gid$|_gat|_gcl_|_clck$|_clsk$|_fbp$|_fbc$)/.test(name)) continue;
      for (const cookiePath of paths) {
        for (const domain of ['', window.location.hostname, '.krishnadancefactory.in']) {
          document.cookie = name + '=; Max-Age=0; path=' + cookiePath + (domain ? '; domain=' + domain : '') + '; SameSite=Lax';
        }
      }
    }
  }
  function save(next) {
    const revoked = (choice.analytics && !next.analytics) || (choice.marketing && !next.marketing);
    choice = { version: 1, time: Date.now(), analytics: next.analytics, marketing: next.marketing };
    try { localStorage.setItem(key, JSON.stringify(choice)); } catch (_) {}
    saved = true; apply(); banner.hidden = true;
    if (dialog.open) dialog.close();
    if (revoked) { clearOptionalCookies(); window.location.reload(); }
  }
  function openPreferences() {
    previousFocus = document.activeElement;
    dialog.querySelector('[name="analytics"]').checked = choice.analytics;
    dialog.querySelector('[name="marketing"]').checked = choice.marketing;
    dialog.showModal();
  }
  function mount() {
    banner = document.createElement('section');
    banner.className = 'kdf-cookie-banner'; banner.setAttribute('aria-label', 'Cookie choices'); banner.hidden = saved;
    banner.innerHTML = `<div><strong>Your privacy choices</strong><p>With your permission, we use Google Analytics and Microsoft Clarity (including session replay) to understand visits, and Meta Pixel and advertising features to measure and personalise ads. <a href="/privacy-policy/">Privacy Policy</a></p></div><div class="kdf-cookie-actions"><button type="button" data-choice="reject">Reject optional</button><button type="button" data-choice="manage">Manage choices</button><button type="button" data-choice="accept">Accept all</button></div>`;
    document.body.appendChild(banner);
    dialog = document.createElement('dialog'); dialog.className = 'kdf-cookie-dialog';
    dialog.setAttribute('aria-labelledby', 'kdf-cookie-title');
    dialog.innerHTML = `<h2 id="kdf-cookie-title">Cookie preferences</h2><p>Optional tracking stays off until you choose. You can change your choices anytime from the footer.</p><p><strong>Essential preferences — always active</strong><br>We store your choices on this device for up to 180 days.</p><label><input type="checkbox" name="analytics"> Analytics and website replay</label><p>Google Analytics and Microsoft Clarity: visits, interactions, heatmaps and session replay.</p><label><input type="checkbox" name="marketing"> Advertising</label><p>Meta Pixel and advertising features: ad measurement, audience matching and personalisation. Phone/WhatsApp button clicks do not confirm a booking.</p><p><a href="/privacy-policy/">Read the Privacy Policy</a></p><div class="kdf-cookie-actions"><button type="button" data-choice="reject">Reject optional</button><button type="button" data-choice="save">Save choices</button><button type="button" data-choice="close">Close</button></div>`;
    document.body.appendChild(dialog);
    dialog.addEventListener('close', () => { if (previousFocus) previousFocus.focus(); });
    document.addEventListener('click', event => {
      const control = event.target.closest('[data-cookie-preferences], [data-choice]');
      if (!control) return;
      if (control.hasAttribute('data-cookie-preferences')) { event.preventDefault(); openPreferences(); return; }
      if (!banner.contains(control) && !dialog.contains(control)) return;
      const action = control.dataset.choice;
      if (action === 'manage') openPreferences();
      if (action === 'close') dialog.close();
      if (action === 'accept') save({ analytics: true, marketing: true });
      if (action === 'reject') save({ analytics: false, marketing: false });
      if (action === 'save') save({ analytics: dialog.querySelector('[name="analytics"]').checked,
        marketing: dialog.querySelector('[name="marketing"]').checked });
    });
  }
  window.addEventListener('storage', event => { if (event.key === key) window.location.reload(); });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, { once: true });
  else mount();
})();
