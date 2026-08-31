// For publications only: collapse the citations-per-year chart on a phone.
(function () {
  var chart = document.querySelector('.pub-chart__disclosure');
  if (!chart || !window.matchMedia) return;

  var wide = window.matchMedia('(min-width: 46em)');
  function sync() { chart.open = wide.matches; }

  sync();
  // Crossing the 46em breakpoint means we fallback to the default. 
  // Typically landscape view on a phone.
  if (wide.addEventListener) { wide.addEventListener('change', sync); }
})();
