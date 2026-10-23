/* article.js — path context, "On this page" behaviour, section anchor copy.
   Needs guides.js (PATHS, GUIDES) for the learning-path features. */

/* Learning path context: shown only when the reader arrived from a path (?path=slug) */
(function () {
  var slug = new URLSearchParams(window.location.search).get("path");
  var paths = window.PATHS || [];
  var path = paths.filter(function (p) { return p.slug === slug; })[0];
  if (!path) return;

  var here = window.location.pathname.split("/").pop().replace(/\.html$/, "");
  var index = path.guides.indexOf(here);
  if (index === -1) return;

  var bar = document.getElementById("path-bar");
  if (bar) {
    bar.textContent = "";
    var link = document.createElement("a");
    link.href = "../#paths";
    link.textContent = path.title;
    var pos = document.createElement("strong");
    pos.textContent = " · " + (index + 1) + " / " + path.guides.length;
    bar.appendChild(link);
    bar.appendChild(pos);
    bar.hidden = false;
  }

  var nextSlug = path.guides[index + 1];
  if (!nextSlug) return;
  var next = (window.GUIDES || []).filter(function (g) {
    return g.url === "articles/" + nextSlug;
  })[0];
  var prose = document.querySelector(".article-content");
  if (!next || !prose) return;

  var a = document.createElement("a");
  a.className = "path-next";
  a.href = nextSlug + "?path=" + path.slug;
  var label = document.createElement("span");
  label.className = "path-next-label";
  label.textContent = "Next in path →";
  var title = document.createElement("span");
  title.className = "path-next-title";
  title.textContent = next.title.split(":")[0];
  var wrap = document.createElement("span");
  wrap.appendChild(label);
  wrap.appendChild(title);
  a.appendChild(wrap);
  var related = prose.querySelector(".related");
  prose.insertBefore(a, related || null);

  /* Keep the path when moving through the prev/next links at the bottom */
  document.querySelectorAll(".article-nav-btn").forEach(function (l) {
    if (/\/$/.test(l.getAttribute("href"))) return; /* skip links to the home and articles index pages */
    l.href = l.getAttribute("href") + "?path=" + path.slug;
  });
})();

/* "On this page": open on desktop (always visible), collapsed on small screens */
(function () {
  var details = document.querySelector(".toc-details");
  if (!details) return;
  var wide = window.matchMedia("(min-width: 1024px)");

  function sync() { details.open = wide.matches; }
  sync();
  if (wide.addEventListener) wide.addEventListener("change", sync);

  /* On desktop the list is not collapsible */
  details.querySelector("summary").addEventListener("click", function (e) {
    if (wide.matches) e.preventDefault();
  });
})();

/* Highlight the current section in the table of contents:
   the last heading that has scrolled above a line near the top of the viewport */
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll(".toc-link"));
  if (!links.length) return;

  var targets = links.map(function (l) {
    return { link: l, el: document.getElementById(l.getAttribute("href").slice(1)) };
  }).filter(function (t) { return t.el; });

  var ticking = false;
  function update() {
    ticking = false;
    var current = targets[0];
    targets.forEach(function (t) {
      if (t.el.getBoundingClientRect().top <= 140) current = t;
    });
    links.forEach(function (l) {
      l.classList.remove("active");
      l.removeAttribute("aria-current");
    });
    if (current) {
      current.link.classList.add("active");
      current.link.setAttribute("aria-current", "location");
    }
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
  }, { passive: true });
  update();
})();

/* Section anchor copy-to-clipboard */
(function () {
  document.querySelectorAll(".section-anchor").forEach(function (anchor) {
    anchor.addEventListener("click", function () {
      var href = anchor.getAttribute("href");
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.origin + window.location.pathname + href).catch(function () {});
      }
    });
  });
})();
