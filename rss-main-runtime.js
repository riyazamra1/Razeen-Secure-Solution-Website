(()=>{
'use strict';
const root=document.documentElement;
const header=document.querySelector('.site-header');
if(!header)return;

// Main-page appearance toggle
const appearance=header.querySelector('.appearance-toggle');
if(appearance&&!appearance.dataset.rssMainReady){
  appearance.dataset.rssMainReady='1';
  if(!appearance.querySelector('.knob')) appearance.insertAdjacentHTML('afterbegin','<span class="knob"></span>');
  const setTheme=t=>{
    root.dataset.theme=t;
    try{localStorage.setItem('rss-theme',t)}catch(e){}
    appearance.classList.toggle('dark',t==='dark');
    appearance.setAttribute('aria-label',t==='dark'?'Switch to light appearance':'Switch to dark appearance');
  };
  let saved='light';
  try{saved=localStorage.getItem('rss-theme')||'light'}catch(e){}
  setTheme(saved==='dark'?'dark':'light');
  appearance.addEventListener('click',()=>setTheme(root.dataset.theme==='dark'?'light':'dark'));
}

// Main-page mobile menu
const nav=header.querySelector('.nav');
const menu=header.querySelector('.menu-btn');
if(nav&&menu&&!menu.dataset.rssMainReady){
  menu.dataset.rssMainReady='1';
  const close=()=>{nav.classList.remove('open');menu.textContent='☰';menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open menu')};
  menu.addEventListener('click',e=>{
    e.stopPropagation();
    const open=!nav.classList.contains('open');
    nav.classList.toggle('open',open);
    menu.textContent=open?'×':'☰';
    menu.setAttribute('aria-expanded',String(open));
    menu.setAttribute('aria-label',open?'Close menu':'Open menu');
  });
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
  document.addEventListener('click',e=>{if(nav.classList.contains('open')&&!nav.contains(e.target)&&e.target!==menu)close()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
}
})();
