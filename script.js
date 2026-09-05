const yearNode=document.getElementById('year');
if(yearNode)yearNode.textContent=new Date().getFullYear();

// Homepage positioning: AI Prompt Engineering is the primary identity.
(()=>{
  const file=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  if(file!=='index.html'&&file!=='')return;
  document.title='Alfonzo Anthony — AI Prompt Engineer | AI Labs';
  const description=document.querySelector('meta[name="description"]');
  if(description)description.content='Alfonzo Anthony is an AI Prompt Engineer demonstrating prompt architecture, context engineering, structured outputs, evaluation, agent prompting, adversarial testing, and AI automation through working portfolio labs.';
  const eyebrow=document.querySelector('.hook-copy .eyebrow');
  if(eyebrow)eyebrow.textContent='AI PROMPT ENGINEERING · CONTEXT · EVALUATION · AUTOMATION';
  const headline=document.querySelector('.hook-copy h1');
  if(headline)headline.innerHTML='I engineer AI prompts into <span>working, testable systems.</span>';
  const lead=document.querySelector('.hook-copy .hook-lead');
  if(lead)lead.textContent='I design instruction hierarchies, context boundaries, structured outputs, evaluation rubrics, agent behavior, tool constraints, and automation workflows—then test the prompts against normal, edge-case, and adversarial inputs.';
  const identity=document.querySelector('.identity-line');
  if(identity){const strong=identity.querySelector('strong');const span=identity.querySelector('span');if(strong)strong.textContent='AI Prompt Engineer';if(span)span.textContent='Prompt architecture × context engineering × evaluation × automation';}
  const trust=document.querySelector('.hook-trust');
  if(trust)trust.innerHTML='<span>Prompt architecture</span><span>Context engineering</span><span>Adversarial prompt testing</span><span>AI workflow automation</span>';
  const securityTitle=document.querySelector('.security-console h2');
  if(securityTitle)securityTitle.textContent='Adversarial Prompt Engineering Lab';
  const securityState=document.querySelector('.security-console .console-state');
  if(securityState)securityState.textContent='PROMPT SECURITY';
  const securityCopy=document.querySelector('.security-console p[style]');
  if(securityCopy)securityCopy.textContent='A controlled prompt-engineering harness for instruction override, context leakage, tool-boundary manipulation, and indirect prompt injection.';
  const securityLink=document.querySelector('.security-console .proof-link');
  if(securityLink){securityLink.href='prompt-security-lab.html';securityLink.textContent='Open the interactive prompt lab →';}
  const scanTitle=document.querySelector('.employer-scan h2');
  if(scanTitle)scanTitle.textContent='Prompt engineering is the thread connecting the work.';
  const scanCopy=document.querySelector('.employer-scan .scan-intro p');
  if(scanCopy)scanCopy.textContent='Each project demonstrates a different prompt-engineering capability: instruction design, context control, structured outputs, agents, evaluation, reliability, automation, or adversarial testing.';
  const processIntro=document.querySelector('#process .section-head p');
  if(processIntro)processIntro.textContent='I use technical troubleshooting, user empathy, design judgment, and adversarial testing as supporting lenses for better prompt-engineering decisions.';
})();

// Responsive navigation.
(()=>{
  const toggle=document.querySelector('.menu-toggle');
  const nav=document.getElementById('siteNav');
  if(!toggle||!nav)return;
  const close=()=>{toggle.setAttribute('aria-expanded','false');nav.classList.remove('is-open')};
  toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));nav.classList.toggle('is-open',!open)});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
  document.addEventListener('click',e=>{if(nav.classList.contains('is-open')&&!nav.contains(e.target)&&!toggle.contains(e.target))close()});
})();

