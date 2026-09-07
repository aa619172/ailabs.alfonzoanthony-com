import { cp, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createHash } from 'node:crypto';

const out='dist';
const projectId='AA-AILAB-SEC-009';
const title='Adversarial Prompt Engineering Lab';
const origin='https://ailabs.alfonzoanthony.com';

if(!existsSync(out)) throw new Error('dist/ does not exist. Run build.mjs first.');

const surfaces=[
  {role:'case-study',path:'case-study-ai-security-lab.html'},
  {role:'interactive-workbench',path:'prompt-security-lab.html'},
  {role:'portfolio-interactive-ui',path:'adversarial-prompt-lab-ui.html'},
  {role:'authorized-target-adapter',path:'target-adapter.html'},
  {role:'evaluation-trends',path:'prompt-trends.html'},
  {role:'evaluation-dashboard',path:'prompt-evaluation-dashboard.html'}
];

const supportFiles=[
  'hook.css',
  'security-lab.css',
  'prompt-security-lab.css',
  'prompt-security-lab.js',
  'prompt-experiments.css',
  'prompt-dashboard.css',
  'prompt-dashboard.js'
];

for(const file of [...surfaces.map(item=>item.path),...supportFiles]){
  if(!existsSync(file)) throw new Error(`Prompt Lab build dependency is missing: ${file}`);
  await cp(file,`${out}/${file}`);
}

const provenanceJsonLd=(surfacePath)=>JSON.stringify({
  '@context':'https://schema.org',
  '@type':'CreativeWork',
  name:title,
  identifier:projectId,
  creator:{'@type':'Person',name:'Alfonzo Anthony',url:origin},
  copyrightHolder:{'@type':'Person',name:'Alfonzo Anthony'},
  copyrightYear:2026,
  url:`${origin}/${surfacePath}`,
  isPartOf:{'@type':'WebSite',name:'Alfonzo Anthony AI Portfolio',url:origin},
  usageInfo:`${origin}/provenance-manifest.json`
});

for(const surface of surfaces){
  const target=`${out}/${surface.path}`;
  let html=await readFile(target,'utf8');
  if(!html.includes('name="copyright"')){
    html=html.replace('</head>','<meta name="author" content="Alfonzo Anthony"><meta name="copyright" content="© 2026 Alfonzo Anthony. All rights reserved."><meta name="robots" content="index,follow,noimageindex"></head>');
  }
  if(!html.includes('name="portfolio-provenance-id"')){
    html=html.replace('</head>',`<meta name="portfolio-provenance-id" content="${projectId}"></head>`);
  }
  if(!html.includes('data-prompt-lab-provenance-jsonld')){
    html=html.replace('</head>',`<script type="application/ld+json" data-prompt-lab-provenance-jsonld>${provenanceJsonLd(surface.path)}</script></head>`);
  }
  if(html.includes('<body>')) html=html.replace('<body>',`<body data-provenance-id="${projectId}" data-portfolio-owner="Alfonzo Anthony">`);
  if(surface.path!=='prompt-evaluation-dashboard.html'&&!html.includes('href="prompt-evaluation-dashboard.html"')){
    html=html.replace('<nav class="navlinks">','<nav class="navlinks"><a href="prompt-evaluation-dashboard.html">Dashboard</a>');
  }
  if(!html.includes('data-prompt-lab-signature')){
    html=html.replace('</footer>',`<span data-prompt-lab-signature style="display:block;text-align:center;color:#807989;font-size:.68rem;padding:0 18px 14px">Project provenance · ${projectId}</span></footer>`);
  }
  await writeFile(target,html,'utf8');
}

const deployedIndex=`${out}/index.html`;
if(existsSync(deployedIndex)){
  let html=await readFile(deployedIndex,'utf8');
  if(!html.includes('href="prompt-evaluation-dashboard.html"')){
    html=html.replace(
      '<a href="target-adapter.html">Target evaluation layer →</a>',
      '<a href="target-adapter.html">Target evaluation layer →</a> &nbsp; <a href="prompt-evaluation-dashboard.html">Evaluation dashboard →</a>'
    );
  }
  await writeFile(deployedIndex,html,'utf8');
}

const sha256=async(path)=>{
  if(!existsSync(path)) return null;
  const bytes=await readFile(path);
  return createHash('sha256').update(bytes).digest('hex');
};

const manifestPath=`${out}/provenance-manifest.json`;
if(!existsSync(manifestPath)) throw new Error('provenance-manifest.json is missing from the base build.');
const manifest=JSON.parse(await readFile(manifestPath,'utf8'));
manifest.schema_version='1.1';

const surfaceRecords=[];
for(const surface of surfaces){
  surfaceRecords.push({
    role:surface.role,
    path:surface.path,
    canonical_url:`${origin}/${surface.path}`,
    sha256:await sha256(`${out}/${surface.path}`)
  });
}

const supportRecords=[];
for(const path of supportFiles){
  supportRecords.push({path,sha256:await sha256(`${out}/${path}`)});
}

const record={
  id:projectId,
  title,
  case_study:'case-study-ai-security-lab.html',
  canonical_url:`${origin}/case-study-ai-security-lab.html`,
  case_study_sha256:await sha256(`${out}/case-study-ai-security-lab.html`),
  surfaces:surfaceRecords,
  support_files:supportRecords,
  scope_note:'Prompt Engineering project surfaces share one persistent provenance ID. Deterministic, localhost, and authorized-target evaluation claims remain separately scoped in the project content.'
};

const existingIndex=manifest.projects.findIndex(project=>project.id===projectId);
if(existingIndex>=0) manifest.projects[existingIndex]=record;
else manifest.projects.push(record);
manifest.generated_at_utc=new Date().toISOString();
manifest.repository_commit=process.env.GITHUB_SHA||manifest.repository_commit||null;
await writeFile(manifestPath,JSON.stringify(manifest,null,2),'utf8');

console.log(`Prompt Lab deployed with ${surfaceRecords.length} provenance surfaces under ${projectId}`);
