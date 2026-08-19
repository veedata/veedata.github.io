// Active-heading highlight for a table of contents (loaded only when page.toc).
// Expects a <nav class="toc"> with anchor links to heading ids in .prose.
(function () {
  var toc = document.querySelector('.toc');
  if (!toc) return;
  var links = Array.prototype.slice.call(toc.querySelectorAll('a'));
  if (!links.length) return;

  var map = {};
  links.forEach(function (a) {
    var id = decodeURIComponent((a.getAttribute('href') || '').replace(/^#/, ''));
    if (id) map[id] = a;
  });

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        links.forEach(function (l) { l.classList.remove('is-active'); });
        var a = map[e.target.id];
        if (a) a.classList.add('is-active');
      }
    });
  }, { rootMargin: '0px 0px -75% 0px', threshold: 0 });

  Object.keys(map).forEach(function (id) {
    var el = document.getElementById(id);
    if (el) obs.observe(el);
  });
})();