// Fullscreen project-image viewer.
(()=>{
  const viewer=document.getElementById('imageViewer');
  const img=document.getElementById('viewerImage');
  const value=document.getElementById('viewerZoomValue');
  if(!viewer||!img||!value)return;
  let zoom=1,last=null;
  const update=()=>{img.style.transform=`scale(${zoom})`;value.textContent=`${Math.round(zoom*100)}%`};
  const reset=()=>{zoom=1;update()};
  const open=trigger=>{const source=trigger.querySelector('img');if(!source)return;last=trigger;img.src=source.currentSrc||source.src;img.alt=source.alt||'Project screenshot';reset();viewer.classList.add('is-open');viewer.setAttribute('aria-hidden','false');document.body.classList.add('viewer-open');viewer.querySelector('.viewer-close')?.focus()};
  const close=()=>{viewer.classList.remove('is-open');viewer.setAttribute('aria-hidden','true');document.body.classList.remove('viewer-open');img.src='';reset();last?.focus()};
  const zoomIn=()=>{zoom=Math.min(3,+(zoom+.25).toFixed(2));update()};
  const zoomOut=()=>{zoom=Math.max(.5,+(zoom-.25).toFixed(2));update()};
  document.querySelectorAll('.project-zoom-trigger').forEach(trigger=>trigger.addEventListener('click',()=>open(trigger)));
  viewer.querySelectorAll('[data-viewer-close]').forEach(button=>button.addEventListener('click',close));
  viewer.querySelector('[data-zoom-in]')?.addEventListener('click',zoomIn);
  viewer.querySelector('[data-zoom-out]')?.addEventListener('click',zoomOut);
  viewer.querySelector('[data-zoom-reset]')?.addEventListener('click',reset);
  document.addEventListener('keydown',e=>{if(!viewer.classList.contains('is-open'))return;if(e.key==='Escape'){e.preventDefault();close()}else if(e.key==='+'||e.key==='='){e.preventDefault();zoomIn()}else if(e.key==='-'||e.key==='_'){e.preventDefault();zoomOut()}else if(e.key==='0'){e.preventDefault();reset()}});
})();

