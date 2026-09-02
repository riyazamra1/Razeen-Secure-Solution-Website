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
  const savedTheme=localStorage.getItem('rss-theme')||'light';
  const applyTheme=(theme)=>{
    document.documentElement.dataset.theme=theme;
    localStorage.setItem('rss-theme',theme);
    if(appearanceToggle){
      appearanceToggle.querySelector('span').textContent=theme==='dark'?'☾':'☼';
      appearanceToggle.setAttribute('aria-label',theme==='dark'?'Switch to light appearance':'Switch to dark appearance');
    }
  };
  applyTheme(savedTheme);
  if(appearanceToggle) appearanceToggle.addEventListener('click',()=>applyTheme(document.documentElement.dataset.theme==='dark'?'light':'dark'));

  const year=document.getElementById('year');
  if(year)year.textContent=new Date().getFullYear();

  const fixes=document.createElement('style');
  fixes.textContent=`
    /* RSS website: light is the default, appearance toggle remains enabled */
    :root{--bg:#f7f7f4;--panel:#ffffff;--panel2:#f0f0ec;--text:#171717;--muted:#666660;--gold:#b88622;--gold2:#d3a743;--line:rgba(20,20,20,.10);--line-gold:rgba(184,134,34,.30);--shadow:rgba(0,0,0,.12)}
    :root[data-theme="dark"]{--bg:#070809;--panel:#0d0f11;--panel2:#111417;--text:#f7f5ef;--muted:#a7a49b;--gold:#d5ad52;--gold2:#f0d27a;--line:rgba(255,255,255,.09);--line-gold:rgba(213,173,82,.28);--shadow:rgba(0,0,0,.48)}
    html,body{background:var(--bg)!important;color:var(--text)!important}
    body:before{background-image:linear-gradient(rgba(20,20,20,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(20,20,20,.035) 1px,transparent 1px)!important;mask-image:linear-gradient(to bottom,black,transparent 72%)}
    :root[data-theme="dark"] body:before{background-image:linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px)!important}
    .page-glow{background:radial-gradient(circle,rgba(184,134,34,.12),transparent 68%)!important}
    .site-header{background:rgba(255,255,255,.94)!important;border-bottom-color:rgba(20,20,20,.10)!important}
    :root[data-theme="dark"] .site-header{background:rgba(7,8,9,.82)!important;border-bottom-color:var(--line)!important}
    .site-header .brand{min-width:0!important;flex:0 0 auto;height:56px!important}
    .site-header .brand img,.site-header .brand .brand-logo{width:auto!important;height:auto!important;max-width:275px!important;max-height:56px!important;object-fit:contain!important;object-position:left center!important}
    .nav a{color:#4f4f49!important}.nav a:hover{color:#8d6515!important;background:rgba(184,134,34,.07)!important}
    :root[data-theme="dark"] .nav a{color:#bdb9ae!important}:root[data-theme="dark"] .nav a:hover{color:var(--gold2)!important}
    .appearance-toggle{display:grid!important;color:var(--text)!important;background:rgba(20,20,20,.04)!important;border-color:rgba(20,20,20,.12)!important}
    :root[data-theme="dark"] .appearance-toggle{background:rgba(255,255,255,.035)!important;border-color:var(--line)!important}
    .header-actions{margin-left:8px!important}
    .btn-outline{color:#171717!important;background:#fff!important;border-color:rgba(20,20,20,.14)!important}
    :root[data-theme="dark"] .btn-outline{color:var(--text)!important;background:rgba(255,255,255,.025)!important;border-color:var(--line)!important}
    .hero-proof b{color:#333!important}.hero-proof{color:#777!important}:root[data-theme="dark"] .hero-proof b{color:#e8e5dd!important}:root[data-theme="dark"] .hero-proof{color:#777!important}
    .section-dark{background:linear-gradient(180deg,#f3f3ef,#fafaf8)!important;border-color:rgba(20,20,20,.10)!important}
    :root[data-theme="dark"] .section-dark{background:linear-gradient(180deg,#0a0b0d,#0c0e10)!important;border-color:var(--line)!important}
    .solution-card,.product-card{background:#fff!important;border-color:rgba(20,20,20,.10)!important;box-shadow:0 12px 35px rgba(0,0,0,.045)!important}
    :root[data-theme="dark"] .solution-card,:root[data-theme="dark"] .product-card{background:#0e1012!important;border-color:var(--line)!important;box-shadow:none!important}
    .solution-card.featured,.product-card.product-cloud{background:linear-gradient(145deg,rgba(184,134,34,.10),#fff 68%)!important}
    :root[data-theme="dark"] .solution-card.featured,:root[data-theme="dark"] .product-card.product-cloud{background:linear-gradient(145deg,rgba(213,173,82,.12),#0e1012 68%)!important}
    .solution-card p,.product-card p{color:#666!important}:root[data-theme="dark"] .solution-card p,:root[data-theme="dark"] .product-card p{color:#8f8d86!important}
    .card-number,.product-top>span{color:#999!important}
    .cloud-screen{background:linear-gradient(145deg,#fff,#f0f0ec)!important;box-shadow:0 35px 90px rgba(0,0,0,.12)!important}
    :root[data-theme="dark"] .cloud-screen{background:linear-gradient(145deg,#151716,#0b0c0d)!important;box-shadow:0 35px 90px rgba(0,0,0,.4)!important}
    .screen-top,.screen-stats,.feature-list{border-color:rgba(20,20,20,.10)!important}
    :root[data-theme="dark"] .screen-top,:root[data-theme="dark"] .screen-stats,:root[data-theme="dark"] .feature-list{border-color:var(--line)!important}
    .screen-top b,.screen-stats span{color:#777!important}.screen-stats strong{color:#333!important}.feature-list span{color:#444!important}
    :root[data-theme="dark"] .screen-top b,:root[data-theme="dark"] .screen-stats span{color:#777!important}:root[data-theme="dark"] .screen-stats strong{color:#ddd9cf!important}:root[data-theme="dark"] .feature-list span{color:#c4c1b8!important}
    .contact-card{background:linear-gradient(145deg,rgba(184,134,34,.08),#fff)!important}.contact-card a{color:#444!important}
    :root[data-theme="dark"] .contact-card{background:linear-gradient(145deg,rgba(213,173,82,.08),#0e1012)!important}:root[data-theme="dark"] .contact-card a{color:#c4c0b7!important}
    .footer{color:#777!important;border-top-color:rgba(20,20,20,.10)!important}.footer img{width:180px!important;height:auto!important;max-height:44px!important;object-fit:contain!important}.footer>div{gap:14px!important}
    @media(max-width:1000px){.site-header .brand img,.site-header .brand .brand-logo{max-width:245px!important;max-height:50px!important}}
    @media(max-width:760px){.site-header{height:76px!important}.site-header .brand{height:48px!important}.site-header .brand img,.site-header .brand .brand-logo{max-width:210px!important;max-height:44px!important}.footer img{width:145px!important;max-height:38px!important}.nav{background:#fff!important;border-color:rgba(20,20,20,.10)!important;box-shadow:0 20px 50px rgba(0,0,0,.12)!important}:root[data-theme="dark"] .nav{background:#101214!important;border-color:var(--line)!important;box-shadow:0 20px 50px var(--shadow)!important}}
  `;
  document.head.appendChild(fixes);

  const footerLogo=document.querySelector('.footer img');
  if(footerLogo) footerLogo.src='assets/logos/razeen-secure-solution-logo.png';

  document.querySelectorAll('.product-top img').forEach(img=>{
    img.style.maxWidth='108px';
    img.style.maxHeight='36px';
    img.style.width='auto';
    img.style.height='auto';
    img.style.objectFit='contain';
  });
})();