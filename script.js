const y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
(()=>{const toggle=document.querySelector('.menu-toggle');const nav=document.getElementById('siteNav');if(!toggle||!nav)return;const close=()=>{toggle.setAttribute('aria-expanded','false');nav.classList.remove('is-open')};toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));nav.classList.toggle('is-open',!open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});document.addEventListener('click',e=>{if(nav.classList.contains('is-open')&&!nav.contains(e.target)&&!toggle.contains(e.target))close()});})();
(()=>{const projects=document.querySelector('.projects');if(!projects||document.querySelector('[data-project="gpu-fleet-lab"]'))return;const card=document.createElement('article');card.className='project';card.dataset.project='gpu-fleet-lab';card.innerHTML='<button class="project-media project-zoom-trigger" type="button" aria-label="Open GPU Fleet Lab project image fullscreen"><img src="assets/gpu-fleet-lab.svg" alt="GPU Fleet Lab architecture preview showing GPU health and topology-aware scheduling" loading="lazy"><span class="zoom-hint" aria-hidden="true">↗ View fullscreen</span></button><div class="project-body"><span class="status">Systems case study</span><h3>GPU Fleet Lab</h3><div class="type">GPU infrastructure · Python/FastAPI</div><p>Topology-aware GPU health and capacity control plane with explainable placement decisions, NVLink-aware multi-GPU scheduling, fault simulation, queue recovery, DCGM telemetry support, and Prometheus observability.</p><div class="tags"><span class="tag">Python</span><span class="tag">FastAPI</span><span class="tag">NVIDIA DCGM</span><span class="tag">Prometheus</span><span class="tag">PostgreSQL</span></div><div class="project-links"><a href="case-study-gpu-fleet-lab.html">Read case study →</a></div></div>';projects.prepend(card);const firstProof=document.querySelector('.proof strong');if(firstProof&&firstProof.textContent.trim()==='5')firstProof.textContent='6';})();
(()=>{const viewer=document.getElementById('imageViewer');const img=document.getElementById('viewerImage');const value=document.getElementById('viewerZoomValue');if(!viewer||!img||!value)return;let zoom=1,last=null;const update=()=>{img.style.transform=`scale(${zoom})`;value.textContent=`${Math.round(zoom*100)}%`};const reset=()=>{zoom=1;update()};const open=t=>{const source=t.querySelector('img');if(!source)return;last=t;img.src=source.currentSrc||source.src;img.alt=source.alt||'Project screenshot';reset();viewer.classList.add('is-open');viewer.setAttribute('aria-hidden','false');document.body.classList.add('viewer-open');viewer.querySelector('.viewer-close')?.focus()};const close=()=>{viewer.classList.remove('is-open');viewer.setAttribute('aria-hidden','true');document.body.classList.remove('viewer-open');img.src='';reset();last?.focus()};const zin=()=>{zoom=Math.min(3,+(zoom+.25).toFixed(2));update()};const zout=()=>{zoom=Math.max(.5,+(zoom-.25).toFixed(2));update()};document.querySelectorAll('.project-zoom-trigger').forEach(t=>t.addEventListener('click',()=>open(t)));viewer.querySelectorAll('[data-viewer-close]').forEach(b=>b.addEventListener('click',close));viewer.querySelector('[data-zoom-in]')?.addEventListener('click',zin);viewer.querySelector('[data-zoom-out]')?.addEventListener('click',zout);viewer.querySelector('[data-zoom-reset]')?.addEventListener('click',reset);document.addEventListener('keydown',e=>{if(!viewer.classList.contains('is-open'))return;if(e.key==='Escape'){e.preventDefault();close()}else if(e.key==='+'||e.key==='='){e.preventDefault();zin()}else if(e.key==='-'||e.key==='_'){e.preventDefault();zout()}else if(e.key==='0'){e.preventDefault();reset()}});})();

