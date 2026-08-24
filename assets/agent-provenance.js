(()=>{
  const owner='Alfonzo Anthony';
  const id='AA-AILAB-AGENT-008';
  const canonical='https://ailabs.alfonzoanthony.com/case-study-agent-orchestration-lab.html';
  document.body.dataset.provenanceId=id;

  const canonicalLink=document.querySelector('link[rel="canonical"]')||document.createElement('link');
  canonicalLink.rel='canonical';
  canonicalLink.href=canonical;
  if(!canonicalLink.parentNode)document.head.appendChild(canonicalLink);

  const jsonLd=document.querySelector('script[type="application/ld+json"]');
  const payload={
    '@context':'https://schema.org',
    '@type':'CreativeWork',
    name:'Agent Orchestration Lab',
    identifier:id,
    creator:{'@type':'Person',name:owner,url:'https://ailabs.alfonzoanthony.com'},
    copyrightHolder:{'@type':'Person',name:owner},
    copyrightYear:2026,
    url:canonical,
    isPartOf:{'@type':'WebSite',name:'Alfonzo Anthony AI Portfolio',url:'https://ailabs.alfonzoanthony.com'},
    usageInfo:'https://ailabs.alfonzoanthony.com/provenance-manifest.json'
  };
  if(jsonLd)jsonLd.textContent=JSON.stringify(payload);
  else{const script=document.createElement('script');script.type='application/ld+json';script.textContent=JSON.stringify(payload);document.head.appendChild(script)}

  document.querySelectorAll('.capture-watermark span').forEach((span)=>{
    span.textContent=`${owner} • ${id} • ailabs.alfonzoanthony.com`;
  });

  const viewerShell=document.querySelector('.image-viewer-shell');
  if(viewerShell)viewerShell.dataset.watermark=`© 2026 ${owner} • ${id}`;
})();
