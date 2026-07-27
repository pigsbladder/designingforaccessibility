/* home.js — homepage-specific JS (active nav + VPAT tool) */

/* Active nav on scroll */
(function () {
  var sections = ["topics", "articles", "ux", "vpat-tool", "about"];
  var navLinks = document.querySelectorAll(".nav-links a[data-section]");

  function updateActiveNav() {
    var scrollY = window.scrollY + 80;
    var current = "";
    sections.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) { current = id; }
    });
    navLinks.forEach(function (link) {
      link.classList.toggle("active", link.getAttribute("data-section") === current);
    });
  }
  window.addEventListener("scroll", updateActiveNav, { passive: true });
  updateActiveNav();
})();

/* Site-wide search is handled by search.js */
