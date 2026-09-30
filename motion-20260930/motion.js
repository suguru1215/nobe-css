(function(){
  'use strict';
  var reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  if(reduced.matches||!('IntersectionObserver' in window))return;
  var body=document.body;
  if(!body||!body.classList.contains('nv30'))return;
  var main=document.querySelector('main.nv23-home');
  if(!main)return;

  function wrapHero(){
    var lines=main.querySelectorAll('.nv-hero h1 .nv30-hero-line');
    lines.forEach(function(line,i){
      if(line.querySelector('.nv-fx-inner'))return;
      var inner=document.createElement('span');
      inner.className='nv-fx-inner';
      inner.style.setProperty('--nv-d',(150+i*100)+'ms');
      while(line.firstChild)inner.appendChild(line.firstChild);
      line.appendChild(inner);
      line.classList.add('nv-fx-mask');
    });
  }

  function mark(list,cls,step,base){
    list.forEach(function(el,i){
      if(el.classList.contains('nv-fx'))return;
      el.classList.add('nv-fx');
      if(cls)el.classList.add(cls);
      el.style.setProperty('--nv-d',((base||0)+i*(step||0))+'ms');
    });
  }
  function all(sel){return Array.prototype.slice.call(main.querySelectorAll(sel));}

  function setup(){
    wrapHero();
    body.classList.add('nv-fx-on');

    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){e.target.classList.add('nv-fx-in');io.unobserve(e.target);}
      });
    },{threshold:0.12,rootMargin:'0px 0px -40px 0px'});

    var heads=all('main > section:not(.nv-hero) h2');
    var clips=all('.nv30-overview-photo,.nv30-issue-image');
    var cards=all('.nv-services .nv-photo-link');
    var steps=all('.nv-process .nv-step');
    var misc=all('.nv-overview .nv-copy,.nv-company-panel,.nv-cta>.nv-button');

    mark(heads);
    mark(clips,'nv-fx-clip');
    mark(cards,'nv-fx-card',120);
    mark(steps,null,110);
    mark(misc,null,0,120);

    all('.nv-fx').forEach(function(el){io.observe(el);});
  }

  var tries=0;
  (function wait(){
    if(main.querySelector('.nv30-hero-line')||tries>60){setup();return;}
    tries++;requestAnimationFrame(wait);
  })();

  var art=null,ticking=false;
  function parallax(){
    ticking=false;
    if(!art)art=main.querySelector('.nv30-hero-art');
    if(!art)return;
    if(window.innerWidth<992){art.style.removeProperty('--nv-py');return;}
    var y=Math.min(window.scrollY,720);
    art.style.setProperty('--nv-py',(-y*0.06).toFixed(1)+'px');
  }
  window.addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(parallax);}},{passive:true});

  reduced.addEventListener('change',function(){
    if(reduced.matches)body.classList.remove('nv-fx-on');
  });
})();
