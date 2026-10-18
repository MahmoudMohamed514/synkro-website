/* Keep the optional WebGL animation out of the initial page load. */
(function () {
  'use strict';
  var hero = document.querySelector('[data-hero-3d]');
  if (!hero) return;
  hero.dataset.state = 'fallback';
  var connection = navigator.connection;
  if (window.matchMedia('(max-width: 900px), (prefers-reduced-motion: reduce)').matches ||
      (connection && (connection.saveData || /(^|-)2g$/.test(connection.effectiveType))) ||
      /[?&]no3d\b/.test(location.search)) return;

  function loadAnimation() {
    var script = document.createElement('script');
    script.src = 'assets/js/hero3d.js';
    script.async = true;
    script.onerror = function () { hero.dataset.state = 'fallback'; };
    document.body.appendChild(script);
  }
  function scheduleAnimation() {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadAnimation);
    } else {
      window.setTimeout(loadAnimation, 1500);
    }
  }
  if (document.readyState === 'complete') scheduleAnimation();
  else window.addEventListener('load', scheduleAnimation, { once: true });
}());