// Employer-first summaries for legacy case-study pages.
(()=>{
  const file=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const summaries={
    'case-study-ad-engine.html':{problem:'Launching and managing Facebook campaigns required disconnected manual work across copy creation, campaign setup, logging, lead capture, and follow-up.',solution:'I designed an n8n automation connecting AI-generated ad copy, Meta campaign actions, Google Sheets logging, webhook lead capture, and follow-up.',thought:'I approached it like a support escalation: identify every handoff, find where effort or failure accumulates, then connect the steps without hiding operator visibility.',result:'The documented live Meta Ads test reached 16,653 people on $26.53 in spend — about $1.59 per 1,000 people reached.'},
    'case-study-agent-orchestration-lab.html':{problem:'Multi-agent systems can hide who made a decision, which tool was allowed, what failed, and how recovery happened.',solution:'A mission-control prototype with capability routing, least-privilege tool permissions, fallback recovery, guardrails, execution traces, run history, and observability.',thought:'I treated orchestration as an operations problem: define responsibility, constrain access, inject controlled failures, expose the trace, and verify recovery.',result:'The lab reproducibly demonstrates normal execution, simulated tool failure with approved fallback recovery, and blocked permission violations.'},
    'case-study-gpu-fleet-lab.html':{problem:'GPU workload health, capacity, topology, and scheduling decisions are difficult to reason about when scattered across infrastructure layers.',solution:'A GPU resource lab combining telemetry, DCGM-style metrics, NVLink/topology awareness, scheduling explanations, persistent history, fault simulation, and benchmarking.',thought:'Gather the signals first, establish relationships, make placement decisions explainable, and preserve enough history to diagnose outcomes.',result:'The working systems lab converts infrastructure signals into visible health, capacity, and scheduling decisions.'},
    'case-study-prompt-reliability-lab.html':{problem:'A prompt that works in one demo does not prove reliable behavior across repeated runs.',solution:'An evaluation lab for structured prompt tests, expected behavior, failure inspection, and repeatable comparison.',thought:'I reframed prompt engineering as quality engineering: define good behavior, test it, surface failures, and make change measurable.',result:'Prompt performance becomes observable and testable instead of dependent on one-off manual prompting.'},
    'case-study-rippro.html':{problem:'DTF/DTG operators often jump between artwork cleanup, presets, calibration, printers, queues, hot folders, and job history.',solution:'Crusoe RipPro Studio centralizes AI-assisted print preparation and production operations in one desktop workflow.',thought:'Map the operator’s real sequence, reduce context switching, and surface the right controls at the moment they matter.',result:'The prototype reorganizes a fragmented print-production workflow into one coherent operator experience.'},
    'case-study-mockup-magic.html':{problem:'Apparel sellers often need separate tools and repeated manual work for mockups, lifestyle imagery, ads, and exports.',solution:'Mockup Magic connects realistic apparel compositing, fictional AI models, campaign creative, and export organization.',thought:'Preserve creative control while reducing repetitive production steps and maintaining visual consistency from artwork to market.',result:'The product concept consolidates multiple content-production stages around the needs of apparel and print businesses.'},
    'case-study-video-engine.html':{problem:'Generative-video automation can break when model output is inconsistent or difficult for downstream steps to consume.',solution:'An n8n pipeline that generates structured video-script data, validates machine-readable output, and passes it to video generation.',thought:'Treat the model as one component in a system: constrain the output contract and validate before downstream use.',result:'The prototype demonstrates a controlled prompt-to-video handoff using structured outputs rather than free-form text.'},
    'case-study-credit-rise.html':{problem:'Credit improvement can involve scattered scores, negative accounts, disputes, education, and planning without a clear next step.',solution:'A user-centered dashboard combining bureau information, error discovery, dispute progress, planning tools, and clearly labeled illustrative scenarios.',thought:'Start with user anxiety and overload: prioritize clarity, progress, education, and the next useful action.',result:'The prototype organizes a complicated credit-improvement journey into a clearer task-oriented experience.'},
    'credit-rise-case-study.html':{problem:'Credit improvement can involve scattered scores, negative accounts, disputes, education, and planning without a clear next step.',solution:'A user-centered dashboard combining bureau information, error discovery, dispute progress, planning tools, and clearly labeled illustrative scenarios.',thought:'Start with user anxiety and overload: prioritize clarity, progress, education, and the next useful action.',result:'The prototype organizes a complicated credit-improvement journey into a clearer task-oriented experience.'}
  };
  const data=summaries[file];
  const hero=document.querySelector('.case-hero');
  if(!data||!hero||document.querySelector('.case-executive-summary'))return;
  const style=document.createElement('style');
  style.textContent='.case-executive-summary{padding:0 0 34px}.case-executive-card{background:linear-gradient(145deg,#18151f,#111116);border:1px solid #3a3446;border-radius:20px;padding:24px}.case-executive-title{display:flex;justify-content:space-between;align-items:end;gap:20px;margin-bottom:18px}.case-executive-title h2{font-family:var(--serif);font-size:1.65rem;margin:5px 0 0}.case-executive-title p{color:var(--muted);font-size:.82rem;max-width:500px;margin:0}.case-executive-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}.case-executive-item{background:#101015;border:1px solid var(--line);border-radius:14px;padding:16px}.case-executive-item b{display:block;color:#ead279;font-size:.7rem;letter-spacing:.09em;text-transform:uppercase;margin-bottom:8px}.case-executive-item p{margin:0;color:var(--muted);font-size:.82rem;line-height:1.5}.case-executive-item.result b{color:#65c6c0}@media(max-width:900px){.case-executive-grid{grid-template-columns:1fr 1fr}}@media(max-width:600px){.case-executive-title{display:block}.case-executive-grid{grid-template-columns:1fr}}';
  document.head.appendChild(style);
  const section=document.createElement('section');
  section.className='case-executive-summary';
  section.innerHTML=`<div class="wrap"><div class="case-executive-card"><div class="case-executive-title"><div><div class="eyebrow">CASE STUDY AT A GLANCE</div><h2>Problem → Solution → Reasoning → Result</h2></div><p>This is the decision path behind the work—not just a feature list.</p></div><div class="case-executive-grid"><div class="case-executive-item"><b>Problem</b><p>${data.problem}</p></div><div class="case-executive-item"><b>Solution</b><p>${data.solution}</p></div><div class="case-executive-item"><b>My thought process</b><p>${data.thought}</p></div><div class="case-executive-item result"><b>Key result / proof</b><p>${data.result}</p></div></div></div></div>`;
  hero.insertAdjacentElement('afterend',section);
})();

