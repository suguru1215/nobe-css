/* NOVE final audit remediation — 2026-09-16. Copy source: 260910 integrated manuscript. */
(function(){
'use strict';
const faq={"/service/marketing-support":[["調査や提案に費用はかかりますか？","ご発注前の調査・分析・ご提案は無料です。ご発注後の支援から費用が発生します。"],["管理画面の権限がなくても相談できますか？","公開情報を用いた市場・競合の調査にも対応しています。ただし、実際の費用や成果の評価には、管理画面やレポート等の情報が必要です。"],["広告やSEOなど、一つの施策だけでも依頼できますか？","ご相談いただけます。ご希望の施策と現在の状況を伺い、改善内容と対応範囲をご提案します。"]],"/service/ads":[["今の運用を続けながら相談できますか？","現在の配信状況を伺い、見直すべき点を調べるところからご相談いただけます。変更の範囲や進め方は、分析後の提案でご確認いただきます。"],["管理画面を共有できない場合も相談できますか？","可能です。公開情報から市場・競合や広告の遷移先を調べます。配信実績に基づく判断には、管理画面の情報やレポートが必要です。"],["広告とあわせてサイトも改善できますか？","広告とサイトをあわせて確認し、必要な改善をご提案します。具体的な改修内容と対応範囲は、提案時に確定します。"]],"/service/seo":[["AI検索だけを相談することもできますか？","ご相談いただけます。対象としたいサービスと目的を伺い、サイトの現状を踏まえて必要な調査・対応を整理します。"],["検索順位やAIでの紹介を保証していますか？","順位や掲載、AIの回答での紹介は保証していません。確認できる情報から改善を検討し、実施後の状況を検証します。"],["新しい記事を作ることが前提ですか？","既存ページの内容や構成を調べてから判断します。修正と新規制作の必要性を整理し、優先する対応をご提案します。"]],"/service/sns":[["現在運用しているアカウントの改善を相談できますか？","ご相談いただけます。アカウントの目的と運用状況を伺い、投稿や競合の発信を調べて改善案を整理します。"],["利用するSNSが決まっていなくても相談できますか？","可能です。届けたい顧客と目的を伺い、市場・競合の状況から媒体を選ぶための判断材料を整理します。"],["投稿制作や撮影も依頼に含まれますか？","制作内容や必要な素材を伺い、対応する業務を提案時に確定します。投稿本数、素材の準備、撮影などは一律の条件として含めていません。"]],"/service/web":[["リニューアルするか決まっていなくても相談できますか？","可能です。現在のサイトを確認し、部分的な改修と全体の見直しについて、必要性と優先順位を整理します。"],["アクセス解析のデータがなくても相談できますか？","公開ページをもとに内容・構成・導線を確認できます。流入や利用状況の数値分析には、解析データやレポートが必要です。"],["広告やSEOとあわせて改善を相談できますか？","ご相談いただけます。サイトへの流入とページの内容をあわせて調べ、施策間のつながりを踏まえて改善をご提案します。"]],"/service/cmo":[["社内にマーケティング担当者がいても相談できますか？","はい。現在の担当者や外部パートナーの役割を伺い、NOVEがどこを補うとよいかを検討します。既存の体制に合わせて支援内容をご提案します。"],["CMO代行を依頼すれば、施策の実行もすべて含まれますか？","実行する施策と対応範囲は、ご提案時に整理します。CMO代行という名称だけで、一律にすべての作業を含むものではありません。"],["相談や提案には費用がかかりますか？","ご発注前の調査・分析・ご提案は無料です。ご発注後の支援から費用が発生します。"]],"/service/global":[["海外企業からの日本進出相談にも対応していますか？","はい。海外企業の日本展開に向けたマーケティングも対象です。商品・サービス、使用言語、現在の販売体制などを伺い、対応範囲をご提案します。"],["法人設立や通関なども含めて依頼できますか？","本サービスはマーケティングの支援です。法人設立、法務・税務、通関などの専門業務を一括して提供するものではありません。必要な場合は、専門家等への確認が必要です。"],["市場の調査や提案は有料ですか？","ご発注前の調査・分析・ご提案は無料です。ご発注後の支援から費用が発生します。対象市場やご相談内容を伺ったうえで、具体的な進め方をご案内します。"]],"/service/dx":[["導入するツールが決まっていなくても相談できますか？","はい。まず対象業務と解決したい課題を伺います。特定のツールを導入することを前提にせず、必要な対応を検討します。"],["システム開発やツールの導入も依頼できますか？","対象の業務、ツール、システムによって対応範囲が異なります。必要な作業を伺い、対応可否を確認したうえで、具体的な支援内容をご案内します。"],["相談から費用が発生しますか？","ご発注前の調査・分析・ご提案は無料です。ご発注後の支援から費用が発生します。"]],"/service/crm":[["CRMツールがなくても相談できますか？","はい。現在どのように顧客情報を管理しているかを伺い、情報の整理や活用に向けて必要な対応を検討します。"],["使用中のツールを変更する必要がありますか？","ツールの変更を前提にはしません。現在のツールと運用で改善できる点を確認し、新たな対応が必要な場合はその理由を整理します。対応可否はツールや作業内容によって異なります。"],["調査や提案には費用がかかりますか？","ご発注前の調査・分析・ご提案は無料です。ご発注後の支援から費用が発生します。"]],"/industry/saas":[["無料トライアルがないサービスでも相談できますか？","はい。問い合わせ、デモ、個別説明など、実際の販売方法に合わせて、サイトに必要な情報と申し込み導線を検討します。"],["広告やWebサイトの改善だけでも依頼できますか？","ご相談いただけます。現在の体制と課題を伺い、NOVEが担当する施策と範囲をご提案します。"],["相談や提案に費用はかかりますか？","ご発注前の調査・分析・ご提案は無料です。ご発注後の支援から費用が発生します。"]],"/industry/manufacturing":[["専門性の高い製品や受託加工でも相談できますか？","ご相談いただけます。用途、対応条件、検討時に確認される情報を伺い、集客とWebサイトでの伝え方を検討します。"],["問い合わせから受注まで時間がかかる場合は、何を確認しますか？","問い合わせ件数と内容、閲覧されたページなどを確認します。商談の状況をご共有いただける場合は、検討が進む相談の特徴も改善の参考にします。"],["相談や提案に費用はかかりますか？","ご発注前の調査・分析・ご提案は無料です。ご発注後の支援から費用が発生します。"]],"/industry/ec":[["広告運用だけ、商品ページの改善だけでも相談できますか？","はい。ご希望の施策を伺い、前後の導線も確認したうえで、改善案とNOVEが担当する範囲をご提案します。"],["管理画面を共有できなくても相談できますか？","はい。公開されている商品ページや市場・競合の情報から調査します。確認できない購入数や採算は推測で断定せず、検証が必要な仮説として整理します。"],["相談や提案に費用はかかりますか？","ご発注前の調査・分析・ご提案は無料です。ご発注後の支援から費用が発生します。"]]};
const base='https://cdn.jsdelivr.net/gh/suguru1215/nobe-css@7491609/img/';
const services=[
 ['marketing-support','マーケティング支援','市場・競合と現在の施策を調べ、改善策と優先順位を整理します。戦略・施策の企画から実行、分析、改善まで支援します。','seowd-1.jpg'],
 ['ads','広告運用','費用配分、配信対象、広告の訴求と遷移先を確認し、運用を見直します。','svcidx-4.jpg'],
 ['seo','SEO・AI検索対策','検索ニーズと自社・競合の情報を調べ、既存ページの改善や必要な情報の追加を検討します。','svcidx-2.jpg'],
 ['sns','SNS運用','発信の目的、投稿内容、反応と導線を確認し、運用方針と発信内容を見直します。','seowd-3.jpg'],
 ['web','Webサイト改善','商品やサービスの理解から問い合わせ・購入まで、内容、構成、導線を確認します。','svcidx-3.jpg'],
 ['cmo','CMO代行','マーケティング責任者の役割を外部から補う支援です。','svcidx-1.jpg'],
 ['global','海外進出・日本進出支援','海外市場と日本市場に向けたマーケティングを支援します。','svcidx-8.jpg'],
 ['dx','DX・AX支援','デジタル技術やAIの活用に関する支援です。','svcidx-6.jpg'],
 ['crm','CRM支援','顧客情報と顧客接点の活用に関する支援です。','svcidx-5.jpg']
];
const el=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text)e.textContent=text;return e};
function card(s){const a=el('a','nove-related-card');a.href='/service/'+s[0];const i=el('img');i.src=base+s[3];i.alt='';i.loading='lazy';const b=el('div','nove-related-body');b.append(el('h3','',s[1]),el('p','',s[2]));const more=el('span','nove-related-action','詳しくみる');const arrow=el('img');arrow.src=base+'svc-arrow.svg';arrow.alt='';more.append(arrow);b.append(more);a.append(i,b);return a}
function replaceFAQ(path){
 const pairs=faq[path];if(!pairs)return;
 const heading=[...document.querySelectorAll('h2')].find(e=>/よくあるご質問/.test(e.textContent));if(!heading)return;
 const section=heading.closest('section');if(!section)return;
 section.classList.add('nove-final-faq');
 const c=el('div','container_large');c.append(el('p','nove-eyebrow','FAQ'),el('h2','','よくあるご質問'));
 const list=el('div','nove-final-faq-list');
 pairs.forEach(([q,a])=>{const item=el('div','nove-final-faq-item');const h=el('h3');h.append(el('span','nove-final-q','Q'),document.createTextNode(q));item.append(h,el('p','',a));list.append(item)});
 c.append(list);section.replaceChildren(c);
}
function catalog(path){
 if(!['/','/service','/industry'].includes(path))return;
 const old=[...document.querySelectorAll('a[href="/service/data"]')].find(a=>a.querySelector('img')&&!a.closest('.footer_component,.header_component'));
 if(!old)return;
 let grid=old.parentElement;
 while(grid&&[...grid.children].filter(e=>e.querySelector('a[href^="/service/"]')||e.matches('a[href^="/service/"]')).length<6)grid=grid.parentElement;
 if(!grid)return;
 const cards=el('div','nove-related-grid nove-final-catalog');
 services.forEach(s=>cards.append(card(s)));grid.replaceWith(cards);
 const section=cards.closest('section');if(section){section.classList.add('nove-final-catalog-section');const h=section.querySelector('h2');if(h)h.textContent=path==='/'?'戦略から実行まで、9つのサービスで支援します。':'9つのサービスで事業成長を支援します。';}
}
function form(){
 const f=document.querySelector('.contactform_card');if(!f||f.dataset.finalForm)return;
 f.dataset.finalForm='true';
 // Keep the native form node and Webflow submission binding, plus the existing spam widget.
 f.querySelectorAll('input[type=checkbox]').forEach(e=>{e.checked=true;e.setCustomValidity('')});
 const spam=[...f.children].filter(e=>e.querySelector('[name="cf-turnstile-response"],iframe[src*="challenges.cloudflare"]')||e.matches('[name="cf-turnstile-response"],.cf-turnstile,[data-sitekey]'));
 const submit=f.querySelector('[type=submit]');[...f.children].filter(e=>!spam.includes(e)).forEach(e=>e.remove());f.id='contact-form';f.name='NOVE Contact';f.setAttribute('data-name','NOVE Contact');f.setAttribute('aria-label','お問い合わせ');f.noValidate=true;f.classList.add('nove-final-form');
 const specs=[['company_name','会社名','text',true,200,'organization'],['full_name','お名前','text',true,200,'name'],['email','メールアドレス','email',true,254,'email'],['consultation_topic','相談テーマ','select',false],['consultation_details','ご相談内容','textarea',true,3000],['website_url','WebサイトURL','url',false,2048,'url'],['privacy_consent','個人情報の取り扱いへの同意','checkbox',true]];
 const controls=[];
 specs.forEach(([id,label,type,required,max,auto])=>{
  const wrap=el('div','nove-final-field'),lab=el('label','',label);lab.htmlFor=id;lab.append(el('span','formfield_badge '+(required?'is-required':'is-optional'),required?'必須':'任意'));
  const input=el(type==='select'?'select':type==='textarea'?'textarea':'input');input.id=id;input.name=id;input.setAttribute('data-name',id);if(type!=='select'&&type!=='textarea')input.type=type;if(required)input.required=true;if(max)input.maxLength=max;if(auto)input.autocomplete=auto;
  if(type==='select'){['選択してください','まだ決まっていない','マーケティング全体の見直し','広告運用','SEO・AI検索対策','SNS運用','Webサイト改善','CMO代行','海外進出・日本進出','DX・AX','CRM','その他'].forEach((s,i)=>{const o=el('option','',s);o.value=i?s:'';input.append(o)})}
  if(type==='checkbox'){wrap.classList.add('nove-final-consent');lab.replaceChildren();const link=el('a','','プライバシーポリシー');link.href='/privacy';link.target='_blank';link.rel='noopener';lab.append(link,document.createTextNode('（別タブで開きます）を確認し、個人情報の取り扱いに同意する'),el('span','formfield_badge is-required','必須'));wrap.append(input,lab)}
  else wrap.append(lab,input);
  if(type==='textarea'){input.rows=6;const count=el('p','nove-final-hint','0 / 3000文字');count.id='count-details';input.addEventListener('input',()=>count.textContent=input.value.length+' / 3000文字');wrap.append(count)}
  const error=el('p','nove-final-error');error.id='error-'+id;error.hidden=true;input.setAttribute('aria-describedby',error.id+(type==='textarea'?' count-details':''));wrap.append(error);f.append(wrap);controls.push({input,error,label});
 });
 f.append(el('p','nove-final-hint','予算や実施時期のご希望は、ご相談内容にご記載ください。パスワードなどの機密情報は入力しないでください。'));
 if(submit){submit.value='相談内容を送信する';submit.setAttribute('data-wait','送信中…');submit.classList.add('nove-final-submit');f.append(submit)}
 spam.forEach(s=>s.style.order='99');
 function validate(c){const e=c.input;let m='';if(e.required&&(e.type==='checkbox'?!e.checked:!e.value.trim()))m=e.type==='checkbox'?'個人情報の取り扱いへの同意をご確認ください。':c.label+'を入力してください。';else if(e.type==='email'&&e.value&&!e.validity.valid)m='メールアドレスの形式を確認してください。';else if(e.type==='url'&&e.value&&(!e.validity.valid||!/^https?:\/\//i.test(e.value)))m='URLを https:// または http:// から入力してください。';else if(e.maxLength>0&&e.value.length>e.maxLength)m=e.maxLength+'文字以内で入力してください。';c.error.textContent=m;c.error.hidden=!m;e.setAttribute('aria-invalid',m?'true':'false');return !m}
 controls.forEach(c=>c.input.addEventListener('input',()=>{if(c.input.getAttribute('aria-invalid')==='true')validate(c)}));
 f.addEventListener('submit',e=>{let first;controls.forEach(c=>{if(!validate(c)&&!first)first=c.input});if(first){e.preventDefault();e.stopImmediatePropagation();first.focus()}},true);
 const wrap=f.closest('.w-form');const done=wrap?.querySelector('.w-form-done'),fail=wrap?.querySelector('.w-form-fail');if(done){done.textContent='お問い合わせを受け付けました。内容を確認のうえ、メールで返信します。';done.setAttribute('role','status');done.tabIndex=-1}if(fail){fail.textContent='送信できませんでした。時間をおいて再度お試しください。';fail.setAttribute('role','alert');fail.tabIndex=-1}
 if(window.jQuery){const state=window.jQuery(f).data('.w-form');if(state){state.name='NOVE Contact';state.wait='送信中…';state.label='相談内容を送信する'}}
 document.querySelectorAll('.header_component a[href="/contact"]').forEach(a=>a.remove());
 const lead=document.querySelector('.pagehero_lead');if(lead)lead.textContent='マーケティング全体の見直しから、広告・SEO・SNS・Webサイト改善、CMO代行、海外支援、DX・AX、CRMまで。現在の課題をお聞かせください。';
 const checklist=document.querySelector('.contactform_checklist');if(checklist){checklist.replaceChildren();services.forEach(s=>{const row=el('div','checkitem');const icon=el('img','checkitem_icon');icon.src=base+'check-icon.svg';icon.alt='';row.append(icon,el('span','checkitem_text',s[1]+'について相談したい'));checklist.append(row)})}
}
function init(){
 const path=location.pathname.replace(/\/$/,'')||'/';document.body.classList.add('nove-final-reviewed');
 replaceFAQ(path);catalog(path);
 if(path==='/industry')document.querySelector('.section_indlist')?.remove();
 if(path==='/service')document.querySelectorAll('p').forEach(p=>{if(/トップページの提供価値と連動|左から右へ流れる成長プロセスとして/.test(p.textContent))p.remove()});
 if(['/','/service','/industry','/contact'].includes(path)){
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
  nodes.forEach(n=>{if(n.parentElement.closest('script,style'))return;n.nodeValue=n.nodeValue.replace(/データ分析・ダッシュボード/g,'マーケティング支援').replace(/月額グロース支援/g,'マーケティング支援');});
 }
 const absent=['construction','realestate','professional','hr-recruiting','finance','medical'];
 document.querySelectorAll('a[href]').forEach(a=>{
  let u;try{u=new URL(a.getAttribute('href'),location.href)}catch(_){return}
  if(absent.some(s=>u.pathname==='/industry/'+s)){
   const d=el('div',a.className);d.append(...a.childNodes);d.querySelectorAll('[class*="arrow"],[class*="more"]').forEach(e=>e.remove());d.classList.add('nove-final-nonlink');a.replaceWith(d);return;
  }
  if(u.hostname==='nove-demo.webflow.io'&&a.getAttribute('href').startsWith('http'))a.setAttribute('href',u.pathname+u.search+u.hash);
  if(['/service/data','/service/growth','/method'].includes(u.pathname)){a.href='/service/marketing-support';if(!a.querySelector('img'))a.textContent='マーケティング支援'}
 });
 // Use the established illustration set throughout related cards, without new generated imagery.
 document.querySelectorAll('.nove-related-card').forEach(a=>{const s=services.find(s=>a.getAttribute('href')==='/service/'+s[0]);if(!s)return;const image=a.querySelector('img');if(image)image.src=base+s[3];const h=a.querySelector('h3'),p=a.querySelector('p');if(h)h.textContent=s[1];if(p)p.textContent=s[2]});
 if(path==='/service/ads')document.querySelectorAll('.svcdetailhero_button-navy .svcdetailhero_button-label').forEach(e=>e.textContent='マーケティング支援を見る');
 if(path==='/column'&&!document.querySelector('.nove-final-article-card')){
  const section=el('section','nove-final-articles'),wrap=el('div','container_large');const a=el('a','nove-final-article-card');a.href='/columns/marketing-review';a.append(el('p','nove-eyebrow','COLUMN'),el('h2','','マーケティング施策を見直すとき、最初に確認したいこと'),el('p','','費用と結果、顧客の検討過程、競合の訴求をどう確認し、改善の優先順位を考えるかを整理します。'),el('span','nove-final-read','記事を読む →'));wrap.append(a);section.append(wrap);document.querySelector('main')?.append(section);
 }
 if(path.startsWith('/columns/')){
  document.body.classList.add('nove-final-article');
  document.querySelectorAll('.w-richtext').forEach(e=>e.classList.add('nove-final-prose'));
  document.querySelectorAll('a[href="/contact"],a[href="/service/marketing-support"]').forEach(a=>{if(a.closest('.w-richtext'))a.classList.add('nove-final-inline-link')});
 }
 if(path==='/company'){
  const table=document.querySelector('[class*="companyinfo_table"],[class*="company_table"]');
  if(table&&!table.textContent.includes('上大崎')){
   const row=table.firstElementChild?.cloneNode(true);
   if(row){const cs=[...row.children];if(cs.length>=2){cs[0].textContent='所在地';cs[1].textContent='東京都品川区上大崎2丁目15番';table.append(row);const mail=row.cloneNode(true);mail.children[0].textContent='お問い合わせ';mail.children[1].replaceChildren();const a=el('a','','info@no-ve.co.jp');a.href='mailto:info@no-ve.co.jp';mail.children[1].append(a);table.append(mail)}}
  }
 }
 if(path==='/contact')form();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
