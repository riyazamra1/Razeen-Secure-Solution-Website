(()=>{
  const root=document.documentElement,body=document.body;
  const menuButton=document.querySelector('.menu-btn'),nav=document.querySelector('.nav');
  if(menuButton&&nav&&!menuButton.dataset.bound){
    menuButton.dataset.bound='1';
    menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.textContent=open?'×':'☰'});
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.textContent='☰'}));
  }
  const appearanceToggle=document.querySelector('.appearance-toggle');
  if(appearanceToggle){
    appearanceToggle.innerHTML='<span class="appearance-switch" aria-hidden="true"><span class="appearance-switch-knob"></span></span><span class="appearance-label">Dark</span>';
    appearanceToggle.setAttribute('role','switch');
  }
  const applyTheme=theme=>{root.dataset.theme=theme;localStorage.setItem('rss-theme',theme);if(appearanceToggle){appearanceToggle.classList.toggle('is-dark',theme==='dark');const label=appearanceToggle.querySelector('.appearance-label');if(label)label.textContent=theme==='dark'?'Light':'Dark';appearanceToggle.setAttribute('aria-checked',String(theme==='dark'));appearanceToggle.setAttribute('aria-label',theme==='dark'?'Switch to light appearance':'Switch to dark appearance')}};
  applyTheme(localStorage.getItem('rss-theme')||'light');
  if(appearanceToggle&&!appearanceToggle.dataset.bound) {appearanceToggle.dataset.bound='1';appearanceToggle.addEventListener('click',()=>applyTheme(root.dataset.theme==='dark'?'light':'dark'));}
  const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();

  /* RSS side scroll progress */
  const progress=document.createElement('div');progress.className='rss-scroll-progress';progress.setAttribute('role','progressbar');progress.setAttribute('aria-label','Page scroll progress');progress.setAttribute('aria-valuemin','0');progress.setAttribute('aria-valuemax','100');progress.innerHTML='<div class="rss-scroll-progress-track"><div class="rss-scroll-progress-fill"></div></div><span class="rss-scroll-progress-percent">0%</span>';body.appendChild(progress);
  const fill=progress.querySelector('.rss-scroll-progress-fill'),percent=progress.querySelector('.rss-scroll-progress-percent');
  const updateProgress=()=>{const max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight),value=Math.min(100,Math.max(0,window.scrollY/max*100)),rounded=Math.round(value);fill.style.height=value+'%';percent.textContent=rounded+'%';progress.setAttribute('aria-valuenow',String(rounded));progress.classList.toggle('is-visible',window.scrollY>18)};
  let ticking=false;window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(()=>{updateProgress();ticking=false});ticking=true}},{passive:true});window.addEventListener('resize',updateProgress,{passive:true});updateProgress();

  document.querySelectorAll('.product-top img').forEach(img=>{img.style.maxWidth='108px';img.style.maxHeight='36px';img.style.width='auto';img.style.height='auto';img.style.objectFit='contain'});

  /* Compact progress rail; also neutralizes legacy inline progress rules. */
  const normalizeProgress=()=>{
    progress.style.setProperty('position','fixed','important');
    progress.style.setProperty('left','10px','important');
    progress.style.setProperty('right','auto','important');
    progress.style.setProperty('top','50%','important');
    progress.style.setProperty('bottom','auto','important');
    progress.style.setProperty('width','24px','important');
    progress.style.setProperty('height','180px','important');
    progress.style.setProperty('transform','translateY(-50%)','important');
    progress.style.setProperty('z-index','10003','important');
    progress.style.setProperty('gap','7px','important');
    const track=progress.querySelector('.rss-scroll-progress-track');
    const bar=progress.querySelector('.rss-scroll-progress-fill');
    const label=progress.querySelector('.rss-scroll-progress-percent');
    if(track){track.style.setProperty('width','3px','important');track.style.setProperty('height','150px','important');}
    if(bar){bar.style.setProperty('width','100%','important');}
    if(label){label.style.setProperty('min-width','24px','important');label.style.setProperty('width','24px','important');label.style.setProperty('height','auto','important');label.style.setProperty('padding','4px 2px','important');label.style.setProperty('font-size','7px','important');}
  };
  setTimeout(normalizeProgress,0);

  /* Use the exact existing full Razeen Secure Solution logo in the footer too. */
  const footer=document.querySelector('.footer>div');
  if(footer){
    const existing=footer.querySelector('.footer-company-logo');
    if(!existing){
      const logo=document.createElement('img');
      logo.className='footer-company-logo';
      logo.src='assets/logos/razeen-secure-solution-logo.png';
      logo.alt='Razeen Secure Solution';
      logo.style.maxWidth='300px';
      logo.style.maxHeight='62px';
      logo.style.width='auto';
      logo.style.height='auto';
      logo.style.objectFit='contain';
      logo.style.display='block';
      logo.style.margin='0 auto 8px';
      footer.insertBefore(logo,footer.firstChild);
    }
  }

  /* Back-to-top button */
  const top=document.getElementById('backToTop');
  if(top&&!top.dataset.bound){top.dataset.bound='1';top.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));window.addEventListener('scroll',()=>top.classList.toggle('show',window.scrollY>500),{passive:true});}
})();
