/* =============================================
   theme.js — Light / Dark Theme Toggle
   Tomoaki Eguchi Portfolio
   ============================================= */
(function () {
  const STORAGE_KEY = 'portfolio-theme';

  const SUN_ICON =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<circle cx="12" cy="12" r="4"/>' +
    '<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>' +
    '</svg>';

  const MOON_ICON =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>' +
    '</svg>';

  function getCurrentTheme() {
    const explicit = document.documentElement.getAttribute('data-theme');
    if (explicit === 'light' || explicit === 'dark') return explicit;
    return 'light'; // light is the default; no system-preference fallback
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) {}

    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.innerHTML = theme === 'dark' ? SUN_ICON : MOON_ICON;
      btn.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      );
    }
  }

  function injectButton() {
    const nav = document.querySelector('nav');
    if (!nav || document.getElementById('theme-toggle')) return;

    const btn = document.createElement('button');
    btn.id = 'theme-toggle';
    btn.type = 'button';

    const current = getCurrentTheme();
    btn.innerHTML = current === 'dark' ? SUN_ICON : MOON_ICON;
    btn.setAttribute(
      'aria-label',
      current === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    );

    btn.addEventListener('click', function () {
      const next = getCurrentTheme() === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });

    // Insert before lang-toggle so the order is: [theme] [lang] on the right
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) nav.insertBefore(btn, langBtn);
    else nav.appendChild(btn);
  }

  document.addEventListener('DOMContentLoaded', injectButton);
})();
