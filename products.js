(()=>{
  const grid=document.getElementById('productsGrid'),empty=document.getElementById('productsEmpty');
  if(!grid)return;
  fetch('products.json?v=20260910').then(r=>r.ok?r.json():[]).then(items=>{
    if(!Array.isArray(items)||!items.length){empty.hidden=false;return;}
    grid.innerHTML=items.map((p,i)=>`<a class="product-card glass-card" href="${p.url||'products.html'}"><img class="product-image" src="${p.image}" alt="${escapeHtml(p.name?.en||'RSS product')}">${p.offer?`<span class="offer-badge">${escapeHtml(p.offer)}</span>`:''}<h3>${escapeHtml(p.name?.en||'RSS Product')}</h3><p>${escapeHtml(p.short?.en||'')}</p><div class="product-langs"><span>English</span><span>සිංහල</span><span>தமிழ்</span></div><strong style="color:var(--gold)">View product →</strong></a>`).join('');
  }).catch(()=>{empty.hidden=false});
  function escapeHtml(v){return String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
})();
