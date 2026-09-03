(()=>{
  const root=document.documentElement;
  const body=document.body;

  // Mobile navigation
  const menuButton=document.querySelector('.menu-btn');
  const nav=document.querySelector('.nav');
  if(menuButton&&nav){
    menuButton.addEventListener('click',()=>{
      const open=nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded',String(open));
      menuButton.textContent=open?'×':'☰';
    });
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded','false');
      menuButton.textContent='☰';
    }));
  }

  // Appearance control — compact floating pill inspired by modern mobile UI.
  const appearanceToggle=document.querySelector('.appearance-toggle');
  if(appearanceToggle){
    appearanceToggle.innerHTML='<span class="appearance-icon" aria-hidden="true">☼</span><span class="appearance-label">Dark</span>';
    appearanceToggle.setAttribute('aria-pressed','false');
  }
  const savedTheme=localStorage.getItem('rss-theme')||'light';
  const applyTheme=(theme)=>{
    root.dataset.theme=theme;
    localStorage.setItem('rss-theme',theme);
    if(appearanceToggle){
      const icon=appearanceToggle.querySelector('.appearance-icon');
      const label=appearanceToggle.querySelector('.appearance-label');
      if(icon) icon.textContent=theme==='dark'?'☾':'☼';
      if(label) label.textContent=theme==='dark'?'Light':'Dark';
      appearanceToggle.setAttribute('aria-label',theme==='dark'?'Switch to light appearance':'Switch to dark appearance');
      appearanceToggle.setAttribute('aria-pressed',String(theme==='dark'));
    }
  };
  applyTheme(savedTheme);
  if(appearanceToggle) appearanceToggle.addEventListener('click',()=>applyTheme(root.dataset.theme==='dark'?'light':'dark'));

  // Year
  const year=document.getElementById('year');
  if(year) year.textContent=new Date().getFullYear();

  // Sitewide scroll percentage indicator.
  const progress=document.createElement('div');
  progress.className='rss-scroll-progress';
  progress.setAttribute('role','progressbar');
  progress.setAttribute('aria-label','Page scroll progress');
  progress.setAttribute('aria-valuemin','0');
  progress.setAttribute('aria-valuemax','100');
  progress.innerHTML='<div class="rss-scroll-progress-fill"></div><span class="rss-scroll-progress-percent">0%</span>';
  body.appendChild(progress);
  const fill=progress.querySelector('.rss-scroll-progress-fill');
  const percent=progress.querySelector('.rss-scroll-progress-percent');
  const updateProgress=()=>{
    const max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
    const value=Math.min(100,Math.max(0,(window.scrollY/max)*100));
    const rounded=Math.round(value);
    if(fill) fill.style.width=value+'%';
    if(percent) percent.textContent=rounded+'%';
    progress.setAttribute('aria-valuenow',String(rounded));
    progress.classList.toggle('is-visible',window.scrollY>24);
  };
  let ticking=false;
  const onScroll=()=>{
    if(!ticking){
      requestAnimationFrame(()=>{updateProgress();ticking=false;});
      ticking=true;
    }
  };
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('resize',updateProgress,{passive:true});
  updateProgress();

  // Keep project logos visually compact and refresh the AI Assistant asset cache.
  document.querySelectorAll('.product-top img').forEach(img=>{
    img.style.maxWidth='108px';
    img.style.maxHeight='36px';
    img.style.width='auto';
    img.style.height='auto';
    img.style.objectFit='contain';
    if(img.src.includes('rss-ai-assistant-logo.png')) img.src='assets/logos/rss-ai-assistant-logo.png?v=20260903';
  });

  // Shared visual fixes, including the floating appearance control.
  const fixes=document.createElement('style');
  fixes.textContent=`
    :root{--bg:#f7f7f4;--panel:#fff;--panel2:#f0f0ec;--text:#171717;--muted:#666660;--gold:#b88622;--gold2:#d3a743;--line:rgba(20,20,20,.10);--line-gold:rgba(184,134,34,.30);--shadow:rgba(0,0,0,.12)}
    :root[data-theme="dark"]{--bg:#070809;--panel:#0d0f11;--panel2:#111417;--text:#f7f5ef;--muted:#a7a49b;--gold:#d5ad52;--gold2:#f0d27a;--line:rgba(255,255,255,.09);--line-gold:rgba(213,173,82,.28);--shadow:rgba(0,0,0,.48)}
    html,body{background:var(--bg)!important;color:var(--text)!important}
    .site-header{background:rgba(255,255,255,.94)!important;border-bottom-color:rgba(20,20,20,.10)!important}
    :root[data-theme="dark"] .site-header{background:rgba(7,8,9,.82)!important;border-bottom-color:var(--line)!important}
    .site-header .brand{min-width:0!important;flex:0 0 auto;height:56px!important}
    .site-header .brand img{width:auto!important;height:auto!important;max-width:275px!important;max-height:56px!important;object-fit:contain!important;object-position:left center!important}
    .nav a{color:#4f4f49!important}.nav a:hover{color:#8d6515!important;background:rgba(184,134,34,.07)!important}
    :root[data-theme="dark"] .nav a{color:#bdb9ae!important}:root[data-theme="dark"] .nav a:hover{color:var(--gold2)!important}
    .appearance-toggle{position:fixed!important;right:20px!important;bottom:20px!important;z-index:9999!important;width:auto!important;min-width:106px!important;height:46px!important;padding:0 15px!important;border-radius:999px!important;border:1px solid rgba(184,134,34,.42)!important;background:rgba(255,255,255,.94)!important;color:#171717!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:9px!important;box-shadow:0 12px 34px rgba(0,0,0,.17),0 0 0 1px rgba(255,255,255,.35) inset!important;backdrop-filter:blur(16px)!important;-webkit-backdrop-filter:blur(16px)!important;cursor:pointer!important;font:700 10px/1 Inter,ui-sans-serif,system-ui,sans-serif!important;letter-spacing:.11em!important;text-transform:uppercase!important;transition:transform .2s,box-shadow .2s,border-color .2s!important}
    .appearance-toggle:hover{transform:translateY(-3px)!important;box-shadow:0 16px 38px rgba(0,0,0,.22),0 0 0 1px rgba(184,134,34,.18) inset!important}
    .appearance-toggle:active{transform:translateY(-1px) scale(.98)!important}
    .appearance-toggle:focus-visible{outline:2px solid var(--gold)!important;outline-offset:3px!important}
    .appearance-icon{font-size:19px!important;line-height:1!important}
    .appearance-label{font-size:9px!important;line-height:1!important}
    :root[data-theme="dark"] .appearance-toggle{background:rgba(14,16,18,.94)!important;color:#f7f5ef!important;border-color:rgba(213,173,82,.38)!important;box-shadow:0 12px 34px rgba(0,0,0,.48),0 0 0 1px rgba(255,255,255,.04) inset!important}
    .btn-outline{color:#171717!important;background:#fff!important;border-color:rgba(20,20,20,.14)!important}
    :root[data-theme="dark"] .btn-outline{color:var(--text)!important;background:rgba(255,255,255,.025)!important;border-color:var(--line)!important}
    .solution-card,.product-card{background:#fff!important;border-color:rgba(20,20,20,.10)!important;box-shadow:0 12px 35px rgba(0,0,0,.045)!important}
    :root[data-theme="dark"] .solution-card,:root[data-theme="dark"] .product-card{background:#0e1012!important;border-color:var(--line)!important;box-shadow:none!important}
    .solution-card p,.product-card p{color:#666!important}:root[data-theme="dark"] .solution-card p,:root[data-theme="dark"] .product-card p{color:#8f8d86!important}
    .product-top img{max-width:108px!important;max-height:36px!important;width:auto!important;height:auto!important;object-fit:contain!important}
    .rss-scroll-progress{position:fixed!important;top:0!important;left:0!important;right:0!important;height:4px!important;z-index:10000!important;background:rgba(0,0,0,.08)!important;opacity:0!important;transition:opacity .2s!important;pointer-events:none!important}
    .rss-scroll-progress.is-visible{opacity:1!important}
    .rss-scroll-progress-fill{height:100%!important;width:0%;background:linear-gradient(90deg,var(--gold),var(--gold2))!important;box-shadow:0 0 12px rgba(213,173,82,.38)!important;transition:width .05s linear!important}
    .rss-scroll-progress-percent{position:absolute!important;right:8px!important;top:7px!important;padding:4px 7px!important;border:1px solid var(--line-gold)!important;border-radius:999px!important;background:rgba(255,255,255,.94)!important;color:#333!important;font:800 9px/1 Inter,ui-sans-serif,system-ui,sans-serif!important;letter-spacing:.04em!important;box-shadow:0 6px 18px rgba(0,0,0,.12)!important;opacity:0!important;transform:translateY(-4px)!important;transition:opacity .2s,transform .2s!important}
    .rss-scroll-progress.is-visible .rss-scroll-progress-percent{opacity:1!important;transform:translateY(0)!important}
    :root[data-theme="dark"] .rss-scroll-progress{background:rgba(255,255,255,.08)!important}
    :root[data-theme="dark"] .rss-scroll-progress-percent{background:rgba(14,16,18,.94)!important;color:#f7f5ef!important}
    @media(max-width:760px){.site-header{height:76px!important}.site-header .brand{height:48px!important}.site-header .brand img{max-width:210px!important;max-height:44px!important}.appearance-toggle{right:13px!important;bottom:13px!important;min-width:92px!important;height:43px!important;padding:0 13px!important}.rss-scroll-progress{height:3px!important}.rss-scroll-progress-percent{right:7px!important;top:6px!important;font-size:8px!important;padding:4px 6px!important}.product-top img{max-width:96px!important;max-height:32px!important}}
    @media(prefers-reduced-motion:reduce){.rss-scroll-progress{transition:none!important}.rss-scroll-progress-fill{transition:none!important}.appearance-toggle{transition:none!important}}
  `;
  document.head.appendChild(fixes);
})();
