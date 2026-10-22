/* theme switch, header behaviour, mobile menu, reveal */
(function(){
  var d=document,root=d.documentElement;root.classList.add('js');
  function setTheme(t){root.setAttribute('data-theme',t);try{localStorage.setItem('ea-theme',t)}catch(e){}
    d.querySelectorAll('.tt').forEach(function(b){b.setAttribute('aria-label',t==='dark'?'Switch to light mode':'Switch to dark mode');b.setAttribute('aria-pressed',t==='dark')})}
  d.querySelectorAll('.tt').forEach(function(b){
    b.setAttribute('aria-pressed',root.getAttribute('data-theme')==='dark');
    b.setAttribute('aria-label',root.getAttribute('data-theme')==='dark'?'Switch to light mode':'Switch to dark mode');
    b.addEventListener('click',function(){setTheme(root.getAttribute('data-theme')==='dark'?'light':'dark')})});
  var hd=d.querySelector('.hd'),last=0;
  if(hd){var upd=function(){hd.classList.toggle('solid',scrollY>24)};addEventListener('scroll',upd,{passive:true});upd()}
  var mb=d.getElementById('mbtn'),mp=d.getElementById('mpanel'),mo=d.getElementById('mover');
  function mtog(o){if(!mp)return;mp.classList.toggle('open',o);mo.classList.toggle('open',o);mb.setAttribute('aria-expanded',o);mp.setAttribute('aria-hidden',!o);d.body.classList.toggle('mlock',o);if(o){var c=mp.querySelector('.mclose');c&&c.focus()}else{mb.focus()}}
  if(mb&&mp){mb.addEventListener('click',function(){mtog(!mp.classList.contains('open'))});mo.addEventListener('click',function(){mtog(false)});mp.querySelector('.mclose').addEventListener('click',function(){mtog(false)});mp.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){if(a.getAttribute('href').charAt(0)==='#'||a.getAttribute('href').indexOf('#')>-1&&a.pathname===location.pathname)mtog(false)})});addEventListener('keydown',function(e){if(e.key==='Escape'&&mp.classList.contains('open'))mtog(false)})}
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}})},{threshold:.06,rootMargin:'0px 0px -30px 0px'});d.querySelectorAll('.rv').forEach(function(el){io.observe(el)})}else{d.querySelectorAll('.rv').forEach(function(el){el.classList.add('on')})}
  setTimeout(function(){d.querySelectorAll('.hero .rv,.c-hero .rv').forEach(function(el){el.classList.add('on')})},60);
})();
