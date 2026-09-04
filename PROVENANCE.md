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
| AI Security & Adversarial Testing Lab | AA-AILAB-SEC-009 |

## Deployment integrity

The production build creates `provenance-manifest.json`. Each registered case-study HTML file and its portfolio preview asset is hashed using SHA-256. The manifest also records the GitHub Actions deployment commit when available.

These hashes are intended to provide a machine-readable record of the exact files included in a deployment. Git commit history, deployment history, provenance IDs, source files, and the generated hashes together provide evidence of chronology and authorship.

## Web deterrence layer

The portfolio also includes:

- visible provenance cards on project case-study pages;
- JSON-LD creator and copyright metadata;
- canonical portfolio URLs;
- `noimageindex` metadata for search engines that honor it;
- right-click and image-drag deterrence;
- subtle screenshot watermark overlays;
- a stronger PrintScreen-key deterrence overlay where the browser exposes that key event;
- print/PDF suppression for protected portfolio pages.

These controls are deterrents, not digital-rights-management guarantees. Browsers and operating systems cannot reliably prevent every screenshot, screen recording, camera capture, source retrieval, or determined copying attempt. The provenance system is therefore designed to make ownership traceable and copied material easier to attribute back to its original source.
