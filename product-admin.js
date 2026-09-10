(()=>{
  const input=document.getElementById('productImage'),preview=document.getElementById('preview'),generate=document.getElementById('generate'),publish=document.getElementById('publish'),status=document.getElementById('status'),output=document.getElementById('output');
  if(!input)return;
  let file=null;
  input.addEventListener('change',()=>{file=input.files?.[0]||null;if(!file){preview.style.display='none';return} preview.src=URL.createObjectURL(file);preview.style.display='block';status.textContent='Image ready. Generate multilingual content when ready.';});
  const value=id=>document.getElementById(id).value.trim();
  const result=()=>({
    name:{en:value('nameEn'),si:value('nameSi'),ta:value('nameTa')},
    short:{en:value('shortEn'),si:value('shortSi'),ta:value('shortTa')},
    description:{en:value('descEn'),si:value('descSi'),ta:value('descTa')}
  });
  generate.addEventListener('click',async()=>{
    if(!file){status.textContent='Please select one product image first.';return;}
    generate.disabled=true;status.textContent='AI is analysing the image and preparing English, Sinhala and Tamil content…';
    const fd=new FormData();fd.append('image',file);fd.append('offer',value('offer'));fd.append('price',value('price'));fd.append('category',value('category'));
    try{
      const r=await fetch('/api/product-content',{method:'POST',body:fd});
      if(!r.ok)throw new Error('endpoint');
      const data=await r.json();
      document.getElementById('nameEn').value=data.name?.en||'';document.getElementById('nameSi').value=data.name?.si||'';document.getElementById('nameTa').value=data.name?.ta||'';
      document.getElementById('shortEn').value=data.short?.en||'';document.getElementById('shortSi').value=data.short?.si||'';document.getElementById('shortTa').value=data.short?.ta||'';
      document.getElementById('descEn').value=data.description?.en||'';document.getElementById('descSi').value=data.description?.si||'';document.getElementById('descTa').value=data.description?.ta||'';
      output.classList.add('show');publish.hidden=false;status.textContent='Content generated. Review or edit it before publishing.';
    }catch(e){status.textContent='AI backend is not connected yet. The UI is ready for POST /api/product-content.';}
    finally{generate.disabled=false;}
  });
  publish.addEventListener('click',async()=>{
    if(!file){status.textContent='Select the product image first.';return;}
    publish.disabled=true;status.textContent='Publishing product…';
    const body={...result(),offer:value('offer'),price:value('price'),category:value('category'),url:value('productUrl'),imageName:file.name};
    try{
      const r=await fetch('/api/products',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
      if(!r.ok)throw new Error('publish');
      status.textContent='Published successfully. Opening Products…';setTimeout(()=>location.href='products.html',400);
    }catch(e){status.textContent='Publish endpoint is not connected yet. Connect POST /api/products to the product store.';publish.disabled=false;}
  });
})();
