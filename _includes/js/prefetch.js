// Near-instant navigation: prefetch same-origin pages on hover / touch. No deps.
(function () {
  var done = Object.create(null);

  function prefetch(href) {
    if (done[href]) return;
    done[href] = true;
    var l = document.createElement('link');
    l.rel = 'prefetch';
    l.href = href;
    document.head.appendChild(l);
  }

  function eligible(a) {
    return a && a.href &&
      a.origin === location.origin &&
      a.pathname !== location.pathname &&
      !a.hasAttribute('download') &&
      a.getAttribute('href').charAt(0) !== '#';
  }

  function onIntent(e) {
    var a = e.target.closest && e.target.closest('a');
    if (eligible(a)) prefetch(a.href);
  }

  document.addEventListener('mouseover', onIntent, { passive: true });
  document.addEventListener('touchstart', onIntent, { passive: true });
})();
