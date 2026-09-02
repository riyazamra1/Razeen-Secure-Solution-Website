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
  if(appearanceToggle) appearanceToggle.style.display='none';

  const year=document.getElementById('year');
  if(year)year.textContent=new Date().getFullYear();

  const fixes=document.createElement('style');
  fixes.textContent=`
    /* RSS website: permanent default light presentation */
    :root{--bg:#f7f7f4;--panel:#ffffff;--panel2:#f0f0ec;--text:#171717;--muted:#666660;--gold:#b88622;--gold2:#d3a743;--line:rgba(20,20,20,.10);--line-gold:rgba(184,134,34,.30);--shadow:rgba(0,0,0,.12)}
    html,body{background:#f7f7f4!important;color:#171717!important}
    body:before{background-image:linear-gradient(rgba(20,20,20,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(20,20,20,.035) 1px,transparent 1px)!important;mask-image:linear-gradient(to bottom,black,transparent 72%)}
    .page-glow{background:radial-gradient(circle,rgba(184,134,34,.12),transparent 68%)!important}
    .site-header{background:rgba(255,255,255,.94)!important;border-bottom-color:rgba(20,20,20,.10)!important}
    .site-header .brand{min-width:0!important;flex:0 0 auto;height:56px!important}
    .site-header .brand img,.site-header .brand .brand-logo{width:auto!important;height:auto!important;max-width:240px!important;max-height:50px!important;object-fit:contain!important;object-position:left center!important}
    .nav a{color:#4f4f49!important}.nav a:hover{color:#8d6515!important;background:rgba(184,134,34,.07)!important}
    .appearance-toggle{display:none!important}
    .header-actions{margin-left:8px!important}
    .btn-outline{color:#171717!important;background:#fff!important;border-color:rgba(20,20,20,.14)!important}
    .hero-proof b{color:#333!important}.hero-proof{color:#777!important}
    .section-dark{background:linear-gradient(180deg,#f3f3ef,#fafaf8)!important;border-color:rgba(20,20,20,.10)!important}
    .solution-card,.product-card{background:#fff!important;border-color:rgba(20,20,20,.10)!important;box-shadow:0 12px 35px rgba(0,0,0,.045)!important}
    .solution-card.featured,.product-card.product-cloud{background:linear-gradient(145deg,rgba(184,134,34,.10),#fff 68%)!important}
    .solution-card p,.product-card p{color:#666!important}.card-number,.product-top>span{color:#999!important}
    .cloud-screen{background:linear-gradient(145deg,#fff,#f0f0ec)!important;box-shadow:0 35px 90px rgba(0,0,0,.12)!important}
    .screen-top,.screen-stats,.feature-list{border-color:rgba(20,20,20,.10)!important}
    .screen-top b,.screen-stats span{color:#777!important}.screen-stats strong{color:#333!important}.feature-list span{color:#444!important}
    .contact-card{background:linear-gradient(145deg,rgba(184,134,34,.08),#fff)!important}
    .contact-card a{color:#444!important}
    .footer{color:#777!important;border-top-color:rgba(20,20,20,.10)!important}
    .footer img{width:180px!important;height:auto!important;max-height:44px!important;object-fit:contain!important}
    .footer>div{gap:14px!important}
    @media(max-width:1000px){.site-header .brand img,.site-header .brand .brand-logo{max-width:220px!important;max-height:46px!important}}
    @media(max-width:760px){.site-header{height:76px!important}.site-header .brand{height:48px!important}.site-header .brand img,.site-header .brand .brand-logo{max-width:195px!important;max-height:42px!important}.footer img{width:145px!important;max-height:38px!important}.nav{background:#fff!important;border-color:rgba(20,20,20,.10)!important;box-shadow:0 20px 50px rgba(0,0,0,.12)!important}}
  `;
  document.head.appendChild(fixes);

  // Footer must use the complete Razeen Secure Solutions logo, not the icon-only mark.
  const footerLogo=document.querySelector('.footer img');
  if(footerLogo) footerLogo.src='assets/logos/razeen-secure-solution-logo.png';

  // Keep the existing product logo assets proportional and visually restrained.
  document.querySelectorAll('.product-top img').forEach(img=>{
    img.style.maxWidth='108px';
    img.style.maxHeight='36px';
    img.style.width='auto';
    img.style.height='auto';
    img.style.objectFit='contain';
  });
})();