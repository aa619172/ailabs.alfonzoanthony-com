const y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
(()=>{const toggle=document.querySelector('.menu-toggle');const nav=document.getElementById('siteNav');if(!toggle||!nav)return;const close=()=>{toggle.setAttribute('aria-expanded','false');nav.classList.remove('is-open')};toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));nav.classList.toggle('is-open',!open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});document.addEventListener('click',e=>{if(nav.classList.contains('is-open')&&!nav.contains(e.target)&&!toggle.contains(e.target))close()});})();
(()=>{const projects=document.querySelector('.projects');if(!projects||document.querySelector('[data-project="gpu-fleet-lab"]'))return;const card=document.createElement('article');card.className='project';card.dataset.project='gpu-fleet-lab';card.innerHTML='<button class="project-media project-zoom-trigger" type="button" aria-label="Open GPU Fleet Lab project image fullscreen"><img src="assets/gpu-fleet-lab.svg" alt="GPU Fleet Lab architecture preview showing GPU health and topology-aware scheduling" loading="lazy"><span class="zoom-hint" aria-hidden="true">↗ View fullscreen</span></button><div class="project-body"><span class="status">Systems case study</span><h3>GPU Fleet Lab</h3><div class="type">GPU infrastructure · Python/FastAPI</div><p>Topology-aware GPU health and capacity control plane with explainable placement decisions, NVLink-aware multi-GPU scheduling, fault simulation, queue recovery, DCGM telemetry support, and Prometheus observability.</p><div class="tags"><span class="tag">Python</span><span class="tag">FastAPI</span><span class="tag">NVIDIA DCGM</span><span class="tag">Prometheus</span><span class="tag">PostgreSQL</span></div><div class="project-links"><a href="case-study-gpu-fleet-lab.html">Read case study →</a></div></div>';projects.prepend(card);const firstProof=document.querySelector('.proof strong');if(firstProof&&firstProof.textContent.trim()==='5')firstProof.textContent='6';})();
(()=>{const viewer=document.getElementById('imageViewer');const img=document.getElementById('viewerImage');const value=document.getElementById('viewerZoomValue');if(!viewer||!img||!value)return;let zoom=1,last=null;const update=()=>{img.style.transform=`scale(${zoom})`;value.textContent=`${Math.round(zoom*100)}%`};const reset=()=>{zoom=1;update()};const open=t=>{const source=t.querySelector('img');if(!source)return;last=t;img.src=source.currentSrc||source.src;img.alt=source.alt||'Project screenshot';reset();viewer.classList.add('is-open');viewer.setAttribute('aria-hidden','false');document.body.classList.add('viewer-open');viewer.querySelector('.viewer-close')?.focus()};const close=()=>{viewer.classList.remove('is-open');viewer.setAttribute('aria-hidden','true');document.body.classList.remove('viewer-open');img.src='';reset();last?.focus()};const zin=()=>{zoom=Math.min(3,+(zoom+.25).toFixed(2));update()};const zout=()=>{zoom=Math.max(.5,+(zoom-.25).toFixed(2));update()};document.querySelectorAll('.project-zoom-trigger').forEach(t=>t.addEventListener('click',()=>open(t)));viewer.querySelectorAll('[data-viewer-close]').forEach(b=>b.addEventListener('click',close));viewer.querySelector('[data-zoom-in]')?.addEventListener('click',zin);viewer.querySelector('[data-zoom-out]')?.addEventListener('click',zout);viewer.querySelector('[data-zoom-reset]')?.addEventListener('click',reset);document.addEventListener('keydown',e=>{if(!viewer.classList.contains('is-open'))return;if(e.key==='Escape'){e.preventDefault();close()}else if(e.key==='+'||e.key==='='){e.preventDefault();zin()}else if(e.key==='-'||e.key==='_'){e.preventDefault();zout()}else if(e.key==='0'){e.preventDefault();reset()}});})();

