(function(){function init(){
 const slug=location.pathname.replace(/\/$/,'').split('/').pop();
 const config={
  manufacturing:{name:'製造業',issues:['用途に合う問い合わせ','技術・強みの伝え方','Webからの新規相談'],research:['製品・用途と情報の確認','流入・問い合わせの分析'],improve:['用途から探せる情報設計','技術相談・見積もりの導線','根拠に基づく製品表現']},
  saas:{name:'IT・SaaS',issues:['対象顧客からの相談','課題と価値の伝え方','改善の優先順位'],research:['対象顧客と検討導線の確認','集客・商談情報の分析'],improve:['配信対象と訴求の見直し','検討に必要な情報の整備','現在の施策の改善を優先']},
  ec:{name:'EC・D2C',issues:['広告費と売上の関係','商品ページからの購入','広告・SNS・商品の訴求'],research:['商品の訴求と購入導線の確認','流入・購入・販促費の分析'],improve:['訴求と掲載情報の見直し','購入前の情報を整理','顧客接点と費用を検討']}
 }[slug];
 const main=document.querySelector('main.nove-industry-detail');if(!config||!main||main.classList.contains('nove-industry-polished'))return;
 main.classList.add('nove-industry-polished');
 const base='https://cdn.jsdelivr.net/gh/suguru1215/nobe-css@7491609/img/';
 const image=(file,cl)=>{const img=document.createElement('img');img.src=base+file;img.alt='';img.loading='lazy';img.className=cl;return img;};
 const heading=(text)=>{const h=document.createElement('h3');h.textContent=text;return h;};
 const num=i=>{const n=document.createElement('span');n.className='industry-step-number';n.textContent=String(i+1).padStart(2,'0');n.setAttribute('aria-hidden','true');return n;};
 // Remove only the duplicate contact copy beneath related cards, not the final CTA.
 const grid=main.querySelector('.nove-related-grid');
 if(grid){let el=grid.nextElementSibling;while(el){const next=el.nextElementSibling;if(el.tagName==='P'&&(el.textContent.trim()==='お問い合わせ内容を確認後、メールで返信します。必要に応じて、30分の無料相談をご案内します。'||el.textContent.trim()==='相談フォームへ'))el.remove();el=next;}}
 const title=main.querySelector('h1');if(title){title.replaceChildren();const first=document.createElement('span'),second=document.createElement('span');first.textContent=config.name+'の';second.textContent='マーケティング支援';title.append(first,second);}
 const heroAction=main.querySelector('.nove-industry-hero .button-primary-4');if(heroAction&&!heroAction.querySelector('img')){heroAction.textContent='無料で相談する';heroAction.append(image('cta-arrow-orange.svg','industry-hero-arrow'));}
 main.querySelectorAll('.nove-industry-about li').forEach((li,i)=>{const p=document.createElement('p');p.textContent=li.textContent;li.replaceChildren(image('check-blue.svg','industry-issue-icon'),heading(config.issues[i]),p);});
 const sections=[...main.querySelectorAll('.nove-industry-section')];
 const research=sections.find(s=>s.querySelector('.nove-eyebrow')?.textContent==='RESEARCH');
 if(research){research.classList.add('industry-research-section');const container=research.querySelector('.container_large'),paras=[...container.querySelectorAll(':scope>p:not(.nove-eyebrow)')],layout=document.createElement('div'),copy=document.createElement('div');layout.className='industry-research-layout';copy.className='industry-research-copy';paras.forEach((p,i)=>{const block=document.createElement('div');block.className='industry-research-point';block.append(heading(config.research[i]),p);copy.append(block);});layout.append(image('seowd-1.jpg','industry-research-image'),copy);container.append(layout);}
 const improve=main.querySelector('.nove-industry-blue');
 if(improve){const container=improve.querySelector('.container_large'),p=container.querySelector(':scope>p:not(.nove-eyebrow)');if(p){const sentences=p.textContent.match(/[^。]+。?/g)||[],layout=document.createElement('div');layout.className='industry-improvement-grid';sentences.forEach((sentence,i)=>{const card=document.createElement('article');card.className='industry-improvement-card';const body=document.createElement('p');body.textContent=sentence;card.append(image(['seowd-3.jpg','seowd-4.jpg','seowd-5.jpg'][i%3],'industry-improvement-image'),num(i),heading(config.improve[i]||'施策の改善'),body);layout.append(card);});p.replaceWith(layout);}}
 const support=sections.find(s=>s.querySelector('.nove-eyebrow')?.textContent==='SUPPORT');
 if(support){support.classList.add('industry-support-section');const container=support.querySelector('.container_large'),layout=document.createElement('div');layout.className='industry-support-grid';[...container.querySelectorAll(':scope>p:not(.nove-eyebrow)')].forEach((p,i)=>{const card=document.createElement('article'),head=document.createElement('div');card.className='industry-support-card';head.className='industry-support-card-head';head.append(image('approach-'+(i+1)+'.svg','industry-support-icon'),heading(['課題に合わせた施策のご提案','施策の実行・レポート・改善'][i]));card.append(head,p);layout.append(card);});container.append(layout);}
 // Pass 3: SEO-style pill navigation for the long detail pages.
 const nav=document.createElement('nav');nav.className='industry-section-nav';nav.setAttribute('aria-label','ページ内メニュー');
 [[research,'industry-research','調査・分析'],[improve,'industry-improvement','改善提案'],[support,'industry-support','支援の進め方'],[main.querySelector('.nove-industry-faq'),'industry-faq','よくあるご質問']].forEach(([section,id,text])=>{if(!section)return;section.id=id;section.tabIndex=-1;const a=document.createElement('a');a.href='#'+id;a.textContent=text;nav.append(a);});
 if(heroAction)heroAction.before(nav);
}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();})();
