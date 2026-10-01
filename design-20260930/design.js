(function(){
  'use strict';
  const script=document.currentScript;
  const base=script ? new URL('./assets/',script.src).href : './assets/';
  const legacyBase=script?new URL('../img/',script.src).href:'../img/';
  const serviceArt={cmo:['cmowd',0,'jpg'],ads:['adwd',0,'jpg'],seo:['seowd',0,'jpg'],web:['webwd',0,'png'],dx:['dxwd',0,'jpg'],crm:['crmwd',0,'jpg'],sns:['datawd',0,'jpg'],global:['growthwd',0,'jpg'],'marketing-support':['growthwd',6,'jpg']};
  const industryConcernArt=[...Array.from({length:6},(_,i)=>'adwd-'+(i+7)+'.jpg'),...Array.from({length:6},(_,i)=>'crmwd-'+(i+7)+'.jpg'),...Array.from({length:6},(_,i)=>'datawd-'+(i+7)+'.jpg'),...Array.from({length:6},(_,i)=>'webwd-'+(i+7)+'.png'),'cmowd-7.jpg','cmowd-8.jpg','seowd-7.jpg'];
  function distinctPageArt(root){const key=location.pathname.split('/').filter(Boolean).pop(),set=serviceArt[key];if(set){let i=0;root.querySelectorAll('.nv30-issue-image,.nv30-research-photo,.nv30-execution-photo,.nv30-related-photo').forEach(n=>{i++;n.src=legacyBase+set[0]+'-'+(set[1]+i)+'.'+set[2];n.removeAttribute('srcset');n.style.setProperty('object-fit','contain','important');});}else{const keys=['saas','manufacturing','ec','construction','realestate','hr-recruiting','finance','medical','professional'],i=keys.indexOf(key);if(i>=0){root.querySelectorAll('.nv30-issue-image').forEach((n,j)=>{n.src=legacyBase+industryConcernArt[i*3+j];n.style.setProperty('object-fit','contain','important');});const research=root.querySelector('.nv30-research-photo'),related=root.querySelector('.nv30-related-photo');if(research)research.src=legacyBase+(i<8?'indsvc-'+(i+1)+'.jpg':'inddoc-9.jpg');if(related)related.src=legacyBase+(i<8?'inddoc-'+(i+1)+'.jpg':'indov-3.jpg');}}root.querySelectorAll('.nv30-service-card>img').forEach((n,i)=>{n.src=legacyBase+(i<8?'svcidx-'+(i+1)+'.jpg':'svc-8.jpg');n.removeAttribute('srcset');n.style.setProperty('object-fit','contain','important');});}
  function photoFile(file){return /^(advertising-v1|analytics-v1|social-v1|website-v1|process)\.png$/.test(file)?file.replace('.png','.jpg'):file;}
  function img(file,cls){const n=document.createElement('img');n.src=base+photoFile(file);n.alt='';n.className=cls||'';n.loading='lazy';n.decoding='async';return n;}
  const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)');
  let motionStopped=false;
  const motionSubscribers=new Set();
  const motionDisabled=()=>reduceMotion.matches||motionStopped;
  const notifyMotion=()=>motionSubscribers.forEach(fn=>fn());
  reduceMotion.addEventListener('change',notifyMotion);
  const geometryScripts=new Map();
  function loadGeometryScript(file){
    if(!geometryScripts.has(file))geometryScripts.set(file,new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=base+file;s.onload=resolve;s.onerror=reject;document.head.append(s);}));
    return geometryScripts.get(file);
  }
  async function netGeometry(layer){
    const reduced=reduceMotion;
    if(motionDisabled()){layer.dataset.geometryState='static';return;}
    try{
      await loadGeometryScript('three-r121.min.js');
      await loadGeometryScript('vanta-net-0.5.22.min.js');
      if(!layer.isConnected)return;
      const effect=window.VANTA.NET({el:layer,THREE:window.THREE,mouseControls:true,touchControls:true,gyroControls:false,minHeight:200,minWidth:200,scale:1,scaleMobile:1,color:0xc6d4e2,backgroundColor:0xffffff,backgroundAlpha:0,points:11,maxDistance:27,spacing:20});
      if(!effect.renderer){effect.destroy();layer.dataset.geometryState='fallback';return;}
      const canvas=layer.querySelector('canvas');if(canvas){canvas.setAttribute('aria-hidden','true');canvas.setAttribute('role','presentation');}
      let paused=false,inView=true;
      const sync=()=>{const stop=motionDisabled()||document.hidden||!inView;if(stop&&!paused){cancelAnimationFrame(effect.req);paused=true;}else if(!stop&&paused){paused=false;effect.animationLoop();}layer.dataset.geometryState=stop?'paused':'running';};
      if('IntersectionObserver' in window){const visibility=new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;sync();});visibility.observe(layer);window.addEventListener('pagehide',()=>visibility.disconnect(),{once:true});}
      motionSubscribers.add(sync);document.addEventListener('visibilitychange',sync);sync();
      window.addEventListener('pagehide',()=>{cancelAnimationFrame(effect.req);paused=true;});
      window.addEventListener('pageshow',sync);
    }catch(_){layer.dataset.geometryState='fallback';}
  }
  function heading(h,english){if(!h||h.previousElementSibling?.classList.contains('nv30-en'))return;const en=document.createElement('span');en.className='nv30-en';en.setAttribute('aria-hidden','true');en.textContent=english;h.before(en);}
  function alignDecorativeWords(root){
    const canvas=document.createElement('canvas');const context=canvas.getContext('2d');if(!context)return;
    const align=()=>root.querySelectorAll('section[data-nv30-word]').forEach(section=>{
      section.style.removeProperty('--nv30-word-size');
      let style=getComputedStyle(section,'::after');
      context.font=[style.fontStyle,style.fontWeight,style.fontSize,style.fontFamily].join(' ');
      const word=section.dataset.nv30Word,spacing=parseFloat(style.letterSpacing)||0;
      const natural=context.measureText(word).width+spacing*Math.max(0,word.length-1);
      const available=section.clientWidth-2;
      if(natural>available){section.style.setProperty('--nv30-word-size',(parseFloat(style.fontSize)*available/natural)+'px');style=getComputedStyle(section,'::after');}
      context.font=[style.fontStyle,style.fontWeight,style.fontSize,style.fontFamily].join(' ');
      const ink=context.measureText(section.dataset.nv30Word);
      const sample=document.createElement('span');sample.setAttribute('aria-hidden','true');sample.textContent=section.dataset.nv30Word;
      sample.style.cssText='all:initial!important;position:absolute!important;display:block!important;visibility:hidden!important;white-space:nowrap!important;left:0!important;top:0!important;pointer-events:none!important;';
      sample.style.setProperty('font',style.font,'important');sample.style.setProperty('letter-spacing',style.letterSpacing,'important');
      const baseline=document.createElement('i');baseline.style.cssText='all:initial!important;display:inline-block!important;width:0!important;height:0!important;vertical-align:baseline!important;';sample.append(baseline);section.append(sample);
      const bounds=sample.getBoundingClientRect();const baselineY=baseline.getBoundingClientRect().top-bounds.top;sample.remove();
      section.style.setProperty('--nv30-word-left',(ink.actualBoundingBoxLeft-1)+'px');
      section.style.setProperty('--nv30-word-bottom',(baselineY+ink.actualBoundingBoxDescent-bounds.height-1)+'px');
    });
    document.fonts.ready.then(align);document.fonts.addEventListener('loadingdone',align);
    let pending=0;window.addEventListener('resize',()=>{cancelAnimationFrame(pending);pending=requestAnimationFrame(align);});
  }
  function apply(root,isHome){
    root.classList.add('nv30-main');
    [...root.children].filter(n=>n.tagName==='SECTION').forEach((section,i)=>{if(section.classList.contains('nv-hero'))return;section.dataset.nv30Tone=i%2?'mist':'white';section.style.setProperty('background',i%2?'#f2f8ff':'#ffffff','important');});
    root.querySelectorAll('.nv-watermark').forEach(n=>n.hidden=true);
    root.querySelectorAll('.nv-heading').forEach(n=>n.classList.add('nv30-heading'));
    root.querySelectorAll('.nv-cta').forEach(n=>heading(n.querySelector('h2'),'CONTACT'));
    if(isHome){
      const hero=root.querySelector('.nv-hero');
      if(hero&&!hero.querySelector('.nv30-geometry-motion')){const geometry=document.createElement('div');geometry.className='nv30-geometry-motion';geometry.setAttribute('aria-hidden','true');hero.prepend(geometry);netGeometry(geometry);}
      if(hero&&!hero.querySelector('.nv30-hero-art')){
        hero.querySelector('h1').innerHTML='<span class="nv30-hero-line">マーケティングの</span><span class="nv30-hero-line">戦略づくりから</span><span class="nv30-hero-line">施策の実行まで</span>';
        const art=document.createElement('div');art.className='nv30-hero-art';art.setAttribute('aria-hidden','true');
        const video=document.createElement('video');if(!motionDisabled())video.src=base+'hero-video.mp4';video.muted=true;video.autoplay=!motionDisabled();video.loop=true;video.playsInline=true;video.preload='metadata';video.poster=base+'hero-mark.png';art.append(video);hero.append(art);
        let visible=true;const motion=()=>{if(motionDisabled()||document.hidden||!visible)video.pause();else{if(!video.getAttribute('src'))video.src=base+'hero-video.mp4';video.play().catch(()=>{});}};motion();motionSubscribers.add(motion);document.addEventListener('visibilitychange',motion);
        const control=document.createElement('button');control.type='button';control.className='nv30-motion-control';control.textContent='動きを止める';control.setAttribute('aria-pressed','false');hero.append(control);
        const updateControl=()=>{control.hidden=reduceMotion.matches;control.textContent=motionStopped?'動きを再生':'動きを止める';control.setAttribute('aria-pressed',String(motionStopped));hero.classList.toggle('nv30-motion-stopped',motionDisabled());};
        motionSubscribers.add(updateControl);updateControl();
        control.addEventListener('click',()=>{motionStopped=!motionStopped;notifyMotion();});
        if('IntersectionObserver' in window){const visibility=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;motion();});visibility.observe(hero);window.addEventListener('pagehide',()=>{visibility.disconnect();video.pause();},{once:true});}
      }
      const list=root.querySelector('.nv-challenges .nv-issue-list');
      if(list){list.classList.add('nv30-cards');[...list.children].forEach((li,i)=>{if(!li.querySelector('img'))li.querySelector('b').after(img('top-concern'+(i+1)+'-v2.png','nv30-issue-image'));});}
      const overview=root.querySelector('.nv-overview .nv-split');
      if(overview&&!overview.querySelector('.nv30-overview-copy')){const col=document.createElement('div');col.className='nv30-overview-copy';const h=overview.querySelector('h2'),copy=overview.querySelector('.nv-copy');col.append(h,copy);overview.append(col,img('top-research.jpg','nv30-overview-photo'));}
      const process=root.querySelector('.nv-process');
      if(process){heading(process.querySelector('h2'),'PROCESS');process.dataset.nv30Word='PROCESS';const steps=process.querySelector('.nv-steps');if(steps&&!steps.closest('.nv30-process-grid')){const row=document.createElement('div');row.className='nv30-process-grid';steps.before(row);row.append(img('top-process.jpg'),steps);}}
      const map=[['.nv-services','SERVICES'],['.nv-business','SUPPORT'],['.nv-industries','INDUSTRIES'],['.nv-company','COMPANY']];
      map.forEach(([sel,en])=>{const s=root.querySelector(sel);if(s){heading(s.querySelector('h2'),en);if(en==='SERVICES'||en==='INDUSTRIES')s.dataset.nv30Word=en;}});
      root.querySelectorAll('.nv-services .nv-photo-link').forEach((a,i)=>{const file=['top-ads.jpg','top-seo.jpg','top-sns.jpg','top-web.jpg'][i];if(file){const old=a.querySelector('img');if(old){old.removeAttribute('srcset');old.removeAttribute('sizes');old.src=base+file;}else a.prepend(img(file));}const arrow=a.querySelector('.nv-arrow');if(arrow)a.append(arrow);});
      const company=root.querySelector('.nv-company-copy');if(company&&!company.querySelector('p')){const p=document.createElement('p');p.textContent='マーケティング戦略の立案から施策の実行、分析、改善までを支援しています。';company.querySelector('h2').after(p);}
      if(company&&!company.querySelector('.nv30-company-heading')){const title=document.createElement('div'),detail=document.createElement('div');title.className='nv30-company-heading';detail.className='nv30-company-detail';title.append(company.querySelector('.nv30-en'),company.querySelector('h2'));detail.append(company.querySelector('p'),company.querySelector('a'));company.append(title,detail);const mark=document.createElement('span');mark.className='nv30-company-mark';mark.setAttribute('aria-hidden','true');company.parentElement.prepend(mark);}
    }else{
      const utility=root.classList.contains('nv23-utility');
      root.querySelectorAll('.r24-service-card').forEach((card,i)=>{card.classList.add('nv30-service-card');if(!card.querySelector('img'))card.prepend(img(['advertising-v1.png','analytics-v1.png','social-v1.png','website-v1.png','process.png'][i%5]));});
      const mast=root.querySelector('.nv-cmo-title');
      const titles={'cmo':'CMO','marketing-support':'MARKETING','ads':'ADVERTISING','seo':'SEO / AI SEARCH','sns':'SOCIAL MEDIA','web':'WEB DESIGN','dx':'DX / AX','crm':'CRM','global':'GLOBAL','saas':'IT / SaaS','manufacturing':'MANUFACTURING','ec':'EC / D2C','construction':'CONSTRUCTION','realestate':'REAL ESTATE','hr-recruiting':'HUMAN RESOURCES','finance':'FINANCE','medical':'HEALTHCARE','professional':'PROFESSIONAL','company':'COMPANY','service':'SERVICES','industry':'INDUSTRIES','contact':'CONTACT','column':'INSIGHTS'};
      const pageKey=location.pathname.split('/').filter(Boolean).pop();
      const title=titles[pageKey];
      if(mast&&title&&!mast.querySelector('.nv-en')){const en=document.createElement('p');en.className='nv-en';en.textContent=title;en.setAttribute('aria-hidden','true');mast.append(en);}
      const mastEnglish=mast?.querySelector('.nv-en');if(mastEnglish&&mastEnglish.textContent.length>12)mastEnglish.classList.add('nv30-long-title');
      root.querySelectorAll('.nv-cmo-title,.nv-lower-title').forEach(title=>{const en=title.querySelector('.nv-en'),jp=title.querySelector('h1');if(en&&jp)jp.before(en);});
      if(mast&&!utility&&!root.querySelector('.nv30-mast-photo')){
        const key=location.pathname.split('/').pop();
        const photo=img(serviceArt[key]?'service-'+key+'-v2.jpg':'industry-'+key+'-v2.jpg','nv30-mast-photo');
        mast.parentElement.append(photo);
      }
      root.querySelectorAll('section').forEach(s=>{
        const h=s.querySelector('h2');if(!h||s.classList.contains('nv-cta'))return;const text=h.textContent;
        if(s.querySelector('.nv-prose'))return;
        let en=s.matches('.nv-related')?'RELATED':s.querySelector('.nv-faq-item')?'FAQ':s.matches('.nv-process')?'PROCESS':s.matches('.nv-execution')?'EXECUTION':s.querySelector('.nv-scope-grid,.nv-cmo-scope-copy')?'SUPPORT':s.querySelector('.nv-research,.r24-copy-section')?'RESEARCH':null;
        if(!en&&/課題を整理|現状.*確認|情報を確認/.test(text))en='RESEARCH';
        if(!utility&&!en&&s.classList.contains('nv-section'))en=/進め方|実行/.test(text)?'PROCESS':'SUPPORT';
        if(utility){en=location.pathname==='/service'?'SERVICES':location.pathname==='/company'?(/会社概要/.test(text)?'PROFILE':'POLICY'):location.pathname==='/industry'?'INDUSTRIES':null;}
        if(en){const old=s.querySelector('.nv-en');if(old){old.textContent=en;old.classList.add('nv30-en');h.before(old);}else heading(h,en);s.dataset.nv30Word=en;s.classList.add('nv30-'+en.toLowerCase());}
        const split=s.querySelector('.nv-wrap.nv-split');
        if(split&&h.parentElement===split){const group=document.createElement('div');group.className='nv30-heading';const enNode=h.previousElementSibling?.classList.contains('nv30-en')?h.previousElementSibling:null;split.prepend(group);if(enNode)group.append(enNode);group.append(h);}
        if(en==='SUPPORT')s.querySelectorAll('.nv-wrap>.nv-copy').forEach(n=>n.classList.add('nv30-support-copy'));
      });
      root.querySelectorAll('.nv-cmo-challenges .nv-issue-list').forEach(list=>{list.classList.add('nv30-cards');[...list.children].forEach((li,i)=>{if(!li.querySelector('img'))li.querySelector('b')?.after(img('top-concern'+(i%3+1)+'-v2.png','nv30-issue-image'));});});
      const catalog=root.querySelector('.nv-catalog');const catalogEnglish=catalog?.querySelector('.nv30-en');if(catalogEnglish)catalog.prepend(catalogEnglish);
      if(!utility){
        const research=root.querySelector('.nv30-research .nv-wrap');if(research){research.classList.add('nv30-research-grid');const file=pageKey==='seo'?'analytics-v1.jpg':'top-research.jpg';const old=research.querySelector('img');if(old){old.removeAttribute('srcset');old.removeAttribute('sizes');old.src=base+file;old.className='nv30-research-photo';}else research.append(img(file,'nv30-research-photo'));}
        const execution=root.querySelector('.nv-execution .nv-split');if(execution){const old=execution.querySelector('img');if(old){old.removeAttribute('srcset');old.removeAttribute('sizes');old.src=base+'website-v1.jpg';old.className='nv30-execution-photo';}else execution.append(img('website-v1.png','nv30-execution-photo'));}
        const related=root.querySelector('.nv-related-panel');if(related&&!related.querySelector('img')){related.classList.add('nv30-related-visual');related.prepend(img('analytics-v1.png','nv30-related-photo'));}
      }
    }
    if(!isHome)distinctPageArt(root);
    if(location.pathname==='/service'){
      const feature=root.querySelector('.r24-copy-section:has(>.nv-copy:only-child)');
      if(feature){feature.classList.add('nv30-service-feature');const copy=feature.querySelector('.nv-copy'),header=document.createElement('div');header.className='nv30-heading nv30-service-feature-heading';const en=copy.querySelector('.nv30-en'),h=copy.querySelector('h2');if(en)header.append(en);if(h)header.append(h);feature.before(header);feature.prepend(img('advertising-v1.jpg','nv30-service-feature-photo'));}
    }
    // Assign tones after section roles exist, retaining clear section boundaries.
    let previous='';
    [...root.children].filter(n=>n.tagName==='SECTION').forEach((section,i)=>{
      let tone=section.matches('.nv30-support,.nv-business,.nv-cta')?'brand':i%2?'mist':'white';
      if(section.classList.contains('nv-hero'))tone='white';
      if(tone===previous)tone=tone==='white'?'mist':'white';
      section.dataset.nv30Tone=tone;
      if(!section.classList.contains('nv-hero'))section.style.setProperty('background',{white:'#ffffff',mist:'#f2f8ff',brand:'#024991'}[tone],'important');
      previous=tone;
    });
  }
  function init(){document.body.classList.add('nv30');const main=document.querySelector('main.nv23');if(main)apply(main,main.classList.contains('nv23-home'));
    if(main)alignDecorativeWords(main);
    if(location.pathname==='/contact')document.querySelector('main')?.classList.add('nv30-contact');
    document.querySelectorAll('.nv-mobile-nav').forEach(d=>{d.addEventListener('keydown',e=>{if(e.key==='Escape'){d.open=false;d.querySelector('summary')?.focus();}});});
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    if(main&&'IntersectionObserver' in window&&!reduced.matches){
      const targets=[...main.querySelectorAll('.nv30-heading,.nv30-overview-copy,.nv30-overview-photo,.nv30-process-grid>img,.nv30-research-photo,.nv30-execution-photo,.nv30-cards>li,.nv-photo-link,.nv30-service-card,.nv-directory>a,.nv-industry-grid>a,.nv-scope-card,.nv-faq-item,.nv-related-panel')];
      const reveal=n=>n.classList.add('nv30-visible');
      const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){reveal(e.target);observer.unobserve(e.target);}}),{threshold:0.06,rootMargin:'0px 0px -20px 0px'});
      document.body.classList.add('nv30-motion-ready');
      targets.forEach(n=>{n.classList.add('nv30-reveal');const i=[...n.parentElement.children].indexOf(n);n.style.setProperty('--nv30-delay',Math.min(i%3,2)*70+'ms');if(n.getBoundingClientRect().top<innerHeight)reveal(n);else observer.observe(n);});
      const stop=()=>{if(reduced.matches){observer.disconnect();targets.forEach(reveal);document.body.classList.remove('nv30-motion-ready');}};
      reduced.addEventListener('change',stop);
      motionSubscribers.add(()=>{if(motionStopped){observer.disconnect();targets.forEach(reveal);document.body.classList.remove('nv30-motion-ready');}});
      document.addEventListener('focusin',e=>{const n=e.target.closest('.nv30-reveal');if(n)reveal(n);});
      window.addEventListener('beforeprint',()=>targets.forEach(reveal));
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
