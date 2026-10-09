/* Apply the existing above-the-fold design while HTML is parsed, before deferred Webflow scripts. */
(function(){
  'use strict';
  // Preview may inline this script; retain the existing published asset directory.
  const assetBase=new URL('https://cdn.jsdelivr.net/gh/suguru1215/nobe-css@6f3e4b394587ce92e1a2b9b5b5d45f49a3abc214/design-20260930/assets/');
  let posterPreloaded=false;
  let contactPrepared=false;
  function prepare(){
    // Contact uses native Webflow markup rather than main.nv23. Apply its existing
    // final layout while parsing, before the deferred design pass can move it.
    if(location.pathname.replace(/\/$/,'')==='/contact'){
      const contact=document.querySelector('main');
      if(!contact)return false;
      document.body.classList.add('nv30','nv35-lower','nv36-polish','nv38-parity');
      contact.classList.add('nv30-contact');contact.dataset.nv33Page='/contact';contact.dataset.nv35Kind='contact';
      const heading=contact.querySelector('h1');
      if(heading?.textContent.trim()&&!contact.querySelector('.nv33-native-label')){
        const label=document.createElement('span');label.className='nv33-native-label';label.textContent='CONTACT';label.setAttribute('aria-hidden','true');heading.before(label);
      }
      // Reuse the site's already approved native presentation pass. It preserves
      // field nodes and leaves validation, Turnstile and submission to Webflow.
      const form=contact.querySelector('#contact-form');
      if(!contactPrepared&&form?.querySelector('[type="submit"]')&&typeof reviseNoveContact==='function'){
        contactPrepared=true;reviseNoveContact(document);
      }
      // Reserve the already-approved final hero before first paint. Only the
      // completed hero section moves; the native form and its field nodes stay put.
      const mast=contact.querySelector(':scope>.section_pagehero');
      if(contactPrepared&&mast&&!contact.querySelector('.nv47-contact')){
        const hero=document.createElement('div');hero.className='nv47-lower-hero nv47-contact';
        mast.before(hero);hero.append(mast);mast.classList.add('nv47-mast');
        const logo=document.createElement('img');logo.className='nv47-mark';logo.alt='';logo.setAttribute('aria-hidden','true');
        logo.src='https://cdn.jsdelivr.net/gh/suguru1215/nobe-css@87f91353dfa508d8ae03f3f506ec7a876850c93d/design-20260930/assets/figma-3358-28/01779.png';hero.append(logo);
      }
      return contactPrepared;
    }
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
