/* nav.js — shared mobile menu behaviour */
(function () {
  var toggle = document.getElementById("nav-toggle");
  var links = document.getElementById("nav-links");
  if (!toggle || !links) return;

  function setOpen(open) {
    links.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.textContent = open ? "Close" : "Menu";
  }

  toggle.addEventListener("click", function () {
    setOpen(!links.classList.contains("open"));
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && links.classList.contains("open")) {
      setOpen(false);
      toggle.focus();
    }
  });
})();

/* Back to top: a floating button on long pages, shown once the reader has scrolled down */
(function () {
  var SHOW_AFTER = 600; /* px scrolled before the button appears */
  var btn = document.createElement("button");
  btn.type = "button";
  btn.className = "back-to-top";
  btn.hidden = true;
  btn.innerHTML = '<span aria-hidden="true">↑</span> Back to top';
  document.body.appendChild(btn);

  var footer = document.querySelector(".footer");
  var logo = document.querySelector(".nav-logo");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  var ticking = false;

  function update() {
    ticking = false;
    var longPage = document.documentElement.scrollHeight > window.innerHeight * 2.5;
    btn.hidden = !(longPage && window.scrollY > SHOW_AFTER);
    /* rise above the footer instead of covering its links */
    var lift = 0;
    if (footer && !btn.hidden) {
      lift = Math.max(0, window.innerHeight - footer.getBoundingClientRect().top);
    }
    btn.style.setProperty("--btt-lift", lift + "px");
  }
  function onScroll() {
    if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
  }

  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduce.matches ? "auto" : "smooth" });
    /* keyboard users continue from the top of the page, not from where the button was */
    if (logo) logo.focus({ preventScroll: true });
  });

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
})();
