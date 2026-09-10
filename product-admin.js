(()=>{
  const input=document.getElementById('productImage'),preview=document.getElementById('preview'),generate=document.getElementById('generate'),status=document.getElementById('status'),output=document.getElementById('output');
  if(!input)return;
  let file=null;
  input.addEventListener('change',()=>{file=input.files?.[0]||null;if(!file){preview.style.display='none';return} preview.src=URL.createObjectURL(file);preview.style.display='block';status.textContent='Image ready. Generate multilingual content when ready.';});
  generate.addEventListener('click',async()=>{
    if(!file){status.textContent='Please select one product image first.';return;}
    generate.disabled=true;status.textContent='AI is analysing the image and preparing English, Sinhala and Tamil content…';
    const fd=new FormData();fd.append('image',file);fd.append('offer',document.getElementById('offer').value.trim());fd.append('price',document.getElementById('price').value.trim());fd.append('category',document.getElementById('category').value.trim());fd.append('productUrl',document.getElementById('productUrl').value.trim());
    try{
      const r=await fetch('/api/product-content',{method:'POST',body:fd});
      if(!r.ok)throw new Error('AI product-content endpoint unavailable');
      const data=await r.json();
      document.getElementById('en').value=data.en||'';document.getElementById('si').value=data.si||'';document.getElementById('ta').value=data.ta||'';output.classList.add('show');status.textContent='Content generated. Review it before publishing.';
    }catch(e){status.textContent='The website UI is ready, but the AI backend endpoint is not connected yet. Connect POST /api/product-content to RSS AI Assistant to enable image analysis.';}
    finally{generate.disabled=false;}
  });
})();
