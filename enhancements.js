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

/* Lightweight local RSS pulse accents — no third-party runtime dependency. */
const addPulse=(host,scale)=>{
  if(!host||host.querySelector('.rss-local-pulse'))return;
  const wrap=document.createElement('span');
  wrap.className='rss-local-pulse';
  wrap.setAttribute('aria-hidden','true');
  wrap.style.setProperty('--rss-pulse-scale',scale||'.48');
  wrap.innerHTML='<span></span>';
  host.appendChild(wrap);
};
addPulse(document.querySelector('.hero-core'),'.48');
addPulse(document.querySelector('.accomplishments-intro'),'.32');
})();
/* RSS navigation + appearance controls: explicit handlers so the site works even
   when no framework/runtime is present. */
(()=>{
  const nav=document.querySelector('#mainNav');
  const menu=document.querySelector('.menu-btn');
  const theme=document.querySelector('.appearance-toggle');
  const closeMenu=()=>{
    if(!nav) return;
    nav.classList.remove('open');
    if(menu){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open menu');}
  };
  if(menu && nav){
    menu.addEventListener('click',e=>{
      e.preventDefault();
      const open=!nav.classList.contains('open');
      nav.classList.toggle('open',open);
      menu.setAttribute('aria-expanded',String(open));
      menu.setAttribute('aria-label',open?'Close menu':'Open menu');
    });
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
    document.addEventListener('click',e=>{
      if(!nav.classList.contains('open')) return;
      if(!nav.contains(e.target) && !menu.contains(e.target)) closeMenu();
    });
    document.addEventListener('keydown',e=>{if(e.key==='Escape') closeMenu();});
  }

  if(theme){
    if(!theme.querySelector('.knob')){
      const knob=document.createElement('span');
      knob.className='knob';
      knob.setAttribute('aria-hidden','true');
      theme.appendChild(knob);
    }
    const saved=localStorage.getItem('rss-theme');
    const preferred=window.matchMedia && matchMedia('(prefers-color-scheme: light)').matches;
    const applyTheme=mode=>{
      const dark=mode==='dark';
      document.documentElement.setAttribute('data-theme',dark?'dark':'light');
      theme.classList.toggle('dark',dark);
      theme.setAttribute('aria-label',dark?'Switch to light appearance':'Switch to dark appearance');
      theme.setAttribute('aria-pressed',String(dark));
    };
    applyTheme(saved || (preferred?'light':'dark'));
    theme.addEventListener('click',()=>{
      const next=document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark';
      applyTheme(next);
      localStorage.setItem('rss-theme',next);
    });
  }

  /* Make reveal animations deterministic instead of depending on a missing
     IntersectionObserver setup. */
  const revealAll=()=>{
    document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
  };
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('visible');io.unobserve(entry.target);}
    }),{threshold:.06});
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  }else revealAll();
  setTimeout(revealAll,1200);

  /* Reliable same-page navigation on touch devices. */
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
    const id=a.getAttribute('href');
    if(!id || id==='#') return;
    const target=document.querySelector(id);
    if(target){
      e.preventDefault();
      closeMenu();
      target.scrollIntoView({behavior:'smooth',block:'start'});
      history.replaceState(null,'',id);
    }
  }));
})();
