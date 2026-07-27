/* nav.js — shared mobile menu behaviour */
(function () {
  var hamburger = document.getElementById("nav-hamburger");
  var mobileMenu = document.getElementById("mobile-menu");
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener("click", function () {
    var isOpen = mobileMenu.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    hamburger.innerHTML = isOpen ? "&#10005;" : "&#9776;";
  });

  mobileMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      mobileMenu.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      hamburger.innerHTML = "&#9776;";
    });
  });
})();
