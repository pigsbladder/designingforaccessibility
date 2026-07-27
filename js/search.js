/* search.js — site-wide article search */
(function () {

  var ARTICLES = [
    {
      title: "Accessibility Guidelines: WCAG & Section 508 Explained",
      desc: "A plain-English guide to WCAG and Section 508: what they are, how they differ, and what they mean for your digital products.",
      topic: "Accessibility 101",
      tags: ["wcag", "section 508", "ada", "pour", "conformance", "guidelines", "compliance"],
      url: "articles/accessibility-guidelines.html"
    },
    {
      title: "VPAT & ACR Documentation: The Complete Guide",
      desc: "Everything you need to write, submit, and maintain a Voluntary Product Accessibility Template. WCAG, Section 508, and VPAT 2.5 explained.",
      topic: "VPAT & ACR Documentation",
      tags: ["vpat", "acr", "section 508", "conformance", "template", "vpat 2.5", "iti", "pdf"],
      url: "articles/vpat-acr-documentation.html"
    },
    {
      title: "Legal Landscape: ADA, Section 508 & Accessibility Law",
      desc: "What the law actually says about digital accessibility, who it applies to, and what happens when organizations fail to comply.",
      topic: "Legal Landscape",
      tags: ["ada", "section 508", "wcag 2.2", "doj", "procurement", "lawsuit", "compliance", "law"],
      url: "articles/legal-landscape.html"
    },
    {
      title: "Screen Readers & ARIA: A Practical Guide",
      desc: "Master ARIA roles, labels, live regions, and real screen reader behaviour. The advanced topics that separate good accessibility from great.",
      topic: "Screen Readers & ARIA",
      tags: ["aria", "nvda", "voiceover", "aria-label", "aria-live", "keyboard", "screen readers", "roles"],
      url: "articles/screen-readers-aria.html"
    },
    {
      title: "Testing & Evaluation: How to Test for WCAG AA Compliance",
      desc: "A practical guide to finding accessibility issues before your buyers do. Automated tools, manual testing, screen readers, and remediation.",
      topic: "Testing & Evaluation",
      tags: ["wave", "axe", "nvda", "voiceover", "manual testing", "keyboard", "wcag aa", "audit"],
      url: "articles/testing-evaluation.html"
    },
    {
      title: "Design & Visual Elements for Accessibility",
      desc: "Master color contrast, signifiers, error messages, data tables, and tab order. The design decisions that make or break accessibility.",
      topic: "Design & Visual Elements",
      tags: ["color contrast", "wcag 1.4.3", "signifiers", "tab order", "error messages", "typography", "figma"],
      url: "articles/design-visual.html"
    },
    {
      title: "Designing for Screen Readers Without Breaking Sighted UX",
      desc: "The balance every product team needs to find: where ARIA helps and where it gets in the way. Learn when to use ARIA and when it causes problems.",
      topic: "UX Perspectives",
      tags: ["screen readers", "aria", "nvda", "voiceover", "sighted ux", "balance"],
      url: "articles/ux-screen-readers-sighted-ux.html"
    },
    {
      title: "Why Accessibility Fails at the Design Stage",
      desc: "The Figma decisions that create downstream compliance problems no developer can fix. Accessibility is decided at design time, not in code.",
      topic: "UX Perspectives",
      tags: ["design", "figma", "wcag", "upstream", "states", "aria", "ux"],
      url: "articles/ux-accessibility-fails-design-stage.html"
    },
    {
      title: "Government SaaS: Accessibility as a Sales Requirement",
      desc: "How a missing VPAT can kill a deal at procurement. What government buyers check and why accessibility matters as a sales gate.",
      topic: "UX Perspectives",
      tags: ["government saas", "vpat", "procurement", "sales", "section 508", "enterprise"],
      url: "articles/ux-government-saas-sales.html"
    },
    {
      title: "Accessibility Quick Wins: Five Improvements in Under an Hour",
      desc: "Five accessibility improvements you can ship in under an hour. Alt text, contrast, labels, links, and keyboard navigation.",
      topic: "UX Perspectives",
      tags: ["quick wins", "alt text", "contrast", "labels", "keyboard", "wcag", "easy"],
      url: "articles/accessibility-quick-wins.html"
    },
    {
      title: "Handling Conflict in UX: From Design Debate to Real Solutions",
      desc: "How to work through design disagreement without killing momentum. Practical strategies for handling UX conflict with clarity and maturity.",
      topic: "UX Perspectives",
      tags: ["ux", "conflict", "collaboration", "teams", "process", "design debate"],
      url: "articles/conflict-in-ux.html"
    },
    {
      title: "The Hill Worth Dying On: When to Fight for UX",
      desc: "When to stand firm on UX principles and when to let it go. A candid perspective on knowing which battles matter.",
      topic: "UX Perspectives",
      tags: ["ux", "process", "delivery", "principles", "stakeholders", "strategy"],
      url: "articles/the-hill-worth-dying-on.html"
    },
    {
      title: "Reassuring UX Teams About AI: What It Can't Replace",
      desc: "What AI actually can't replace about UX work. Why human judgment, strategic thinking, and research still matter more than ever.",
      topic: "UX Perspectives",
      tags: ["ai", "ux", "teams", "human judgment", "research", "strategy"],
      url: "articles/reassuring-ux-teams-about-ai.html"
    },
    {
      title: "UX Perspectives — All Articles",
      desc: "Browse all UX Perspectives: candid takes on accessibility, design process, AI, and working in product teams.",
      topic: "UX Perspectives",
      tags: ["ux", "perspectives", "articles", "browse"],
      url: "articles/ux-perspectives.html"
    }
  ];

  /* Resolve base path so links work from both root and /articles/ pages */
  var isArticlePage = window.location.pathname.indexOf('/articles/') !== -1;
  var BASE = isArticlePage ? '../' : '';

  function score(article, query) {
    var q = query.toLowerCase();
    var s = 0;
    if (article.title.toLowerCase().indexOf(q) !== -1) s += 10;
    if (article.topic.toLowerCase().indexOf(q) !== -1) s += 6;
    if (article.desc.toLowerCase().indexOf(q) !== -1) s += 4;
    article.tags.forEach(function (t) { if (t.indexOf(q) !== -1) s += 3; });
    return s;
  }

  function search(query) {
    if (!query || query.length < 2) return [];
    return ARTICLES
      .map(function (a) { return { article: a, score: score(a, query) }; })
      .filter(function (r) { return r.score > 0; })
      .sort(function (a, b) { return b.score - a.score; })
      .slice(0, 6)
      .map(function (r) { return r.article; });
  }

  /* Build dropdown element */
  var wrap = document.querySelector('.nav-search-wrap');
  if (!wrap) return;

  /* Position parent for dropdown anchoring */
  var navRight = wrap.parentNode;
  navRight.style.position = 'relative';

  var dropdown = document.createElement('div');
  dropdown.id = 'nav-search-dropdown';
  dropdown.className = 'nav-search-dropdown';
  navRight.appendChild(dropdown);

  var input = document.getElementById('nav-q');
  if (!input) return;

  function renderResults(query) {
    var results = search(query);
    if (!query || query.length < 2) {
      dropdown.innerHTML = '';
      dropdown.classList.remove('open');
      return;
    }
    if (!results.length) {
      dropdown.innerHTML = '<div class="nsr-empty">No articles found for &ldquo;' + query + '&rdquo;</div>';
      dropdown.classList.add('open');
      return;
    }
    dropdown.innerHTML = results.map(function (a) {
      return '<a href="' + BASE + a.url + '" class="nsr-item">' +
        '<span class="nsr-topic">' + a.topic + '</span>' +
        '<span class="nsr-title">' + a.title + '</span>' +
        '</a>';
    }).join('');
    dropdown.classList.add('open');
  }

  input.addEventListener('input', function () {
    renderResults(this.value.trim());
  });

  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      var first = dropdown.querySelector('.nsr-item');
      if (first) { window.location.href = first.href; }
      dropdown.classList.remove('open');
      this.value = '';
    }
    if (e.key === 'Escape') {
      dropdown.classList.remove('open');
      this.value = '';
      this.blur();
    }
  });

  document.addEventListener('click', function (e) {
    if (!wrap.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove('open');
    }
  });

})();
