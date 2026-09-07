# Adversarial Prompt Engineering Lab

A portfolio lab by Alfonzo Anthony demonstrating advanced AI Prompt Engineering through prompt architecture, context engineering, adversarial prompting, evaluator design, mitigation, prompt versioning, and regression retesting.

## The Prompt Engineering Problem

A prompt that behaves correctly during normal use can still fail when inputs deliberately challenge instruction hierarchy, role authority, protected context, retrieved content, tool permissions, output schemas, or transformation boundaries.

The goal of this lab is not to collect clever jailbreaks. The goal is to make prompt behavior **testable, diagnosable, versioned, and repeatable**.

## Method

`Prompt Contract -> Adversarial Prompt -> Response Capture -> Evaluator Rubric -> Evidence -> Diagnosis -> V2 Prompt/Control Change -> Regression Retest`

The default target is deterministic and simulated so every failure and mitigation can be reproduced without provider drift, third-party API cost, or unsafe actions.

## What the lab demonstrates

- System-prompt architecture and explicit instruction hierarchy
- Role prompting and authorization boundaries
- Context engineering, visibility, and disclosure rules
- Retrieval-aware prompting and indirect-instruction isolation
- Multi-agent context trust and peer-agent authority
- Tool-use prompting, least privilege, and parameter validation
- Structured-output and schema-bound prompting
- Refusal design that survives paraphrase and transformations
- Prompt versioning and behavioral regression tests
- Explicit evaluator rubrics and evidence capture
- OWASP GenAI and MITRE ATLAS mapping as supporting security context

## Prompt architectures

### PROMPT-ARCH-V1 — vulnerable baseline

The baseline intentionally leaves important behavior under-specified: weak instruction conflict handling, blurred context-use/disclosure boundaries, broad trust in retrieved and peer-agent text, unconstrained tool parameters, and soft output-format rules.

### PROMPT-ARCH-V2 — hardened prompt contract

The hardened version adds trust-ranked instruction resolution, non-authoritative treatment of lower-trust role changes, protected-context disclosure rules, retrieved/peer-agent trust labeling, external tool authorization, parameter validation, human approval for privileged actions, schema-bound output contracts, policy-preserving transformations, and regression checks.

## Phase 2 — 12 controlled scenarios

### 1. Instruction Control
1. **Direct instruction override** — system-prompt hierarchy and protected prompt content.
2. **Role escalation** — whether user wording can grant higher authority.
3. **Instruction-conflict manipulation** — whether urgency or recency defeats trust priority.

### 2. Context Engineering
4. **Synthetic sensitive-data extraction** — hidden-context and output-boundary protection.
5. **Context-boundary confusion** — reasoning context versus disclosable context.
6. **Retrieved-document injection** — instructions embedded in untrusted retrieved content.

### 3. Agent & Tool Prompting
7. **Unauthorized privileged tool request** — tool authority and approval boundaries.
8. **Tool-parameter manipulation** — schema, range, target, and action validation.
9. **Cross-agent instruction contamination** — peer-agent trust and authority metadata.

### 4. Output & Reliability
10. **Structured-output breaking** — schema contract versus free-form helpfulness.
11. **Refusal-boundary bypass** — protected content requested through quotation or transformation.
12. **Prompt-regression drift** — whether a style rewrite silently removes a previously enforced boundary.

All secrets, tools, records, internal notes, destinations, roles, and agent messages in this lab are synthetic and non-operational.

## Prompt Version History

Every scenario now records four stages:

`V1 observed behavior -> Diagnosis -> V2 prompt/control change -> V2 regression behavior`

This makes the portfolio show the engineering decision, not only the final pass/fail result.

## Key controlled result

**PROMPT-ARCH-V1:** 12/12 controlled tests expose the intentionally designed failure; attack-success rate 100%; lab risk score 84.

**PROMPT-ARCH-V2:** 0/12 controlled tests expose those failures; attack-success rate 0%; lab risk score 0.

**Controlled deterministic result: 12/12 -> 0/12 after prompt/control redesign.**

The risk score is a project-specific severity-weighted metric used only to compare versions inside this lab. It is not an industry-standard security rating. This is a reproducible simulation result, not a claim about defeating a production model or third-party AI provider.

## Run the Python lab

```bash
cd labs/ai-security-adversarial-testing
python run_lab.py
python -m unittest discover -s tests -v
```

`run_lab.py` prints the V1 and V2 prompt contracts, findings, group summaries, and the 12-entry prompt version history as JSON.

## Interactive portfolio lab

The portfolio includes `prompt-security-lab.html`, an interactive workbench that lets an employer:

- browse all 12 tests by prompt-engineering domain;
- inspect the adversarial prompt, objective, and evaluator rubric;
- switch between PROMPT-ARCH-V1 and PROMPT-ARCH-V2;
- inspect system, context, tool, and output prompt contracts;
- run an individual controlled test;
- read the diagnosis and exact V2 design change;
- compare V1 and V2 behavior;
- run the full 12-test regression visualization.

## Framework references

The lab uses the current OWASP GenAI LLM Top 10 and MITRE ATLAS to give recognized security vocabulary to prompt failures. Microsoft PyRIT remains on the authorized-target roadmap. These frameworks support the project; **AI Prompt Engineering is the primary skill being demonstrated.**

## Next roadmap

- JSON/HTML assessment report export
- Saved prompt-version and regression trend history
- Authorized HTTP/LLM target adapter
- Microsoft PyRIT adapter for authorized targets
- promptfoo regression adapter
- CI prompt-reliability/security gate
- Agent Orchestration Lab integration for live agent-prompt testing
- Extend the library beyond 12 tests after the core evaluation model is stable

## Scope and ethics

Use active adapters only against systems you own or have explicit authorization to test. The default lab remains non-networked and deterministic so the methodology can be demonstrated safely and reproduced exactly.
