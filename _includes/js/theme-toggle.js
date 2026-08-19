// Light/dark theme toggle. Pre-paint theme is set inline in <head>.
(function () {
  function current() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }
  function apply(theme) {
    if (theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
    try { localStorage.setItem('theme', theme); } catch (e) {}
  }
  function toggle() { apply(current() === 'dark' ? 'light' : 'dark'); }

  ['theme-toggle', 'theme-toggle-m'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('click', toggle);
  });

  // Dark is the deterministic default; OS preference is intentionally not auto-followed.
})();
