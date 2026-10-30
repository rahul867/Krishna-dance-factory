/* Shared editorial navigation; page-specific analytics remain on each page. */
(() => {
  const toggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#main-navigation');
  if (!toggle || !navigation) return;

  const close = () => {
    navigation.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
  };

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    navigation.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  navigation.addEventListener('click', event => {
    if (event.target.closest('a')) close();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      close();
      toggle.focus();
    }
  });
  window.matchMedia('(min-width: 1051px)').addEventListener('change', event => {
    if (event.matches) close();
  });
})();