// Portfolio provenance, ownership metadata, and capture deterrence.
(()=>{
  const owner='Alfonzo Anthony';
  const origin='https://ailabs.alfonzoanthony.com';
  const projects={
    'case-study-ad-engine.html':{id:'AA-AILAB-2TAC-AE-001',title:'2TimesACharm AI Ad Engine'},
    'case-study-video-engine.html':{id:'AA-AILAB-VIDEO-002',title:'AI Video Generation Engine'},
    'case-study-rippro.html':{id:'AA-AILAB-RIPPRO-003',title:'Crusoe RipPro Studio'},
    'case-study-mockup-magic.html':{id:'AA-AILAB-MOCKUP-004',title:'Mockup Magic'},
    'case-study-credit-rise.html':{id:'AA-AILAB-CREDIT-005',title:'Credit Rise'},
    'credit-rise-case-study.html':{id:'AA-AILAB-CREDIT-005',title:'Credit Rise'},
    'case-study-gpu-fleet-lab.html':{id:'AA-AILAB-GPU-006',title:'GPU Fleet Lab'},
    'case-study-prompt-reliability-lab.html':{id:'AA-AILAB-PROMPT-007',title:'Prompt Reliability Lab'}
  };
  const file=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const project=projects[file]||null;
  const provenanceId=project?.id||'AA-AILAB-PORTFOLIO-ROOT';
  const title=project?.title||'Alfonzo Anthony AI Portfolio';
  const canonical=`${origin}/${file==='index.html'?'':file}`;

  document.body.dataset.provenanceId=provenanceId;
  document.documentElement.dataset.portfolioOwner=owner;

  const ensureMeta=(name,content)=>{let meta=document.querySelector(`meta[name="${name}"]`);if(!meta){meta=document.createElement('meta');meta.name=name;document.head.appendChild(meta)}meta.content=content};
  ensureMeta('author',owner);
  ensureMeta('copyright',`© ${new Date().getFullYear()} ${owner}. All rights reserved.`);
  ensureMeta('robots','index,follow,noimageindex');

  if(!document.querySelector('link[rel="canonical"]')){const link=document.createElement('link');link.rel='canonical';link.href=canonical;document.head.appendChild(link)}

  const ld=document.createElement('script');
  ld.type='application/ld+json';
  ld.textContent=JSON.stringify({
    '@context':'https://schema.org',
    '@type':project?'CreativeWork':'ProfilePage',
    name:title,
    identifier:provenanceId,
    creator:{'@type':'Person',name:owner,url:origin},
    copyrightHolder:{'@type':'Person',name:owner},
    copyrightYear:2026,
    url:canonical,
    isPartOf:{'@type':'WebSite',name:'Alfonzo Anthony AI Portfolio',url:origin},
    usageInfo:`${origin}/provenance-manifest.json`
  });
  document.head.appendChild(ld);

  if(project){
    const main=document.querySelector('main');
    if(main&&!document.querySelector('.provenance-section')){
      const section=document.createElement('section');
      section.className='provenance-section';
      section.setAttribute('aria-label','Project provenance and ownership');
      section.innerHTML=`<div class="wrap"><div class="provenance-card"><div><div class="eyebrow">Project provenance</div><h2>Original portfolio work by ${owner}</h2><p>This case study is registered in this portfolio with a persistent provenance ID and deployment hash. Viewing this work does not grant permission to copy, reproduce, redistribute, commercialize, or present it as your own.</p></div><dl><div><dt>Project ID</dt><dd>${provenanceId}</dd></div><div><dt>Creator</dt><dd>${owner}</dd></div><div><dt>Canonical origin</dt><dd>ailabs.alfonzoanthony.com</dd></div><div><dt>Rights</dt><dd>All rights reserved</dd></div></dl><a class="provenance-link" href="provenance-manifest.json" target="_blank" rel="noopener">Verify deployment manifest →</a></div></div>`;
      main.appendChild(section);
    }
  }

  const watermark=document.createElement('div');
  watermark.className='capture-watermark';
  watermark.setAttribute('aria-hidden','true');
  const mark=`${owner} • ${provenanceId} • ailabs.alfonzoanthony.com`;
  watermark.innerHTML=Array.from({length:24},()=>`<span>${mark}</span>`).join('');
  document.body.appendChild(watermark);

  const viewerShell=document.querySelector('.image-viewer-shell');
  if(viewerShell)viewerShell.dataset.watermark=`© ${new Date().getFullYear()} ${owner} • ${provenanceId}`;

  let toastTimer;
  const notify=message=>{
    let toast=document.querySelector('.protection-toast');
    if(!toast){toast=document.createElement('div');toast.className='protection-toast';toast.setAttribute('role','status');document.body.appendChild(toast)}
    toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),1800);
  };

  document.addEventListener('contextmenu',e=>{
    if(e.target.closest('input,textarea,select,[contenteditable="true"]'))return;
    e.preventDefault();
    notify(`Protected portfolio content • ${provenanceId}`);
  });

  document.addEventListener('dragstart',e=>{
    if(e.target instanceof HTMLImageElement){e.preventDefault();notify('Image dragging is disabled on protected portfolio assets.');}
  });

  document.addEventListener('keydown',e=>{
    if(e.key==='PrintScreen'){
      document.body.classList.add('capture-alert');
      notify(`Capture deterrence active • ${owner} • ${provenanceId}`);
      setTimeout(()=>document.body.classList.remove('capture-alert'),1600);
    }
  });
})();
