(function () {
  /* ── Scroll progress bar ── */
  const bar = document.getElementById('progress-bar');
  function updateBar() {
    if (!bar) return;
    const top = window.scrollY;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = h > 0 ? (top / h * 100) + '%' : '0%';
  }

  /* ── Hero parallax ── */
  const heroBg = document.querySelector('.hero');
  function updateParallax() {
    if (!heroBg) return;
    const shift = window.scrollY * 0.04;
    heroBg.style.backgroundPosition = `${50 + shift}% ${50 + shift * 0.5}%`;
  }

  /* ── Scroll-in animations via IntersectionObserver ── */
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initReveal() {
    if (reduced) return;

    document.querySelectorAll('.topics-grid-new li').forEach((li, i) => {
      const card = li.querySelector('a');
      if (card) card.style.transitionDelay = (i * 120) + 'ms';
    });

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-clip')
      .forEach(el => io.observe(el));
  }

  /* ── Scroll listener (rAF-throttled) ── */
  let ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        updateBar();
        if (!reduced) updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  updateBar();
  initReveal();
})();
