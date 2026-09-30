(function(){
  'use strict';
  const script=document.currentScript;
  const base=script ? new URL('./assets/',script.src).href : './assets/';
  function img(file,cls){const n=document.createElement('img');n.src=base+file;n.alt='';n.className=cls||'';n.loading='lazy';n.decoding='async';return n;}
  function heading(h,english){if(!h||h.previousElementSibling?.classList.contains('nv30-en'))return;const en=document.createElement('span');en.className='nv30-en';en.setAttribute('aria-hidden','true');en.textContent=english;h.before(en);}
  function apply(root,isHome){
    root.classList.add('nv30-main');
    root.querySelectorAll('.nv-watermark').forEach(n=>n.hidden=true);
    root.querySelectorAll('.nv-heading').forEach(n=>n.classList.add('nv30-heading'));
    root.querySelectorAll('.nv-cta').forEach(n=>heading(n.querySelector('h2'),'CONTACT'));
    if(isHome){
      const hero=root.querySelector('.nv-hero');
      if(hero&&!hero.querySelector('.nv30-hero-art')){
        hero.querySelector('h1').innerHTML='<span class="nv30-hero-line">マーケティングの</span><span class="nv30-hero-line">戦略づくりから、</span><span class="nv30-hero-line">施策の実行まで。</span>';
        const art=document.createElement('div');art.className='nv30-hero-art';art.setAttribute('aria-hidden','true');
        const video=document.createElement('video');video.src=base+'hero-video.mp4';video.muted=true;video.autoplay=true;video.loop=true;video.playsInline=true;video.preload='metadata';video.poster=base+'hero-mark.png';art.append(video);hero.append(art);
        const reduce=matchMedia('(prefers-reduced-motion: reduce)');const motion=()=>{if(reduce.matches)video.pause();else video.play().catch(()=>{});};motion();reduce.addEventListener('change',motion);
      }
      const list=root.querySelector('.nv-challenges .nv-issue-list');
      if(list){list.classList.add('nv30-cards');[...list.children].forEach((li,i)=>{if(!li.querySelector('img'))li.querySelector('b').after(img('concern-'+(i+1)+'.png','nv30-issue-image'));});}
      const overview=root.querySelector('.nv-overview .nv-split');
      if(overview&&!overview.querySelector('.nv30-overview-copy')){const col=document.createElement('div');col.className='nv30-overview-copy';const h=overview.querySelector('h2'),copy=overview.querySelector('.nv-copy');col.append(h,copy);overview.append(col,img('advertising-v1.png','nv30-overview-photo'));}
      const process=root.querySelector('.nv-process');
      if(process){heading(process.querySelector('h2'),'PROCESS');process.dataset.nv30Word='PROCESS';const steps=process.querySelector('.nv-steps');if(steps&&!steps.closest('.nv30-process-grid')){const row=document.createElement('div');row.className='nv30-process-grid';steps.before(row);row.append(img('process.png'),steps);}}
      const map=[['.nv-services','SERVICES'],['.nv-business','SUPPORT'],['.nv-industries','INDUSTRIES'],['.nv-company','COMPANY']];
      map.forEach(([sel,en])=>{const s=root.querySelector(sel);if(s){heading(s.querySelector('h2'),en);if(en==='SERVICES'||en==='INDUSTRIES')s.dataset.nv30Word=en;}});
      root.querySelectorAll('.nv-services .nv-photo-link').forEach((a,i)=>{if(!a.querySelector('img'))a.prepend(img(['advertising-v1.png','analytics-v1.png','social-v1.png','website-v1.png'][i]));const arrow=a.querySelector('.nv-arrow');if(arrow)a.append(arrow);});
      const company=root.querySelector('.nv-company-copy');if(company&&!company.querySelector('p')){const p=document.createElement('p');p.textContent='マーケティング戦略の立案から施策の実行、分析、改善までを支援しています。';company.querySelector('h2').after(p);}
    }else{
      const utility=root.classList.contains('nv23-utility');
      root.querySelectorAll('.r24-service-card').forEach((card,i)=>{card.classList.add('nv30-service-card');if(!card.querySelector('img'))card.prepend(img(['advertising-v1.png','analytics-v1.png','social-v1.png','website-v1.png','process.png'][i%5]));});
      const mast=root.querySelector('.nv-cmo-title');
      const titles={'cmo':'CMO','marketing-support':'MARKETING','ads':'ADVERTISING','seo':'SEO / AI SEARCH','sns':'SOCIAL MEDIA','web':'WEB DESIGN','dx':'DX / AX','crm':'CRM','global':'GLOBAL','manufacturing':'MANUFACTURING','healthcare':'HEALTHCARE','company':'COMPANY','service':'SERVICES','industry':'INDUSTRIES','contact':'CONTACT','column':'INSIGHTS'};
      const title=titles[location.pathname.split('/').filter(Boolean).pop()];
      if(mast&&title&&!mast.querySelector('.nv-en')){const en=document.createElement('p');en.className='nv-en';en.textContent=title;en.setAttribute('aria-hidden','true');mast.append(en);}
      const mastEnglish=mast?.querySelector('.nv-en');if(mastEnglish&&mastEnglish.textContent.length>12)mastEnglish.classList.add('nv30-long-title');
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
      root.querySelectorAll('.nv-cmo-challenges .nv-issue-list').forEach(list=>{list.classList.add('nv30-cards');[...list.children].forEach((li,i)=>{if(!li.querySelector('img'))li.querySelector('b')?.after(img('concern-'+([3,2,1][i%3])+'.png','nv30-issue-image'));});});
      if(location.pathname==='/service/cmo'){
        const research=root.querySelector('.nv30-research .nv-wrap');if(research){research.classList.add('nv30-research-grid');const old=research.querySelector('img');if(old){old.src=base+'process.png';old.className='nv30-research-photo';}else research.append(img('process.png','nv30-research-photo'));}
        const execution=root.querySelector('.nv-execution .nv-split');if(execution){const old=execution.querySelector('img');if(old){old.src=base+'website-v1.png';old.className='nv30-execution-photo';}else execution.append(img('website-v1.png','nv30-execution-photo'));}
      }
    }
  }
  function init(){document.body.classList.add('nv30');const main=document.querySelector('main.nv23');if(main)apply(main,main.classList.contains('nv23-home'));
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
      document.addEventListener('focusin',e=>{const n=e.target.closest('.nv30-reveal');if(n)reveal(n);});
      window.addEventListener('beforeprint',()=>targets.forEach(reveal));
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
