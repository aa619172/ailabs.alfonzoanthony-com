# AI Security & Adversarial Testing Lab

A defensive portfolio lab by Alfonzo Anthony for testing how AI applications respond to controlled adversarial inputs.

## Problem

LLM and agentic applications can look reliable during normal use while still failing when prompts attempt to override instructions, extract hidden context, trigger privileged tools, or smuggle malicious instructions through external content.

## Solution

This lab creates a repeatable security evaluation loop:

`Attack Case -> Target -> Response Capture -> Security Evaluator -> Risk Mapping -> Mitigation -> Retest`

The first version uses deterministic simulated targets so every failure and mitigation can be reproduced without third-party API cost, provider drift, or unsafe actions.

## Controlled scenarios

1. Direct prompt injection — OWASP LLM01 / MITRE ATLAS LLM Prompt Injection.
2. Synthetic sensitive-data extraction — OWASP LLM02.
3. Unauthorized tool use / excessive agency — OWASP LLM06 and agentic tool misuse concepts.
4. Indirect prompt injection / hidden-context exfiltration attempt — OWASP LLM01, LLM02, and LLM07.

All secrets, tools, records, and exfiltration destinations in this lab are synthetic and non-operational.

## Key lab result

The intentionally vulnerable baseline allows all four controlled attack scenarios. The hardened target blocks all four using deterministic controls: instruction-boundary checks, sensitive-data output filtering, least-privilege tool authorization, and human approval for privileged actions.

**Controlled deterministic result: attack success rate 4/4 (100%) -> 0/4 (0%) after mitigation.**

This is a lab result, not a claim about a production model or third-party AI provider.

## Run

```bash
cd labs/ai-security-adversarial-testing
python run_lab.py
python -m unittest discover -s tests -v
```

## Framework references

The lab structure is designed to map test findings to the OWASP GenAI LLM Top 10 and MITRE ATLAS. Future adapters can invoke tools such as Microsoft PyRIT and NVIDIA garak against authorized targets.

## Roadmap

- JSON and HTML assessment reports
- Severity and regression trend dashboard
- Authorized HTTP target adapter
- PyRIT scenario adapter
- garak result ingestion
- promptfoo regression adapter
- Agent Control Standard mapping
- CI security regression gate

## Scope and ethics

Use only against systems you own or have explicit authorization to test. The default target is intentionally simulated so the project can demonstrate adversarial methodology without probing third-party services.