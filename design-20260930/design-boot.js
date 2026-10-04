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
