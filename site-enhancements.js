(() => {
  const init = () => {
    document.documentElement.dataset.appearance = localStorage.getItem('appearance') || 'light';

    document.querySelectorAll('.card, .project-card, .service-card, .feature-card, .btn, button, .button, a.btn').forEach(el => {
      el.classList.add(el.matches('button, a, .btn, .button') ? 'rss-animated-button' : 'rss-rounded-card');
    });

    document.querySelectorAll('footer img').forEach(img => {
      const src = (img.getAttribute('src') || '').toLowerCase();
      if (!src.includes('rss-logo-name.png')) img.closest('a, picture, div')?.remove();
    });

    let bar = document.querySelector('.rss-scroll-progress');
    if (!bar) {
      bar = document.createElement('div');
      bar.className = 'rss-scroll-progress';
      bar.innerHTML = '<span></span><b>0%</b>';
      document.body.appendChild(bar);
    }
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.round((window.scrollY / max) * 100) : 0;
      bar.style.setProperty('--progress', `${pct}%`);
      bar.querySelector('b').textContent = `${pct}%`;
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, {passive:true});

    const header = document.querySelector('header, .site-header, .navbar');
    if (header) {
      header.classList.add('rss-sticky-header');
      let last = window.scrollY;
      window.addEventListener('scroll', () => {
        const now = window.scrollY;
        header.classList.toggle('rss-header-hidden', now > last && now > 80);
        header.classList.toggle('rss-header-visible', now <= last || now <= 80);
        last = now;
      }, {passive:true});
    }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
