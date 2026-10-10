/* NOVE motion plus: short complementary cues over the existing editorial motion.
   No pending animation hides content; layout, heading nodes and image crops stay intact. */
(function(){
  'use strict';
  if(window.NoveMotionPlus)return;
  var api=window.NoveMotionPlus={version:'1.1.0-candidate',started:0,skipped:0,state:'idle',blocked:[]};
  var media=window.matchMedia('(prefers-reduced-motion: reduce)');
  if(!Element.prototype.animate){api.state='unsupported';return;}
  if(media.matches){api.state='reduced';return;}
  try{if(localStorage.getItem('nove:motion-paused')==='true'){api.state='user';return;}}catch(e){}

  var EXPO='cubic-bezier(.22,1,.36,1)';
  var debug=/[?&]nvmotiondebug\b/.test(location.search);

  var anims=new Set();
  var groups=[];
  var cleanups=[];
  var alive=true;

  /* Register descriptions only. Pending entrances must never hide content. */
  function hold(el,frames,ms,delay,ease){
    if(!el||!alive)return null;
    return {target:el,frames:frames,ms:ms,delay:delay||0,ease:ease||EXPO,animation:null};
  }
  function owned(el){
    /* The base layer owns both the registered node and its reading group.
       Never animate an ancestor around an already animated heading/image. */
    return !!(el.closest('[data-nv-entrance]')||el.querySelector('[data-nv-entrance]'));
  }
  function run(job){
    var el=job.target,r=el.getBoundingClientRect();
    if(!el.isConnected||!r.width||!r.height||r.bottom<=64||r.top>=innerHeight||owned(el)){
      api.skipped++;return;
    }
    /* Foreign animations, hover transitions and authored styles remain theirs. */
    if(el.getAnimations&&el.getAnimations().some(function(a){return a.playState==='running'||a.playState==='paused';})){
      api.skipped++;return;
    }
    var small=window.innerWidth<768;
    var frames=job.frames.map(function(frame){
      var next=Object.assign({},frame);
      if('opacity' in next)next.opacity=Math.max(.84,Number(next.opacity));
      return next;
    });
    var before=debug?snapshot(el,frames):null;
    var a;
    try{a=el.animate(frames,{duration:Math.min(job.ms,small?420:600),delay:Math.min(job.delay,small?0:80),easing:job.ease,fill:'backwards'});}catch(e){return;}
    job.animation=a;anims.add(a);api.started++;
    a.finished.then(function(){anims.delete(a);},function(){anims.delete(a);});
    if(debug){var after=snapshot(el,frames);Object.keys(before).forEach(function(k){if(before[k]===after[k]&&String(frames[0][k])!==String(frames[frames.length-1][k]))api.blocked.push(describe(el)+' '+k);});}
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
    if(g.played||!alive||document.hidden)return;
    if(media.matches||window.NoveMotionPaused){stop(media.matches?'reduced':'user');return;}
    g.played=true;
    g.list.forEach(run);
  }
  function finishGroup(g){
    g.played=true;
    g.list.forEach(function(job){if(job.animation){try{job.animation.cancel();}catch(e){}}});
  }

  function stop(reason){
    if(!alive)return;
    alive=false;api.state=reason||'stopped';
    groups.forEach(finishGroup);
    anims.forEach(function(a){try{a.cancel();}catch(e){}});
    anims.clear();
    cleanups.forEach(function(fn){try{fn();}catch(e){}});
    cleanups.length=0;
  }

  function all(root,sel){return Array.prototype.slice.call(root.querySelectorAll(sel));}
  function rowsOf(items){
    var rows=[],last=null;
    items.forEach(function(el){var t=Math.round(el.getBoundingClientRect().top);if(last===null||Math.abs(t-last)>4){rows.push([]);last=t;}rows[rows.length-1].push(el);});
    return rows;
  }

  function build(main){
    var hero=main.querySelector('.nv-hero');
    var wide=window.innerWidth>=768;
    var RISE=[{opacity:.88,translate:'0 8px'},{opacity:1,translate:'0 0'}];
    /* Numbered markers retain their measured box and remain readable. */
    var POP=[{opacity:.84},{opacity:1}];

    /* 1. The existing editorial layer owns the hero. Whole-line fallback only;
       keep the navigation, CTA, image geometry and accessible text intact. */
    if(hero){
      all(hero,'.nv30-hero-line').forEach(function(line,i){
        group(line,function(add){add(line,RISE,480,i*40,EXPO);},{eager:true});
      });
    }

    /* 2. Retain a short chapter fallback for layouts without a base registration. */
    all(main,':scope > section:not(.nv-hero) h2').forEach(function(h){
      group(h,function(add){add(h,RISE,480,0,EXPO);});
    });

    all(main,'.nv-challenges .nv30-cards > li').forEach(function(li,i){
      group(li,function(add){
        var d=wide?Math.min(i,2)*40:0;
        add(li,RISE,1100,d,EXPO);
        add(li.querySelector(':scope > b'),POP,800,d+260,EXPO);
      });
    });

    var overview=main.querySelector('.nv-overview');
    if(overview){
      var photo=overview.querySelector('.nv30-overview-photo');
      group(photo,function(add){add(photo,[{opacity:.84},{opacity:1}],1400,80,EXPO);});
      all(overview,'.nv-copy > p:not(.nv30-en)').forEach(function(el,i){
        group(el,function(add){add(el,RISE,900,120+i*80,EXPO);});
      });
    }

    var process=main.querySelector('.nv-process');
    if(process){
      var pimg=process.querySelector('.nv30-process-grid > img');
      group(pimg,function(add){add(pimg,[{opacity:.84},{opacity:1}],1400,0,EXPO);});
      all(process,'.nv-step').forEach(function(step){
        group(step,function(add){
          add(step.querySelector(':scope > b'),POP,800,0,EXPO);
          all(step,':scope > :not(b)').forEach(function(el,i){add(el,RISE,900,90+i*70,EXPO);});
        });
      });
    }

    all(main,'.nv-services .nv-photo-link').forEach(function(card,i){
      group(card,function(add){
        var d=wide?(i%2)*130:0;
        add(card.querySelector('img'),[{opacity:.84},{opacity:1}],1300,d,EXPO);
        all(card,':scope > :not(img):not(.nv-card-image-frame):not(.nv-arrow)').forEach(function(el,j){add(el,RISE,900,d+260+j*80,EXPO);});
      });
    });

    all(main,'.nv-business .nv-copy > p, .nv-industries .nv-copy > p').forEach(function(p){
      group(p,function(add){add(p,RISE,900,140,EXPO);});
    });
    all(main,'.nv-business .nv-directory > a').forEach(function(row,i){
      group(row,function(add){
        var d=wide?Math.min(i,3)*70:0;
        add(row,RISE,1000,d,EXPO);
        /* Arrow feedback stays with the shared hover/focus CSS. */
      });
    });

    var grid=main.querySelector('.nv-industry-grid');
    if(grid){
      rowsOf(all(grid,':scope > a')).forEach(function(row,r){
        row.forEach(function(cell,c){
          group(cell,function(add){add(cell,RISE,850,wide?(r+c)*65:0,EXPO);});
        });
      });
    }

    var panel=main.querySelector('.nv-company-panel');
    if(panel){
      group(panel,function(add){
        add(panel,[{opacity:.88},{opacity:1}],1300,0,EXPO);
        all(panel,'.nv-company-copy > :not(.nv30-en):not(.nv-en):not(.nv33-native-label)').forEach(function(el,i){add(el,RISE,900,420+i*110,EXPO);});
      });
    }

    var cta=main.querySelector('.nv-cta');
    if(cta){
      all(cta,':scope > p:not(.nv-note)').forEach(function(el){
        group(el,function(add){add(el,RISE,900,180,EXPO);});
      });
      /* CTA and focus targets are immediately available, with existing CSS feedback. */
    }
  }

  /* 3. Passive, event-driven visibility checks. Native scroll, hero copy and
     image crops stay untouched; there is no perpetual pointer/parallax loop. */
  function depth(main){
    var raf=0,watcher=null;
    function frame(){raf=0;if(!alive||document.hidden)return;if(watcher)watcher(window.innerHeight);}
    function request(){if(!raf&&alive&&!document.hidden)raf=requestAnimationFrame(frame);}
    function visibility(){
      if(document.hidden){anims.forEach(function(a){try{a.cancel();}catch(e){}});}
      else request();
    }
    window.addEventListener('scroll',request,{passive:true});
    window.addEventListener('resize',request);
    document.addEventListener('visibilitychange',visibility);
    /* A late-loaded image can alter the positions of pending sections. */
    main.addEventListener('load',request,true);
    cleanups.push(function(){
      cancelAnimationFrame(raf);window.removeEventListener('scroll',request);
      window.removeEventListener('resize',request);document.removeEventListener('visibilitychange',visibility);
      main.removeEventListener('load',request,true);
    });
    return {request:request,watch:function(fn){watcher=fn;request();}};
  }

  function start(main){
    if(!alive||api.state==='running')return;
    api.state='running';
    build(main);
    var layers=depth(main);
    /* Rect-based visibility: clip-path and scale on a target never hide it from this check. */
    layers.watch(function(vh){
      for(var i=0;i<groups.length;i++){
        var g=groups[i];
        if(g.played||!opened)continue;
        var r=g.trigger.getBoundingClientRect();
        if(!r.width&&!r.height)continue;
        if(r.bottom<=64)finishGroup(g);
        else if(r.top<vh*.94)play(g);
      }
    });
    var opened=false,timer=0;
    var open=function(){
      if(opened||!alive)return;opened=true;clearTimeout(timer);
      /* Start on the next frame so the base layer's registration is complete. */
      layers.request();
    };
    if(window.NoveMotionReady)open();else{
      window.addEventListener('nove:motion-ready',open,{once:true});
      timer=setTimeout(open,1200);
    }
    function focus(e){
      groups.forEach(function(g){
        if(g.trigger.contains(e.target)||g.list.some(function(job){return job.target.contains(e.target);}))finishGroup(g);
      });
    }
    function preference(){if(window.NoveMotionPaused||media.matches)stop(media.matches?'reduced':'user');}
    function print(){stop('print');}
    function pagehide(){stop('page');}
    main.addEventListener('focusin',focus);
    window.addEventListener('nove:motion-setting',preference);
    media.addEventListener('change',preference);
    window.addEventListener('beforeprint',print);
    window.addEventListener('pagehide',pagehide);
    cleanups.push(function(){
      clearTimeout(timer);window.removeEventListener('nove:motion-ready',open);
      main.removeEventListener('focusin',focus);window.removeEventListener('nove:motion-setting',preference);
      media.removeEventListener('change',preference);window.removeEventListener('beforeprint',print);
      window.removeEventListener('pagehide',pagehide);
    });

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
