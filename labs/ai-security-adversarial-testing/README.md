# Adversarial Prompt Engineering Lab

A portfolio lab by Alfonzo Anthony demonstrating advanced AI Prompt Engineering through prompt architecture, context engineering, adversarial prompting, evaluation rubrics, mitigation design, and regression retesting.

## The Prompt Engineering Problem

A prompt that behaves correctly during normal use can still fail when the input deliberately challenges instruction hierarchy, hidden context, tool permissions, or the boundary between trusted policy and untrusted retrieved content.

The goal of this lab is not to collect clever jailbreaks. The goal is to make prompt behavior **testable**.

## Method

`Prompt Contract -> Adversarial Prompt -> Response Capture -> Evaluator Rubric -> Evidence -> Prompt/Control Redesign -> Regression Retest`

The first version uses deterministic simulated targets so every failure and mitigation can be reproduced without provider drift, third-party API cost, or unsafe actions.

## What the lab demonstrates

- System-prompt and instruction-hierarchy design
- Context engineering and trust-boundary labeling
- Tool-use prompting and permission boundaries
- Output constraints and sensitive-context protection
- Adversarial prompt design
- Explicit evaluator rubrics
- Before/after prompt architecture comparison
- Prompt regression testing
- OWASP GenAI and MITRE ATLAS risk mapping as supporting context

## Prompt architectures

### PROMPT-ARCH-V1 — vulnerable baseline

The baseline intentionally leaves important behavior under-specified: weak trust separation, broad tool choice, no explicit sensitive-output contract, and no strong rule preventing retrieved text from acting as instructions.

### PROMPT-ARCH-V2 — hardened prompt contract

The hardened version adds explicit instruction priority, untrusted-content labeling, context disclosure boundaries, least-privilege tool policy, approval requirements for privileged actions, and regression checks against known adversarial prompts.

## Controlled scenarios

1. **Direct instruction override** — tests instruction hierarchy and system-prompt protection.
2. **Synthetic sensitive-data extraction** — tests context engineering and output constraints.
3. **Unauthorized privileged tool request** — tests agent/tool prompting and authorization boundaries.
4. **Indirect prompt injection** — tests whether retrieved untrusted content can become active instructions.

All secrets, tools, records, and destinations in this lab are synthetic and non-operational.

## Key controlled result

**PROMPT-ARCH-V1:** 4/4 adversarial prompts succeed; risk score 34.

**PROMPT-ARCH-V2:** 0/4 adversarial prompts succeed; risk score 0.

**Controlled deterministic result: attack success rate 100% -> 0% after prompt/control redesign.**

This is a reproducible lab result, not a claim about defeating a production model or third-party AI provider.

## Run the Python lab

```bash
cd labs/ai-security-adversarial-testing
python run_lab.py
python -m unittest discover -s tests -v
```

## Interactive portfolio lab

The portfolio includes `prompt-security-lab.html`, an interactive workbench that exposes the attack prompt, objective, evaluator rubric, prompt architecture, framework mapping, mitigation, and before/after behavior.

## Framework references

The lab uses the OWASP GenAI LLM Top 10 and MITRE ATLAS to give recognized security context to prompt failures. Microsoft PyRIT is on the roadmap for authorized broader adversarial evaluation. These frameworks support the project; **AI Prompt Engineering is the primary skill being demonstrated.**

## Roadmap

- Expand from 4 to 20+ controlled prompt-evaluation scenarios
- JSON/HTML assessment report export
- Prompt version and regression trend history
- Authorized HTTP/LLM target adapter
- Microsoft PyRIT adapter for authorized targets
- garak result ingestion
- promptfoo regression adapter
- CI prompt-reliability/security gate
- Agent Orchestration Lab integration for agent prompt testing

## Scope and ethics

Use active adapters only against systems you own or have explicit authorization to test. The default lab remains non-networked and deterministic so the methodology can be demonstrated safely and reproduced exactly.
