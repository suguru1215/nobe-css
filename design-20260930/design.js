window.NoveMotionTokens=Object.freeze({
  duration:Object.freeze({micro:180,copy:380,choice:600,heading:620,media:760,element:480,scene:800}),
  ease:Object.freeze({enter:'cubic-bezier(.22,1,.36,1)',state:'cubic-bezier(.2,0,.2,1)',exit:'cubic-bezier(.4,0,1,1)'}),
  ambient:Object.freeze({period:18000,stepMs:1000/30,distance:12}),
  sequence:Object.freeze({title:0,line:45,chapter:0,media:40,cta:80}),
  stagger:90,distance:20
});
(function(){
  'use strict';
  let pagePath=location.pathname;
  function resolvePagePath(){if(!location.hostname.endsWith('.canvas.webflow.com'))return location.pathname;const ids={"6a7457c9cb165a65da84d65d":"/","6a7ec9847fd26295d1895430":"/service","6a7eccdca16dd0fbd7a5cf25":"/industry","6a7bda6866c2836329b779e3":"/service/cmo","6aa2a8b1f2145364c37fc566":"/service/marketing-support","6a7dda84aaf4495eb6d35f59":"/service/ads","6a7dc128859cb15f3a8e74c6":"/service/seo","6aa2aad30774b33dbe0efe73":"/service/sns","6a7dd6d1eb088ed19d7b179a":"/service/web","6aa2ab45a30f142219ce3262":"/service/global","6a7f55938c00c761cbac2fa2":"/service/dx","6a7f4f786fc87c8384f9e8d2":"/service/crm","6a873d1afa7c3ee3a663af5c":"/company","6a7ecf997369e3f19408d6de":"/contact","6a8b2db45bd9598dd0c7f6b2":"/privacy","6a8b33b82a5b93fc571741df":"/column","6a75cc0f966fdcd06a8e2886":"/columns/marketing-review","6a8b2fa74d5c11cb3a12ba91":"/sitemap"};const titles={"マーケティングの戦略づくりから施策の実行まで":"/","サービス":"/service","業界別のマーケティング支援":"/industry","CMO代行":"/service/cmo","マーケティングの改善を、分析から実行まで。":"/service/marketing-support","Web広告運用":"/service/ads","SEO・AI検索対策":"/service/seo","SNS運用の分析・改善支援":"/service/sns","Webサイト改善":"/service/web","海外進出・日本進出支援":"/service/global","DX・AX支援":"/service/dx","CRM支援":"/service/crm","IT・SaaSのマーケティング支援":"/industry/saas","製造業のマーケティング支援":"/industry/manufacturing","EC・D2Cのマーケティング支援":"/industry/ec","建設・住宅・リフォームのマーケティング支援":"/industry/construction","不動産・住宅仲介・管理のマーケティング支援":"/industry/realestate","人材業界のマーケティング支援":"/industry/hr-recruiting","金融業界のマーケティング支援":"/industry/finance","医療・クリニックのマーケティング支援":"/industry/medical","士業のマーケティング支援":"/industry/professional","会社情報":"/company","ご相談・お問い合わせ":"/contact","プライバシーポリシー":"/privacy","マーケティングの考え方":"/column","発信者：株式会社ノーブ公開日：09/14/2026":"/columns/marketing-review","サイトマップ":"/sitemap"};return ids[document.documentElement.dataset.wfPage]||titles[(document.querySelector('main h1')?.textContent||'').replace(/\s/g,'')]||location.pathname;}
  const script=document.currentScript;
  const base=script ? new URL('./assets/',script.src).href : './assets/';
  const legacyBase=script?new URL('../img/',script.src).href:'../img/';
  const serviceArt={cmo:['cmowd',0,'jpg'],ads:['adwd',0,'jpg'],seo:['seowd',0,'jpg'],web:['webwd',0,'png'],dx:['dxwd',0,'jpg'],crm:['crmwd',0,'jpg'],sns:['datawd',0,'jpg'],global:['growthwd',0,'jpg'],'marketing-support':['growthwd',6,'jpg']};
  const industryConcernArt=[...Array.from({length:6},(_,i)=>'adwd-'+(i+7)+'.jpg'),...Array.from({length:6},(_,i)=>'crmwd-'+(i+7)+'.jpg'),...Array.from({length:6},(_,i)=>'datawd-'+(i+7)+'.jpg'),...Array.from({length:6},(_,i)=>'webwd-'+(i+7)+'.png'),'cmowd-7.jpg','cmowd-8.jpg','seowd-7.jpg'];
  function distinctPageArt(root){const key=pagePath.split('/').filter(Boolean).pop(),set=serviceArt[key];if(set){let i=0;root.querySelectorAll('.nv30-issue-image,.nv30-research-photo,.nv30-execution-photo,.nv30-related-photo').forEach(n=>{i++;n.src=legacyBase+set[0]+'-'+(set[1]+i)+'.'+set[2];n.removeAttribute('srcset');n.style.setProperty('object-fit','contain','important');});}else{const keys=['saas','manufacturing','ec','construction','realestate','hr-recruiting','finance','medical','professional'],i=keys.indexOf(key);if(i>=0){root.querySelectorAll('.nv30-issue-image').forEach((n,j)=>{n.src=legacyBase+industryConcernArt[i*3+j];n.style.setProperty('object-fit','contain','important');});const research=root.querySelector('.nv30-research-photo'),related=root.querySelector('.nv30-related-photo');if(research)research.src=legacyBase+(i<8?'indsvc-'+(i+1)+'.jpg':'inddoc-9.jpg');if(related)related.src=legacyBase+(i<8?'inddoc-'+(i+1)+'.jpg':'indov-3.jpg');}}root.querySelectorAll('.nv30-service-card>img').forEach((n,i)=>{n.src=legacyBase+(i<8?'svcidx-'+(i+1)+'.jpg':'svc-8.jpg');n.removeAttribute('srcset');n.style.setProperty('object-fit','contain','important');});}
  function photoFile(file){return /^(advertising-v1|analytics-v1|social-v1|website-v1|process)\.png$/.test(file)?file.replace('.png','.jpg'):file;}
  function img(file,cls){const n=document.createElement('img');n.src=base+photoFile(file);n.alt='';n.className=cls||'';n.loading='lazy';n.decoding='async';return n;}
  const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)');
  let motionStopped=false,motionReady=false;window.NoveMotionReady=false;
  try{motionStopped=localStorage.getItem('nove:motion-paused')==='true';}catch{}
  window.NoveMotionPaused=motionStopped;
  const motionSubscribers=new Set();
  const motionDisabled=()=>reduceMotion.matches||motionStopped||!motionReady;
  const notifyMotion=()=>motionSubscribers.forEach(fn=>fn());
  reduceMotion.addEventListener('change',notifyMotion);
  const motionStart=()=>{
    if(motionReady)return;
    let timeout;
    const fonts=document.fonts?.ready||Promise.resolve();
    const deadline=new Promise(resolve=>{timeout=setTimeout(()=>resolve('font-deadline'),1200);});
    Promise.race([fonts.then(()=>'fonts-ready'),deadline]).then(source=>{
      clearTimeout(timeout);
      requestAnimationFrame(()=>requestAnimationFrame(()=>{
        if(motionReady)return;
        motionReady=true;window.NoveMotionReady=true;
        document.body.dataset.nvMotionReadySource=source;
        document.body.dataset.nvMotionReadyTime=String(performance.now());
        performance.mark('nove-motion-ready');notifyMotion();window.dispatchEvent(new Event('nove:motion-ready'));
      }));
    });
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',motionStart,{once:true});else motionStart();
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
  // Autonomous hero-only network. A periodic field avoids wrap/reset seams.
  function continuousHeroGeometry(hero){
    if(hero.querySelector('.nv34-geometry'))return;
    const layer=document.createElement('div');layer.className='nv34-geometry';layer.setAttribute('aria-hidden','true');
    const canvas=document.createElement('canvas');canvas.setAttribute('role','presentation');layer.append(canvas);
    const ctx=canvas.getContext('2d');if(!ctx)return;
    hero.prepend(layer);hero.classList.add('nv34-geometry-ready');
    let width=0,height=0,points=[],edges=[],phase=0,last=0,request=0,inView=true,pageActive=true,lastDiagnostic=0;
    const period=window.NoveMotionTokens.ambient.period,frameInterval=window.NoveMotionTokens.ambient.stepMs-.5;
    const random=(n)=>{const x=Math.sin(n*127.1+311.7)*43758.5453;return x-Math.floor(x);};
    const draw=()=>{
      const t=phase/period*Math.PI*2;
      const positions=points.map((p,i)=>({x:p.x+Math.sin(t+p.phase)*p.dx,y:p.y+Math.cos(t+p.phase)*p.dy}));
      ctx.clearRect(0,0,width,height);ctx.lineWidth=.8;ctx.strokeStyle='rgba(90,132,166,.28)';ctx.beginPath();
      edges.forEach(([a,b])=>{ctx.moveTo(positions[a].x,positions[a].y);ctx.lineTo(positions[b].x,positions[b].y);});ctx.stroke();
      ctx.fillStyle='rgba(72,118,155,.44)';positions.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,1.8,0,Math.PI*2);ctx.fill();});
      // DOM state supports accessibility/debugging without retaining frame logs.
      if(Math.abs(phase-lastDiagnostic)>250||!request){layer.dataset.geometryPhase=phase.toFixed(1);lastDiagnostic=phase;}
    };
    const resize=()=>{
      const rect=hero.getBoundingClientRect();width=rect.width;height=rect.height;
      const dpr=Math.min(window.devicePixelRatio||1,1.5);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
      const cols=width<768?5:10,rows=5;points=[];edges=[];
      for(let y=0;y<=rows;y++)for(let x=0;x<=cols;x++){
        const i=y*(cols+1)+x;
        points.push({x:(x+(random(i+1)-.5)*.65)*width/cols,y:(y+(random(i+83)-.5)*.65)*height/rows,phase:random(i+167)*Math.PI*2,dx:width/cols*.26,dy:height/rows*.23});
        if(x)edges.push([i,i-1]);if(y)edges.push([i,i-cols-1]);if(x&&y&&random(i+223)>.18)edges.push([i,i-cols-2]);
      }
      draw();
    };
    const tick=(time)=>{
      request=requestAnimationFrame(tick);
      if(!last){last=time;return;}
      const delta=time-last;if(delta<frameInterval)return;
      phase=(phase+Math.min(delta,100))%period;last=time;draw();
    };
    const sync=()=>{
      const stopped=motionDisabled()||document.hidden||!inView||!pageActive;
      if(stopped){cancelAnimationFrame(request);request=0;last=0;layer.dataset.geometryPhase=phase.toFixed(1);layer.dataset.geometryLastPause=reduceMotion.matches?'reduced':motionStopped?'user':!motionReady?'loading':document.hidden?'hidden':!pageActive?'page':'outside';layer.dataset.geometryLastPausePhase=phase.toFixed(1);}
      else if(!request){last=0;request=requestAnimationFrame(tick);}
      layer.dataset.geometryState=reduceMotion.matches?'reduced':stopped?'paused':'running';
    };
    resize();motionSubscribers.add(sync);document.addEventListener('visibilitychange',sync);
    const ro='ResizeObserver' in window?new ResizeObserver(resize):null;
    const io='IntersectionObserver' in window?new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;sync();}):null;
    const observe=()=>{ro?.observe(hero);io?.observe(hero);if(!ro)window.addEventListener('resize',resize);};observe();
    window.addEventListener('pagehide',()=>{pageActive=false;ro?.disconnect();io?.disconnect();window.removeEventListener('resize',resize);sync();});window.addEventListener('pageshow',()=>{pageActive=true;observe();sync();});sync();
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
  // Motion preference belongs to the site footer, leaving the main visual unobstructed.
  function setupMotionSettings(){
    const footer=document.querySelector('footer .nv-wrap');if(!footer||footer.querySelector('.nv-motion-settings'))return;
    const settings=document.createElement('details');settings.className='nv-motion-settings';
    const summary=document.createElement('summary');summary.textContent='アニメーション設定';
    const label=document.createElement('label');label.className='nv-motion-setting-label';
    const toggle=document.createElement('input');toggle.type='checkbox';toggle.className='nv-motion-toggle';
    const text=document.createElement('span');text.textContent='動画と装飾の動きを停止';
    const note=document.createElement('p');note.className='nv-motion-setting-note';note.id='nv-motion-setting-note';toggle.setAttribute('aria-describedby',note.id);
    label.append(toggle,text);settings.append(summary,label,note);footer.append(settings);
    const update=()=>{document.body.dataset.nvMotionPaused=String(motionStopped);toggle.checked=reduceMotion.matches||motionStopped;toggle.disabled=reduceMotion.matches;note.textContent=reduceMotion.matches?'端末の設定に合わせて動きを抑えています':'この設定は次のページでも引き継がれます';};
    toggle.addEventListener('change',()=>{motionStopped=toggle.checked;window.NoveMotionPaused=motionStopped;try{localStorage.setItem('nove:motion-paused',String(motionStopped));}catch{}notifyMotion();window.dispatchEvent(new Event('nove:motion-setting'));});
    motionSubscribers.add(update);update();
  }

  function apply(root,isHome){
    root.classList.add('nv30-main');
    [...root.children].filter(n=>n.tagName==='SECTION').forEach((section,i)=>{if(section.classList.contains('nv-hero'))return;section.dataset.nv30Tone=i%2?'mist':'white';section.style.setProperty('background',i%2?'#f2f8ff':'#ffffff','important');});
    root.querySelectorAll('.nv-watermark').forEach(n=>n.hidden=true);
    root.querySelectorAll('.nv-heading').forEach(n=>n.classList.add('nv30-heading'));
    root.querySelectorAll('.nv-cta').forEach(n=>heading(n.querySelector('h2'),'CONTACT'));
    if(isHome){
      const hero=root.querySelector('.nv-hero');

      if(hero&&!hero.querySelector('.nv30-hero-art')){
        hero.querySelector('h1').innerHTML='<span class="nv30-hero-line">マーケティングの</span><span class="nv30-hero-line">戦略づくりから</span><span class="nv30-hero-line">施策の実行まで</span>';
        const art=document.createElement('div');art.className='nv30-hero-art';art.setAttribute('aria-hidden','true');
        const video=document.createElement('video');if(!reduceMotion.matches)video.src=base+'hero-marketing-analytics.mp4';video.muted=true;video.autoplay=!motionDisabled();video.loop=true;video.playsInline=true;video.preload=reduceMotion.matches?'none':'auto';video.poster=base+'hero-marketing-analytics-poster.webp';const still=document.createElement('img');still.className='nv40-video-still';still.src=video.poster;still.alt='';still.width=850;still.height=709;art.append(still,video);hero.insertBefore(art,hero.querySelector('h1'));
        let visible=true,pageActive=true;const motion=()=>{if(motionDisabled()||document.hidden||!visible||!pageActive)video.pause();else{if(!video.getAttribute('src'))video.src=base+'hero-marketing-analytics.mp4';video.play().catch(()=>{});}};motion();motionSubscribers.add(motion);document.addEventListener('visibilitychange',motion);
        if('IntersectionObserver' in window){const visibility=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;motion();});visibility.observe(art);window.addEventListener('pagehide',()=>{pageActive=false;visible=false;visibility.disconnect();video.pause();});window.addEventListener('pageshow',()=>{pageActive=true;visibility.observe(art);motion();});}
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
      const pageKey=pagePath.split('/').filter(Boolean).pop();
      const title=titles[pageKey];
      if(mast&&title&&!mast.querySelector('.nv-en')){const en=document.createElement('p');en.className='nv-en';en.textContent=title;en.setAttribute('aria-hidden','true');mast.append(en);}
      const mastEnglish=mast?.querySelector('.nv-en');if(mastEnglish&&mastEnglish.textContent.length>12)mastEnglish.classList.add('nv30-long-title');
      root.querySelectorAll('.nv-cmo-title,.nv-lower-title').forEach(title=>{const en=title.querySelector('.nv-en'),jp=title.querySelector('h1');if(en&&jp)jp.before(en);});
      if(mast&&!utility&&!/^\/(service|industry)\//.test(pagePath)&&!root.querySelector('.nv30-mast-photo')){
        const key=pagePath.split('/').pop();
        const photo=img(serviceArt[key]?'service-'+key+'-v2.jpg':'industry-'+key+'-v2.jpg','nv30-mast-photo');
        mast.parentElement.append(photo);
      }
      root.querySelectorAll('section').forEach(s=>{
        const h=s.querySelector('h2');if(!h||s.classList.contains('nv-cta'))return;const text=h.textContent;
        if(s.querySelector('.nv-prose'))return;
        let en=s.matches('.nv-related')?'RELATED':s.querySelector('.nv-faq-item')?'FAQ':s.matches('.nv-process')?'PROCESS':s.matches('.nv-execution')?'EXECUTION':s.querySelector('.nv-scope-grid,.nv-cmo-scope-copy')?'SUPPORT':s.querySelector('.nv-research,.r24-copy-section')?'RESEARCH':null;
        if(!en&&/課題を整理|現状.*確認|情報を確認/.test(text))en='RESEARCH';
        if(!utility&&!en&&s.classList.contains('nv-section'))en=/進め方|実行/.test(text)?'PROCESS':'SUPPORT';
        if(utility){en=pagePath==='/service'?'SERVICES':pagePath==='/company'?(/会社概要/.test(text)?'PROFILE':'POLICY'):pagePath==='/industry'?'INDUSTRIES':null;}
        if(en){const old=s.querySelector('.nv-en,[data-nv-boot-heading]');if(old){old.textContent=en;old.classList.add('nv30-en');h.before(old);}else heading(h,en);s.dataset.nv30Word=en;s.classList.add('nv30-'+en.toLowerCase());}
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
    if(pagePath==='/service'){
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

  // Current Figma 3358:28, acquired 2026-10-01. Preserve existing copy and links.
  function composeFigma(root){
    root.dataset.nv33Page=pagePath;const isCmo=pagePath==='/service/cmo';
    const asset=(file,cls,w,h)=>{const n=img('figma-3358-28/'+file,cls);if(w)n.width=w;if(h)n.height=h;return n;};
    const replace=(selector,file,w,h,fit)=>{const n=root.querySelector(selector);if(!n)return;n.src=base+'figma-3358-28/'+file;n.removeAttribute('srcset');n.removeAttribute('sizes');if(w)n.width=w;if(h)n.height=h;n.style.removeProperty('object-fit');n.dataset.nv33Fit=fit||'cover';};
    document.querySelectorAll('.nv23-header img.nv-logo,.nv23-header .nv-logo img').forEach(n=>{n.src=base+'figma-3358-28/01779.png';n.removeAttribute('srcset');n.width=181;n.height=32;});
    document.querySelectorAll('.nv-footer-logo').forEach(n=>{n.src=base+'figma-3358-28/62ef5.svg';n.width=225.469;n.height=40.0004;});
    root.querySelectorAll('.nv30-mast-photo').forEach(n=>{n.loading='eager';n.fetchPriority='high';n.width=1344;n.height=440;});
    const intro=root.querySelector('.nv-cmo-intro .nv-split');
    if(intro){const h=intro.querySelector('h2'),copy=intro.querySelector(':scope > .nv-copy'),button=copy?.querySelector('.nv-button');if(h){const left=document.createElement('div');left.className='nv33-intro-message';const old=h.parentElement;if(old===intro)h.before(left);else old.before(left);left.append(h);if(old!==intro&&!old.children.length)old.remove();if(button)left.append(button);}}
    [...root.children].filter(s=>s.tagName==='SECTION').forEach(s=>{
      const tone=s.matches('.nv-cmo-mast,.nv-lower-mast,.nv-cmo-challenges,.nv30-faq')?'mist':s.matches('.nv30-support,.nv-business,.nv-cta')?'brand':s.matches('.nv-process,.nv-industries')?'mist':'white';
      s.dataset.nv30Tone=tone;s.style.setProperty('background',{white:'#fff',mist:'#f2f8ff',brand:'#024991'}[tone],'important');
    });
    // Semantic headings stay in place. Large English labels and pale words follow the target.
    root.querySelectorAll('.nv30-research-grid,.nv-execution .nv-split').forEach(row=>{const copy=row.querySelector('.nv-copy');if(copy)row.prepend(copy);});
    root.querySelectorAll('.nv-cta').forEach(cta=>{
      cta.dataset.nv30Word='CONTACT';cta.style.removeProperty('background');const arrow=cta.querySelector('.nv-button .nv-arrow');if(arrow){arrow.textContent='';arrow.append(asset('f94a8.svg','nv33-contact-arrow',72,72));}
    });
    if(!isCmo)return;
    root.classList.add('nv33-cmo');
    const en=root.querySelector('.nv-cmo-title .nv-en');if(en)en.textContent='CMO Services';
    replace('.nv30-mast-photo','61a27.png',1344,440);
    ['b8170.png','e8eb5.png','55dfb.png'].forEach((file,i)=>replace('.nv30-cards>li:nth-child('+(i+1)+') .nv30-issue-image',file,300,252,'contain'));
    replace('.nv30-research-photo','3404e.png',564,540);
    replace('.nv30-execution-photo','62e36.png',588,540,'contain');
    replace('.nv30-related-photo','ac444.png',430,312);
    // Four exact existing sentences, retaining all original wording, arranged as the target matrix.
    const scope=root.querySelector('.nv-cmo-scope-copy');
    if(scope){const paragraphs=[...scope.querySelectorAll('p')];const sentences=paragraphs.flatMap(p=>p.textContent.match(/[^。]+。?/g)||[]);if(sentences.length===4){const titles=['優先して改善する施策','方針の検討、施策の計画、実行・改善','ご発注前に対応範囲を確認','既存パートナーとの分担'];scope.replaceChildren();scope.className='nv33-support-grid';sentences.forEach((text,i)=>{const card=document.createElement('div');card.className='nv33-support-card';const num=document.createElement('span');num.className='nv33-medallion';num.append(asset('6adbe.svg','nv33-number-art',48,48));const label=document.createElement('span');label.textContent=String(i+1).padStart(2,'0');num.append(label);const h=document.createElement('h3');h.textContent=titles[i];h.dataset.nv33Added='true';const p=document.createElement('p');p.textContent=text;card.append(num,h,p);scope.append(card);});}}
    const band=root.querySelector('.nv-channel-band');if(band)[...band.children].forEach((n,i)=>{const file=['ed934.svg','8a4dc.svg','8a6d6.svg','808d6.svg'][i];if(file)n.prepend(asset(file,'nv33-channel-icon',64,64));});
    const related=root.querySelector('.nv-related-panel');if(related){const pic=related.querySelector('img');const copy=document.createElement('div');copy.className='nv33-related-copy';[...related.children].filter(n=>n!==pic).forEach(n=>copy.append(n));related.append(copy);}
  }

  // Top-only alignment: Figma 3358:26. Do not apply the CMO layout to this page.
  function composeTopFigma(root){
    if(!root.classList.contains('nv23-home'))return;
    document.body.classList.add('nv34-home');
    const hero=root.querySelector('.nv-hero');if(hero)continuousHeroGeometry(hero);
    const topBase=base+'figma-3358-26/';
    const deliveryFile=file=>/^(19a08|8378d|844f8|0667e|20c23|3d81b|7f9fd|d817c|cf26b)\.png$/.test(file)?file.replace('.png','.webp'):file;
    const asset=(file,cls,w,h)=>{const n=img('figma-3358-26/'+deliveryFile(file),cls);if(w)n.width=w;if(h)n.height=h;return n;};
    const swap=(sel,file,w,h)=>root.querySelectorAll(sel).forEach(n=>{n.src=topBase+deliveryFile(file);n.removeAttribute('srcset');n.removeAttribute('sizes');if(w)n.width=w;if(h)n.height=h;});
    document.querySelectorAll('.nv23-header img.nv-logo').forEach(n=>{n.src=topBase+'01779.png';n.loading='eager';});
    document.querySelectorAll('.nv-footer-logo').forEach(n=>{n.src=topBase+'62ef5.svg';});
    const headerArrow=document.querySelector('.nv-desktop-nav .nv-arrow');
    if(headerArrow){headerArrow.replaceChildren(asset('574c7.svg','nv34-header-arrow',18,18));}
    const art=root.querySelector('.nv30-hero-art');
    if(art){art.append(asset('55444.svg','nv34-logo-overlay',850,709.294));}
    ['19a08.png','8378d.png','844f8.png'].forEach((f,i)=>swap('.nv30-cards>li:nth-child('+(i+1)+') img',f,300,252));
    swap('.nv30-overview-photo','0667e.png',520,416);
    swap('.nv30-process-grid>img','20c23.png',430,440);
    ['3d81b.png','7f9fd.png','d817c.png','cf26b.png'].forEach((f,i)=>swap('.nv-photo-link:nth-child('+(i+1)+')>img',f,540,300));
    root.querySelectorAll('.nv-step>b').forEach(n=>{n.prepend(asset('6adbe.svg','nv34-step-medallion',48,48));});
    root.querySelectorAll('.nv-industry-grid .nv-arrow').forEach(n=>{n.replaceChildren(asset('059cf.svg','nv34-industry-arrow',36,36));});
    swap('.nv33-contact-arrow','f94a8.svg',72,72);
    const breaks=[['.nv-challenges h2','現在のマーケティングで、<br>見直したいことはありませんか。'],['.nv-overview h2','市場・競合と<br>現在の施策を調べ、<br>改善の優先順位を決める。']];
    breaks.forEach(([sel,html])=>{const h=root.querySelector(sel);if(!h)return;const expected=html.replace(/<br>/g,'');const sync=()=>{if(h.textContent===expected&&h.innerHTML!==html)h.innerHTML=html;};sync();const watcher=new MutationObserver(sync);watcher.observe(h,{childList:true,subtree:true});window.addEventListener('pagehide',()=>watcher.disconnect(),{once:true});});
    root.querySelector('.nv-challenge-wrap')?.style.setProperty('background','#f2f8ff','important');
    const industry=root.querySelector('.nv-industries');if(industry)industry.dataset.nv30Word='INDUSTRY';
    // Existing descriptions and link text remain present, even where the reference uses shorter copy.
  }

  function syncFigmaFooter(){
    const footer=document.querySelector('.nv-footer-grid');
    if(footer&&footer.querySelectorAll(':scope>.r24-footer-group').length===5){
      const groups=[...footer.children],services=document.createElement('div');services.className='nv33-footer-services';
      const title=document.createElement('h2');title.textContent='サービス';services.append(title);
      const links=document.createElement('div');links.className='nv-footer-links';
      groups.slice(0,3).forEach(g=>{g.querySelectorAll('a').forEach(a=>links.append(a));g.remove();});services.append(links);footer.prepend(services);
    }
  }
  function init(){pagePath=resolvePagePath();document.body.classList.add('nv30');setupMotionSettings();const main=document.querySelector('main.nv23');if(main)apply(main,main.classList.contains('nv23-home'));
    if(main){composeFigma(main);composeTopFigma(main);}
    syncFigmaFooter();const footer=document.querySelector('.nv23-footer');if(footer){const watchFooter=new MutationObserver(syncFigmaFooter);watchFooter.observe(footer,{childList:true,subtree:true});window.addEventListener('pagehide',()=>watchFooter.disconnect(),{once:true});}
    if(pagePath==='/contact')document.querySelector('main')?.classList.add('nv30-contact');
    if(!main){const nativeMain=document.querySelector('main');if(nativeMain){nativeMain.dataset.nv33Page=pagePath;const h=nativeMain.querySelector('h1');if(h&&pagePath==='/contact'&&!nativeMain.querySelector('.nv33-native-label')){const label=document.createElement('span');label.className='nv33-native-label';label.textContent='CONTACT';label.setAttribute('aria-hidden','true');h.before(label);}}}

    document.querySelectorAll('.nv-mobile-nav').forEach(d=>{d.addEventListener('keydown',e=>{if(e.key==='Escape'){d.open=false;d.querySelector('summary')?.focus();}});});
    // Keep content visible immediately; motion is reserved for the hero.

  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

/* Lower-page design, additive to release 979440. No content, URL or form mutations. */
(()=>{'use strict';
 function init(){
  const main=document.querySelector('main'),route=(location.pathname.replace(/\/$/,'')||'/');
  if(!main||route==='/'||main.classList.contains('nv23-home')||main.dataset.nv35Ready)return;main.dataset.nv35Ready='true';
  const kinds={'/service':'service-index','/industry':'industry-index','/company':'company','/column':'insights','/contact':'contact','/privacy':'privacy','/sitemap':'sitemap'};
  const kind=kinds[route]||(route.startsWith('/columns/')?'article':route==='/service/cmo'?'cmo':route.startsWith('/service/')?'service-detail':route.startsWith('/industry/')?'industry-detail':null);
  if(!kind)return;
  document.body.classList.add('nv35-lower');main.dataset.nv35Kind=kind;
  // Distinguish dense comparisons from supporting explanation; preserve CMO's Figma matrix.
  if(kind==='service-detail'){
   let prose=0;main.querySelectorAll(':scope>.nv30-support').forEach(section=>{section.dataset.nv35Surface=section.querySelector('table')?'comparison':(++prose%2?'explanation':'summary');section.dataset.nv30Tone=section.dataset.nv35Surface==='explanation'?'mist':'white';section.style.removeProperty('background');});
  }
  // Existing nodes only: heading/copy separation gives company policy a distinct editorial role.
  if(kind==='company'){
   const profile=main.querySelector('.nv30-profile');if(profile){profile.dataset.nv30Tone='mist';profile.style.removeProperty('background');}
   const copy=main.querySelector('.nv30-policy .nv-copy');
   if(copy&&!copy.previousElementSibling?.classList.contains('nv35-policy-heading')){const group=document.createElement('div');group.className='nv35-policy-heading';[...copy.children].filter(n=>n.matches('.nv30-en,h2')).forEach(n=>group.append(n));copy.before(group);}
  }
  // All CTA children remain in their original order; wrappers receive layout roles.
  main.querySelectorAll('.nv-cta>.nv-lower-action').forEach(n=>n.classList.add(n.querySelector('.nv-button')?'nv35-cta-primary':'nv35-cta-secondary'));
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

/* Static type/spacing refinement explicitly scoped to the known 27 site routes. */
(()=>{'use strict';const routes=new Set(['','service','industry','company','contact','privacy','column','columns/marketing-review','sitemap',...['cmo','marketing-support','ads','seo','sns','web','global','dx','crm'].map(p=>'service/'+p),...['saas','manufacturing','ec','construction','realestate','hr-recruiting','finance','medical','professional'].map(p=>'industry/'+p)]);function init(){if(routes.has(location.pathname.replace(/^\/|\/$/g,''))&&document.querySelector('main'))document.body.classList.add('nv36-polish');}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();})();

/* Trust: deliberate deceleration. Partnership: ordered handoff. Growth: connection. */


/* D01: retain authored statements and CTA nodes, expose them in reading order. */
(()=>{'use strict';function init(){
 const main=document.querySelector('main');
 if(!main||!['service-detail','industry-detail','cmo'].includes(main.dataset.nv35Kind))return;
 const intro=main.querySelector(':scope>.nv-cmo-intro'),grid=intro?.querySelector(':scope>.nv-split,:scope>.r24-intro'),copy=grid?.querySelector(':scope>.nv-copy');
 if(!copy)return;
 copy.classList.add('nv42-intro-copy');
 const statement=grid.querySelector('h2'),action=grid.querySelector('.nv-button');
 if(statement&&!copy.contains(statement))copy.prepend(statement);
 if(action&&!copy.contains(action))copy.append(action);
 grid.querySelectorAll('.nv33-intro-message').forEach(n=>{if(!n.children.length)n.remove();});
}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();})();

/* NOVE editorial motion. Text stays available; visual cues explain the next step. */
(()=>{'use strict';
 const T=window.NoveMotionTokens;if(!T)return;
 let teardown=()=>{};
 function init(){
  teardown();const main=document.querySelector('main');if(!main)return;
  const media=matchMedia('(prefers-reduced-motion: reduce)'),active=new Map(),pending=new Map(),visible=new Set(),listeners=[],rails=[],decorations=[];
  // Entrances belong to this visit. Persist only the user's explicit stop preference.
  // A previous tab visit must not consume the next page visit's visual sequence.
  let alive=true,observer,activeObserver,resizeFrame=0,startedCount=0;
  const seen=new Set();
  if(!('IntersectionObserver' in window)||!Element.prototype.animate)return;
  const listen=(el,type,fn)=>{el.addEventListener(type,fn);listeners.push(()=>el.removeEventListener(type,fn));};
  const reason=()=>media.matches?'reduced':window.NoveMotionPaused===true?'user':document.hidden?'hidden':!window.NoveMotionReady?'loading':'';
  const stopped=()=>Boolean(reason());
  const inView=el=>{let r=el.getBoundingClientRect();if(el.ownerSVGElement&&(r.width===0||r.height===0))r=el.ownerSVGElement.getBoundingClientRect();return r.bottom>64&&r.top<innerHeight&&r.width>0&&r.height>0;};
  function release(a,el){active.delete(a);if(![...active.values()].includes(el))activeObserver.unobserve(el);}
  function finish(el){for(const [a,target] of [...active])if(!el||target===el||el.contains(target)){try{a.finish();}catch{a.cancel();}release(a,target);}}
  function animate(el,frames,role='element',delay=0,ease='enter'){
   if(!el||!alive||stopped()||!inView(el)||typeof el.animate!=='function')return;
   el.dataset.nvMotionRole=role;el.dataset.nvMotionDuration=String(T.duration[role]);el.dataset.nvMotionDelay=String(delay);
   const a=el.animate(frames,{duration:T.duration[role],delay,easing:T.ease[ease],fill:'backwards'});active.set(a,el);activeObserver.observe(el);startedCount++;
   a.finished.then(()=>release(a,el),()=>release(a,el));return a;
  }
  function register(el,id,run){if(!el)return;pending.set(el,{id,run});el.dataset.nvEntrance='pending';observer.observe(el);}
  function flush(){if(!alive||stopped())return;for(const el of [...visible]){const job=pending.get(el);if(!job||!inView(el))continue;
   // Do not spend an entrance on an unloaded image or an invisible child.
   if(el.tagName==='IMG'&&(!el.complete||!el.naturalWidth))continue;
   const before=startedCount,existing=new Set(active.keys());job.run();
   if(startedCount===before){el.dataset.nvEntrance='pending-target';continue;}
   seen.add(job.id);el.dataset.nvEntrance='playing';el.dataset.nvEntranceCount=String((Number(el.dataset.nvEntranceCount)||0)+1);
   const batch=[...active.keys()].filter(a=>!existing.has(a));
   Promise.allSettled(batch.map(a=>a.finished)).then(()=>{if(alive)el.dataset.nvEntrance='complete';});
   pending.delete(el);visible.delete(el);observer.unobserve(el);
  }}
  function state(){
   const why=reason();main.dataset.nvMotionReason=why||'active';
   if(why==='reduced'||why==='user'){pending.forEach((job,el)=>{el.dataset.nvEntrance='skipped';observer.unobserve(el);});pending.clear();visible.clear();}
   if(media.matches){finish();rails.forEach(({rail})=>rail.style.transform='none');main.dataset.nvMotionState='reduced';}
   else if(why){if(why!=='loading')finish();else for(const a of active.keys())a.pause();main.dataset.nvMotionState=why==='loading'?'waiting':'paused';}
   else{for(const [a,el] of [...active]){if(!inView(el))finish(el);else if(a.playState==='paused')a.play();}rails.forEach(({rail,progress})=>{rail.style.transform=`scale${rail.dataset.axis==='y'?'Y':'X'}(${progress})`;});main.dataset.nvMotionState='active';flush();}
  }
  activeObserver=new IntersectionObserver(entries=>{for(const e of entries)if(!e.isIntersecting)finish(e.target);},{threshold:0,rootMargin:'-64px 0px 0px'});
  observer=new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting)visible.add(e.target);else visible.delete(e.target);}flush();},{threshold:.12,rootMargin:'-64px 0px -8% 0px'});
  const hero=main.querySelector('.nv-hero,.nv47-mast,.nv-cmo-mast,.nv-lower-mast,.section_pagehero');
  // Industry process: a choice of measures, then a repeatable report/improvement cycle.
  // The existing two paragraphs remain unchanged and retain their reading order.
  if(main.dataset.nv35Kind==='industry-detail'){
   const ns='http://www.w3.org/2000/svg';
   const drawings=[
    '<text x="0" y="78">01</text><g class="nv-process-lines"><path pathLength="1" d="M116 22H165V54H231M116 54H231M116 86H165V54"/><path pathLength="1" d="M275 54H408M394 47L408 54 394 61"/></g><g class="nv-process-points"><circle cx="116" cy="22" r="5"/><circle cx="116" cy="54" r="5"/><circle cx="116" cy="86" r="5"/></g><circle class="nv-process-target" cx="253" cy="54" r="22"/><circle class="nv-process-core" cx="253" cy="54" r="5"/>',
    '<text x="0" y="78">02</text><g class="nv-process-lines"><path pathLength="1" d="M116 78H203M129 78V60H145V78M158 78V46H174V78M187 78V27H203V78"/><path pathLength="1" d="M229 54H269M278 35A39 39 0 1 1 279 77M276 22L278 35 292 33"/><path pathLength="1" d="M369 54H414"/></g><circle class="nv-process-target" cx="315" cy="54" r="20"/><circle class="nv-process-core" cx="315" cy="54" r="5"/><circle class="nv-process-points" cx="414" cy="54" r="5"/>'
   ];
   main.querySelectorAll('.nv30-process .nv-copy>p').forEach((p,i)=>{
    if(i>1)return;const visual=document.createElementNS(ns,'svg');visual.classList.add('nv-process-visual');visual.setAttribute('viewBox','0 0 460 108');visual.setAttribute('aria-hidden','true');visual.setAttribute('focusable','false');visual.innerHTML=drawings[i];p.prepend(visual);decorations.push(visual);
    register(visual,'process-meaning-'+i,()=>{
     visual.querySelectorAll('path').forEach((path,j)=>animate(path,[{strokeDashoffset:1},{strokeDashoffset:0}],'scene',j*140,'state'));
     animate(visual.querySelector('.nv-process-target'),[{scale:'.65',opacity:.2},{scale:'1',opacity:1}],'scene',300);
     animate(visual.querySelector('.nv-process-core'),[{scale:'.45'},{scale:'1.35',offset:.6},{scale:'1'}],'element',440);
    });
   });
  }
  // Reading comes first: the title remains legible throughout its short entrance.
  const title=hero?.querySelector('h1');
  register(title,'hero',()=>{
   main.dataset.nvHeroIntro='played';const lines=title.querySelectorAll('.nv30-hero-line');
   const nodes=lines.length?[...lines]:[title];nodes.forEach((line,i)=>animate(line,[{translate:'0 20px',opacity:.65},{translate:'0 0',opacity:1}],'heading',T.sequence.title+i*T.sequence.line));
   // Auxiliary English labels stay still so they do not compete with Japanese.
  });
  const heroArt=hero?.querySelector('.nv30-hero-art');
  register(heroArt,'hero-art',()=>animate(heroArt,[{opacity:.65,translate:'0 24px'},{opacity:1,translate:'0 0'}],'media'));
  // A lower-page introduction is one reading sequence, using the shared tokens.
  // Animate emphasis only: every paragraph and CTA stays readable and clickable.
  const lower=!main.classList.contains('nv23-home');
  const intro=lower?main.querySelector('.nv47-intro,.nv44-cmo-hero .nv-cmo-intro,:scope>.nv-cmo-intro,:scope>.section_pagehero'):null;
  const introCopy=intro?.querySelector('.nv47-copy,.nv42-intro-copy,.nv-utility-intro,.container_large')||intro;
  const promise=lower?introCopy:main.querySelector('.nv42-intro-copy>p');
  register(promise,'detail-promise',()=>{
   if(!lower){animate(promise,[{opacity:.82},{opacity:1}],'copy',T.sequence.chapter);return;}
   animate(introCopy.querySelector('h2'),[{opacity:.84},{opacity:1}],'copy',T.sequence.title+T.stagger);
   introCopy.querySelectorAll(':scope>p:not(.nv33-native-label)').forEach(p=>animate(p,[{opacity:.86},{opacity:1}],'copy',T.sequence.cta));
   introCopy.querySelectorAll('.nv43-actions .nv-arrow').forEach(arrow=>animate(arrow,[{translate:`-${T.distance/2}px 0`},{translate:'0 0'}],'micro',T.sequence.cta+T.stagger*2));
  });
  // The CTA remains fully readable and clickable during the title sequence.
  register(hero?.querySelector('.nv-hero-actions,.nv-cmo-actions,.nv-lower-actions'),'hero-actions',()=>{
   const actions=hero.querySelector('.nv-hero-actions,.nv-cmo-actions,.nv-lower-actions');
   actions.querySelectorAll('.nv-arrow').forEach(arrow=>animate(arrow,[{translate:'-8px 0'},{translate:'0 0'}],'micro',T.sequence.cta));
  });
  // Scene 2: one chapter transition per editorial block, followed by its photograph.
  // Select key sections; do not stagger every paragraph or every element on the page.
  const headings=[...main.querySelectorAll('h2')].filter(h=>!h.closest('.nv47-intro,.nv-cmo-intro,.nv-cta,.nv-prose,.nv-catalog,.word-article-body')&&!['privacy','insights'].includes(main.dataset.nv35Kind));
  headings.forEach((h,i)=>register(h,'chapter-'+i,()=>{
   const en=h.previousElementSibling;
   // Chapter labels are static anchors.
   animate(h,[{translate:'0 18px',opacity:.62},{translate:'0 0',opacity:1}],'heading',T.sequence.chapter);
   // Pair only the immediate editorial explanation with its chapter heading.
   // Tables, cards and long prose retain their own existing visual behavior.
   if(lower){
    const copy=h.closest('.nv-copy')?.querySelector(':scope>p')||
      (h.nextElementSibling?.matches('p')?h.nextElementSibling:null)||
      (h.parentElement.nextElementSibling?.matches('p')?h.parentElement.nextElementSibling:null)||
      (h.parentElement.nextElementSibling?.matches('.nv-copy,.nv-lower-copy')?h.parentElement.nextElementSibling.querySelector(':scope>p'):null);
    if(copy&&copy.getBoundingClientRect().top-h.getBoundingClientRect().bottom<120)
     animate(copy,[{opacity:.86},{opacity:1}],'copy',T.sequence.cta);
   }
  }));
  // English chapter labels remain static across the entire site.
  main.querySelectorAll('.nv30-mast-photo,.nv30-overview-photo,.nv30-research-photo,.nv30-execution-photo,.nv50-production-photo').forEach((photo,i)=>{
   register(photo,'photo-'+i,()=>animate(photo,[{opacity:.65,translate:'0 24px'},{opacity:1,translate:'0 0'}],'media',T.sequence.media));
   listen(photo,'load',flush);
  });
  // Give a row of service choices a short left-to-right rhythm. Japanese copy
  // remains static; each existing illustration enters only once, after loading.
  main.querySelectorAll('.nv30-services,.nv-cmo-challenges,.nv-challenges').forEach((group,g)=>{
   group.querySelectorAll('.nv30-service-card>img,.nv30-service-card>.nv-card-image-frame>img,.nv30-cards>li>img').forEach((art,i)=>{
    register(art,'choice-'+g+'-'+i,()=>{
     const top=art.parentElement.getBoundingClientRect().top;
     const row=[...group.querySelectorAll('.nv30-service-card>img,.nv30-service-card>.nv-card-image-frame>img,.nv30-cards>li>img')].filter(n=>Math.abs(n.parentElement.getBoundingClientRect().top-top)<2);
     const delay=innerWidth>=768?Math.min(row.indexOf(art),2)*T.stagger:0;
     animate(art,[{opacity:.55,translate:'0 24px'},{opacity:1,translate:'0 0'}],'choice',delay);
    });
    listen(art,'load',flush);
   });
  });
  main.querySelectorAll('.nv-steps').forEach((steps,group)=>{
   const items=[...steps.querySelectorAll(':scope>.nv-step')];if(!items.length)return;
   const rail=document.createElement('li');rail.className='nv-motion-rail';rail.setAttribute('role','presentation');rail.setAttribute('aria-hidden','true');steps.append(rail);steps.classList.add('nv-motion-process');
   const entry={rail,steps,items,progress:0};rails.push(entry);
   function layout(){const vertical=main.classList.contains('nv23-home')||innerWidth<768;rail.dataset.axis=vertical?'y':'x';
    const box=steps.getBoundingClientRect(),first=items[0].querySelector('b')?.getBoundingClientRect(),last=items.at(-1).querySelector('b')?.getBoundingClientRect();
    if(first&&last){Object.assign(rail.style,{left:`${first.left-box.left+first.width/2}px`,top:`${first.top-box.top+first.height/2}px`,right:'auto',bottom:'auto',width:vertical?'1px':`${last.left-first.left}px`,height:vertical?`${last.top-first.top}px`:'1px'});}
    rail.style.transform=`scale${vertical?'Y':'X'}(${entry.progress})`;}
   entry.layout=layout;layout();
   items.forEach((step,i)=>{const id=`step-${group}-${i}`;if(seen.has(id))entry.progress=Math.max(entry.progress,(i+1)/items.length);
    register(step,id,()=>{const from=entry.progress;entry.progress=Math.max(from,(i+1)/items.length);layout();const axis=rail.dataset.axis==='y'?'Y':'X';
     finish(rail);animate(rail,[{transform:`scale${axis}(${from})`},{transform:`scale${axis}(${entry.progress})`}],'scene',0,'state');
     animate(step.querySelector('b'),[{opacity:.8},{opacity:1}],'element',innerWidth>=768?i*T.stagger:0,'state');
    });
   });layout();document.fonts.ready.then(()=>{if(alive)layout();});
  });
  // Each reporting stage is observed separately, including a slow mobile scroll.
  main.querySelectorAll('.nv50-report-flow li').forEach((item,i)=>register(item,'report-stage-'+i,()=>{
   animate(item,[{translate:'20px 0',opacity:.55},{translate:'0 0',opacity:1}],'choice',0);
  }));
  // Scene 5: the section's blue rule completes before the contact arrow settles.
  // The marker is decorative and absolutely positioned: no layout shift or new copy.
  main.querySelectorAll('.nv-cta').forEach((section,i)=>{
   const rule=document.createElement('span');rule.className='nv-cta-motion-rule';rule.setAttribute('aria-hidden','true');section.prepend(rule);decorations.push(rule);
   register(section.querySelector('h2'),'cta-'+i,()=>{
    animate(rule,[{scale:'0 1'},{scale:'1 1'}],'scene');
    animate(section.querySelector('h2'),[{translate:'0 18px',opacity:.65},{translate:'0 0',opacity:1}],'heading',T.sequence.chapter);
    if(lower)animate(section.querySelector('p'),[{opacity:.86},{opacity:1}],'copy',T.sequence.cta);
   });
   const arrow=section.querySelector('.nv-button .nv-arrow');register(arrow,'cta-arrow-'+i,()=>animate(arrow,[{translate:`-${lower?T.distance/2:8}px 0`},{translate:'0 0'}],'micro',T.sequence.cta+(lower?T.stagger*2:0)));
  });
  listen(window,'nove:motion-ready',state);listen(document,'visibilitychange',state);listen(media,'change',state);
  listen(window,'nove:motion-setting',state);
  listen(window,'resize',()=>{if(resizeFrame)return;resizeFrame=requestAnimationFrame(()=>{resizeFrame=0;finish();rails.forEach(r=>r.layout());state();});});
  listen(main,'focusin',()=>finish());
  teardown=()=>{alive=false;cancelAnimationFrame(resizeFrame);observer.disconnect();finish();activeObserver.disconnect();listeners.forEach(off=>off());decorations.forEach(e=>e.remove());rails.forEach(({rail,steps})=>{rail.remove();steps.classList.remove('nv-motion-process');});};
  state();
 }
 // Register after the existing lower-page link grouping has settled in this task.
 const start=()=>requestAnimationFrame(init);
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
 window.addEventListener('pagehide',()=>teardown());window.addEventListener('pageshow',e=>{if(e.persisted)start();});
})();


/* Local parity correction. Wording changes are explicit, content-matched English labels only. */
(()=>{'use strict';
const script=document.currentScript,asset=new URL('./assets/alpha/',script.src).href,top=new URL('./assets/figma-3358-26/',script.src).href;
const labels={
 '/service':['STRATEGY','EXECUTION','BUSINESS'],
 '/service/ads':['ANALYSIS','MEDIA','PRODUCTION','REPORTING'],
 '/service/seo':['OPTIMIZATION','REVIEW'], '/service/web':['IMPROVEMENT','REVIEW'],
 '/service/crm':['ACTIVATION','INTEGRATION'], '/service/marketing-support':['SUPPORT','CONSULTATION']
};
const themes={ads:['advertising','report','decision'],seo:['journey','information','report'],sns:['target','journey','decision'],web:['journey','information','decision'],cmo:['decision','team','report'],dx:['team','report','information'],crm:['information','journey','report'],global:['target','information','decision'],saas:['target','information','decision'],manufacturing:['target','information','advertising'],ec:['advertising','journey','information'],construction:['target','journey','information'],realestate:['journey','advertising','report'],'hr-recruiting':['target','information','journey'],finance:['journey','information','team'],medical:['information','journey','team'],professional:['target','information','decision']};
const originals={advertising:'19a08.webp',report:'8378d.webp',decision:'844f8.webp'};
function init(){const main=document.querySelector('main');if(!main||main.dataset.nv38Ready)return;main.dataset.nv38Ready='true';document.body.classList.add('nv38-parity');const route=location.pathname.replace(/\/$/,'')||'/',key=route.split('/').pop();const map=[];
 let nodes=route==='/service'?[...main.querySelectorAll(':scope>.nv30-services .nv30-en')]:[...main.querySelectorAll(':scope>.nv30-support .nv30-en')];
 let words=labels[route];if(route.startsWith('/industry/')&&nodes.length>1)words=['SUPPORT','REPORTING'];
 if(words)nodes.forEach((n,i)=>{if(words[i]&&n.textContent.trim()!==words[i]){map.push({old:n.textContent.trim(),new:words[i],heading:n.parentElement.querySelector('h2')?.textContent.trim()});n.textContent=words[i];const section=n.closest('section');if(section?.hasAttribute('data-nv30-word'))section.dataset.nv30Word=words[i];}});
 main.dataset.nv38HeadingChanges=JSON.stringify(map);
 main.querySelectorAll(':scope>section').forEach(s=>{s.dataset.nv38Role=s.matches('.nv-hero,.nv-cmo-mast,.section_pagehero')?'mast':s.matches('.nv-cta')?'cta':s.matches('.nv-cmo-intro')?'intro':s.matches('.nv-cmo-challenges,.nv-challenge-wrap')?'challenge':s.matches('.nv30-faq')?'faq':s.matches('.nv30-related')?'related':'content';});
 if(route==='/service')main.querySelectorAll('.nv30-service-card>img').forEach((im,i)=>{const t=['advertising','information','target','journey','decision','target','team','information'][i];if(!t)return;im.src=originals[t]?top+originals[t]:asset+t+'-alpha.webp';im.removeAttribute('srcset');im.dataset.nv38Theme=t;});
 const researchTheme={'marketing-support':'report',seo:'information',sns:'journey',web:'journey',global:'target',dx:'information',crm:'information',saas:'target',manufacturing:'information',ec:'journey',construction:'target',realestate:'target','hr-recruiting':'journey',finance:'journey',medical:'information',professional:'target'}[key];
 if(researchTheme)main.querySelectorAll('.nv30-research-photo').forEach(im=>{im.src=originals[researchTheme]?top+originals[researchTheme]:asset+researchTheme+'-alpha.webp';im.removeAttribute('srcset');im.dataset.nv38Theme=researchTheme;im.width=600;im.height=400;});
 const set=themes[key];if(set)main.querySelectorAll('.nv-cmo-challenges .nv30-issue-image').forEach((im,i)=>{const theme=set[i];if(!theme)return;im.src=originals[theme]?top+originals[theme]:asset+theme+'-alpha.webp';im.removeAttribute('srcset');im.dataset.nv38Theme=theme;im.width=600;im.height=400;});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();})();

/* Equalize reading rows only within a visual card row; stacked cards remain intrinsic. */
(()=>{'use strict';
function init(){
 const main=document.querySelector('main');if(!main||main.dataset.nv39Aligned)return;main.dataset.nv39Aligned='true';
 const selector='.nv-photo-grid,.nv33-support-grid,.nv-scope-grid,.nv-issue-list.nv30-cards,.nv-lower-related,.nv-industry-grid,.nv-channel-band,.nv-steps';
 const groups=[...main.querySelectorAll(selector)];let pending=false;
 function sync(){pending=false;
  const items=groups.map(g=>({g,cards:[...g.children].filter(e=>e.getAttribute('aria-hidden')!=='true'&&!e.classList.contains('nv-motion-rail')&&e.getClientRects().length)}));
  items.forEach(({cards})=>cards.forEach(c=>{for(const h of c.querySelectorAll('h3,:scope>dl>dd,:scope>.nv-link,.nv-issue-list.nv30-cards>li>span')){h.dataset.nv39Size='';if(h.tagName==='H3')h.dataset.nv39Heading='';else if(h.tagName==='DD'||h.tagName==='SPAN')h.dataset.nv39BodyRow='';h.style.removeProperty('--nv39-heading-height');}}));
  const measurements=[];
  for(const {cards} of items){const rows=[];for(const c of cards){const y=c.offsetTop;let row=rows.find(r=>Math.abs(r.y-y)<2);if(!row){row={y,cards:[]};rows.push(row)}row.cards.push(c)}
   for(const row of rows){if(row.cards.length<2)continue;for(const selector of ['h3',':scope>dl>dd:nth-of-type(1)',':scope>dl>dd:nth-of-type(2)',':scope>.nv-link','.nv-issue-list.nv30-cards>li>span']){const hs=row.cards.map(c=>c.querySelector(selector)).filter(Boolean);if(hs.length<2)continue;const height=Math.max(...hs.map(h=>h.getBoundingClientRect().height));measurements.push({hs,height});}}
  }
  measurements.forEach(({hs,height})=>hs.forEach(h=>h.style.setProperty('--nv39-heading-height',height+'px')));
 }
 function schedule(){if(!pending){pending=true;requestAnimationFrame(sync)}}
 const widths=new WeakMap();const observer=new ResizeObserver(entries=>{let changed=false;for(const e of entries){const w=e.contentRect.width;if(widths.get(e.target)!==w){widths.set(e.target,w);changed=true}}if(changed)schedule()});groups.forEach(g=>observer.observe(g));
 schedule();document.fonts?.ready.then(schedule);document.fonts?.addEventListener('loadingdone',schedule);window.addEventListener('pageshow',schedule);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();})();

/* Preserve content and native controls; reset legacy per-section inline surfaces. */
(()=>{'use strict';function init(){const main=document.querySelector('main');if(!main)return;main.querySelectorAll(':scope>section:not(.nv-hero):not(.nv-cta)').forEach(section=>{section.style.removeProperty('background');section.dataset.nv30Tone='white';});
 const mast=main.querySelector('.nv-cmo-mast,.section_pagehero');if(mast&&!mast.querySelector('.nv40-mast-net')){const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox','0 0 600 300');svg.setAttribute('preserveAspectRatio','xMidYMid slice');svg.setAttribute('aria-hidden','true');svg.classList.add('nv40-mast-net');const pts=[[10,42],[156,14],[302,80],[476,26],[586,110],[52,234],[204,174],[362,246],[506,198],[616,288]];const edges=[[0,1],[1,2],[2,3],[3,4],[0,5],[1,6],[2,6],[2,7],[3,8],[4,8],[5,6],[6,7],[7,8],[8,9]];edges.forEach(([a,b])=>{const l=document.createElementNS(ns,'line');['x1','y1','x2','y2'].forEach((k,i)=>l.setAttribute(k,[...pts[a],...pts[b]][i]));svg.append(l)});pts.forEach(([x,y])=>{const c=document.createElementNS(ns,'circle');c.setAttribute('cx',x);c.setAttribute('cy',y);c.setAttribute('r','2');svg.append(c)});mast.prepend(svg);}
}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();})();

/* Exact duplicate-word corrections only; source copy, links and forms otherwise stay intact. */
(() => {
  'use strict';
  const fixes = {
    '/service/ads': ['クリックした先のページページ', 'クリックした先のページ'],
    '/industry/construction': ['対応エリアで、対応エリアで、', '対応エリアで、']
  };
  function correctDuplicate() {
    const fix = fixes[location.pathname.replace(/\/$/, '')];
    const main = document.querySelector('main');
    if (!fix || !main) return;
    for (const paragraph of main.querySelectorAll('p')) {
      const walker = document.createTreeWalker(paragraph, NodeFilter.SHOW_TEXT);
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        if (node.nodeValue.includes(fix[0])) node.nodeValue = node.nodeValue.replace(fix[0], fix[1]);
      }
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', correctDuplicate);
  else correctDuplicate();
})();

/* Lower-page ambient network: animate the existing ten SVG nodes, never the layout. */
(()=>{'use strict';
 function init(){
  const svg=document.querySelector('main .nv40-mast-net');
  const T=window.NoveMotionTokens?.ambient;
  if(!svg||!T||svg.dataset.geometryBound)return;
  svg.dataset.geometryBound='true';svg.setAttribute('focusable','false');
  const circles=[...svg.querySelectorAll('circle')],lines=[...svg.querySelectorAll('line')];
  const points=circles.map((node,i)=>({node,x:+node.getAttribute('cx'),y:+node.getAttribute('cy'),angle:i*2.399963,amplitude:T.distance*(.55+(i%3)*.12)}));
  const index=(x,y)=>points.findIndex(p=>p.x===x&&p.y===y);
  const edges=lines.map(node=>({node,a:index(+node.getAttribute('x1'),+node.getAttribute('y1')),b:index(+node.getAttribute('x2'),+node.getAttribute('y2'))}));
  if(!points.length||edges.some(e=>e.a<0||e.b<0))return;
  // Two path writes per frame instead of 76 node/edge attribute writes.
  // Preserve the same graph, dot radius, strokes and outer SVG box.
  const ns='http://www.w3.org/2000/svg',edgePath=document.createElementNS(ns,'path'),nodePath=document.createElementNS(ns,'path');
  // CSS carries the existing line/dot paint. Reading computed style here forced
  // a synchronous layout immediately after all lower-page DOM construction.
  edgePath.classList.add('nv-mast-edges');nodePath.classList.add('nv-mast-points');
  const radius=+circles[0].getAttribute('r')||2;svg.replaceChildren(edgePath,nodePath);
  const media=matchMedia('(prefers-reduced-motion: reduce)'),key='nove:mast-phase:v1:'+location.pathname;
  let phase=0,last=0,frame=0,resizeFrame=0,inView=false,pageActive=true,lastDiagnostic=-Infinity;
  try{const saved=Number(sessionStorage.getItem(key));if(Number.isFinite(saved))phase=((saved%T.period)+T.period)%T.period;}catch{}
  const save=()=>{try{sessionStorage.setItem(key,String(phase));}catch{}};
  const draw=()=>{
   const t=phase/T.period*Math.PI*2;
   const positions=points.map(p=>({x:p.x+(Math.sin(t+p.angle)-Math.sin(p.angle))*p.amplitude,y:p.y+(Math.cos(t+p.angle)-Math.cos(p.angle))*p.amplitude*.72}));
   edgePath.setAttribute('d',edges.map(e=>{const a=positions[e.a],b=positions[e.b];return `M${a.x.toFixed(2)} ${a.y.toFixed(2)}L${b.x.toFixed(2)} ${b.y.toFixed(2)}`;}).join(''));
   nodePath.setAttribute('d',positions.map(p=>`M${(p.x-radius).toFixed(2)} ${p.y.toFixed(2)}a${radius} ${radius} 0 1 0 ${radius*2} 0a${radius} ${radius} 0 1 0 ${-radius*2} 0`).join(''));
   if(Math.abs(phase-lastDiagnostic)>250||!frame){svg.dataset.geometryPhase=phase.toFixed(1);lastDiagnostic=phase;}
  };
  const reason=()=>media.matches?'reduced':window.NoveMotionPaused===true?'user':!window.NoveMotionReady?'loading':document.hidden?'hidden':!pageActive?'page':!inView?'outside':'';
  const tick=time=>{frame=requestAnimationFrame(tick);if(!last){last=time;return;}const delta=time-last;if(delta<T.stepMs-.5)return;phase=(phase+Math.min(delta,100))%T.period;last=time;draw();};
  const sync=()=>{
   const why=reason();
   if(why){cancelAnimationFrame(frame);frame=0;last=0;svg.dataset.geometryPhase=phase.toFixed(1);svg.dataset.geometryLastPause=why;svg.dataset.geometryLastPausePhase=phase.toFixed(1);}
   else if(!frame){last=0;frame=requestAnimationFrame(tick);}
   svg.dataset.geometryState=why==='reduced'?'reduced':why?'paused':'running';
  };
  const measure=()=>{resizeFrame=0;const r=svg.getBoundingClientRect();inView=r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth&&r.width>0;sync();};
  const schedule=()=>{if(!resizeFrame)resizeFrame=requestAnimationFrame(measure);};
  const observer='IntersectionObserver' in window?new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;sync();}):null;
  // The observer delivers the initial visibility after layout, so no immediate
  // getBoundingClientRect is needed while the page is still being assembled.
  const observe=()=>{if(observer)observer.observe(svg);else schedule();};
  draw();observe();
  window.addEventListener('nove:motion-ready',sync);
  window.addEventListener('nove:motion-setting',()=>{sync();save();});
  media.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);
  window.addEventListener('resize',schedule,{passive:true});
  if(!observer)window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('pagehide',()=>{pageActive=false;cancelAnimationFrame(resizeFrame);resizeFrame=0;observer?.disconnect();sync();save();});
  window.addEventListener('pageshow',()=>{pageActive=true;observe();});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();

/* F01: observe native Webflow authentication, never alter its token or submit lock. */
(()=>{'use strict';function init(){
 const form=document.querySelector('#contact-form[data-turnstile-sitekey]');
 if(!form||form.querySelector('#nove-auth-status'))return;
 const wrapper=form.closest('.w-form'),button=form.querySelector('[type=submit]');if(!wrapper||!button)return;
 const status=document.createElement('p');status.id='nove-auth-status';status.className='nv-auth-status';
 status.setAttribute('role','status');status.setAttribute('aria-live','polite');status.setAttribute('aria-atomic','true');button.before(status);
 button.setAttribute('aria-describedby',[button.getAttribute('aria-describedby'),status.id].filter(Boolean).join(' '));
 const waitingText=document.createElement('span');waitingText.textContent='認証を確認しています。完了までお待ちください。';
 const failedText=document.createElement('span');failedText.append('認証を完了できませんでした。ページを再読み込みしてお試しください。解決しない場合は ');
 const mail=document.createElement('a');mail.href='mailto:info@no-ve.co.jp';mail.textContent='info@no-ve.co.jp';failedText.append(mail,' へご連絡ください。');
 status.append(waitingText,failedText);
 let state='';
 function sync(){
  const response=form.querySelector('[name="cf-turnstile-response"]');
  const waiting=wrapper.classList.contains('w-form-loading')||button.classList.contains('w-form-loading');
  const sending=button.disabled&&Boolean(response?.value);
  const next=waiting?'waiting':sending?'sending':button.disabled&&response?'failed':response?'ready':'waiting';
  if(next===state)return;state=next;status.dataset.authState=next;
  status.style.visibility=['ready','sending'].includes(next)?'hidden':'visible';
  waitingText.style.visibility=next==='waiting'?'visible':'hidden';
  failedText.style.visibility=next==='failed'?'visible':'hidden';
  waitingText.setAttribute('aria-hidden',String(next!=='waiting'));
  failedText.setAttribute('aria-hidden',String(next!=='failed'));
 }
 const observer=new MutationObserver(sync);observer.observe(wrapper,{subtree:true,childList:true,attributes:true,attributeFilter:['class','disabled','value']});sync();
 window.addEventListener('pagehide',()=>observer.disconnect(),{once:true});
 window.addEventListener('pageshow',()=>{observer.observe(wrapper,{subtree:true,childList:true,attributes:true,attributeFilter:['class','disabled','value']});sync();});
}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();})();

/* NOVE 2026-10-06: preserve the original main-visual link nodes and copy. */
(() => {
 'use strict';
 function init() {
  const main=document.querySelector('main');
  if(!main||main.classList.contains('nv23-home'))return;
  const title=main.querySelector(':scope>.nv-cmo-mast h1');
  if(title&&!title.querySelector('.nv43-phrase')) {
   const pieces=title.textContent.split(/(マーケティング支援|マーケティング|IT・SaaS|EC・D2C|SEO・AI検索対策|Webサイト改善)/).filter(Boolean);
   if(pieces.length>1)title.replaceChildren(...pieces.map(piece=>{
    if(!/^(マーケティング支援|マーケティング|IT・SaaS|EC・D2C|SEO・AI検索対策|Webサイト改善)$/.test(piece))return document.createTextNode(piece);
    const span=document.createElement('span');span.className='nv43-phrase';span.textContent=piece;return span;
   }));
  }
  const intro=main.querySelector(':scope>.nv-cmo-mast+.nv-cmo-intro');
  const copy=intro?.querySelector('.nv42-intro-copy,.nv-utility-intro');
  if(!copy||copy.querySelector('.nv43-actions'))return;
  const primary=copy.querySelector('a.nv-button[data-cta-position="hero"]');
  if(!primary)return;
  const secondary=[...copy.querySelectorAll('.nv-lower-action>a.nv-link')];
  const actions=document.createElement('div');actions.className='nv43-actions';
  // Reading and keyboard order agree: the consultation comes before optional detail links.
  primary.parentElement.classList.contains('nv-lower-action')?primary.parentElement.before(actions):primary.before(actions);
  actions.append(primary,...secondary);
  copy.querySelectorAll('.nv-lower-action:empty').forEach(n=>n.remove());
  // Keep useful Japanese phrases intact without changing the accessible label.
  const label=primary.querySelector(':scope>span:not(.nv-arrow)');
  if(label&&label.textContent.length>20) {
   const text=label.textContent;
   const pieces=text.split(/(マーケティング|について相談する)/).filter(Boolean);
   if(pieces.length>1) {
    label.replaceChildren(...pieces.map(piece=>{
     if(piece.length>16)return document.createTextNode(piece);
     const span=document.createElement('span');span.className='nv43-phrase';span.textContent=piece;return span;
    }));
   }
  }
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();

/* Keep existing Webflow copy, headings, CTA nodes and artwork. CMO only. */
(() => {
 'use strict';
 function init() {
  if(location.pathname.replace(/\/$/,'')!=='/service/cmo')return;
  const main=document.querySelector('main.nv33-cmo');
  if(!main||main.querySelector('.nv44-cmo-hero'))return;
  const mast=main.querySelector(':scope>.nv-cmo-mast');
  const intro=mast?.nextElementSibling;
  if(!mast||!intro?.classList.contains('nv-cmo-intro'))return;
  const hero=document.createElement('div');hero.className='nv44-cmo-hero';
  mast.before(hero);hero.append(mast,intro);
  const band=main.querySelector('.nv-channel-band');
  if(band) {
   band.setAttribute('role','list');
   Array.from(band.children).forEach(item=>item.setAttribute('role','listitem'));
  }
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();

/* Replace only displayed lower-page NOVE watermarks with the official header logo. */
(()=>{'use strict';function init(){
 const main=document.querySelector('main');
 if(!main||main.classList.contains('nv23-home'))return;
 const source=document.querySelector('header img.nv-logo,header .nv-logo img');
 if(!source?.src)return;
 main.querySelectorAll('.nv44-cmo-hero,.nv-cmo-mast,.nv-lower-mast').forEach(mast=>{
  if(mast.querySelector(':scope>.nv46-logo-watermark'))return;
  const side=['before','after'].find(side=>{const s=getComputedStyle(mast,'::'+side);return s.display!=='none'&&s.content.replace(/["']/g,'')==='NOVE'});
  if(!side)return;
  mast.dataset.nv46NoveSide=side;
  const logo=source.cloneNode(false);logo.removeAttribute('srcset');logo.removeAttribute('id');
  logo.className='nv46-logo-watermark';logo.alt='';logo.setAttribute('aria-hidden','true');
  logo.setAttribute('role','presentation');logo.loading='eager';logo.width=181;logo.height=32;
  mast.append(logo);
 });
}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();})();

/* Shared lower-page hero, preserving existing content and form/article boundaries. */
(function(){
 function init(){
  if(location.pathname.replace(/\/$/,'')==='' || location.pathname.replace(/\/$/,'')==='/service/cmo')return;
  const main=document.querySelector('#main'); if(!main||main.querySelector('.nv47-lower-hero'))return;
  const mast=main.querySelector(':scope > .nv-cmo-mast, :scope > .nv-lower-mast, :scope > .section_pagehero, :scope > .l-container');
  if(!mast)return;
  const hero=document.createElement('div');hero.className='nv47-lower-hero';
  const next=mast.nextElementSibling; mast.before(hero);hero.append(mast);mast.classList.add('nv47-mast');
  if(next?.classList.contains('nv-cmo-intro')){hero.append(next);next.classList.add('nv47-intro');const copy=next.querySelector('.nv-copy')||next.firstElementChild;copy?.classList.add('nv47-copy');if(copy?.querySelector('h2'))copy.classList.add('nv47-copy-heading');}
  if(mast.classList.contains('l-container'))hero.classList.add('nv47-article');
  if(mast.classList.contains('section_pagehero'))hero.classList.add('nv47-contact');
  hero.querySelectorAll('.nv46-logo-watermark').forEach(e=>e.remove());
  const logo=document.createElement('img');logo.className='nv47-mark';logo.alt='';logo.setAttribute('aria-hidden','true');
  logo.src='https://cdn.jsdelivr.net/gh/suguru1215/nobe-css@87f91353dfa508d8ae03f3f506ec7a876850c93d/design-20260930/assets/figma-3358-28/01779.png';hero.append(logo);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();

// One generated illustrative photo replaces only the SEO research image.
(function(){
 var script=document.currentScript, base=script&&script.src?new URL('./assets/seo-research-office-v1.webp',script.src).href:'./assets/seo-research-office-v1.webp';
 function apply(){
  if(location.pathname.replace(/\/$/,'')!=='/service/seo')return;
  var img=document.querySelector('#main .nv30-research-grid>.nv30-research-photo');
  if(!img)return;
  img.removeAttribute('srcset');img.removeAttribute('sizes');img.removeAttribute('data-nv38-theme');
  img.setAttribute('data-nv48-photo','generated');img.src=base;img.width=1200;img.height=900;
  img.style.setProperty('object-fit','cover','important');
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply);else apply();
 window.addEventListener('load',apply,{once:true});
})();

/* Approved visible service labels and four advertising copy corrections. */
(function(){
 'use strict';
 function apply(){
  const main=document.querySelector('#main');
  const route=main?.dataset.nv33Page||location.pathname.replace(/\/$/,'');
  const replacements=[
   ['広告をクリックした先のページ','Webサイト・LP'],
   ['共有が難しい場合は、公開情報から市場・競合やクリックした先のページを調べます。','共有が難しい場合は、公開情報をもとに、市場・競合やWebサイト・LPを調査します。'],
   ['検索語句、広告文、クリックした先のページを確認し、問い合わせや購入につながる改善点を探ります。','検索語句、広告文、Webサイト・LPを確認し、問い合わせや購入につながる改善点を探ります。'],
   ['誰に何を伝えるかを考え、広告とクリックした先のページの内容を揃えます。','誰に何を伝えるかを考え、広告とWebサイト・LPの内容を揃えます。']
  ];
  if(route==='/service/ads')main.querySelectorAll('th,td,p').forEach(el=>{
   const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);let node;
   while((node=walker.nextNode()))for(const [before,after] of replacements)if(node.nodeValue.includes(before))node.nodeValue=node.nodeValue.replace(before,after);
  });
  // Only service navigation labels, not explanatory copy, metadata or URLs.
  document.querySelectorAll('a[href="/service/seo"],#main[data-nv33-page="/service/seo"] h1,#main h2,#main h3,.nv-crumb [aria-current="page"]').forEach(el=>{
   const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);let node;
   while((node=walker.nextNode()))node.nodeValue=node.nodeValue.replace(/SEO・AI検索対策|SEO・GEO対策/g,'SEO・AI検索最適化');
  });
  if(route==='/service/seo'){
   main.querySelectorAll('a[href="/contact"] span,a[href="/contact"]:not(:has(span))').forEach(el=>{if(['SEO・AI検索について相談する','SEO・GEO対策について相談する'].includes(el.textContent.trim()))el.textContent='SEO・AI検索最適化について相談する';});
   const en=main.querySelector('.nv47-mast .nv-en');if(en&&en.textContent.trim()==='SEO / GEO')en.textContent='SEO / AI SEARCH';
   const lead=main.querySelector('.nv47-copy>p');
   if(lead&&!lead.querySelector('.nv49-ai-search-intro')){
    const intro=document.createElement('span');intro.className='nv49-ai-search-intro';
    intro.append('従来のSEOに加え、AI検索最適化');
    const terms=document.createElement('span');terms.className='nv49-ai-search-terms';terms.textContent='（GEO/LLMO/AIO/AEO）';
    intro.append(terms,'にも対応します。');lead.prepend(intro);
   }
  }
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
})();

/* Shared navigation response: native details retains touch/keyboard semantics. */
(()=>{'use strict';function init(){
 const media=matchMedia('(prefers-reduced-motion: reduce)');
 document.querySelectorAll('header .nv-mobile-nav').forEach(details=>{
  const panel=details.querySelector('.nv-mobile-panel');if(!panel)return;
  let animation=null;
  const stop=()=>{animation?.cancel();animation=null;};
  details.addEventListener('toggle',()=>{stop();if(!details.open||media.matches||window.NoveMotionPaused||document.hidden||typeof panel.animate!=='function')return;
   animation=panel.animate([{opacity:.92,transform:'translateY(-6px)'},{opacity:1,transform:'translateY(0)'}],{duration:220,easing:window.NoveMotionTokens.ease.enter});
   panel.dataset.nvMenuDuration='220';
  });
  details.addEventListener('keydown',event=>{if(event.key==='Escape'&&details.open){details.open=false;details.querySelector('summary')?.focus();}});
  media.addEventListener('change',stop);document.addEventListener('visibilitychange',stop);window.addEventListener('nove:motion-setting',stop);window.addEventListener('pagehide',stop);
 });
}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();})();

/* Clip only zooming card media; text, arrows and focus outlines remain outside. */
(()=>{'use strict';function init(){
 document.querySelectorAll('#main .nv-photo-link>img,#main .nv30-service-card>img').forEach(image=>{
  const frame=document.createElement('span');frame.className='nv-card-image-frame';
  image.before(frame);frame.append(image);
 });
}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();})();


/* Content-led presentation. Existing copy, links, forms and metadata remain authoritative. */
(()=>{'use strict';
 const script=document.currentScript,assets=new URL('./assets/',script.src).href;
 const reportTerms={
  ads:['実施した内容','配信結果','次に試す内容'],
  construction:['相談内容','見学・現地調査','次に変える点'],
  realestate:['問い合わせ件数','来店・内見','訴求・配信先・ページ'],
  'hr-recruiting':['登録・面談','問い合わせ・商談','次に変える点'],
  finance:['広告・検索からの流入','フォーム到達','相談・申し込み件数'],
  medical:['広告・検索からの流入','診療案内の閲覧','予約ページへの移動'],
  professional:['相談の集計情報','相談内容','改善']
 };
 function init(){
  const main=document.querySelector('main');if(!main||main.dataset.nv50Ready)return;
  main.dataset.nv50Ready='true';const key=location.pathname.replace(/\/$/,'').split('/').pop();
  main.querySelectorAll('.nv30-services').forEach(section=>{
   const label=section.querySelector('.nv30-en')?.textContent.trim();
   if(label==='EXECUTION')section.classList.add('nv50-execution');
   if(label==='BUSINESS')section.classList.add('nv50-business');
  });
  if(main.dataset.nv35Kind==='industry-detail')main.querySelectorAll('.nv30-support').forEach(section=>{
   if(section.querySelector('.nv-scope-grid,.nv33-support-grid'))section.classList.add('nv50-scope');
  });
  main.querySelectorAll('.nv30-support').forEach(section=>{
   const label=section.querySelector('.nv30-en')?.textContent.trim(),copy=section.querySelector('.nv30-support-copy'),wrap=section.querySelector(':scope>.nv-split');
   if(!copy||!wrap)return;
   const terms=reportTerms[key];
   if(label==='REPORTING'&&terms&&terms.every(word=>copy.textContent.includes(word))){
    section.classList.add('nv50-report');const figure=document.createElement('figure');figure.className='nv50-report-flow';figure.setAttribute('aria-hidden','true');
    const list=document.createElement('ol');terms.forEach((term,i)=>{const item=document.createElement('li'),num=document.createElement('b'),text=document.createElement('span');num.textContent=String(i+1).padStart(2,'0');text.textContent=term;item.append(num,text);list.append(item);});figure.append(list);wrap.append(figure);
   }
   if(key==='ads'&&label==='PRODUCTION'){
    section.classList.add('nv50-production');const photo=document.createElement('img');photo.className='nv50-production-photo';photo.src=assets+'figma-3358-26/3d81b.webp';photo.alt='';photo.setAttribute('aria-hidden','true');photo.loading='lazy';photo.decoding='async';photo.width=1080;photo.height=720;wrap.append(photo);
   }
  });
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
