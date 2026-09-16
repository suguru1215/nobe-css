/* Interactions only. Approved page content is rendered by Webflow/CMS, never replaced here. */
(function(){
  function init(){
    const root=document.querySelector('.nv3');if(!root)return;
    const button=root.querySelector('.nv3-menu'),nav=root.querySelector('.nv3-nav');if(!button||!nav)return;
    const mq=matchMedia('(max-width:768px)');let priorOverflow='';
    function close(restore){nav.classList.remove('is-open');button.setAttribute('aria-expanded','false');button.setAttribute('aria-label','メニューを開く');document.body.style.overflow=priorOverflow;if(restore)button.focus();}
    button.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')!=='true';if(!open){close(false);return}priorOverflow=document.body.style.overflow;nav.classList.add('is-open');button.setAttribute('aria-expanded','true');button.setAttribute('aria-label','メニューを閉じる');document.body.style.overflow='hidden';});
    root.querySelector('.nv3-header').addEventListener('keydown',e=>{if(button.getAttribute('aria-expanded')!=='true')return;if(e.key==='Escape'){e.preventDefault();close(true)}if(e.key==='Tab'){const focusables=[button,...nav.querySelectorAll('a')],first=focusables[0],last=focusables.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>close(false)));mq.addEventListener('change',()=>close(false));
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
