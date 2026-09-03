(()=>{
  const root=document.documentElement,body=document.body;
  const UI='site-ui.css?v=20260903b';
  if(!document.querySelector('link[data-rss-ui]')){const link=document.createElement('link');link.rel='stylesheet';link.href=UI;link.dataset.rssUi='1';document.head.appendChild(link)}
  const menuButton=document.querySelector('.menu-btn'),nav=document.querySelector('.nav');
  if(menuButton&&nav&&!menuButton.dataset.bound){menuButton.dataset.bound='1';menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close menu':'Open menu');menuButton.textContent=open?'×':'☰'});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open menu');menuButton.textContent='☰'}))}
  const appearanceToggle=document.querySelector('.appearance-toggle');
  if(appearanceToggle){appearanceToggle.innerHTML='<span class="appearance-switch" aria-hidden="true"><span class="appearance-switch-knob"></span></span><span class="appearance-label">Dark</span>';appearanceToggle.setAttribute('role','switch')}
  const applyTheme=theme=>{root.dataset.theme=theme;localStorage.setItem('rss-theme',theme);if(appearanceToggle){appearanceToggle.classList.toggle('is-dark',theme==='dark');const label=appearanceToggle.querySelector('.appearance-label');if(label)label.textContent=theme==='dark'?'Light':'Dark';appearanceToggle.setAttribute('aria-checked',String(theme==='dark'));appearanceToggle.setAttribute('aria-label',theme==='dark'?'Switch to light appearance':'Switch to dark appearance')}};
  applyTheme(localStorage.getItem('rss-theme')||'light');
  if(appearanceToggle&&!appearanceToggle.dataset.bound){appearanceToggle.dataset.bound='1';appearanceToggle.addEventListener('click',()=>applyTheme(root.dataset.theme==='dark'?'light':'dark'))}
  const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
  let progress=document.querySelector('.rss-scroll-progress');
  if(!progress){progress=document.createElement('div');progress.className='rss-scroll-progress';progress.setAttribute('role','progressbar');progress.setAttribute('aria-label','Page scroll progress');progress.setAttribute('aria-valuemin','0');progress.setAttribute('aria-valuemax','100');progress.innerHTML='<div class="rss-scroll-progress-track"><div class="rss-scroll-progress-fill"></div></div><span class="rss-scroll-progress-percent">0%</span>';body.appendChild(progress)}
  const fill=progress.querySelector('.rss-scroll-progress-fill'),percent=progress.querySelector('.rss-scroll-progress-percent');
  const updateProgress=()=>{const max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight),value=Math.min(100,Math.max(0,window.scrollY/max*100)),rounded=Math.round(value);if(fill)fill.style.height=value+'%';if(percent)percent.textContent=rounded+'%';progress.setAttribute('aria-valuenow',String(rounded))};
  let ticking=false;window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(()=>{updateProgress();ticking=false});ticking=true}},{passive:true});window.addEventListener('resize',updateProgress,{passive:true});updateProgress();
  document.querySelectorAll('.product-top img').forEach(img=>{img.style.maxWidth='108px';img.style.maxHeight='36px';img.style.width='auto';img.style.height='auto';img.style.objectFit='contain'});
  document.querySelectorAll('.footer').forEach(footer=>{const company=footer.querySelector(':scope > div');if(company&&!company.querySelector('.footer-company-logo')){const logo=document.createElement('img');logo.className='footer-company-logo';logo.src='assets/logos/razeen-secure-solution-logo.png';logo.alt='Razeen Secure Solution';company.insertBefore(logo,company.firstChild)}});
  const top=document.getElementById('backToTop');if(top&&!top.dataset.bound){top.dataset.bound='1';top.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));window.addEventListener('scroll',()=>top.classList.toggle('show',window.scrollY>500),{passive:true})}
})();
