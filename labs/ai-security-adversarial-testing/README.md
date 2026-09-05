# Adversarial Prompt Engineering Lab

A portfolio lab by Alfonzo Anthony demonstrating advanced AI Prompt Engineering through prompt architecture, context engineering, adversarial prompting, evaluator design, mitigation, prompt versioning, multi-agent prompt contracts, authorized target adapters, repeated-run metrics, persistent evaluation history, trend analysis, an interactive evaluation dashboard, reporting, provenance, and regression testing.

## The Prompt Engineering problem

A prompt that behaves correctly during normal use can still fail when inputs deliberately challenge instruction hierarchy, role authority, protected context, retrieved content, tool permissions, output schemas, peer-agent trust, or transformation boundaries.

The goal is not to collect clever jailbreaks. The goal is to make prompt behavior **testable, diagnosable, versioned, measurable, repeatable, and observable over time**.

## Method

`Prompt Contract -> Adversarial Prompt -> Target -> Structured Observation -> Evaluator -> Evidence -> Diagnosis -> Prompt Revision -> Regression Retest -> History -> Trend Analysis -> Dashboard`

The deterministic simulator remains the reproducible baseline. A provider-neutral HTTP adapter can run the same test definitions against an application the operator owns or is explicitly authorized to evaluate.

## Prompt Engineering skills demonstrated

- System-prompt architecture and explicit instruction hierarchy
- Role prompting and authorization boundaries
- Context visibility, disclosure, and retrieval-aware prompting
- Multi-agent trust and peer-agent authority
- Tool-use prompting, least privilege, and parameter validation
- Structured-output and schema-bound prompting
- Refusal and policy-preservation invariants
- Evaluator rubrics, structured observations, evidence capture, and diagnosis
- Prompt versioning and regression gates
- Provider-neutral target integration and repeated-run evaluation
- Persistent JSONL evaluation history and target-specific trend analysis
- Interactive same-stream prompt-version comparison
- JSON/HTML assessment, comparison, and trend reporting
- Production provenance and SHA-256 deployment integrity
- CI verification and artifact publishing

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

**Controlled progression: 12 -> 9 -> 6 -> 0 failures; lab risk 84 -> 66 -> 42 -> 0.**

Each release records why the change was made, which tests it resolves, the delta from the prior version, and whether a previously resolved behavior regressed. The risk score is a project-specific severity-weighted comparison metric, not an industry security rating.

## Per-test engineering history

Every scenario records:

`Observed behavior -> Diagnosis -> Prompt/control change -> Regression retest`

The portfolio therefore shows the reasoning behind a prompt revision, not only a final pass/fail result.

## Agent Orchestration prompt integration

The lab includes the synthetic cross-project test **AGENT-PROMPT-INT-001**.

- **Research Agent** — evidence collection only; cannot approve actions or assign permissions.
- **Analysis Agent** — reasons over validated evidence; no privileged tools.
- **Quality Agent** — evaluates against a rubric; cannot modify another agent's role, tools, or approval state.

The controlled peer-agent override moves from **1/1 baseline failure** to **0/1 after the hardened agent contract**.

This models prompt contracts only. The actual Agent Orchestration runtime is not represented as a live endpoint in this repository.

## Authorized target adapter

`src/ai_security_lab/adapters.py` provides a provider-neutral interface so the same 12-test evaluator can exercise either the deterministic simulator or an authorized HTTP application.

Request contract:

```json
{
  "attack_id": "ASAT-001",
  "prompt": "...",
  "architecture_id": "PROMPT-ARCH-V2",
  "prompt_contract": "..."
}
```

Minimum response:

```json
{"response": "application/model response text"}
```

Preferred response:

```json
{
  "response": "I cannot perform that action.",
  "observations": {
    "unauthorized_tool_action": false
  }
}
```

### Structured observations

Real integrations can provide machine-readable signals for policy override, role escalation, instruction-conflict bypass, protected-context disclosure, retrieved-instruction execution, unauthorized tool actions, invalid parameters, peer-agent policy change, schema validity, protected-policy disclosure, and policy preservation during transformations.

