(function(){function init(){
 if(!/^\/industry\/(manufacturing|saas|ec)\/?$/.test(location.pathname))return;
 const hero=document.querySelector('.nove-industry-hero'),title=hero?.querySelector('h1'),button=hero?.querySelector('.button-primary-4');
 if(!hero||!title||!button||hero.classList.contains('nove-text-led-hero'))return;
 hero.classList.add('nove-text-led-hero');
 const label=document.createElement('p');label.className='industry-hero-kicker';label.textContent='業界別マーケティング支援';title.before(label);
 const lead=hero.querySelector('.hero-split-2>p:not(.industry-hero-kicker)');if(lead){const sentences=lead.textContent.match(/[^。]+。?/g)||[];lead.replaceChildren(...sentences.map(text=>{const span=document.createElement('span');span.className='industry-hero-lead-line';span.textContent=text.trim();return span;}));}
 const actions=document.createElement('div');actions.className='industry-hero-actions-reference';button.before(actions);actions.append(button);
 const secondary=document.createElement('a');secondary.className='industry-hero-secondary';secondary.href='#industry-research';secondary.textContent='支援内容を見る';
 secondary.addEventListener('click',e=>{const target=document.getElementById('industry-research');if(!target)return;e.preventDefault();e.stopPropagation();history.pushState(null,'',secondary.hash);target.focus({preventScroll:true});target.scrollIntoView({block:'start',behavior:'instant'});});actions.append(secondary);
}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();})();
