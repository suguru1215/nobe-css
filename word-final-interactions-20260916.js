/* Interactions only. Approved page content is rendered by Webflow/CMS, never replaced here. */
(function(){
  function init(){
    const root=document.querySelector('.nv3');if(!root)return;
    initContact();
    document.addEventListener('click',e=>{const a=e.target.closest('a[href="/contact"]');if(!a)return;const position=a.closest('header')?'header':a.closest('footer')?'footer':a.closest('.nv3-hero')?'hero':'content';track('contact_cta_click',{position});});
    const button=root.querySelector('.nv3-menu'),nav=root.querySelector('.nv3-nav');if(!button||!nav)return;
    const mq=matchMedia('(max-width:768px)');let priorOverflow='';
    function close(restore){nav.classList.remove('is-open');button.setAttribute('aria-expanded','false');button.setAttribute('aria-label','メニューを開く');document.body.style.overflow=priorOverflow;if(restore)button.focus();}
    button.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')!=='true';if(!open){close(false);return}priorOverflow=document.body.style.overflow;nav.classList.add('is-open');button.setAttribute('aria-expanded','true');button.setAttribute('aria-label','メニューを閉じる');document.body.style.overflow='hidden';});
    root.querySelector('.nv3-header').addEventListener('keydown',e=>{if(button.getAttribute('aria-expanded')!=='true')return;if(e.key==='Escape'){e.preventDefault();close(true)}if(e.key==='Tab'){const focusables=[button,...nav.querySelectorAll('a')],first=focusables[0],last=focusables.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>close(false)));mq.addEventListener('change',()=>close(false));
  }
  // No measurement ID is invented. These PII-free events are ready for a NOVE-owned container.
  function track(event,params){window.dataLayer=window.dataLayer||[];window.dataLayer.push({event,page_path:location.pathname,...params});}
  function initContact(){
    const form=document.getElementById('contact-form');if(!form||form.dataset.validationReady)return;
    form.dataset.validationReady='true';form.noValidate=true;
    const wrapper=form.closest('.w-form'),success=wrapper.querySelector('.w-form-done'),failure=wrapper.querySelector('.w-form-fail');
    success.setAttribute('aria-live','polite');failure.setAttribute('aria-live','assertive');
    const fields=['company_name','full_name','email','consultation_details','website_url','privacy_consent'];
    let started=false,inFlight=false,converted=false;
    form.addEventListener('input',()=>{if(!started){started=true;track('contact_form_start',{});}});
    function message(el){
      if(el.type==='checkbox')return el.checked?'':'個人情報の取り扱いへの同意が必要です。';
      const v=el.value.trim();
      if(el.required&&!v)return ({company_name:'会社名',full_name:'お名前',email:'メールアドレス',consultation_details:'ご相談内容'}[el.id]||'この項目')+'を入力してください。';
      if(el.maxLength>0&&el.value.length>el.maxLength)return el.maxLength+'文字以内で入力してください。';
      if(el.id==='email'&&v&&(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)||el.validity.typeMismatch))return '正しいメールアドレスを入力してください。';
      if(el.id==='website_url'&&v){try{const u=new URL(v);if(!['http:','https:'].includes(u.protocol)||!u.hostname)return 'http:// または https:// から始まるURLを入力してください。';}catch(_){return 'http:// または https:// から始まるURLを入力してください。';}}
      return '';
    }
    function show(el,msg){const error=document.getElementById(el.id+'-error');error.textContent=msg;error.hidden=!msg;if(msg)el.setAttribute('aria-invalid','true');else el.removeAttribute('aria-invalid');}
    form.addEventListener('submit',e=>{
      if(inFlight||converted){e.preventDefault();e.stopImmediatePropagation();return;}
      const invalid=[];fields.forEach(id=>{const el=document.getElementById(id),msg=message(el);show(el,msg);if(msg)invalid.push(el);});
      const status=document.getElementById('contact-validation-status');
      if(invalid.length){e.preventDefault();e.stopImmediatePropagation();status.hidden=false;status.textContent='入力内容をご確認ください。修正が必要な項目は'+invalid.length+'件です。';track('contact_form_validation_error',{error_count:invalid.length});invalid[0].focus();return;}
      status.hidden=true;inFlight=true;
      // Leave request, storage, spam protection and button locking to Webflow's standard handler.
    },true);
    fields.forEach(id=>{const el=document.getElementById(id);el.addEventListener('input',()=>{if(el.hasAttribute('aria-invalid'))show(el,message(el));});el.addEventListener('change',()=>{if(el.hasAttribute('aria-invalid'))show(el,message(el));});});
    const visible=e=>getComputedStyle(e).display!=='none';
    new MutationObserver(()=>{if(!inFlight)return;if(visible(success)){inFlight=false;if(!converted){converted=true;track('generate_lead',{});}}else if(visible(failure)){inFlight=false;}}).observe(wrapper,{subtree:true,attributes:true,attributeFilter:['style','class']});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
