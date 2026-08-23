// Light/dark theme toggle. Pre-paint theme is set inline in <head>.
(function () {
  function current() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }
  function paint(theme) {
    if (theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
  }
  function apply(theme) {
    paint(theme);
    try { localStorage.setItem('theme', theme); } catch (e) {}
  }
  function toggle() { apply(current() === 'dark' ? 'light' : 'dark'); }

  ['theme-toggle', 'theme-toggle-m'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('click', toggle);
  });

  // Until the reader picks a side, track the OS preference live — if a reader
  // theme flips at sunset, this should work.
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: light)');
    var onChange = function (e) {
      var stored;
      try { stored = localStorage.getItem('theme'); } catch (err) {}
      if (stored === 'dark' || stored === 'light') return;
      paint(e.matches ? 'light' : 'dark');
    };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }
})();
