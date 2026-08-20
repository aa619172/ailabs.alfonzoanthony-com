import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
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
  'resume.html',
  'styles.css',
  'script.js'
];

for (const file of files) {
  if (existsSync(file)) await cp(file, `${out}/${file}`);
}

await mkdir(`${out}/assets`, { recursive: true });
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
