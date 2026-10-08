/* Interactive journey path: tap a stop to open it */
(function () {
  document.querySelectorAll('[data-jp]').forEach(function (jp) {
    var nodes = [].slice.call(jp.querySelectorAll('.jp-node'));
    var mq = window.matchMedia('(max-width:760px)');
    function show(i, allowClose) {
      var cur = nodes.findIndex(function (n) { return n.getAttribute('aria-expanded') === 'true'; });
      var close = allowClose && mq.matches && cur === i;
      nodes.forEach(function (n, k) {
        var on = !close && k === i;
        n.setAttribute('aria-expanded', on ? 'true' : 'false');
        n.classList.toggle('done', !close && k < i);
        document.getElementById(n.getAttribute('aria-controls')).classList.toggle('on', on);
      });
    }
    nodes.forEach(function (n, i) {
      n.addEventListener('click', function () { show(i, true); });
      n.addEventListener('keydown', function (e) {
        var d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
        if (d && nodes[i + d]) { e.preventDefault(); nodes[i + d].focus(); show(i + d); }
      });
    });
    jp.querySelectorAll('.jp-next').forEach(function (b) {
      b.addEventListener('click', function () {
        var i = +b.dataset.to; show(i); if (mq.matches) nodes[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    });
    show(0);
  });
})();
