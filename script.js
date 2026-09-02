(()=>{
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
  const appearanceToggle=document.querySelector('.appearance-toggle');
  if(appearanceToggle){
    appearanceToggle.addEventListener('click',()=>{
      document.body.classList.toggle('warm-mode');
      const active=document.body.classList.contains('warm-mode');
      appearanceToggle.setAttribute('aria-label',active?'Use standard dark appearance':'Use warm appearance');
      appearanceToggle.textContent=active?'◐':'☼';
    });
  }
  const year=document.getElementById('year');
  if(year)year.textContent=new Date().getFullYear();
})();