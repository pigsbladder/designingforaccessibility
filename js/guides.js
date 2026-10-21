/* guides.js: guides and learning paths. Single source for the home page paths and site search.
   PATHS[].guides lists guide slugs in reading order (slug = filename in /articles without .html).
   The "who" lines and path membership are drafts for Dan to confirm. */

window.GUIDES = [
  {
    "title": "Accessibility Guidelines: WCAG & Section 508 Explained",
    "desc": "A plain-English guide to WCAG and Section 508: what they are, how they differ, and what they mean for your digital products.",
    "topic": "Accessibility 101",
    "tags": [
      "wcag",
      "section 508",
      "ada",
      "pour",
      "conformance",
      "guidelines",
      "compliance"
    ],
    "url": "articles/accessibility-guidelines.html"
  },
  {
    "title": "VPAT & ACR Documentation: The Complete Guide",
    "desc": "Everything you need to write, submit, and maintain a Voluntary Product Accessibility Template. WCAG, Section 508, and VPAT 2.5 explained.",
    "topic": "VPAT & ACR Documentation",
    "tags": [
      "vpat",
      "acr",
      "section 508",
      "conformance",
      "template",
      "vpat 2.5",
      "iti",
      "pdf"
    ],
    "url": "articles/vpat-acr-documentation.html"
  },
  {
    "title": "Legal Landscape: ADA, Section 508 & Accessibility Law",
    "desc": "What the law actually says about digital accessibility, who it applies to, and what happens when organizations fail to comply.",
    "topic": "Legal Landscape",
    "tags": [
      "ada",
      "section 508",
      "wcag 2.2",
      "doj",
      "procurement",
      "lawsuit",
      "compliance",
      "law"
    ],
    "url": "articles/legal-landscape.html"
  },
  {
    "title": "Screen Readers & ARIA: A Practical Guide",
    "desc": "Master ARIA roles, labels, live regions, and real screen reader behaviour. The advanced topics that separate good accessibility from great.",
    "topic": "Screen Readers & ARIA",
    "tags": [
      "aria",
      "nvda",
      "voiceover",
      "aria-label",
      "aria-live",
      "keyboard",
      "screen readers",
      "roles"
    ],
    "url": "articles/screen-readers-aria.html"
  },
  {
    "title": "Testing & Evaluation: How to Test for WCAG AA Compliance",
    "desc": "A practical guide to finding accessibility issues before your buyers do. Automated tools, manual testing, screen readers, and remediation.",
    "topic": "Testing & Evaluation",
    "tags": [
      "wave",
      "axe",
      "nvda",
      "voiceover",
      "manual testing",
      "keyboard",
      "wcag aa",
      "audit"
    ],
    "url": "articles/testing-evaluation.html"
  },
  {
    "title": "Design & Visual Elements for Accessibility",
    "desc": "Master color contrast, signifiers, error messages, data tables, and tab order. The design decisions that make or break accessibility.",
    "topic": "Design & Visual Elements",
    "tags": [
      "color contrast",
      "wcag 1.4.3",
      "signifiers",
      "tab order",
      "error messages",
      "typography",
      "figma"
    ],
    "url": "articles/design-visual.html"
  },
  {
    "title": "Designing for Screen Readers Without Breaking Sighted UX",
    "desc": "The balance every product team needs to find: where ARIA helps and where it gets in the way. Learn when to use ARIA and when it causes problems.",
    "topic": "UX Perspectives",
    "tags": [
      "screen readers",
      "aria",
      "nvda",
      "voiceover",
      "sighted ux",
      "balance"
    ],
    "url": "articles/ux-screen-readers-sighted-ux.html"
  },
  {
    "title": "Why Accessibility Fails at the Design Stage",
    "desc": "The Figma decisions that create downstream compliance problems no developer can fix. Accessibility is decided at design time, not in code.",
    "topic": "UX Perspectives",
    "tags": [
      "design",
      "figma",
      "wcag",
      "upstream",
      "states",
      "aria",
      "ux"
    ],
    "url": "articles/ux-accessibility-fails-design-stage.html"
  },
  {
    "title": "Government SaaS: Accessibility as a Sales Requirement",
    "desc": "How a missing VPAT can kill a deal at procurement. What government buyers check and why accessibility matters as a sales gate.",
    "topic": "UX Perspectives",
    "tags": [
      "government saas",
      "vpat",
      "procurement",
      "sales",
      "section 508",
      "enterprise"
    ],
    "url": "articles/ux-government-saas-sales.html"
  },
  {
    "title": "Accessibility Quick Wins: Five Improvements in Under an Hour",
    "desc": "Five accessibility improvements you can ship in under an hour. Alt text, contrast, labels, links, and keyboard navigation.",
    "topic": "UX Perspectives",
    "tags": [
      "quick wins",
      "alt text",
      "contrast",
      "labels",
      "keyboard",
      "wcag",
      "easy"
    ],
    "url": "articles/accessibility-quick-wins.html"
  },
  {
    "title": "Handling Conflict in UX: From Design Debate to Real Solutions",
    "desc": "How to work through design disagreement without killing momentum. Practical strategies for handling UX conflict with clarity and maturity.",
    "topic": "UX Perspectives",
    "tags": [
      "ux",
      "conflict",
      "collaboration",
      "teams",
      "process",
      "design debate"
    ],
    "url": "articles/conflict-in-ux.html"
  },
  {
    "title": "The Hill Worth Dying On: When to Fight for UX",
    "desc": "When to stand firm on UX principles and when to let it go. A candid perspective on knowing which battles matter.",
    "topic": "UX Perspectives",
    "tags": [
      "ux",
      "process",
      "delivery",
      "principles",
      "stakeholders",
      "strategy"
    ],
    "url": "articles/the-hill-worth-dying-on.html"
  },
  {
    "title": "Reassuring UX Teams About AI: What It Can't Replace",
    "desc": "What AI actually can't replace about UX work. Why human judgment, strategic thinking, and research still matter more than ever.",
    "topic": "UX Perspectives",
    "tags": [
      "ai",
      "ux",
      "teams",
      "human judgment",
      "research",
      "strategy"
    ],
    "url": "articles/reassuring-ux-teams-about-ai.html"
  },
  {
    "title": "Getting Started with Accessibility Conformance Reports (ACRs)",
    "desc": "A companion guide to our VPAT & ACR documentation, covering the basics of Accessibility Conformance Reports for people filling one out for the first time.",
    "topic": "VPAT & ACR Documentation",
    "tags": [
      "acr",
      "vpat",
      "first time",
      "beginner",
      "conformance report"
    ],
    "url": "articles/getting-started-with-acrs.html"
  },
  {
    "title": "Accessible Forms: Labels, Errors, Grouping & Autocomplete",
    "desc": "Field grouping, error messaging, inline vs. summary errors, autocomplete attributes, and required vs. optional conventions.",
    "topic": "Design & Visual Elements",
    "tags": [
      "forms",
      "labels",
      "errors",
      "autocomplete",
      "validation",
      "required"
    ],
    "url": "articles/accessible-forms.html"
  }
];

window.PATHS = [
  {
    slug: "first-acr",
    title: "Your first ACR",
    who: "For teams writing their first Accessibility Conformance Report.",
    guides: ["getting-started-with-acrs", "vpat-acr-documentation", "accessibility-guidelines", "testing-evaluation", "ux-government-saas-sales"]
  },
  {
    slug: "selling-to-government",
    title: "Selling to government",
    who: "For SaaS teams answering federal and state procurement.",
    guides: ["ux-government-saas-sales", "accessibility-guidelines", "legal-landscape", "vpat-acr-documentation"]
  },
  {
    slug: "running-an-audit",
    title: "Running an audit",
    who: "For specialists planning or carrying out an accessibility audit.",
    guides: ["testing-evaluation", "screen-readers-aria", "accessible-forms", "design-visual"]
  }
];
