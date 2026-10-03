/* Apply the existing above-the-fold design while HTML is parsed, before deferred Webflow scripts. */
(function(){
  'use strict';
  const assetBase=new URL('./assets/',document.currentScript.src);
  let posterPreloaded=false;
  function prepare(){
    const main=document.querySelector('main.nv23');
    if(!main)return false;
    document.body.classList.add('nv30');
    if(main.classList.contains('nv23-home')){
      document.body.classList.add('nv34-home');
      if(!posterPreloaded){const link=document.createElement('link');link.rel='preload';link.as='image';link.href=new URL('hero-poster.webp',assetBase).href;link.fetchPriority='high';document.head.append(link);posterPreloaded=true;}
      const heading=main.querySelector('.nv-hero h1');
      if(!heading||!heading.textContent.trim())return false;
      if(heading.textContent.replace(/\s/g,'')==='マーケティングの戦略づくりから、施策の実行まで。'){
        heading.innerHTML='<span class="nv30-hero-line">マーケティングの</span><span class="nv30-hero-line">戦略づくりから</span><span class="nv30-hero-line">施策の実行まで</span>';
      }
    }
    return true;
  }
  if(!prepare()){
    const observer=new MutationObserver(()=>{if(prepare())observer.disconnect();});
    observer.observe(document.documentElement,{childList:true,subtree:true});
    document.addEventListener('DOMContentLoaded',()=>{prepare();observer.disconnect();},{once:true});
  }
})();