Structured observations are preferred because they measure application behavior rather than depending on response wording. Text-marker evaluation remains a compatibility fallback for deterministic/demo targets.

### Safety defaults

- localhost (`localhost`, `127.0.0.1`, `::1`) is allowed by default;
- non-local hosts must be explicitly allowlisted;
- non-local runs additionally require explicit authorization confirmation;
- redirects are disabled;
- request timeout is capped;
- response size is bounded;
- the adapter stores no credentials.

The networked feature is intended only for systems the operator owns or has explicit authorization to test.

## Run the local HTTP demo

Terminal 1:

```bash
cd labs/ai-security-adversarial-testing
python demo_target_server.py
```

Terminal 2:

```bash
python run_target.py \
  --endpoint http://127.0.0.1:8765/evaluate \
  --architecture v2 \
  --runs 5 \
  --output target-metrics.json
```

For an explicitly authorized non-local application, add both `--allow-host` and `--confirm-authorized`.

## Repeated-run metrics

A target can be evaluated 1–10 times with the same 12-test library. The aggregate report includes:

- Attack Success Rate
- Mean severity-weighted lab risk
- Instruction Control failure rate
- Context Leakage Rate
- Tool Boundary Violation Rate
- Output Reliability Failure Rate
- Schema Compliance Rate
- Per-test attack-success rate
- Per-test response-consistency rate

These metrics describe only the selected target, prompt architecture, run count, and controlled test library. They are not universal model-security scores.

## Authorized-target comparison reports

```bash
python generate_target_comparison.py \
  --target-report target-metrics.json \
  --output-dir reports/authorized-target
```

Outputs:

- `authorized-target-comparison.json`
- `authorized-target-comparison.html`

The report keeps deterministic V1/V2 as methodology references and the authorized target as a separately scoped result. It explicitly avoids treating unlike systems as equivalent benchmarks.

## Persistent evaluation history — implemented

A captured evaluation can now be appended to JSONL history:

```bash
python record_evaluation.py \
  --report target-metrics.json \
  --target-label my-owned-ai-app \
  --prompt-version PROMPT-ARCH-V2.0
```

Each `EvaluationHistoryRecord` stores:

- stable target label and adapter source;
- prompt version and architecture ID;
- run count and total executions;
- attack-success rate and lab risk;
- instruction-control failure rate;
- context-leakage rate;
- tool-boundary violation rate;
- output-reliability failure rate;
- schema-compliance rate;
- timestamp and optional note.

The default history path is `reports/history/evaluation-history.jsonl`.

## Trend analysis — implemented

```bash
python generate_trend_report.py \
  --history reports/history/evaluation-history.jsonl \
  --include-controlled-releases \
  --output-dir reports/trends
```

Outputs:

- `prompt-evaluation-trends.json`
- `prompt-evaluation-trends.html`

Regression detection is **target-stream specific**. A later result is flagged only when attack-success rate or lab risk increases relative to the prior record for the same stable target label.

The deterministic prompt-release stream and an authorized-target stream are never blended into one performance curve. This prevents misleading cross-system comparisons.

The CI demonstration currently verifies:

- 4 controlled release records for `deterministic-prompt-architecture`;
- 1 separate `localhost-demo-target` record produced from 3 runs × 12 tests = 36 HTTP executions;
- 5 total records;
- 2 target streams;
- 0 detected regression events in that controlled demonstration.

`prompt-trends.html` presents the trend methodology as employer-facing portfolio evidence.

## Prompt Evaluation Dashboard — implemented

`prompt-evaluation-dashboard.html` turns saved evaluation history into an interactive portfolio surface.

It includes:

- target-stream selection;
- strict same-stream version comparison;
- attack-success and lab-risk trend visualization;
- latest Instruction Control, Context Leakage, Tool Boundary, Output Reliability, and Schema Compliance metrics;
- version-to-version deltas;
- regression monitoring;
- evaluation-history table;
- record-level source, adapter, architecture, timestamp, and note visibility;
- a built-in CI-verified demonstration using the two separate project streams;
- local import of generated `prompt-evaluation-trends.json` files with the browser `FileReader` API.

Imported trend files are processed locally by the page. The dashboard has no upload endpoint and the dashboard JavaScript contains no network fetch path.