// Portfolio provenance, structured ownership metadata, and capture deterrence.
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
    'case-study-agent-orchestration-lab.html':{id:'AA-AILAB-AGENT-008',title:'Agent Orchestration Lab'},
    'case-study-ai-security-lab.html':{id:'AA-AILAB-SEC-009',title:'Adversarial Prompt Engineering Lab'},
    'prompt-security-lab.html':{id:'AA-AILAB-SEC-009',title:'Adversarial Prompt Engineering Lab'}
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
  ld.textContent=JSON.stringify({'@context':'https://schema.org','@type':project?'CreativeWork':'ProfilePage',name:title,identifier:provenanceId,creator:{'@type':'Person',name:owner,url:origin},copyrightHolder:{'@type':'Person',name:owner},copyrightYear:2026,url:canonical,isPartOf:{'@type':'WebSite',name:'Alfonzo Anthony AI Portfolio',url:origin},usageInfo:`${origin}/provenance-manifest.json`});
  document.head.appendChild(ld);
  if(project){const main=document.querySelector('main');if(main&&!document.querySelector('.provenance-section')){const section=document.createElement('section');section.className='provenance-section';section.setAttribute('aria-label','Project provenance and ownership');section.innerHTML=`<div class="wrap"><div class="provenance-card"><div><div class="eyebrow">Project provenance</div><h2>Original portfolio work by ${owner}</h2><p>This case study is registered with a persistent portfolio provenance ID. Viewing it does not grant permission to copy, reproduce, redistribute, commercialize, or present it as your own.</p></div><dl><div><dt>Project ID</dt><dd>${provenanceId}</dd></div><div><dt>Creator</dt><dd>${owner}</dd></div><div><dt>Canonical origin</dt><dd>ailabs.alfonzoanthony.com</dd></div><div><dt>Rights</dt><dd>All rights reserved</dd></div></dl><a class="provenance-link" href="PROVENANCE.md" target="_blank" rel="noopener">Review provenance policy →</a></div></div>`;main.appendChild(section)}}
  const watermark=document.createElement('div');watermark.className='capture-watermark';watermark.setAttribute('aria-hidden','true');const mark=`${owner} • ${provenanceId} • ailabs.alfonzoanthony.com`;watermark.innerHTML=Array.from({length:24},()=>`<span>${mark}</span>`).join('');document.body.appendChild(watermark);
  const viewerShell=document.querySelector('.image-viewer-shell');if(viewerShell)viewerShell.dataset.watermark=`© ${new Date().getFullYear()} ${owner} • ${provenanceId}`;
  let toastTimer;
  const notify=message=>{let toast=document.querySelector('.protection-toast');if(!toast){toast=document.createElement('div');toast.className='protection-toast';toast.setAttribute('role','status');document.body.appendChild(toast)}toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),1800)};
  document.addEventListener('contextmenu',e=>{if(e.target.closest('input,textarea,select,[contenteditable="true"]'))return;e.preventDefault();notify(`Protected portfolio content • ${provenanceId}`)});
  document.addEventListener('dragstart',e=>{if(e.target instanceof HTMLImageElement){e.preventDefault();notify('Image dragging is disabled on protected portfolio assets.')}});
  document.addEventListener('keydown',e=>{if(e.key==='PrintScreen'){document.body.classList.add('capture-alert');notify(`Capture deterrence active • ${owner} • ${provenanceId}`);setTimeout(()=>document.body.classList.remove('capture-alert'),1600)}});
})();
