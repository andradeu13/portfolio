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
  if(hd){addEventListener('scroll',function(){var y=scrollY;hd.classList.toggle('solid',y>40);hd.classList.toggle('hide',y>last+4&&y>260);if(y<last-4)hd.classList.remove('hide');last=Math.max(0,y)},{passive:true})}
  var m=d.getElementById('mmenu'),b=d.getElementById('burger');
  function tog(o){if(!m)return;m.classList.toggle('open',o);b.setAttribute('aria-expanded',o);d.body.style.overflow=o?'hidden':''}
  if(b){b.addEventListener('click',function(){tog(true)});m.querySelector('button').addEventListener('click',function(){tog(false)});m.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){tog(false)})});addEventListener('keydown',function(e){if(e.key==='Escape')tog(false)})}
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}})},{threshold:.06,rootMargin:'0px 0px -30px 0px'});d.querySelectorAll('.rv').forEach(function(el){io.observe(el)})}else{d.querySelectorAll('.rv').forEach(function(el){el.classList.add('on')})}
  setTimeout(function(){d.querySelectorAll('.hero .rv,.c-hero .rv').forEach(function(el){el.classList.add('on')})},60);
})();
