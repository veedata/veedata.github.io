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
    var visible = [];

    pubs.forEach(function (pub) {
      var show = filter === "all" || pub.dataset.cat === filter;
      pub.hidden = !show;
      if (show) {
        visibleYears[pub.dataset.year] = true;
        visible.push(pub);
      }
    });

    // Reverse numbering: newest visible row gets the highest number, oldest
    // gets 1. Recomputed per filter so a filtered list still counts down
    // contiguously instead of showing gaps.
    var n = visible.length;
    visible.forEach(function (pub, i) {
      var num = pub.querySelector(".pub__num");
      if (num) num.textContent = n - i;
    });

    list.dataset.filter = filter;

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

  // The numbers only exist once this runs, so paint them for the default view.
  apply("all");
})();
