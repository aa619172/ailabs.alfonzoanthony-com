# Adversarial Prompt Engineering Lab

A portfolio lab by Alfonzo Anthony demonstrating advanced AI Prompt Engineering through prompt architecture, context engineering, adversarial prompting, evaluator design, mitigation, prompt versioning, multi-agent prompt contracts, target adapters, assessment reporting, and regression retesting.

## The Prompt Engineering Problem

A prompt that behaves correctly during normal use can still fail when inputs deliberately challenge instruction hierarchy, role authority, protected context, retrieved content, tool permissions, output schemas, peer-agent trust, or transformation boundaries.

The goal is not to collect clever jailbreaks. The goal is to make prompt behavior **testable, diagnosable, versioned, measurable, and repeatable**.

## Method

`Prompt Contract -> Adversarial Prompt -> Target Adapter -> Response Capture -> Evaluator Rubric -> Evidence -> Diagnosis -> Prompt Revision -> Regression Retest`

The deterministic simulator remains the reproducible baseline. A provider-neutral HTTP adapter can run the same tests against an application the operator owns or is explicitly authorized to evaluate.

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
- Provider-neutral target integration and assessment reporting

## 12 controlled tests

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

All secrets, tools, records, internal notes, destinations, roles, and agent messages in the deterministic lab are synthetic and non-operational.

## Release-level prompt experiment history

| Prompt version | Engineering focus | Controlled failures | Lab risk |
| --- | --- | ---: | ---: |
| PROMPT-ARCH-V1.0 | Reproducible baseline | 12 / 12 | 84 |
| PROMPT-ARCH-V1.1 | Instruction hierarchy and authority | 9 / 12 | 66 |
| PROMPT-ARCH-V1.2 | Context-use and disclosure boundaries | 6 / 12 | 42 |
| PROMPT-ARCH-V2.0 | Agent/tool constraints + output/reliability invariants | 0 / 12 | 0 |

Each release records why the change was made, which tests it resolves, the failure/risk delta from the prior version, and whether any previously resolved test regressed.

**Controlled progression: 12 -> 9 -> 6 -> 0 failures, with no modeled regression in the release history.**

The risk score is a project-specific severity-weighted comparison metric, not an industry security rating.

## Per-test version history

Every scenario records:

`V1 observed behavior -> Diagnosis -> V2 prompt/control change -> V2 regression behavior`

This makes the engineering decision visible instead of showing only a final pass/fail result.

## Agent Orchestration Lab integration

The lab includes a cross-project synthetic integration test: **AGENT-PROMPT-INT-001**.

- **Research Agent** — evidence collection only; cannot approve actions or assign permissions.
- **Analysis Agent** — reasons over validated evidence; no privileged tools.
- **Quality Agent** — evaluates against a rubric; cannot modify another agent's role, tools, or approval state.

The controlled peer-agent override moves from **1/1 baseline failure** to **0/1 after the hardened agent contract**.

## Authorized target adapter

`src/ai_security_lab/adapters.py` adds a provider-neutral target interface so the same evaluator can test either the deterministic simulator or an authorized HTTP application.

The HTTP adapter sends:

```json
{
  "attack_id": "ASAT-001",
  "prompt": "...",
  "architecture_id": "PROMPT-ARCH-V2",
  "prompt_contract": "..."
}
```

and expects:

```json
{"response": "application/model response text"}
```

### Safety defaults

- localhost (`localhost`, `127.0.0.1`, `::1`) is allowed by default;
- every non-local host must be explicitly allowlisted;
- every non-local run also requires explicit authorization confirmation;
- redirects are disabled;
- request timeouts are capped;
- response bodies are size-bounded;
- the adapter stores no credentials.

These controls are deliberate: the feature is for systems you own or are authorized to test, not arbitrary third-party targets.

## Run the local live-capable demo

Terminal 1:

```bash
cd labs/ai-security-adversarial-testing
python demo_target_server.py
```

Terminal 2:

```bash
python run_target.py \
  --endpoint http://127.0.0.1:8765/evaluate \
  --architecture v2
```

The demo uses a real HTTP request/response boundary while remaining deterministic and localhost-only.

For an explicitly authorized non-local application:

```bash
python run_target.py \
  --endpoint https://your-authorized-host.example/evaluate \
  --allow-host your-authorized-host.example \
  --confirm-authorized \
  --architecture v2 \
  --output authorized-target-report.json
```

## Key deterministic result

**PROMPT-ARCH-V1 baseline:** 12/12 controlled failures; 100% failure rate; lab risk 84.

**PROMPT-ARCH-V2 hardened:** 0/12 controlled failures; 0% failure rate; lab risk 0.

These are reproducible simulation results, not claims about defeating a production model or third-party provider.

## Run the core Python lab

```bash
cd labs/ai-security-adversarial-testing
python run_lab.py
python -m unittest discover -s tests -v
```

`run_lab.py` emits three evidence layers as JSON:

1. the 12-test V1/V2 comparison;
2. the four-release prompt experiment timeline;
3. the Agent Orchestration integration experiment.

## Assessment reports

The reporting layer generates both machine-readable and employer-readable evidence:

```bash
python generate_report.py
```

Outputs:

- `prompt-assessment-report.json`
- `prompt-assessment-report.html`

The reports include the release progression, all 12 findings, diagnoses, prompt/control changes, agent integration result, and controlled-scope limitations.

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

The Python target-adapter layer intentionally stays server-side rather than allowing the public browser demo to call arbitrary endpoints.

## CI prompt regression gate

`.github/workflows/prompt-lab-regression.yml` verifies:

- the 12-test V1/V2 invariants;
- the expected release progression `12 -> 9 -> 6 -> 0`;
- the expected risk progression `84 -> 66 -> 42 -> 0`;
- no modeled regression between prompt releases;
- the hardened agent prompt contract blocks the synthetic peer-agent override;
- report generation completes successfully;
- the localhost HTTP target adapter passes its test suite.

The workflow publishes the regression and assessment outputs as a GitHub Actions artifact when the gate succeeds.

## Supporting framework context

OWASP GenAI and MITRE ATLAS are used as recognized vocabulary for failure classes. Microsoft PyRIT remains on the roadmap for broader evaluation against explicitly authorized targets. The primary skill demonstrated is **AI Prompt Engineering**.

## Next roadmap

- Add side-by-side deterministic-vs-authorized-target comparison reports
- Add repeated-run statistics for non-deterministic model behavior
- Track refusal consistency, schema compliance, context leakage, and tool-boundary violations across prompt versions
- Add Microsoft PyRIT integration for authorized targets
- Add promptfoo result ingestion
- Connect an actual owned Agent Orchestration runtime endpoint to the adapter
- Expand beyond 12 tests after the live-target evaluation layer is stable

## Scope and ethics

Use the networked adapter only against systems you own or have explicit authorization to test. The default lab remains non-networked and deterministic so the methodology can be demonstrated safely and reproduced exactly.
