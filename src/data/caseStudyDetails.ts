/** Full case study copy keyed to caseStudies[].id */
export type CaseStudyDetail = {
  role: string
  context: string
  challenge: string
  whatIBuilt: string
  impact: string
}

export const caseStudyDetails: Record<string, CaseStudyDetail> = {
  'agent-orchestration': {
    role: 'AI Platform Engineer',
    context:
      'I built this lab to explore how multi-agent systems behave when real tools, permissions, and failures enter the picture — not just in a demo prompt.',
    challenge:
      'The problem was coordination without visibility. Specialist agents can overreach their tools, routing decisions stay hidden, and when a run fails there is often no clear trail to recover from. That is fine for a prototype, but not for anything you would trust in production.',
    whatIBuilt:
      'I built a goal-driven orchestration layer with capability routing, explicit tool permissions, guardrails, and failure recovery. I also added run analytics, latency telemetry, and a React/TypeScript Mission Control interface so I could watch the full fleet from one place.',
    impact:
      'The output is a working control plane where agent teams can be observed, retried, and permission-checked before they touch real workflows. It turned an abstract multi-agent idea into something I could actually stress-test and learn from.',
  },
  'prompt-reliability': {
    role: 'AI Prompt Engineer',
    context:
      'This lab started from a simple frustration: prompt changes look harmless until a small wording shift breaks structured output in production.',
    challenge:
      'The problem was confidence. Teams need to know when a prompt change is safe to ship — not discover failures only after users hit broken responses. Without versioning and regression checks, prompt edits are basically guesswork.',
    whatIBuilt:
      'I built a prompt reliability platform for versioning prompts, running reusable evaluations, validating structured output, detecting regressions, and explaining why a run failed. I also wired in a corrective prompt → retest → verify loop before anything gets deployed.',
    impact:
      'The outcome is PromptOps in practice: production readiness scoring, regression detection, and a clear recovery path when something breaks. You can treat prompts more like software — test before you ship.',
  },
  'gpu-fleet': {
    role: 'Systems Engineer',
    context:
      'GPU workloads get expensive fast when scheduling ignores topology, health, or capacity. I wanted a lab where placement decisions were explainable, not mysterious.',
    challenge:
      'The problem was blind scheduling. Multi-GPU jobs need to land in the right place on a heterogeneous fleet, but operators often cannot see why a job was placed where it was — or how the fleet behaves when something goes wrong.',
    whatIBuilt:
      'I built a topology-aware GPU health and capacity control plane with explainable placement, NVLink-aware multi-GPU scheduling, fault simulation, queue recovery, DCGM telemetry support, and Prometheus observability — all in one control view.',
    impact:
      'The output is a fleet lab where infrastructure decisions are transparent. Operators can see why a job landed on specific GPUs and how the system recovers under stress — instead of guessing after a failed run.',
  },
  '2timesacharm': {
    role: 'AI Automation Engineer',
    context:
      '2 Times a Charm is a Gulf Coast emergency-preparedness affiliate brand. They needed ad operations that could run every week — not a manual copy-paste routine into Meta Ads Manager.',
    challenge:
      'The problem was repetition and handoffs. Someone had to generate ad copy, publish campaigns, log each run, capture leads, and trigger follow-up emails — jumping between Claude, Meta, Google Sheets, and email every time. That does not scale and it is easy to miss a step.',
    whatIBuilt:
      'I built an end-to-end n8n workflow: daily trigger → load product catalog → Claude generates ad copy → parse structured output → publish to Facebook and Instagram → log to Google Sheets → TikTok lead webhook → timed email drip sequence. One pipeline, end to end.',
    impact:
      'The outcome was a live-tested automation, not a slide deck. One awareness campaign reached 16,653 people within 7 days on $26.53 in ad spend — real workflow, real platform, honest numbers.',
  },
  'credit-rise': {
    role: 'AI-Assisted Product Builder',
    context:
      'Credit repair is overwhelming when bureau data, disputes, and planning tools live in separate places. Users end up with too many tabs and too little clarity.',
    challenge:
      'The problem was fragmentation. People needed bureau scores, error discovery, dispute progress, negative account review, and planning tools in one calm workspace — without the product implying guaranteed score outcomes or legal promises it cannot keep.',
    whatIBuilt:
      'I designed and built a user-centered credit workspace with bureau score cards, an error finder, dispute tracker, negative account analysis, payoff planner, and clearly labeled illustrative score scenarios. AI-assisted tools (Claude, Lovable, Cursor) helped me move faster on UX iteration.',
    impact:
      'The output is a product-shaped dashboard that brings the full credit picture into one place. It shows how AI-assisted development can speed up design while keeping the legal and educational framing honest.',
  },
  'ai-video-engine': {
    role: 'Generative Media Engineer',
    context:
      'Video generation pipelines break quickly when the script step returns prose instead of structured data the next node can actually use.',
    challenge:
      'The problem was the handoff. I needed to chain Gemini script generation into video generation, but free-form text was unreliable — the downstream video step needs predictable, machine-readable output or the whole pipeline fails silently.',
    whatIBuilt:
      'I built an n8n pipeline with a manual trigger → Gemini chat for video scripts → structured output parser → validation step → video generation node. Each stage is wired explicitly in the workflow graph so I can see where something breaks.',
    impact:
      'The outcome is a reusable pattern: prompt → validate → generate. Each stage is visible and debuggable in the workflow editor, so I can iterate on scripts without rebuilding the whole chain.',
  },
  'crusoe-rippro': {
    role: 'Desktop Product Engineer',
    context:
      'Print shops running DTF, DTG, and specialty transfers juggle artwork intake, presets, printer queues, and hot folders across tools that were never built to work together.',
    challenge:
      'The problem was tool sprawl. Operators were jumping between apps for intake, presets, calibration, queues, hot folders, and job history — wasting time and losing track of jobs. They needed one desktop app focused on how print shops actually work, not a generic design tool repackaged.',
    whatIBuilt:
      'I built Crusoe RipPro Studio — a Windows desktop app with a dashboard, canvas editor, queue manager, presets, printer setup, calibration tools, hot folder manager, job history, and settings. Python, PySide6, and OpenCV on the stack.',
    impact:
      'The output is original print-production software shaped by operator workflow research. Artwork intake through job history lives in one place — built for the shop floor, not for slide decks.',
  },
  'mockup-magic': {
    role: 'SaaS Product Builder',
    context:
      'Apparel sellers need marketplace-ready mockups, lifestyle scenes, and ad creative — but the path from raw artwork to exportable assets is usually split across several different tools.',
    challenge:
      'The problem was a fragmented workflow. Sellers had to upload artwork somewhere, create mockups somewhere else, generate lifestyle or model scenes in another tool, then organize exports for ads and marketplaces. Too many steps, too many exports lost along the way.',
    whatIBuilt:
      'I built Mockup Magic — a SaaS platform with a mockup studio, AI model studio, ad and export center, Konva-based editor, Supabase backend, brand kits, templates, and a marketplace-ready asset pipeline.',
    impact:
      'The outcome is an end-to-end commerce content workflow: upload artwork, create mockups and AI-assisted scenes, and export organized assets for ads and marketplaces — all inside one product shell.',
  },
}

export function getCaseStudyDetail(id: string): CaseStudyDetail | undefined {
  return caseStudyDetails[id]
}
