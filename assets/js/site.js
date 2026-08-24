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

// Add a copy button to each Rouge code block.
(function () {
  var blocks = document.querySelectorAll('div.highlight, figure.highlight');
  blocks.forEach(function (block) {
    var pre = block.querySelector('pre');
    if (!pre) return;
    var btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.type = 'button';
    btn.textContent = 'copy';
    btn.addEventListener('click', function () {
      var code = block.querySelector('code') || pre;
      navigator.clipboard.writeText(code.innerText.replace(/\n$/, '')).then(function () {
        btn.textContent = 'copied';
        setTimeout(function () { btn.textContent = 'copy'; }, 1500);
      });
    });
    block.appendChild(btn);
  });
})();

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

// Publications page: button filter over data-cat ("all" shows everything).
// Year headings hide when every paper under them is filtered out.
(function () {
  var buttons = document.querySelectorAll(".pub-filter");
  var list = document.getElementById("pub-list");
  if (!buttons.length || !list) return;

  var pubs = list.querySelectorAll(".pub");
  var years = list.querySelectorAll(".pub-year");
  var empty = document.querySelector(".pub-empty");

  function apply(filter) {
    var visibleYears = {};

    pubs.forEach(function (pub) {
      var show = filter === "all" || pub.dataset.cat === filter;
      pub.hidden = !show;
      if (show) visibleYears[pub.dataset.year] = true;
    });

    years.forEach(function (heading) {
      heading.hidden = !visibleYears[heading.dataset.year];
    });

    if (empty) empty.hidden = Object.keys(visibleYears).length > 0;

    buttons.forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.dataset.filter === filter));
    });
  }

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      apply(btn.dataset.filter);
    });
  });
})();

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

