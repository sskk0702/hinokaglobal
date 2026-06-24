/* ── HEADER SCROLL ── */
var hdr = document.getElementById('site-header');
var lastY = 0;
window.addEventListener('scroll', function() {
  var y = window.scrollY;
  hdr.classList.toggle('scrolled', y > 40);
  hdr.classList.toggle('nav-hidden', y > lastY && y > 120);
  lastY = y;
}, { passive: true });

/* ── HAMBURGER ── */
var burger = document.getElementById('hamburger');
var gnav   = document.getElementById('global-nav');
var overlay = document.getElementById('nav-overlay');
function closeNav() { gnav.classList.remove('open'); burger.classList.remove('open'); overlay.classList.remove('open'); }
burger.addEventListener('click', function(e) {
  e.stopPropagation();
  var open = gnav.classList.toggle('open');
  burger.classList.toggle('open', open);
  overlay.classList.toggle('open', open);
});
overlay.addEventListener('click', closeNav);
document.addEventListener('click', function(e) {
  if (!hdr.contains(e.target) && !gnav.contains(e.target)) { closeNav(); }
});

/* ── FADE IN ── */
var io = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.fade-in').forEach(function(el) { io.observe(el); });
