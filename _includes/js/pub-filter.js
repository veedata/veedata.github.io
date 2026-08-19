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
