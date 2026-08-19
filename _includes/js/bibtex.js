// Publications: reveal/hide a BibTeX block, with a copy button.
(function () {
  document.querySelectorAll('.bibtex-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var pub = btn.closest('.pub');
      var pre = pub && pub.querySelector('.pub__bibtex');
      if (!pre) return;
      var willOpen = pre.hasAttribute('hidden');
      if (willOpen) { pre.removeAttribute('hidden'); } else { pre.setAttribute('hidden', ''); }
      btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    });
  });

  document.querySelectorAll('.pub__bibtex').forEach(function (pre) {
    var b = document.createElement('button');
    b.className = 'copy-btn';
    b.type = 'button';
    b.textContent = 'copy';
    b.addEventListener('click', function () {
      var text = pre.querySelector('code').textContent;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function () {
          b.textContent = 'copied';
          setTimeout(function () { b.textContent = 'copy'; }, 1200);
        });
      }
    });
    pre.appendChild(b);
  });
})();
