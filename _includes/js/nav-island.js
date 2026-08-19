// Mobile floating island: unfolding "more" popover + hide-on-scroll-down.
// The popover only exists when site.nav_more is non-empty, so the two features
// are wired independently — no overflow items must not disable scroll-hiding.
(function () {
  var island = document.getElementById('island');
  if (!island) return;

  var moreBtn = document.getElementById('island-more');
  var panel = document.getElementById('island-more-panel');
  var hasPopover = !!(moreBtn && panel);

  function isOpen() { return hasPopover && panel.classList.contains('is-open'); }
  function open() { panel.classList.add('is-open'); moreBtn.setAttribute('aria-expanded', 'true'); }
  function close() { panel.classList.remove('is-open'); moreBtn.setAttribute('aria-expanded', 'false'); }

  if (hasPopover) {
    moreBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      isOpen() ? close() : open();
    });

    // Close when tapping outside or pressing Escape.
    document.addEventListener('click', function (e) {
      if (isOpen() && !island.contains(e.target)) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) { close(); moreBtn.focus(); }
    });
  }

  // Hide the island while scrolling down, reveal on scroll up.
  var lastY = window.scrollY, ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY;
      if (!isOpen()) {
        if (y > lastY && y > 120) island.classList.add('is-hidden');
        else island.classList.remove('is-hidden');
      }
      lastY = y;
      ticking = false;
    });
  }, { passive: true });
})();
