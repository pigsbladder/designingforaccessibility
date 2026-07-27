/* article.js — TOC scroll tracking + section anchor copy */

/* TOC active state on scroll */
(function () {
  var tocMap = {
    "wcag":               "toc-wcag",
    "pour":               "toc-pour",
    "conformance-levels": "toc-levels",
    "wcag-applicability": "toc-applicability",
    "section-508":        "toc-508",
    "what-is-508":        "toc-what508",
    "who-needs-508":      "toc-who508",
    "ada":                "toc-ada"
  };
  var sectionIds = Object.keys(tocMap);

  function updateTOC() {
    var scrollY = window.scrollY + 90;
    var current = sectionIds[0];
    sectionIds.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) { current = id; }
    });
    document.querySelectorAll(".toc-link").forEach(function (l) { l.classList.remove("active"); });
    var activeLink = document.getElementById(tocMap[current]);
    if (activeLink) { activeLink.classList.add("active"); }
  }
  window.addEventListener("scroll", updateTOC, { passive: true });
  updateTOC();
})();

/* Section anchor copy-to-clipboard */
(function () {
  document.querySelectorAll(".section-anchor").forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      var href = anchor.getAttribute("href");
      var url = window.location.origin + window.location.pathname + href;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(function () {
          anchor.textContent = "✓ Copied";
          setTimeout(function () { anchor.innerHTML = "&#128279;"; }, 1500);
        });
      }
      history.pushState(null, "", href);
    });
  });
})();
