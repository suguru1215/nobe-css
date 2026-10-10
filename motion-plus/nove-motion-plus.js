/* NOVE motion plus: a choreography layer over the existing editorial motion.
   It never changes resting layout. Every effect ends on the element's own computed style. */
(function(){
  'use strict';
  if(window.NoveMotionPlus)return;
  var api=window.NoveMotionPlus={version:'1.0.0',state:'idle',blocked:[]};
  var media=window.matchMedia('(prefers-reduced-motion: reduce)');
  if(media.matches||!Element.prototype.animate){api.state='unsupported';return;}
  try{if(localStorage.getItem('nove:motion-paused')==='true'){api.state='user';return;}}catch(e){}

  var EXPO='cubic-bezier(.16,1,.3,1)';
  var BACK='cubic-bezier(.34,1.56,.64,1)';
  var debug=/[?&]nvmotiondebug\b/.test(location.search);
  var fine=window.matchMedia('(hover:hover) and (pointer:fine)');

  var anims=new Set();
  var groups=[];
  var cleanups=[];
  var alive=true;

  function hold(el,frames,ms,delay,ease){
    if(!el||!alive)return null;
    var before=debug?snapshot(el,frames):null;
    var a;
    try{a=el.animate(frames,{duration:ms,delay:delay||0,easing:ease||EXPO,fill:'backwards'});a.pause();}catch(e){return null;}
    anims.add(a);
    a.finished.then(function(){anims.delete(a);},function(){anims.delete(a);});
    if(debug){var after=snapshot(el,frames);Object.keys(before).forEach(function(k){if(before[k]===after[k]&&String(frames[0][k])!==String(frames[frames.length-1][k]))api.blocked.push(describe(el)+' '+k);});}
    return a;
  }
  function snapshot(el,frames){var cs=getComputedStyle(el),o={};Object.keys(frames[0]).forEach(function(k){if(k!=='offset'&&k!=='easing')o[k]=cs[k];});return o;}
  function describe(el){return el.tagName.toLowerCase()+(typeof el.className==='string'&&el.className?'.'+el.className.trim().split(/\s+/).slice(0,2).join('.'):'');}

  function group(trigger,build,opts){
    if(!trigger)return;
    var list=[];
    var add=function(el,frames,ms,delay,ease){var a=hold(el,frames,ms,delay,ease);if(a)list.push(a);return a;};
    var g={trigger:trigger,list:list,played:false,done:null,eager:!!(opts&&opts.eager)};
    build(add,g);
    if(!list.length)return;
    groups.push(g);
    return g;
  }
  function play(g){
    if(g.played||!alive)return;
    g.played=true;
    g.list.forEach(function(a){try{a.play();}catch(e){}});
    if(g.done)Promise.all(g.list.map(function(a){return a.finished.catch(function(){});})).then(function(){if(g.done){var d=g.done;g.done=null;d();}});
  }
  function finishGroup(g){
    g.played=true;
    g.list.forEach(function(a){try{a.finish();}catch(e){try{a.cancel();}catch(x){}}});
    if(g.done){var d=g.done;g.done=null;d();}
  }

  function stop(reason){
    if(!alive)return;
    alive=false;api.state=reason||'stopped';
    groups.forEach(finishGroup);
    anims.forEach(function(a){try{a.finish();}catch(e){try{a.cancel();}catch(x){}}});
    anims.clear();
    cleanups.forEach(function(fn){try{fn();}catch(e){}});
    cleanups.length=0;
  }

  function all(root,sel){return Array.prototype.slice.call(root.querySelectorAll(sel));}
  function onlyText(el){for(var n=el.firstChild;n;n=n.nextSibling)if(n.nodeType!==3)return false;return !!el.textContent.trim();}

  /* Split one heading line into characters, keeping its exact box. Restored when the entrance ends. */
  function splitLine(line){
    if(!onlyText(line))return null;
    var text=line.textContent,r0=line.getBoundingClientRect();
    var frag=document.createDocumentFragment(),chars=[];
    Array.from(text).forEach(function(ch){
      if(/\s/.test(ch)){frag.appendChild(document.createTextNode(ch));return;}
      var s=document.createElement('span');s.textContent=ch;s.setAttribute('aria-hidden','true');s.style.display='inline-block';
      frag.appendChild(s);chars.push(s);
    });
    line.textContent='';line.appendChild(frag);
    var r1=line.getBoundingClientRect();
    var restore=function(){line.textContent=text;line.style.removeProperty('clip-path');};
    if(Math.abs(r1.width-r0.width)>.5||Math.abs(r1.height-r0.height)>.5){restore();return null;}
    return {chars:chars,restore:restore};
  }

  /* Split a heading that holds only text and line breaks. Any change of its box cancels the split. */
  function splitHeading(h){
    for(var n=h.firstChild;n;n=n.nextSibling)if(n.nodeType!==3&&!(n.nodeType===1&&n.tagName==='BR'))return null;
    var r0=h.getBoundingClientRect(),saved=Array.prototype.slice.call(h.childNodes).map(function(n){return n.cloneNode(true);}),label=h.textContent,chars=[];
    Array.prototype.slice.call(h.childNodes).forEach(function(n){
      if(n.nodeType!==3)return;
      var frag=document.createDocumentFragment();
      Array.from(n.nodeValue).forEach(function(ch){
        if(/\s/.test(ch)){frag.appendChild(document.createTextNode(ch));return;}
        var c=document.createElement('span');c.textContent=ch;c.setAttribute('aria-hidden','true');c.style.display='inline-block';frag.appendChild(c);chars.push(c);
      });
      h.replaceChild(frag,n);
    });
    var restore=function(){if(!chars.length)return;chars.length=0;h.textContent='';saved.forEach(function(n){h.appendChild(n);});h.removeAttribute('aria-label');};
    var r1=h.getBoundingClientRect();
    if(!chars.length||Math.abs(r1.width-r0.width)>.5||Math.abs(r1.height-r0.height)>.5){var keep=chars.length;restore();if(keep)return null;return null;}
    h.setAttribute('aria-label',label);
    return {chars:chars.slice(),restore:restore};
  }

  function rowsOf(items){
    var rows=[],last=null;
    items.forEach(function(el){var t=Math.round(el.getBoundingClientRect().top);if(last===null||Math.abs(t-last)>4){rows.push([]);last=t;}rows[rows.length-1].push(el);});
    return rows;
  }

  function build(main){
    var hero=main.querySelector('.nv-hero');
    var wide=window.innerWidth>=768;
    var RISE=[{opacity:0,translate:'0 24px'},{opacity:1,translate:'0 0'}];
    /* Numbered markers are measured by the existing step rail, so they open with a clip, never a scale. */
    var POP=[{clipPath:'circle(0% at 50% 50%)'},{clipPath:'circle(75% at 50% 50%)'}];

    /* 1. Opening: headline characters rise through a mask while the visual opens. */
    if(hero){
      var title=hero.querySelector('h1');
      var lines=title?all(title,'.nv30-hero-line'):[];
      var label=title?title.textContent:'';
      var restores=[];
      group(hero,function(add,g){
        lines.forEach(function(line,li){
          var parts=splitLine(line);
          if(parts){
            restores.push(parts.restore);
            line.style.clipPath='inset(-.2em -.2em -.04em -.2em)';
            parts.chars.forEach(function(c,ci){add(c,[{translate:'0 118%',rotate:'5deg'},{translate:'0 0',rotate:'0deg'}],1050,90+li*110+ci*22,EXPO);});
          }else{
            add(line,[{clipPath:'inset(0 0 100% 0)'},{clipPath:'inset(0 0 -20% 0)'}],900,90+li*110,EXPO);
          }
        });
        var settle=function(){if(title)title.removeAttribute('aria-label');restores.forEach(function(r){r();});restores.length=0;};
        if(restores.length&&title){title.setAttribute('aria-label',label);cleanups.push(settle);}
        g.done=settle;
        var art=hero.querySelector('.nv30-hero-art');
        if(art){
          /* The wipe edge follows the diagonal of the brand mark. */
          add(art,[{clipPath:'polygon(100% 0,140% 0,140% 100%,135% 100%)'},{clipPath:'polygon(-35% 0,140% 0,140% 100%,0% 100%)'}],1600,60,EXPO);
          all(art,':scope > img, :scope > video').forEach(function(m){add(m,[{scale:'1.22'},{scale:'1'}],1900,60,EXPO);});
        }
        add(hero.querySelector(':scope > p'),[{opacity:0,translate:'0 28px'},{opacity:1,translate:'0 0'}],950,560,EXPO);
        all(hero,'.nv-hero-actions > *').forEach(function(b,i){add(b,[{opacity:0,scale:'.94'},{opacity:1,scale:'1'}],900,700+i*90,EXPO);});
      },{eager:true});

      var head=document.querySelector('header.nv23-header');
      if(head&&wide){
        group(head,function(add){
          var DROP=[{opacity:0,translate:'0 -10px'},{opacity:1,translate:'0 0'}];
          add(head.querySelector('.nv-head-inner > a'),DROP,800,0,EXPO);
          all(head,'.nv-desktop-nav > a').forEach(function(a,i){add(a,DROP,800,80+i*55,EXPO);});
        },{eager:true});
      }
    }

    /* 2. Chapters: each heading is wiped in, then its content follows in reading order. */
    all(main,':scope > section:not(.nv-hero) h2').forEach(function(h){
      group(h,function(add,g){
        var parts=splitHeading(h);
        if(!parts){add(h,[{clipPath:'inset(0 0 100% 0)'},{clipPath:'inset(0 0 -25% 0)'}],1000,0,EXPO);return;}
        var step=Math.min(20,520/parts.chars.length);
        parts.chars.forEach(function(c,i){add(c,[{opacity:0,translate:'0 .55em'},{opacity:1,translate:'0 0'}],900,i*step,EXPO);});
        g.done=parts.restore;cleanups.push(parts.restore);
      });
    });

    all(main,'.nv-challenges .nv30-cards > li').forEach(function(li,i){
      group(li,function(add){
        var d=wide?i*120:0;
        add(li,[{opacity:0,translate:'0 56px'},{opacity:1,translate:'0 0'}],1100,d,EXPO);
        add(li.querySelector(':scope > b'),POP,800,d+260,EXPO);
      });
    });

    var overview=main.querySelector('.nv-overview');
    if(overview){
      var photo=overview.querySelector('.nv30-overview-photo');
      group(photo,function(add){add(photo,[{clipPath:'inset(0 0 0 100%)',scale:'1.14'},{clipPath:'inset(0 0 0 0)',scale:'1'}],1400,80,EXPO);});
      all(overview,'.nv-copy > *').forEach(function(el,i){
        group(el,function(add){add(el,RISE,900,120+i*80,EXPO);});
      });
    }

    var process=main.querySelector('.nv-process');
    if(process){
      var pimg=process.querySelector('.nv30-process-grid > img');
      group(pimg,function(add){add(pimg,[{clipPath:'inset(100% 0 0 0)',scale:'1.14'},{clipPath:'inset(0 0 0 0)',scale:'1'}],1400,0,EXPO);});
      all(process,'.nv-step').forEach(function(step){
        group(step,function(add){
          add(step.querySelector(':scope > b'),POP,800,0,EXPO);
          all(step,':scope > :not(b)').forEach(function(el,i){add(el,[{opacity:0,translate:'28px 0'},{opacity:1,translate:'0 0'}],900,90+i*70,EXPO);});
        });
      });
    }

    all(main,'.nv-services .nv-photo-link').forEach(function(card,i){
      group(card,function(add){
        var d=wide?(i%2)*130:0;
        add(card.querySelector('img'),[{clipPath:'inset(0 0 100% 0)'},{clipPath:'inset(0 0 0 0)'}],1300,d,EXPO);
        all(card,':scope > :not(img)').forEach(function(el,j){add(el,[{opacity:0,translate:'0 22px'},{opacity:1,translate:'0 0'}],900,d+260+j*80,EXPO);});
      });
    });

    all(main,'.nv-business .nv-copy > p, .nv-industries .nv-copy > p').forEach(function(p){
      group(p,function(add){add(p,RISE,900,140,EXPO);});
    });
    all(main,'.nv-business .nv-directory > a').forEach(function(row,i){
      group(row,function(add){
        var d=wide?Math.min(i,3)*70:0;
        add(row,[{opacity:0,translate:'0 36px'},{opacity:1,translate:'0 0'}],1000,d,EXPO);
        add(row.querySelector('.nv-arrow'),[{scale:'.4',rotate:'-45deg'},{scale:'1',rotate:'0deg'}],800,d+320,BACK);
      });
    });

    var grid=main.querySelector('.nv-industry-grid');
    if(grid){
      rowsOf(all(grid,':scope > a')).forEach(function(row,r){
        row.forEach(function(cell,c){
          group(cell,function(add){add(cell,[{opacity:0,translate:'0 26px'},{opacity:1,translate:'0 0'}],850,wide?(r+c)*65:0,EXPO);});
        });
      });
    }

    var panel=main.querySelector('.nv-company-panel');
    if(panel){
      group(panel,function(add){
        add(panel,[{clipPath:'inset(0 50% 0 50%)'},{clipPath:'inset(0 0 0 0)'}],1300,0,EXPO);
        all(panel,'.nv-company-copy > *').forEach(function(el,i){add(el,[{opacity:0,translate:'0 20px'},{opacity:1,translate:'0 0'}],900,420+i*110,EXPO);});
      });
    }

    var cta=main.querySelector('.nv-cta');
    if(cta){
      all(cta,':scope > p:not(.nv-note)').forEach(function(el){
        group(el,function(add){add(el,RISE,900,180,EXPO);});
      });
      var go=cta.querySelector(':scope > .nv-button');
      group(go,function(add){add(go,[{opacity:0,scale:'.94'},{opacity:1,scale:'1'}],900,260,EXPO);});
    }
  }

  /* 3. Depth: scroll and pointer move the hero layers at different rates. Images drift inside their frames. */
  function depth(main){
    var hero=main.querySelector('.nv-hero');
    var art=hero&&hero.querySelector('.nv30-hero-art');
    var geo=hero&&hero.querySelector('.nv34-geometry');
    var copy=hero?all(hero,':scope > h1, :scope > p, :scope > .nv-hero-actions'):[];
    var frames=all(main,'.nv30-overview-photo, .nv30-process-grid > img, .nv-services .nv-photo-link img').filter(function(im){return getComputedStyle(im).objectFit==='cover';});
    var bases=frames.map(function(im){var p=getComputedStyle(im).objectPosition.split(' '),y=parseFloat(p[1]);return {x:p[0]||'50%',y:isNaN(y)?50:y};});
    var px=0,py=0,tx=0,ty=0,ticking=false,ready=false,watcher=null;

    function frame(){
      ticking=false;
      if(!alive)return;
      var vh=window.innerHeight,y=window.scrollY;
      if(watcher)watcher(vh);
      px+=(tx-px)*.08;py+=(ty-py)*.08;
      if(Math.abs(px)<.002&&!tx)px=0;
      if(Math.abs(py)<.002&&!ty)py=0;
      if(hero&&ready){
        var h=hero.offsetHeight||1,s=Math.max(0,Math.min(1,y/h));
        copy.forEach(function(el){el.style.translate=s?'0 '+(-s*70).toFixed(1)+'px':'';el.style.opacity=s?Math.max(0,1-s*1.5).toFixed(3):'';});
        if(art)art.style.translate=(s||px||py)?(px*-16).toFixed(2)+'px '+(py*-10-s*46).toFixed(2)+'px':'';
        if(geo)geo.style.translate=(s||px||py)?(px*9).toFixed(2)+'px '+(py*6+s*38).toFixed(2)+'px':'';
      }
      frames.forEach(function(im,i){
        var r=im.getBoundingClientRect();
        if(r.bottom<-80||r.top>vh+80)return;
        var p=Math.max(-1,Math.min(1,((r.top+r.height/2)-vh/2)/(vh/2+r.height/2)));
        im.style.objectPosition=bases[i].x+' '+(bases[i].y+p*-9).toFixed(2)+'%';
      });
      if(Math.abs(tx-px)>.002||Math.abs(ty-py)>.002)request();
    }
    function request(){if(!ticking&&alive){ticking=true;requestAnimationFrame(frame);}}
    function move(e){
      if(!fine.matches||window.innerWidth<992||!hero)return;
      var r=hero.getBoundingClientRect();
      if(e.clientY>r.bottom){tx=0;ty=0;}else{tx=(e.clientX/window.innerWidth-.5)*2;ty=((e.clientY-r.top)/Math.max(1,r.height)-.5)*2;}
      request();
    }
    function leave(){tx=0;ty=0;request();}
    window.addEventListener('scroll',request,{passive:true});
    window.addEventListener('resize',request);
    window.addEventListener('pointermove',move,{passive:true});
    document.documentElement.addEventListener('pointerleave',leave);
    cleanups.push(function(){
      window.removeEventListener('scroll',request);window.removeEventListener('resize',request);window.removeEventListener('pointermove',move);document.documentElement.removeEventListener('pointerleave',leave);
      copy.forEach(function(el){el.style.removeProperty('translate');el.style.removeProperty('opacity');});
      if(art)art.style.removeProperty('translate');
      if(geo)geo.style.removeProperty('translate');
      frames.forEach(function(im){im.style.removeProperty('object-position');});
    });
    return {start:function(){ready=true;request();},request:request,watch:function(fn){watcher=fn;request();}};
  }

  function start(main){
    if(!alive||api.state==='running')return;
    api.state='running';
    build(main);
    var layers=depth(main);
    var eager=groups.filter(function(g){return g.eager;});
    /* Rect-based visibility: clip-path and scale on a target never hide it from this check. */
    layers.watch(function(vh){
      for(var i=0;i<groups.length;i++){
        var g=groups[i];
        if(g.played||g.eager)continue;
        var r=g.trigger.getBoundingClientRect();
        if(!r.width&&!r.height)continue;
        if(r.bottom<0)finishGroup(g);
        else if(r.top<vh*.86)play(g);
      }
    });
    var opened=false;
    var open=function(){
      if(opened)return;opened=true;
      eager.forEach(play);
      var first=eager[0];
      (first?Promise.all(first.list.map(function(a){return a.finished.catch(function(){});})):Promise.resolve()).then(function(){layers.start();});
    };
    if(window.NoveMotionReady)open();else{window.addEventListener('nove:motion-ready',open,{once:true});setTimeout(open,2600);}
    layers.request();

    main.addEventListener('focusin',function(e){
      groups.forEach(function(g){
        if(g.played&&!g.done)return;
        var hit=g.trigger.contains(e.target)||g.list.some(function(a){var t=a.effect&&a.effect.target;return t&&t.contains(e.target);});
        if(hit)finishGroup(g);
      });
    });
    window.addEventListener('nove:motion-setting',function(){if(window.NoveMotionPaused)stop('user');});
    media.addEventListener('change',function(){if(media.matches)stop('reduced');});
    window.addEventListener('beforeprint',function(){stop('print');});
  }

  var tries=0;
  (function wait(){
    var main=document.querySelector('main.nv23-home');
    if(main&&main.querySelector('.nv30-hero-line')){start(main);return;}
    if(++tries>180){api.state='no-target';return;}
    requestAnimationFrame(wait);
  })();
  api.stop=stop;
})();
