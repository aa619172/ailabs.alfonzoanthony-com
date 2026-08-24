import { cp, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createHash } from 'node:crypto';

const out = 'dist';
const caseStudy = 'case-study-agent-orchestration-lab.html';
const previewAsset = 'assets/agent-orchestration-lab.svg';

if (!existsSync(out)) throw new Error('dist/ does not exist. Run build.mjs first.');
if (!existsSync(caseStudy)) throw new Error(`${caseStudy} is missing.`);

await cp(caseStudy, `${out}/${caseStudy}`);

const indexPath = `${out}/index.html`;
let html = await readFile(indexPath, 'utf8');

const card = '<article class="project" data-project="agent-orchestration-lab"><button class="project-media project-zoom-trigger" type="button" aria-label="Open Agent Orchestration Lab project image fullscreen"><img src="assets/agent-orchestration-lab.svg" alt="Agent Orchestration Lab Mission Control preview showing orchestration analytics, specialized agents, permission controls, recoveries, and blocked actions" loading="lazy"><span class="zoom-hint" aria-hidden="true">↗ View fullscreen</span></button><div class="project-body"><span class="status">AI platform engineering case study</span><h3>Agent Orchestration Lab</h3><div class="type">Multi-agent control plane · Python/FastAPI</div><p>Goal-driven multi-agent orchestration with capability routing, explicit tool permissions, failure recovery, permission guardrails, run analytics, latency telemetry, and a React/TypeScript Mission Control interface.</p><div class="tags"><span class="tag">Python</span><span class="tag">FastAPI</span><span class="tag">React</span><span class="tag">TypeScript</span><span class="tag">Pytest</span><span class="tag">Observability</span></div><div class="project-links"><a href="case-study-agent-orchestration-lab.html">Read case study →</a></div></div></article>';

if (!html.includes('data-project="agent-orchestration-lab"')) {
  html = html.replace('<div class="projects">', `<div class="projects">${card}`);
}

html = html
  .replace('<div><strong>7</strong><span>featured AI builds</span></div>', '<div><strong>8</strong><span>featured AI builds</span></div>')
  .replace('<div><strong>6</strong><span>featured AI builds</span></div>', '<div><strong>8</strong><span>featured AI builds</span></div>')
  .replace('<div><strong>5</strong><span>featured AI builds</span></div>', '<div><strong>8</strong><span>featured AI builds</span></div>');

await writeFile(indexPath, html, 'utf8');

const sha256 = async (path) => {
  if (!existsSync(path)) return null;
  const bytes = await readFile(path);
  return createHash('sha256').update(bytes).digest('hex');
};

const manifestPath = `${out}/provenance-manifest.json`;
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const projectId = 'AA-AILAB-AGENT-008';

const record = {
  id: projectId,
  title: 'Agent Orchestration Lab',
  case_study: caseStudy,
  preview_asset: previewAsset,
  canonical_url: `https://ailabs.alfonzoanthony.com/${caseStudy}`,
  case_study_sha256: await sha256(`${out}/${caseStudy}`),
  preview_asset_sha256: await sha256(`${out}/${previewAsset}`)
};

const existingIndex = manifest.projects.findIndex((project) => project.id === projectId);
if (existingIndex >= 0) manifest.projects[existingIndex] = record;
else manifest.projects.push(record);

manifest.generated_at_utc = new Date().toISOString();
await writeFile(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');

console.log('Agent Orchestration Lab added to portfolio build and provenance manifest');