// Employer-first case-study summaries: Problem → Solution → Thought Process → Key Result.
(()=>{
  const file=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const summaries={
    'case-study-ad-engine.html':{
      problem:'Launching and managing Facebook campaigns required disconnected manual work across copy creation, campaign setup, logging, lead capture, and follow-up.',
      solution:'I designed an n8n automation that connects AI-generated ad copy, Meta campaign actions, Google Sheets logging, webhook lead capture, and follow-up steps in one workflow.',
      thought:'I approached it like a support escalation: identify every handoff, find where human effort or failure accumulates, then connect the steps without hiding the operator’s ability to inspect what happened.',
      result:'The documented live Meta Ads test reached 16,653 people on $26.53 in spend — about $1.59 per 1,000 people reached.'
    },
    'case-study-agent-orchestration-lab.html':{
      problem:'Multi-agent systems can look impressive while hiding who made a decision, which tool was allowed, what failed, and how recovery happened.',
      solution:'I built a mission-control prototype with capability-based routing, least-privilege tool permissions, fallback recovery, guardrails, execution traces, run history, and observability analytics.',
      thought:'I treated orchestration as an operations problem, not just a prompt problem: define responsibility, constrain access, inject controlled failures, expose the trace, and verify that the system can explain its own behavior.',
      result:'The lab reproducibly demonstrates normal execution, simulated tool failure with approved fallback recovery, and blocked permission violations while preserving a passing quality gate.'
    },
    'case-study-gpu-fleet-lab.html':{
      problem:'GPU workload health, capacity, topology, and scheduling decisions become difficult to reason about when they are scattered across separate infrastructure layers.',
      solution:'I created a GPU resource lab that brings telemetry, DCGM-style metrics, NVLink/topology awareness, scheduling explanations, persistent job history, fault simulation, and benchmarking into one system.',
      thought:'I used a troubleshooting mindset: gather signals first, establish relationships between components, make placement decisions explainable, then preserve enough history to understand why a job succeeded, queued, moved, or failed.',
      result:'The result is a working systems-engineering portfolio lab that converts infrastructure signals into visible health, capacity, and scheduling decisions instead of opaque outcomes.'
    },
    'case-study-prompt-reliability-lab.html':{
      problem:'A prompt that works in one demo does not prove it is reliable. Without repeatable evaluation, regressions and inconsistent outputs are easy to miss.',
      solution:'I built an evaluation lab for structured prompt tests, expected behavior, failure inspection, and repeatable comparisons between runs.',
      thought:'I reframed prompt engineering as quality engineering: define what good behavior means, test it repeatedly, surface failures, and make changes measurable rather than relying on intuition alone.',
      result:'Prompt performance becomes observable and testable, giving a clearer basis for iteration than one-off manual prompting.'
    },
    'case-study-rippro.html':{
      problem:'DTF/DTG print preparation often forces operators to jump between artwork cleanup, presets, calibration, printer settings, queues, hot folders, and job history.',
      solution:'I designed Crusoe RipPro Studio as a centralized AI-assisted desktop workspace for print preparation and production operations.',
      thought:'I combined production knowledge with UX thinking: map the operator’s real sequence of work, reduce context switching, surface the controls that matter at the moment they matter, and keep the interface visually understandable.',
      result:'The prototype demonstrates how a fragmented print-production workflow can be reorganized into one coherent operator experience.'
    },
    'case-study-mockup-magic.html':{
      problem:'Apparel sellers often need separate tools and repeated manual work to turn artwork into mockups, lifestyle imagery, advertising creative, and organized exports.',
      solution:'I designed Mockup Magic as an AI-assisted product-content platform that connects realistic apparel compositing, fictional AI models, campaign creative, and export organization.',
      thought:'I looked at the workflow from both the creator and seller perspective: preserve creative control while removing repetitive production steps and keeping the path from artwork to market visually consistent.',
      result:'The product concept consolidates multiple content-production stages into a single workflow built around the needs of apparel and print businesses.'
    },
    'case-study-video-engine.html':{
      problem:'Generative-video workflows can break when model output is inconsistent, loosely formatted, or difficult for downstream automation to consume.',
      solution:'I built an n8n pipeline that uses Gemini to generate structured video-script data, validates machine-readable output, and passes the result forward into video generation.',
      thought:'I treated the model as one component inside a larger system: constrain the output contract, validate it before downstream use, and separate creative generation from workflow reliability.',
      result:'The prototype demonstrates a more controlled prompt-to-video handoff with structured outputs instead of relying on free-form text between automation steps.'
    },
    'case-study-credit-rise.html':{
      problem:'People working on their credit can face scattered scores, negative accounts, dispute progress, education, and planning information without a clear sense of what to do next.',
      solution:'I designed a user-centered dashboard that brings bureau information, error discovery, dispute progress, planning tools, and clearly labeled illustrative score scenarios into one workspace.',
      thought:'I started with user anxiety and information overload: prioritize clarity, show progress, separate education from prediction, and make the next useful action easier to identify.',
      result:'The prototype organizes a complicated credit-improvement journey into a clearer, task-oriented experience rather than a collection of disconnected data.'
    },
    'credit-rise-case-study.html':{
      problem:'People working on their credit can face scattered scores, negative accounts, dispute progress, education, and planning information without a clear sense of what to do next.',
      solution:'I designed a user-centered dashboard that brings bureau information, error discovery, dispute progress, planning tools, and clearly labeled illustrative score scenarios into one workspace.',
      thought:'I started with user anxiety and information overload: prioritize clarity, show progress, separate education from prediction, and make the next useful action easier to identify.',
      result:'The prototype organizes a complicated credit-improvement journey into a clearer, task-oriented experience rather than a collection of disconnected data.'
    }
  };
  const data=summaries[file];
  const hero=document.querySelector('.case-hero');
  if(!data||!hero||document.querySelector('.case-executive-summary'))return;
  const style=document.createElement('style');
  style.textContent='.case-executive-summary{padding:0 0 34px}.case-executive-card{background:linear-gradient(145deg,#18151f,#111116);border:1px solid #3a3446;border-radius:20px;padding:24px}.case-executive-title{display:flex;justify-content:space-between;align-items:end;gap:20px;margin-bottom:18px}.case-executive-title h2{font-family:var(--serif);font-size:1.65rem;margin:5px 0 0}.case-executive-title p{color:var(--muted);font-size:.82rem;max-width:500px;margin:0}.case-executive-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}.case-executive-item{background:#101015;border:1px solid var(--line);border-radius:14px;padding:16px}.case-executive-item b{display:block;color:#ead279;font-size:.7rem;letter-spacing:.09em;text-transform:uppercase;margin-bottom:8px}.case-executive-item p{margin:0;color:var(--muted);font-size:.82rem;line-height:1.5}.case-executive-item.result b{color:#65c6c0}@media(max-width:900px){.case-executive-grid{grid-template-columns:1fr 1fr}}@media(max-width:600px){.case-executive-title{display:block}.case-executive-grid{grid-template-columns:1fr}}';
  document.head.appendChild(style);
  const section=document.createElement('section');
  section.className='case-executive-summary';
  section.innerHTML=`<div class="wrap"><div class="case-executive-card"><div class="case-executive-title"><div><div class="eyebrow">CASE STUDY AT A GLANCE</div><h2>Problem → Solution → Reasoning → Result</h2></div><p>This is the decision path behind the work—not just a list of features.</p></div><div class="case-executive-grid"><div class="case-executive-item"><b>Problem</b><p>${data.problem}</p></div><div class="case-executive-item"><b>Solution</b><p>${data.solution}</p></div><div class="case-executive-item"><b>My thought process</b><p>${data.thought}</p></div><div class="case-executive-item result"><b>Key result / proof</b><p>${data.result}</p></div></div></div></div>`;
  hero.insertAdjacentElement('afterend',section);
})();

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
    'case-study-prompt-reliability-lab.html':{id:'AA-AILAB-PROMPT-007',title:'Prompt Reliability Lab'},
    'case-study-agent-orchestration-lab.html':{id:'AA-AILAB-AGENT-008',title:'Agent Orchestration Lab'}
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
