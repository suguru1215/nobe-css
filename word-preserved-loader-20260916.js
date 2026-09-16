/* Keep restored pages unchanged; do not rewrite newly source-bound Word copy. */
(function(){
 // Webflow's preview evaluates external custom code as inline code (empty src).
 // The fallback is an immutable revision containing the same compatibility script.
 const source=document.currentScript&&document.currentScript.src;
 const root=source?new URL('.',source).href:'https://cdn.jsdelivr.net/gh/suguru1215/nobe-css@e2b67b56b32e721cbbe078fb945682636082b07c/';
 function script(src){const s=document.createElement('script');s.src=src;document.body.append(s);}
 function init(){
  if(!document.querySelector('[data-word-revision]')){script('https://cdn.jsdelivr.net/gh/suguru1215/nobe-css@7d52745/final-remediation-loader-20260916.js');return;}
  for(const file of ['final-remediation-20260916.css','support-cards-20260916.css']){const l=document.createElement('link');l.rel='stylesheet';l.href='https://cdn.jsdelivr.net/gh/suguru1215/nobe-css@bad8742/css/'+file;document.head.append(l);}
  script('https://cdn.jsdelivr.net/gh/suguru1215/nobe-css@16c976a/industry-hero-reference-20260916.js');
  script(root+'word-preserved-compat-20260916.js');
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
