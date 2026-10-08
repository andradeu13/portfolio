/* Shared behaviour for case-study pages: reveal, drawer, section dots, smart nav, tabs */
document.documentElement.classList.add('js');

const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); obs.unobserve(e.target); } });
}, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.rv').forEach(el => obs.observe(el));
setTimeout(() => { document.querySelectorAll('.hero .rv').forEach(el => el.classList.add('on')); }, 60);

const hamBtn = document.getElementById('ham-btn'), drawer = document.getElementById('drawer'),
      overlay = document.getElementById('overlay'), dclose = document.getElementById('dclose');
function openDrawer() { hamBtn.classList.add('open'); hamBtn.setAttribute('aria-expanded', 'true'); drawer.classList.add('open'); overlay.classList.add('open'); document.body.style.overflow = 'hidden'; dclose.focus(); }
function closeDrawer() { hamBtn.classList.remove('open'); hamBtn.setAttribute('aria-expanded', 'false'); drawer.classList.remove('open'); overlay.classList.remove('open'); document.body.style.overflow = ''; }
hamBtn.addEventListener('click', openDrawer);
dclose.addEventListener('click', closeDrawer);
overlay.addEventListener('click', closeDrawer);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

const rsbItems = document.querySelectorAll('.rsb-item');
const rsbSecs = [...rsbItems].map(i => i.dataset.target);
function updateRsb() {
    let active = 0;
    rsbSecs.forEach((id, i) => { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.45) active = i; });
    rsbItems.forEach((item, i) => item.classList.toggle('active', i === active));
}
window.addEventListener('scroll', updateRsb, { passive: true });
rsbItems.forEach(item => {
    item.setAttribute('role', 'link'); item.setAttribute('tabindex', '0');
    const go = () => { const el = document.getElementById(item.dataset.target); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
    item.addEventListener('click', go);
    item.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
});
updateRsb();

let lastScroll = 0;
const siteNav = document.querySelector('.site-nav');
window.addEventListener('scroll', () => {
    const c = window.scrollY;
    if (c > lastScroll && c > 100) siteNav.classList.add('nav-hidden'); else siteNav.classList.remove('nav-hidden');
    lastScroll = Math.max(0, c);
}, { passive: true });

/* Generic tab groups: [data-tabs] contains buttons[data-tab] and panels[data-panel] */
document.querySelectorAll('[data-tabs]').forEach(group => {
    const tabs = group.querySelectorAll('[data-tab]'), panels = group.querySelectorAll('[data-panel]');
    tabs.forEach(t => t.addEventListener('click', () => {
        tabs.forEach(x => x.setAttribute('aria-pressed', String(x === t)));
        panels.forEach(p => { p.hidden = p.dataset.panel !== t.dataset.tab; });
    }));
});

/* Iguana demo tabs: set the hash of both iframes */
const demoFrames = [document.getElementById('demo-d'), document.getElementById('demo-m')].filter(Boolean);
document.querySelectorAll('.demo-tab').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('.demo-tab').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
    demoFrames.forEach(f => { try { f.contentWindow.location.hash = btn.dataset.hash; } catch (e) { f.src = 'demo/index.html' + btn.dataset.hash; } });
}));
