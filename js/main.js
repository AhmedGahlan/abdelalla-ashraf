(function(){
var $=function(s){return document.querySelector(s)};
var page=location.pathname.split('/').pop()||'index.html';
var links=[['index.html','الرئيسية'],['index.html#services','خدماتي'],['about.html','من أنا'],['projects.html','أعمالي']];
document.body.insertAdjacentHTML('afterbegin','<nav><a class="logo" href="index.html"><i>✦</i>عبدالله<b>.</b></a><ul id="menu">'+links.map(function(l){return '<li><a class="'+(page===l[0]?'on':'')+'" href="'+l[0]+'">'+l[1]+'</a></li>'}).join('')+'</ul><div class="row"><button id="theme" aria-label="تبديل الوضع">◐</button><a class="cta" href="contact.html">لنتحدث</a><button class="burger" id="burger" aria-label="القائمة">☰</button></div></nav>');
document.body.insertAdjacentHTML('beforeend','<footer>© '+new Date().getFullYear()+' '+SITE.name+' — جميع الحقوق محفوظة</footer>');
$('#burger').onclick=function(){$('#menu').classList.toggle('open')};
$('#menu').onclick=function(){$('#menu').classList.remove('open')};
$('#theme').onclick=function(){var r=document.documentElement,d=r.dataset.theme?r.dataset.theme==='dark':matchMedia('(prefers-color-scheme:dark)').matches;r.dataset.theme=d?'light':'dark'};
function card(p,i){
 var cover=p.image?'<img src="'+p.image+'" alt="'+p.title+'" loading="lazy" style="width:100%;height:100%;object-fit:cover">':
 (p.type==='slide'||p.type==='design')?'<div class="slide"><b style="background:'+p.main+'"></b><u></u><u></u><em style="background:'+p.c1+'"></em></div>':
 '<div class="book" style="background:'+p.main+';color:'+(p.text||'#fff')+'">'+p.short+'<i></i></div>';
 return '<article class="card reveal" data-i="'+i+'" data-cat="'+p.type+'"><div class="cover" style="background:linear-gradient(135deg,'+p.c1+','+p.c2+')">'+cover+'</div><div class="info"><small>'+p.label+'</small><h3>'+p.title+'</h3><p>'+p.desc+'</p>'+(p.canva?'<span class="view">عرض المشروع ←</span>':'')+'</div></article>';
}
var grid=$('#projects');if(grid){var n=+grid.dataset.limit||PROJECTS.length;grid.innerHTML=PROJECTS.slice(0,n).map(card).join('')}
var fl=$('#filters'),names={book:'كتب',slide:'عروض تقديمية',design:'تصميمات'},ty=[];
PROJECTS.forEach(function(p){if(ty.indexOf(p.type)<0)ty.push(p.type)});
if(fl){if(ty.length>1)fl.innerHTML='<button class="on" data-f="all">الكل</button>'+ty.map(function(t){return '<button data-f="'+t+'">'+names[t]+'</button>'}).join('');else fl.hidden=true}
document.querySelectorAll('.filters button').forEach(function(b){b.onclick=function(){
 document.querySelectorAll('.filters button').forEach(function(x){x.classList.remove('on')});b.classList.add('on');
 document.querySelectorAll('#projects .card').forEach(function(c){c.hidden=b.dataset.f!=='all'&&c.dataset.cat!==b.dataset.f})}});
var tel='tel:+20'+SITE.phone.slice(1);
var l=$('#links');if(l)l.innerHTML=(SITE.linkedin?'<a class="link" href="'+SITE.linkedin+'" target="_blank" rel="noopener"><small>لينكدإن</small>LinkedIn</a>':'')+'<a class="link" href="https://wa.me/20'+SITE.phone.slice(1)+'" target="_blank" rel="noopener"><small>واتساب</small>WhatsApp</a><a class="link" href="'+tel+'"><small>اتصل بي</small>'+SITE.phone+'</a><a class="link" href="mailto:'+SITE.email+'"><small>البريد الإلكتروني</small>'+SITE.email+'</a>';
var so=$('#socials');if(so)so.innerHTML=(SITE.linkedin?'<a href="'+SITE.linkedin+'" target="_blank" rel="noopener" aria-label="LinkedIn">in</a>':'')+'<a href="https://wa.me/20'+SITE.phone.slice(1)+'" target="_blank" rel="noopener" aria-label="WhatsApp">wa</a><a href="mailto:'+SITE.email+'" aria-label="Email">@</a><a href="'+tel+'" aria-label="Phone">☎</a>';
var tg=$('#tags');if(tg)tg.innerHTML=SITE.tags.map(function(s){return '<span>'+s+'</span>'}).join('');
var sk=$('#skills-list');if(sk)sk.innerHTML=SITE.skills.map(function(s){return '<span>'+s+'</span>'}).join('');
var cv=$('#cv');if(cv){if(SITE.cv)cv.href=SITE.cv;else cv.hidden=true}
var sv=$('#svc');if(sv){sv.innerHTML=SITE.services.map(function(s,i){return '<div class="svc-item'+(i===1?' open':'')+'"><div class="svc-row"><span class="n">0'+(i+1)+'</span><h3>'+s.t+'</h3><span class="go">←</span></div><div class="svc-body"><div><div class="svc-tags">'+s.tags.map(function(t){return '<span>'+t+'</span>'}).join('')+'</div><p>'+s.d+'</p></div></div></div>'}).join('');
 sv.onclick=function(e){var it=e.target.closest('.svc-item');if(!it)return;var was=it.classList.contains('open');sv.querySelectorAll('.svc-item').forEach(function(x){x.classList.remove('open')});if(!was)it.classList.add('open')}}
var mq=$('#mq');if(mq){var it=['تصميم كتب','عروض تقديمية','أغلفة','تنسيق','طباعة'],h='';for(var k=0;k<4;k++)it.forEach(function(x){h+='<span>'+x+'</span><em>✦</em>'});mq.innerHTML=h}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');
 e.target.querySelectorAll('[data-n]').forEach(function(c){var n=+c.dataset.n,i=0,s=Math.max(1,Math.ceil(n/40)),id=setInterval(function(){i=Math.min(n,i+s);c.textContent=i;if(i>=n)clearInterval(id)},35)});io.unobserve(e.target)}})},{threshold:.12});
document.querySelectorAll('.reveal').forEach(function(el,i){el.style.transitionDelay=(i%3)*.1+'s';io.observe(el)});
document.body.insertAdjacentHTML('beforeend','<div class="modal" id="modal"><div class="modal-box"><div class="modal-bar"><b id="mt"></b><span><a id="mo" target="_blank" rel="noopener">افتح في Canva ↗</a><button id="mx" aria-label="إغلاق">✕</button></span></div><div class="embed"><iframe id="mf" title="المشروع" allowfullscreen></iframe></div></div></div>');
function closeM(){$('#modal').classList.remove('open');$('#mf').src='about:blank';document.body.style.overflow=''}
document.addEventListener('click',function(e){var c=e.target.closest('.card[data-i]');
 if(c){var p=PROJECTS[c.dataset.i];if(p&&p.canva){$('#mt').textContent=p.title;$('#mo').href=p.canva;$('#mf').src=p.canva+'?embed';$('#modal').classList.add('open');document.body.style.overflow='hidden'}return}
 if(e.target.id==='modal'||e.target.id==='mx')closeM()});
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeM()});
})();
