(()=>{
'use strict';
const root=document.documentElement;

/* Sticky header: animate on BOTH scroll directions without removing it from view. */
const header=document.querySelector('.site-header');
let lastY=window.scrollY;
if(header){
  header.classList.add('rss-sticky-header');
  const syncHeader=()=>{
    const y=window.scrollY;
    header.classList.toggle('rss-scrolled',y>8);
    header.classList.toggle('rss-scroll-down',y>lastY+2 && y>90);
    header.classList.toggle('rss-scroll-up',y<lastY-2);
    lastY=y;
  };
  addEventListener('scroll',syncHeader,{passive:true});
  syncHeader();
}

/* Reliable left-side vertical percentage progress. */
let progress=document.querySelector('.rss-scroll-progress');
if(!progress){
  progress=document.createElement('div');
  progress.className='rss-scroll-progress';
  progress.innerHTML='<div class="rss-scroll-progress-track"><div class="rss-scroll-progress-fill"></div></div><span class="rss-scroll-progress-percent">0%</span>';
  document.body.appendChild(progress);
}
const fill=progress.querySelector('.rss-scroll-progress-fill');
const pct=progress.querySelector('.rss-scroll-progress-percent');
const updateProgress=()=>{
  const doc=document.documentElement;
  const max=Math.max(1,doc.scrollHeight-window.innerHeight);
  const value=Math.max(0,Math.min(100,(window.scrollY/max)*100));
  if(fill)fill.style.height=value.toFixed(2)+'%';
  if(pct)pct.textContent=Math.round(value)+'%';
};
addEventListener('scroll',updateProgress,{passive:true});
addEventListener('resize',updateProgress,{passive:true});
updateProgress();

/* Logo reliability: use the real RSS logo asset, bust stale caches, and fall back to the RSS mark if a server/cache returns an error. */
const logoUrl='assets/logos/rss-logo-name.png?v=20260916';
const logoFallback='assets/logos/rss-logo-only.png?v=20260916';
const repairLogo=(img,alt)=>{
  if(!img)return;
  img.alt=alt||img.alt||'Razeen Secure Solution';
  if(!img.dataset.rssLogoRepair){
    img.dataset.rssLogoRepair='1';
    img.addEventListener('error',()=>{
      if(img.dataset.rssLogoFallback!=='1'){
        img.dataset.rssLogoFallback='1';
        img.src=logoFallback;
      }
    },{once:true});
  }
  if(!img.src.includes('rss-logo-name.png')) img.src=logoUrl;
};
document.querySelectorAll('.site-header .brand img').forEach(img=>repairLogo(img,'Razeen Secure Solution'));

/* Keep exactly one footer logo: rss-logo-name.png. */
document.querySelectorAll('.footer').forEach(footer=>{
  const existing=footer.querySelectorAll('img');
  existing.forEach((img,i)=>{
    if(i>0)img.remove();
  });
  let brand=footer.querySelector('.footer-brand');
  if(!brand){brand=document.createElement('div');brand.className='footer-brand';footer.prepend(brand);}
  brand.querySelectorAll('img').forEach((img,i)=>{if(i>0)img.remove();});
  let img=brand.querySelector('img');
  if(!img){img=document.createElement('img');brand.prepend(img);}
  repairLogo(img,'Razeen Secure Solution');
  brand.querySelectorAll('div').forEach(el=>el.remove());
  footer.querySelectorAll(':scope > img, :scope > .footer-site-logo').forEach(el=>el.remove());
});

/* Rounded cards with theme-aware depth. */
document.querySelectorAll('.glass-card,.glass-panel,.project-card,.accomplishment-card,.cap-grid article').forEach(card=>card.classList.add('rss-rounded-card'));

/* Lottie Web Component: lightweight animated RSS accents. */
if(!document.querySelector('script[data-rss-lottie]')){
  const s=document.createElement('script');
  s.src='https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js';
  s.async=true;
  s.dataset.rssLottie='1';
  document.head.appendChild(s);
}
const addLottie=(host,scale)=>{
  if(!host||host.querySelector('.rss-lottie-accent'))return;
  const wrap=document.createElement('div');
  wrap.className='rss-lottie-accent';
  wrap.setAttribute('aria-hidden','true');
  wrap.innerHTML='<lottie-player class="rss-lottie-player" autoplay loop mode="normal"></lottie-player>';
  host.appendChild(wrap);
  const player=wrap.querySelector('lottie-player');
  const data={v:'5.7.4',fr:30,ip:0,op:90,w:160,h:160,nm:'RSS Pulse',ddd:0,assets:[],layers:[{ddd:0,ind:1,ty:4,nm:'Pulse',sr:1,ks:{o:{a:0,k:34},r:{a:0,k:0},p:{a:0,k:[80,80,0]},a:{a:0,k:[0,0,0]},s:{a:1,k:[{t:0,s:[78,78,100]},{t:45,s:[105,105,100]},{t:90,s:[78,78,100]}]}},ao:0,shapes:[{ty:'gr',it:[{ty:'el',p:{a:0,k:[0,0]},s:{a:0,k:[58,58]}},{ty:'st',c:{a:0,k:[0.84,0.65,0.2,1]},o:{a:0,k:70},w:{a:0,k:2},lc:2,lj:1},{ty:'tr',p:{a:0,k:[0,0]},a:{a:0,k:[0,0]},s:{a:0,k:[100,100]},r:{a:0,k:0},o:{a:0,k:100},sk:{a:0,k:0},sa:{a:0,k:0}}]}],ip:0,op:90,st:0,bm:0}]};
  player.load(JSON.stringify(data));
  if(scale)wrap.style.setProperty('--rss-lottie-scale',scale);
};
addLottie(document.querySelector('.hero-core'),'.48');
addLottie(document.querySelector('.accomplishments-intro'),'.32');
})();