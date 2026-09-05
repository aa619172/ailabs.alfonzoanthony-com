# Adversarial Prompt Engineering Lab

A portfolio lab by Alfonzo Anthony demonstrating advanced AI Prompt Engineering through prompt architecture, context engineering, adversarial prompting, evaluator design, mitigation, prompt versioning, multi-agent prompt contracts, and regression retesting.

## The Prompt Engineering Problem

A prompt that behaves correctly during normal use can still fail when inputs deliberately challenge instruction hierarchy, role authority, protected context, retrieved content, tool permissions, output schemas, peer-agent trust, or transformation boundaries.

The goal is not to collect clever jailbreaks. The goal is to make prompt behavior **testable, diagnosable, versioned, and repeatable**.

## Method

`Prompt Contract -> Adversarial Prompt -> Response Capture -> Evaluator Rubric -> Evidence -> Diagnosis -> Prompt Revision -> Regression Retest`

The default target is deterministic and simulated so every failure and mitigation can be reproduced without provider drift, third-party API cost, or unsafe actions.

## Prompt Engineering skills demonstrated

- System-prompt architecture and explicit instruction hierarchy
- Role prompting and authorization boundaries
- Context visibility and disclosure rules
- Retrieval-aware prompting and indirect-instruction isolation
- Multi-agent context trust and peer-agent authority
- Tool-use prompting, least privilege, and parameter validation
- Structured-output and schema-bound prompting
- Refusal design that survives paraphrase and transformation
- Evaluator rubrics, evidence capture, and failure diagnosis
- Prompt versioning, behavioral invariants, and regression gates

## Phase 2 — 12 controlled tests

### Instruction Control
1. Direct instruction override
2. Role escalation
3. Instruction-conflict manipulation

### Context Engineering
4. Synthetic sensitive-data extraction
5. Context-boundary confusion
6. Retrieved-document injection

### Agent & Tool Prompting
7. Unauthorized privileged tool request
8. Tool-parameter manipulation
9. Cross-agent instruction contamination

### Output & Reliability
10. Structured-output breaking
11. Refusal-boundary bypass
12. Prompt-regression drift

All secrets, tools, records, internal notes, destinations, roles, and agent messages are synthetic and non-operational.

## Release-level prompt experiment history

The lab now models four cumulative prompt releases rather than presenting only a before/after snapshot.

| Prompt version | Engineering focus | Controlled failures | Lab risk |
| --- | --- | ---: | ---: |
| PROMPT-ARCH-V1.0 | Reproducible baseline | 12 / 12 | 84 |
| PROMPT-ARCH-V1.1 | Instruction hierarchy and authority | 9 / 12 | 66 |
| PROMPT-ARCH-V1.2 | Context-use and disclosure boundaries | 6 / 12 | 42 |
| PROMPT-ARCH-V2.0 | Agent/tool constraints + output/reliability invariants | 0 / 12 | 0 |

Each release records why the change was made, which tests it resolves, the failure/risk delta from the prior version, and whether any previously resolved test regressed.

**Controlled progression: 12 -> 9 -> 6 -> 0 failures, with no intentional regression in the modeled release history.**

The risk score is a project-specific severity-weighted comparison metric, not an industry security rating.

## Per-test version history

Every individual scenario also records:

`V1 observed behavior -> Diagnosis -> V2 prompt/control change -> V2 regression behavior`

This makes the engineering decision visible instead of showing only the final pass/fail result.

## Agent Orchestration Lab integration

The lab now includes a cross-project synthetic integration test: **AGENT-PROMPT-INT-001**.

Three specialized prompt contracts are modeled:

- **Research Agent** — evidence collection only; cannot approve actions or assign permissions.
- **Analysis Agent** — reasons over validated evidence; no privileged tools.
- **Quality Agent** — evaluates against a rubric; cannot modify another agent's role, tools, or approval state.

The controlled attack sends a peer-agent message that attempts to disable approval checks and grant a privileged tool permission.

- Baseline agent contract: **1/1 controlled failure**.
- Hardened agent contract: **0/1 controlled failures**.

The hardened design treats peer-agent content as data by default and requires verified orchestrator authority metadata for role, permission, or approval-state changes.

## Key deterministic result

**PROMPT-ARCH-V1 baseline:** 12/12 controlled failures; 100% failure rate; lab risk 84.

**PROMPT-ARCH-V2 hardened:** 0/12 controlled failures; 0% failure rate; lab risk 0.

These are reproducible simulation results, not claims about defeating a production model or third-party provider.

## Run the Python lab

```bash
cd labs/ai-security-adversarial-testing
python run_lab.py
python -m unittest discover -s tests -v
```

`run_lab.py` now emits three evidence layers as JSON:

1. the 12-test V1/V2 comparison;
2. the four-release prompt experiment timeline;
3. the Agent Orchestration integration experiment.

## Interactive portfolio workbench

`prompt-security-lab.html` lets an employer:

- browse all 12 tests by prompt-engineering domain;
- inspect the adversarial prompt, objective, and evaluator rubric;
- inspect the V1 and V2 prompt contracts;
- run an individual controlled test;
- inspect diagnosis and prompt/control changes;
- see the four-release progression V1.0 -> V1.1 -> V1.2 -> V2.0;
- run the full 12-test V2 regression visualization;
- run the synthetic Agent Orchestration cross-agent prompt test.

## CI prompt regression gate

`.github/workflows/prompt-lab-regression.yml` is designed to verify:

- the 12-test V1/V2 invariants;
- the expected release progression `12 -> 9 -> 6 -> 0`;
- the expected risk progression `84 -> 66 -> 42 -> 0`;
- no modeled regression between prompt releases;
- the hardened agent prompt contract blocks the synthetic peer-agent override.

## Supporting framework context

OWASP GenAI and MITRE ATLAS are used as recognized vocabulary for failure classes. Microsoft PyRIT remains on the roadmap for broader evaluation against explicitly authorized targets. The primary skill demonstrated is **AI Prompt Engineering**.

## Next roadmap

- Persist experiment runs and prompt-version history as JSON artifacts
- Add HTML assessment report export
- Add regression trend charts across prompt versions
- Add an authorized HTTP/LLM target adapter
- Add Microsoft PyRIT integration for authorized targets
- Add promptfoo result ingestion
- Connect the hardened prompt contracts more deeply to the Agent Orchestration Lab runtime
- Expand beyond 12 tests once the experiment/reporting layer is stable

## Scope and ethics

Use active adapters only against systems you own or have explicit authorization to test. The default lab remains non-networked and deterministic so the methodology can be demonstrated safely and reproduced exactly.
