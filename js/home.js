/* home.js — hero search and VPAT criteria lookup.
   Data comes from criteria.js (CRITERIA) and guides.js (GUIDES, PATHS). */
(function () {
  var CRITERIA = window.CRITERIA || [];
  var GUIDES = window.GUIDES || [];
  var PATHS = window.PATHS || [];

  var STOPWORDS = ["what", "is", "are", "a", "an", "the", "how", "do", "does", "i", "to", "for", "of", "and", "in", "on"];

  function tokens(query) {
    var words = query.toLowerCase().replace(/[^\w.\s-]/g, " ").split(/\s+/).filter(Boolean);
    var meaningful = words.filter(function (w) { return STOPWORDS.indexOf(w) === -1; });
    return meaningful.length ? meaningful : words;
  }

  /* ── Search ───────────────────────────────────────────── */
  var searchForm = document.getElementById("search-form");
  var searchInput = document.getElementById("search-input");
  var resultsEl = document.getElementById("search-results");
  var statusEl = document.getElementById("search-status");
  var tryEl = document.getElementById("search-try");

  var guideBySlug = {};
  GUIDES.forEach(function (g) {
    guideBySlug[g.url.replace(/^articles\//, "").replace(/\.html$/, "")] = g;
  });

  /* One flat index of everything searchable: paths, guides and criteria */
  var INDEX = [];
  PATHS.forEach(function (p) {
    var first = guideBySlug[p.guides[0]];
    INDEX.push({
      kind: "Path", title: p.title, meta: p.guides.length + " guides",
      href: first ? first.url + "?path=" + p.slug : "#paths",
      haystack: { title: p.title.toLowerCase(), extra: p.who.toLowerCase() }
    });
  });
  GUIDES.forEach(function (g) {
    INDEX.push({
      kind: "Guide", title: g.title, meta: g.topic, href: g.url,
      haystack: { title: g.title.toLowerCase(), tags: (g.tags || []).join(" ").toLowerCase(), topic: g.topic.toLowerCase(), extra: g.desc.toLowerCase() }
    });
  });
  CRITERIA.forEach(function (c) {
    INDEX.push({
      kind: "Criterion", title: c.id + " " + c.name, meta: "Level " + c.level, href: "#lookup", criterion: c.id,
      haystack: { id: c.id, title: c.name.toLowerCase(), topic: c.principle.toLowerCase(), extra: c.desc.toLowerCase() }
    });
  });

  function scoreEntry(entry, toks) {
    var h = entry.haystack, total = 0;
    for (var i = 0; i < toks.length; i++) {
      var t = toks[i], s = 0;
      if (h.id && h.id === t) s = 100;
      else if (h.id && h.id.indexOf(t) === 0) s = 30;
      if (h.title && h.title.indexOf(t) === 0) s = Math.max(s, 15);
      else if (h.title && h.title.indexOf(t) > -1) s = Math.max(s, 10);
      if (h.tags && h.tags.indexOf(t) > -1) s = Math.max(s, 6);
      if (h.topic && h.topic.indexOf(t) > -1) s = Math.max(s, 4);
      if (h.extra && h.extra.indexOf(t) > -1) s = Math.max(s, 2);
      if (!s) return 0; /* every word has to match somewhere */
      total += s;
    }
    return total;
  }

  function search(query) {
    var toks = tokens(query);
    if (!toks.length) return [];
    return INDEX
      .map(function (e) { return { entry: e, score: scoreEntry(e, toks) }; })
      .filter(function (r) { return r.score > 0; })
      .sort(function (a, b) { return b.score - a.score; })
      .slice(0, 5)
      .map(function (r) { return r.entry; });
  }

  function renderSearch() {
    var q = searchInput.value.trim();
    resultsEl.textContent = "";
    if (q.length < 2) {
      resultsEl.hidden = true;
      statusEl.textContent = "";
      return;
    }
    var found = search(q);
    resultsEl.hidden = false;
    if (!found.length) {
      var li = document.createElement("li");
      li.className = "search-empty";
      li.textContent = "No results for “" + q + "”. Try a WCAG number, a law or a tool name.";
      resultsEl.appendChild(li);
      statusEl.textContent = "No results";
      return;
    }
    found.forEach(function (r) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.className = "search-result";
      a.href = r.href;
      if (r.criterion) a.setAttribute("data-criterion", r.criterion);
      var title = document.createElement("span");
      title.className = "sr-title";
      title.textContent = r.title;
      var meta = document.createElement("span");
      meta.className = "sr-meta";
      meta.textContent = r.kind + " · " + r.meta;
      a.appendChild(title);
      a.appendChild(meta);
      li.appendChild(a);
      resultsEl.appendChild(li);
    });
    statusEl.textContent = found.length + (found.length === 1 ? " result" : " results");
  }

  searchInput.addEventListener("input", renderSearch);
  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && searchInput.value) {
      searchInput.value = "";
      renderSearch();
    }
  });

  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    renderSearch();
    var first = resultsEl.querySelector("a.search-result");
    if (first) first.click();
  });

  tryEl.addEventListener("click", function (e) {
    var link = e.target.closest("a[data-query]");
    if (!link) return;
    e.preventDefault();
    searchInput.value = link.getAttribute("data-query");
    renderSearch();
    searchInput.focus();
  });

  /* "/" jumps to search, unless the reader is already typing somewhere */
  document.addEventListener("keydown", function (e) {
    if (e.key !== "/" || e.ctrlKey || e.metaKey || e.altKey) return;
    var t = e.target;
    if (t && (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable)) return;
    e.preventDefault();
    searchInput.focus();
    searchInput.scrollIntoView({ block: "center" });
  });

  /* ?s=term support (matches the SearchAction in the page's structured data) */
  var presearch = new URLSearchParams(window.location.search).get("s");
  if (presearch) {
    searchInput.value = presearch;
    renderSearch();
  }

  /* ── VPAT lookup ──────────────────────────────────────── */
  var gridEl = document.getElementById("lookup-grid");
  var lookupInput = document.getElementById("lookup-input");
  var levelsEl = document.getElementById("lookup-levels");
  var countEl = document.getElementById("lookup-count");
  var moreBtn = document.getElementById("lookup-more");
  var PAGE = 8;

  var state = { level: "All", query: "", expanded: false };

  function matches() {
    var toks = state.query.toLowerCase().split(/[\s,]+/).filter(Boolean);
    return CRITERIA.filter(function (c) {
      if (state.level !== "All" && c.level !== state.level) return false;
      var hay = (c.id + " " + c.name + " " + c.desc + " " + c.principle).toLowerCase();
      return toks.every(function (t) { return hay.indexOf(t) > -1; });
    });
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }

  function card(c) {
    var art = el("article", "criterion");
    var top = el("div", "criterion-top");
    top.appendChild(el("span", "criterion-id", c.id));
    top.appendChild(el("span", "criterion-level", "Level " + c.level));
    art.appendChild(top);
    art.appendChild(el("h3", "", c.name));
    art.appendChild(el("p", "", c.desc));

    var d = el("details");
    d.appendChild(el("summary", "", "VPAT notes"));
    var notes = el("div", "notes");
    var p1 = el("p");
    p1.appendChild(el("strong", "", "In your VPAT: "));
    p1.appendChild(document.createTextNode(c.vpat));
    var p2 = el("p");
    p2.appendChild(el("strong", "", "Tip: "));
    p2.appendChild(document.createTextNode(c.tip));
    var p3 = el("p");
    var a = el("a", "", "W3C understanding doc");
    a.href = c.w3c;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.appendChild(el("span", "sr-only", " (opens in new tab)"));
    p3.appendChild(a);
    notes.appendChild(p1);
    notes.appendChild(p2);
    notes.appendChild(p3);
    d.appendChild(notes);
    art.appendChild(d);
    return art;
  }

  function renderLookup() {
    var all = matches();
    var shown = state.expanded ? all : all.slice(0, PAGE);
    gridEl.textContent = "";
    if (!all.length) {
      gridEl.appendChild(el("p", "lookup-empty", "No criteria match that filter."));
    } else {
      shown.forEach(function (c) { gridEl.appendChild(card(c)); });
    }

    var filtering = state.level !== "All" || state.query.trim() !== "";
    countEl.textContent = shown.length + " of " + all.length + (filtering ? " matching" : "") + " criteria shown";

    if (all.length > PAGE) {
      moreBtn.hidden = false;
      moreBtn.textContent = state.expanded ? "Show fewer" : "Show all " + all.length;
      moreBtn.setAttribute("aria-expanded", state.expanded ? "true" : "false");
    } else {
      moreBtn.hidden = true;
    }
  }

  levelsEl.addEventListener("click", function (e) {
    var btn = e.target.closest("button[data-level]");
    if (!btn) return;
    state.level = btn.getAttribute("data-level");
    levelsEl.querySelectorAll("button").forEach(function (b) {
      b.setAttribute("aria-pressed", b === btn ? "true" : "false");
    });
    renderLookup();
  });

  lookupInput.addEventListener("input", function () {
    state.query = lookupInput.value;
    renderLookup();
  });

  moreBtn.addEventListener("click", function () {
    state.expanded = !state.expanded;
    renderLookup();
  });

  /* A criterion in the search results opens the lookup filtered to that criterion */
  resultsEl.addEventListener("click", function (e) {
    var link = e.target.closest("a[data-criterion]");
    if (!link) return;
    e.preventDefault();
    state.level = "All";
    levelsEl.querySelectorAll("button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-level") === "All" ? "true" : "false");
    });
    lookupInput.value = link.getAttribute("data-criterion");
    state.query = lookupInput.value;
    renderLookup();
    document.getElementById("lookup").scrollIntoView();
    lookupInput.focus({ preventScroll: true });
  });

  renderLookup();
})();

/* ── Hero parallax: the background image scrolls more slowly than the page ── */
(function () {
  var hero = document.querySelector(".hero");
  var img = hero && hero.querySelector(".hero-img");
  if (!img) return;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduce.matches) return; /* no motion for people who ask for none */

  var RATE = 0.25; /* must match the 25% overhang in .hero-parallax */
  var ticking = false;
  hero.classList.add("hero-parallax");

  function update() {
    ticking = false;
    var r = hero.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight) return;
    img.style.transform = "translate3d(0," + (Math.max(0, -r.top) * RATE).toFixed(1) + "px,0)";
  }
  function onScroll() {
    if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  reduce.addEventListener && reduce.addEventListener("change", function () {
    if (reduce.matches) {
      hero.classList.remove("hero-parallax");
      img.style.transform = "";
    } else {
      hero.classList.add("hero-parallax");
      update();
    }
  });
  update();
})();
