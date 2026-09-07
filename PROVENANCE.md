# Portfolio Provenance Registry

This repository contains original portfolio work presented by Alfonzo Anthony at https://ailabs.alfonzoanthony.com.

## Rights

© 2026 Alfonzo Anthony. All rights reserved.

Viewing this portfolio does not grant permission to copy, reproduce, redistribute, commercialize, resell, republish, or present the projects, case studies, screenshots, diagrams, workflows, written explanations, or design assets as another person's original work.

## Project IDs

| Project | Provenance ID |
| --- | --- |
| 2TimesACharm AI Ad Engine | AA-AILAB-2TAC-AE-001 |
| AI Video Generation Engine | AA-AILAB-VIDEO-002 |
| Crusoe RipPro Studio | AA-AILAB-RIPPRO-003 |
| Mockup Magic | AA-AILAB-MOCKUP-004 |
| Credit Rise | AA-AILAB-CREDIT-005 |
| GPU Fleet Lab | AA-AILAB-GPU-006 |
| Prompt Reliability Lab | AA-AILAB-PROMPT-007 |
| Agent Orchestration Lab | AA-AILAB-AGENT-008 |
| Adversarial Prompt Engineering Lab | AA-AILAB-SEC-009 |

## Prompt Lab registered surfaces

The following surfaces are part of the same Adversarial Prompt Engineering project and intentionally share **AA-AILAB-SEC-009**:

| Surface | Role |
| --- | --- |
| `case-study-ai-security-lab.html` | Employer-facing case study |
| `prompt-security-lab.html` | Interactive 12-test Prompt Engineering workbench |
| `adversarial-prompt-lab-ui.html` | Portfolio-focused interactive lab UI |
| `target-adapter.html` | Authorized-target evaluation architecture |
| `prompt-trends.html` | Persistent evaluation history and trend methodology |
| `prompt-evaluation-dashboard.html` | Interactive target-specific Prompt Evaluation Dashboard |

The shared provenance ID means these pages are connected layers of one Prompt Engineering project rather than separate claims or unrelated projects.

## Deployment integrity

The production build creates `provenance-manifest.json` using SHA-256 hashes. The base build registers established case-study projects, the Agent Orchestration build stage registers **AA-AILAB-AGENT-008**, and the Prompt Lab build stage registers **AA-AILAB-SEC-009**.

For the Prompt Lab, the manifest records:

- the case-study SHA-256 hash;
- each registered Prompt Lab surface path, role, canonical URL, and SHA-256 hash;
- supporting Prompt Lab CSS/JavaScript file hashes;
- the GitHub Actions deployment commit when available;
- a scope note preserving the distinction between deterministic, localhost, and explicitly authorized target results.

The Prompt Lab production build also embeds `portfolio-provenance-id=AA-AILAB-SEC-009`, JSON-LD creator/identifier metadata, ownership metadata, and a visible provenance signature in every registered Prompt Lab HTML surface.

These hashes and metadata are intended to provide a machine-readable record of the exact files included in a deployment. Git commit history, deployment history, provenance IDs, source files, and generated hashes together provide evidence of chronology and authorship.

## Web deterrence layer

The portfolio also includes:

- visible provenance identifiers or cards on registered project surfaces;
- JSON-LD creator and copyright metadata;
- canonical portfolio URLs;
- `noimageindex` metadata for search engines that honor it;
- right-click and image-drag deterrence on supported portfolio pages;
- subtle screenshot watermark overlays on supported portfolio pages;
- a stronger PrintScreen-key deterrence overlay where the browser exposes that key event;
- print/PDF suppression for protected portfolio pages.

These controls are deterrents, not digital-rights-management guarantees. Browsers and operating systems cannot reliably prevent every screenshot, screen recording, camera capture, source retrieval, or determined copying attempt. The provenance system is therefore designed to make ownership traceable and copied material easier to attribute back to its original source.
