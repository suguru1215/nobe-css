/* Apply the existing above-the-fold design while HTML is parsed, before deferred Webflow scripts. */
(function(){
  'use strict';
  const assetBase=new URL('./assets/',document.currentScript.src);
  let posterPreloaded=false;
  function prepare(){
    const main=document.querySelector('main.nv23');
    if(!main)return false;
    document.body.classList.add('nv30','nv36-polish');
    if(main.classList.contains('nv23-home')){
      document.body.classList.add('nv34-home');
      if(!posterPreloaded){const link=document.createElement('link');link.rel='preload';link.as='image';link.href=new URL('hero-poster.webp',assetBase).href;link.fetchPriority='high';document.head.append(link);posterPreloaded=true;}
      const heading=main.querySelector('.nv-hero h1');
      if(!heading||!heading.textContent.trim())return false;
      if(heading.textContent.replace(/\s/g,'')==='マーケティングの戦略づくりから、施策の実行まで。'){
        heading.innerHTML='<span class="nv30-hero-line">マーケティングの</span><span class="nv30-hero-line">戦略づくりから</span><span class="nv30-hero-line">施策の実行まで</span>';
      }
    }else{
      // Reuse the final lower-page classes and existing English label before first paint.
      // No font loading mode, hidden content, layout dimensions or copy are changed.
      const route=location.pathname.replace(/\/$/,'')||'/',key=route.split('/').pop();
      const kinds={'/service':'service-index','/industry':'industry-index','/company':'company','/column':'insights','/contact':'contact','/privacy':'privacy','/sitemap':'sitemap'};
      const kind=kinds[route]||(route==='/service/cmo'?'cmo':route.startsWith('/service/')?'service-detail':route.startsWith('/industry/')?'industry-detail':null);
      if(!kind)return true;
      document.body.classList.add('nv35-lower','nv38-parity');main.dataset.nv35Kind=kind;
      main.classList.add('nv30-main');
      if(['cmo','service-detail','industry-detail'].includes(kind))main.querySelector('.nv-cmo-intro .r24-intro>.nv-copy')?.classList.add('nv42-intro-copy');
      // Reserve the existing D01 reading order before the compact heading is painted.
      // The deferred pass reuses these exact nodes and still performs its normal work.
      if(['cmo','service-detail','industry-detail'].includes(kind)){
        const grid=main.querySelector('.nv-cmo-intro>.r24-intro'),copy=grid?.querySelector(':scope>.nv-copy');
        const statement=grid?.querySelector('h2');
        if(copy&&statement?.textContent.trim()&&!copy.contains(statement))copy.prepend(statement);
      }
      main.querySelectorAll(':scope>section').forEach(s=>{s.dataset.nv38Role=s.matches('.nv-hero,.nv-cmo-mast,.section_pagehero')?'mast':s.matches('.nv-cta')?'cta':s.matches('.nv-cmo-intro')?'intro':s.matches('.nv-cmo-challenges,.nv-challenge-wrap')?'challenge':s.matches('.nv30-faq')?'faq':s.matches('.nv30-related')?'related':'content';});
      const titles={cmo:'CMO Services','marketing-support':'MARKETING',ads:'ADVERTISING',seo:'SEO / AI SEARCH',sns:'SOCIAL MEDIA',web:'WEB DESIGN',dx:'DX / AX',crm:'CRM',global:'GLOBAL',saas:'IT / SaaS',manufacturing:'MANUFACTURING',ec:'EC / D2C',construction:'CONSTRUCTION',realestate:'REAL ESTATE','hr-recruiting':'HUMAN RESOURCES',finance:'FINANCE',medical:'HEALTHCARE',professional:'PROFESSIONAL',company:'COMPANY',service:'SERVICES',industry:'INDUSTRIES',contact:'CONTACT',column:'INSIGHTS'};
      const mast=main.querySelector('.nv-cmo-title'),heading=mast?.querySelector('h1');
      if(!heading||!heading.textContent.trim())return false;
      if(titles[key]&&!mast.querySelector('.nv-en')){const en=document.createElement('p');en.className='nv-en';en.textContent=titles[key];en.setAttribute('aria-hidden','true');if(en.textContent.length>12)en.classList.add('nv30-long-title');heading.before(en);}
      if(route==='/industry'){
        const catalog=main.querySelector('.nv-catalog');if(!catalog?.querySelector('h2'))return false;
        if(!catalog.querySelector('.nv30-en')){const en=document.createElement('span');en.className='nv30-en';en.textContent='INDUSTRIES';en.setAttribute('aria-hidden','true');en.dataset.nvBootHeading='true';catalog.prepend(en);}
        catalog.closest('section').classList.add('nv30-industries');
      }
      // The service feature already gets this same final structure in design.js.
      // Prepare it before paint so a compact main visual cannot expose its later relocation.
      if(route==='/service'){
        const feature=main.querySelector('.r24-copy-section:has(>.nv-copy:only-child)');
        const copy=feature?.querySelector('.nv-copy'),h=copy?.querySelector('h2');
        if(feature&&h?.textContent.trim()){
          const header=document.createElement('div');header.className='nv30-heading nv30-service-feature-heading';
          const en=document.createElement('span');en.className='nv30-en';en.textContent='STRATEGY';en.setAttribute('aria-hidden','true');en.dataset.nvBootHeading='true';
          header.append(en,h);feature.before(header);feature.classList.add('nv30-service-feature');
          feature.closest('section').classList.add('nv30-services');
          const image=document.createElement('img');image.src=new URL('advertising-v1.jpg',assetBase).href;image.alt='';image.className='nv30-service-feature-photo';image.loading='lazy';image.decoding='async';feature.prepend(image);
        }
      }
      // Reuse existing card and company-policy structure before the deferred design pass.
      main.querySelectorAll('.nv-cmo-challenges .nv-issue-list').forEach(list=>list.classList.add('nv30-cards'));
      if(route==='/company'){
        const copy=main.querySelector('.r24-copy-section>.nv-copy'),h=copy?.querySelector('h2');
        if(copy&&h?.textContent.trim()&&!copy.previousElementSibling?.classList.contains('nv35-policy-heading')){
          const section=copy.closest('section');section.classList.add('nv30-policy');section.dataset.nv30Word='POLICY';
          const group=document.createElement('div');group.className='nv35-policy-heading';
          const en=document.createElement('span');en.className='nv30-en';en.textContent='POLICY';en.setAttribute('aria-hidden','true');en.dataset.nvBootHeading='true';
          group.append(en,h);copy.before(group);
        }
      }
      // Continue through parser chunks so intro sections also receive their final spacing role.
      return document.readyState!=='loading';
    }
    return true;
  }
  if(!prepare()){
    const observer=new MutationObserver(()=>{if(prepare())observer.disconnect();});
    observer.observe(document.documentElement,{childList:true,subtree:true});
    document.addEventListener('DOMContentLoaded',()=>{prepare();observer.disconnect();},{once:true});
  }
})();
