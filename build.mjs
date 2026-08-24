import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const out = 'dist';
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });

const files = [
  'index.html',
  'case-study-ad-engine.html',
  'case-study-video-engine.html',
  'case-study-rippro.html',
  'case-study-mockup-magic.html',
  'case-study-credit-rise.html',
  'case-study-gpu-fleet-lab.html',
  'case-study-prompt-reliability-lab.html',
  'resume.html',
  'styles.css',
  'script.js'
];

for (const file of files) {
  if (existsSync(file)) await cp(file, `${out}/${file}`);
}

// Make newer portfolio projects part of the deployed HTML itself so their
// project cards do not depend on browser caching or JavaScript execution.
const deployedIndexPath = `${out}/index.html`;
if (existsSync(deployedIndexPath)) {
  let html = await readFile(deployedIndexPath, 'utf8');

  const gpuFleetCard = '<article class="project" data-project="gpu-fleet-lab"><button class="project-media project-zoom-trigger" type="button" aria-label="Open GPU Fleet Lab project image fullscreen"><img src="assets/gpu-fleet-lab.svg" alt="GPU Fleet Lab architecture preview showing GPU health and topology-aware scheduling" loading="lazy"><span class="zoom-hint" aria-hidden="true">↗ View fullscreen</span></button><div class="project-body"><span class="status">Systems case study</span><h3>GPU Fleet Lab</h3><div class="type">GPU infrastructure · Python/FastAPI</div><p>Topology-aware GPU health and capacity control plane with explainable placement decisions, NVLink-aware multi-GPU scheduling, fault simulation, queue recovery, DCGM telemetry support, and Prometheus observability.</p><div class="tags"><span class="tag">Python</span><span class="tag">FastAPI</span><span class="tag">NVIDIA DCGM</span><span class="tag">Prometheus</span><span class="tag">PostgreSQL</span></div><div class="project-links"><a href="case-study-gpu-fleet-lab.html">Read case study →</a></div></div></article>';

  const promptReliabilityCard = '<article class="project" data-project="prompt-reliability-lab"><button class="project-media project-zoom-trigger" type="button" aria-label="Open Prompt Reliability Lab project image fullscreen"><img src="assets/prompt-reliability-lab.svg" alt="Prompt Reliability Lab dashboard preview showing production readiness, regression detection, evaluation suite, and prompt workbench" loading="lazy"><span class="zoom-hint" aria-hidden="true">↗ View fullscreen</span></button><div class="project-body"><span class="status">AI prompt engineering case study</span><h3>Prompt Reliability Lab</h3><div class="type">LLM evaluation · PromptOps</div><p>Working prompt reliability platform for versioning prompts, running reusable evaluations, validating structured output, detecting regressions, explaining failures, and verifying corrective prompt changes before deployment.</p><div class="tags"><span class="tag">Python</span><span class="tag">FastAPI</span><span class="tag">React</span><span class="tag">TypeScript</span><span class="tag">Pydantic</span><span class="tag">Pytest</span></div><div class="project-links"><a href="case-study-prompt-reliability-lab.html">Read case study →</a></div></div></article>';

  if (!html.includes('data-project="gpu-fleet-lab"')) {
    html = html.replace('<div class="projects">', `<div class="projects">${gpuFleetCard}`);
  }

  if (!html.includes('data-project="prompt-reliability-lab"')) {
    html = html.replace('<div class="projects">', `<div class="projects">${promptReliabilityCard}`);
  }

  html = html.replace(
    '<div><strong>5</strong><span>featured AI builds</span></div>',
    '<div><strong>7</strong><span>featured AI builds</span></div>'
  );

  html = html.replace(
    '<div><strong>6</strong><span>featured AI builds</span></div>',
    '<div><strong>7</strong><span>featured AI builds</span></div>'
  );

  await writeFile(deployedIndexPath, html, 'utf8');
}

await mkdir(`${out}/assets`, { recursive: true });

// Copy repository-owned assets first (including current case-study previews).
if (existsSync('assets')) {
  await cp('assets', `${out}/assets`, { recursive: true });
}

// Preserve legacy project screenshots currently served from the live site.
const remoteAssets = {
  '2timesacharm-ad-engine.png': 'https://ailabs.alfonzoanthony.com/assets/2timesacharm-ad-engine.png',
  'ai-video-engine.png': 'https://ailabs.alfonzoanthony.com/assets/ai-video-engine.png',
  'meta-campaign-results.png': 'https://ailabs.alfonzoanthony.com/assets/meta-campaign-results.png',
  'crusoe-rippro-studio.png': 'https://ailabs.alfonzoanthony.com/assets/crusoe-rippro-studio.png',
  'mockup-magic.png': 'https://ailabs.alfonzoanthony.com/assets/mockup-magic.png'
};

for (const [name, url] of Object.entries(remoteAssets)) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Could not download ${url}: ${response.status}`);
  const bytes = new Uint8Array(await response.arrayBuffer());
  await writeFile(`${out}/assets/${name}`, bytes);
}

const resumeUrl = 'https://ailabs.alfonzoanthony.com/Alfonzo_Anthony_AI_Prompt_Engineer_Resume_Public.pdf';
const resumeResponse = await fetch(resumeUrl);
if (resumeResponse.ok) {
  const bytes = new Uint8Array(await resumeResponse.arrayBuffer());
  await writeFile(`${out}/Alfonzo_Anthony_AI_Prompt_Engineer_Resume_Public.pdf`, bytes);
}

console.log('Static AI portfolio copied to dist/');
