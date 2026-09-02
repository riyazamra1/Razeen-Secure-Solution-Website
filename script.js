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

  // RSS brand sizing corrections: preserve every original logo asset and aspect ratio.
  const brandFix=document.createElement('style');
  brandFix.textContent=`
    .site-header .brand{min-width:0;flex:0 0 auto;height:52px;display:flex;align-items:center}
    .site-header .brand img,.site-header .brand .brand-logo{width:auto!important;height:auto!important;max-width:205px!important;max-height:42px!important;object-fit:contain!important;object-position:left center!important;display:block!important}
    .product-top{height:52px!important;margin-bottom:24px!important}
    .product-top img{width:auto!important;height:auto!important;max-width:108px!important;max-height:36px!important;object-fit:contain!important;object-position:left center!important}
    .project-hero-logo{width:auto!important;height:auto!important;max-width:140px!important;max-height:48px!important;object-fit:contain!important}
    .core img{width:52px!important;height:52px!important;object-fit:contain!important}
    .footer img{width:150px!important;height:auto!important;max-height:38px!important;object-fit:contain!important}
    @media(max-width:760px){
      .site-header .brand{height:46px}
      .site-header .brand img,.site-header .brand .brand-logo{max-width:175px!important;max-height:36px!important}
      .product-top img{max-width:92px!important;max-height:31px!important}
      .project-hero-logo{max-width:120px!important;max-height:42px!important}
      .footer img{width:125px!important;max-height:32px!important}
    }
  `;
  document.head.appendChild(brandFix);
})();