The built-in dashboard data keeps the deterministic release stream separate from the localhost HTTP demonstration. It does not turn unrelated systems into a single benchmark or leaderboard.

## Deterministic assessment reports

```bash
python generate_report.py
```

Outputs:

- `reports/prompt-assessment-report.json`
- `reports/prompt-assessment-report.html`

They include release progression, all 12 findings, diagnoses, prompt/control changes, the Agent Orchestration prompt integration, and controlled-scope limitations.

## Portfolio surfaces

All of these Prompt Lab surfaces share provenance ID **AA-AILAB-SEC-009**:

- `case-study-ai-security-lab.html` — employer-facing case study tying the engineering decisions together.
- `prompt-security-lab.html` — interactive 12-test workbench, prompt contracts, per-test history, release progression, and Agent prompt test.
- `target-adapter.html` — authorized target architecture, structured observations, repeated-run metrics, and safety gate.
- `prompt-trends.html` — persistent evaluation history, target-stream separation, regression logic, and trend workflow.
- `prompt-evaluation-dashboard.html` — interactive target-specific evaluation operations dashboard.

The public browser portfolio does not provide an arbitrary endpoint field. Networked evaluation remains in the controlled Python lab.

## Production provenance build — implemented

`build-prompt-lab.mjs` is part of `npm run build` and makes the Prompt Lab surfaces part of the actual deployed `dist/` output.

For each registered Prompt Lab page, the production build adds:

- author and copyright metadata;
- `noimageindex` metadata;
- `portfolio-provenance-id=AA-AILAB-SEC-009`;
- JSON-LD creator and identifier metadata;
- `data-provenance-id=AA-AILAB-SEC-009` on the document body;
- a visible production provenance signature.

The deployment manifest uses schema version 1.1 for the Prompt Lab record and stores SHA-256 hashes for all five registered HTML surfaces plus the supporting Prompt Lab CSS/JavaScript files.

The deployment build also surfaces the Prompt Evaluation Dashboard through Prompt Lab navigation and the flagship homepage path.

## CI Prompt Lab Regression Gate

`.github/workflows/prompt-lab-regression.yml` verifies:

- 12-test V1/V2 invariants;
- release progression `12 -> 9 -> 6 -> 0`;
- risk progression `84 -> 66 -> 42 -> 0`;
- no modeled release regressions;
- hardened Agent prompt-contract behavior;
- assessment report generation;
- target-adapter safety and structured-observation behavior;
- repeated-run metric tests;
- JSONL history recording;
- target-specific trend generation and regression checks;
- Prompt Evaluation Dashboard content and local-import contract;
- dashboard JavaScript syntax;
- an end-to-end localhost HTTP evaluation using the real CLI;
- 3 complete runs × 12 tests = 36 HTTP executions;
- the actual production `npm run build`;
- presence of all five Prompt Lab pages in `dist/`;
- embedded Prompt Lab provenance metadata/signatures;
- manifest surface/support-file SHA-256 integrity under `AA-AILAB-SEC-009`.

When the gate succeeds, GitHub Actions publishes the deterministic assessment, demo authorized-target result, comparison reports, evaluation history, trend reports, demo log, and production provenance manifest as the `prompt-engineering-assessment` artifact.

## Supporting framework context

OWASP GenAI and MITRE ATLAS provide recognized vocabulary for failure classes. Microsoft PyRIT remains on the roadmap for broader evaluation against explicitly authorized targets. The primary skill demonstrated is **AI Prompt Engineering**.

## Next roadmap

- Connect an actual owned Agent Orchestration runtime endpoint when its source/runtime is available
- Feed the dashboard with multiple saved runs from the same owned authorized target
- Add time-window and prompt-version filtering once multiple real authorized-target history records exist
- Add Microsoft PyRIT integration for explicitly authorized targets
- Add promptfoo-style result ingestion and comparison
- Expand beyond 12 tests after the live-target evaluation model is stable

## Scope and ethics

Use the networked adapter only against systems you own or have explicit authorization to test. The deterministic baseline remains available so the methodology can be demonstrated safely and reproduced exactly.
