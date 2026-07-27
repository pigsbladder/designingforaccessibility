(function () {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let W, H, stars, orbiters;

  function rand(a, b) { return a + Math.random() * (b - a); }

  function init() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;

    const count = Math.floor((W * H) / 4000);
    stars = Array.from({ length: count }, () => ({
      x: rand(0, W), y: rand(0, H),
      r: rand(0.2, 1.4),
      alpha: rand(0.15, 0.7),
      ts: rand(0.003, 0.012),
      to: rand(0, Math.PI * 2)
    }));

    orbiters = [
      { cx: W * 0.78, cy: H * 0.45, rx: H * 0.28, ry: H * 0.10,
        speed: 0.00018, angle: 0,   r: 2.8, color: 'rgba(124,109,255,0.55)' },
      { cx: W * 0.78, cy: H * 0.45, rx: H * 0.42, ry: H * 0.16,
        speed: 0.00011, angle: 1.8, r: 1.8, color: 'rgba(167,139,250,0.40)' },
      { cx: W * 0.78, cy: H * 0.45, rx: H * 0.58, ry: H * 0.22,
        speed: 0.000065, angle: 0.9, r: 1.4, color: 'rgba(59,158,255,0.35)' },
    ];
  }

  let t = 0;
  function draw() {
    ctx.clearRect(0, 0, W, H);
    t++;

    orbiters.forEach(o => {
      ctx.beginPath();
      ctx.ellipse(o.cx, o.cy, o.rx, o.ry, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.04)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    const sx = W * 0.78, sy = H * 0.45;
    const sg = ctx.createRadialGradient(sx, sy, 0, sx, sy, 28);
    sg.addColorStop(0, 'rgba(167,139,250,0.35)');
    sg.addColorStop(0.5, 'rgba(124,109,255,0.12)');
    sg.addColorStop(1, 'transparent');
    ctx.beginPath(); ctx.arc(sx, sy, 28, 0, Math.PI * 2);
    ctx.fillStyle = sg; ctx.fill();
    ctx.beginPath(); ctx.arc(sx, sy, 3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(200,190,255,0.6)'; ctx.fill();

    orbiters.forEach(o => {
      if (!reduced) o.angle += o.speed * 16;
      const px = o.cx + o.rx * Math.cos(o.angle);
      const py = o.cy + o.ry * Math.sin(o.angle);
      const g = ctx.createRadialGradient(px, py, 0, px, py, o.r * 4);
      g.addColorStop(0, o.color);
      g.addColorStop(1, 'transparent');
      ctx.beginPath(); ctx.arc(px, py, o.r * 4, 0, Math.PI * 2);
      ctx.fillStyle = g; ctx.fill();
      ctx.beginPath(); ctx.arc(px, py, o.r, 0, Math.PI * 2);
      ctx.fillStyle = o.color.replace(/[\d.]+\)$/, '0.9)'); ctx.fill();
    });

    stars.forEach(s => {
      const tw = reduced ? s.alpha
        : s.alpha * (0.6 + 0.4 * Math.sin(t * s.ts + s.to));
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(220,225,255,${tw})`; ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  init();
  draw();
  new ResizeObserver(init).observe(canvas.parentElement);
})();
