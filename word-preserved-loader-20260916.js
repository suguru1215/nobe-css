/* Keep restored pages unchanged; do not rewrite newly source-bound Word copy. */
(function(){
 const root=new URL('.',document.currentScript.src).href;
 function script(src){const s=document.createElement('script');s.src=src;document.body.append(s);}
 function init(){
  if(!document.querySelector('[data-word-revision]')){script('https://cdn.jsdelivr.net/gh/suguru1215/nobe-css@7d52745/final-remediation-loader-20260916.js');return;}
  for(const file of ['final-remediation-20260916.css','support-cards-20260916.css']){const l=document.createElement('link');l.rel='stylesheet';l.href='https://cdn.jsdelivr.net/gh/suguru1215/nobe-css@bad8742/css/'+file;document.head.append(l);}
  script('https://cdn.jsdelivr.net/gh/suguru1215/nobe-css@16c976a/industry-hero-reference-20260916.js');
  script(root+'word-preserved-compat-20260916.js');
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
