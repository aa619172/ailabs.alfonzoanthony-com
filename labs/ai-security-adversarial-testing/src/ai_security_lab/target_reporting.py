from __future__ import annotations

import html
import json
from datetime import datetime, timezone
from pathlib import Path

from .adapters import DeterministicTargetAdapter, run_adapter_suite
from .core import HARDENED_ARCHITECTURE, VULNERABLE_ARCHITECTURE


def _target_risk(report: dict) -> float | int | None:
    return report.get("mean_risk_score", report.get("risk_score"))


def _metric(report: dict, repeated_key: str, group: str | None = None) -> float | None:
    if repeated_key in report:
        return report[repeated_key]
    if group and "group_summary" in report:
        summary = report["group_summary"].get(group, {})
        tests = summary.get("tests", 0)
        failures = summary.get("failures", 0)
        return round((failures / tests) * 100, 1) if tests else 0.0
    return None


def build_target_comparison_report(target_report: dict) -> dict:
    """Combine deterministic references with a previously captured authorized-target result.

    The report intentionally treats the deterministic simulator as a methodology reference,
    not a system-equivalence benchmark for the authorized target.
    """

    baseline_v1 = run_adapter_suite(DeterministicTargetAdapter(), VULNERABLE_ARCHITECTURE)
    reference_v2 = run_adapter_suite(DeterministicTargetAdapter(), HARDENED_ARCHITECTURE)

    target_runs = target_report.get("runs", 1)
    target_executions = target_report.get("total_executions", target_report.get("total_attacks", 0))
    target_architecture = target_report.get("architecture_id")
    if not target_architecture:
        target_architecture = target_report.get("architecture", {}).get("id", "unknown")

    return {
        "report_type": "Authorized Target Prompt Engineering Comparison",
        "portfolio_owner": "Alfonzo Anthony",
        "project_id": "AA-AILAB-SEC-009",
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "method": "same test library -> target-specific execution -> structured observation -> shared evaluator -> scoped metrics",
        "deterministic_references": {
            "v1": {
                "adapter": baseline_v1["adapter"],
                "architecture_id": VULNERABLE_ARCHITECTURE.id,
                "attack_success_rate": baseline_v1["attack_success_rate"],
                "risk_score": baseline_v1["risk_score"],
            },
            "v2": {
                "adapter": reference_v2["adapter"],
                "architecture_id": HARDENED_ARCHITECTURE.id,
                "attack_success_rate": reference_v2["attack_success_rate"],
                "risk_score": reference_v2["risk_score"],
            },
        },
        "authorized_target": {
            "adapter": target_report.get("adapter", "authorized-target"),
            "architecture_id": target_architecture,
            "runs": target_runs,
            "total_executions": target_executions,
            "attack_success_rate": target_report.get("attack_success_rate"),
            "risk_score": _target_risk(target_report),
            "instruction_control_failure_rate": _metric(
                target_report, "instruction_control_failure_rate", "Instruction Control"
            ),
            "context_leakage_rate": _metric(target_report, "context_leakage_rate", "Context Engineering"),
            "tool_boundary_violation_rate": _metric(
                target_report, "tool_boundary_violation_rate", "Agent & Tool Prompting"
            ),
            "output_reliability_failure_rate": _metric(
                target_report, "output_reliability_failure_rate", "Output & Reliability"
            ),
            "schema_compliance_rate": target_report.get("schema_compliance_rate"),
            "evaluation_modes": target_report.get("evaluation_modes", {}),
            "per_attack": target_report.get("per_attack", {}),
        },
        "interpretation": [
            "The deterministic V1 and V2 results are reproducible methodology references, not production-model benchmarks.",
            "Authorized-target rates describe only the selected target, prompt architecture, run count, and controlled 12-test library.",
            "Differences between the simulator and an actual application do not establish general model superiority or security.",
            "Structured observations are preferred because they evaluate application behavior rather than response wording.",
        ],
    }


def render_target_comparison_json(report: dict) -> str:
    return json.dumps(report, indent=2)


def _fmt(value: object, suffix: str = "") -> str:
    if value is None:
        return "Not available"
    return f"{value}{suffix}"


def render_target_comparison_html(report: dict) -> str:
    target = report["authorized_target"]
    refs = report["deterministic_references"]
    notes = "".join(f"<li>{html.escape(note)}</li>" for note in report["interpretation"])

    attack_rows = ""
    for attack_id, item in target.get("per_attack", {}).items():
        attack_rows += (
            f"<tr><td>{html.escape(attack_id)}</td><td>{html.escape(str(item.get('attack_name', '')))}</td>"
            f"<td>{html.escape(str(item.get('group', '')))}</td>"
            f"<td>{_fmt(item.get('attack_success_rate'), '%')}</td>"
            f"<td>{_fmt(item.get('response_consistency_rate'), '%')}</td></tr>"
        )
    if not attack_rows:
        attack_rows = "<tr><td colspan='5'>Per-test repeated-run metrics were not included in this target result.</td></tr>"

    return f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Authorized Target Prompt Engineering Comparison — Alfonzo Anthony</title>
<style>
body{{margin:0;background:#0f0f14;color:#eee;font-family:Arial,sans-serif;line-height:1.5}}main{{max-width:1120px;margin:auto;padding:36px 24px}}h1,h2{{font-family:Georgia,serif}}.eyebrow{{color:#e1c25c;font-size:.72rem;letter-spacing:.12em;text-transform:uppercase}}.muted{{color:#aaa}}.grid{{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:22px 0}}.card{{background:#17171e;border:1px solid #34343d;border-radius:15px;padding:18px}}.card strong{{display:block;font-size:1.5rem;margin:6px 0}}.metrics{{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}}.metrics div{{background:#15151b;border:1px solid #333;border-radius:12px;padding:15px}}.metrics strong{{display:block;font-size:1.2rem}}table{{width:100%;border-collapse:collapse;margin:16px 0 28px;background:#15151b}}th,td{{border:1px solid #333;padding:10px;text-align:left;font-size:.84rem}}th{{color:#e1c25c}}.note{{border:1px solid #4b4526;background:#17150f;border-radius:14px;padding:16px;margin-top:22px}}@media(max-width:760px){{.grid,.metrics{{grid-template-columns:1fr}}table{{display:block;overflow:auto}}}}
</style></head><body><main>
<div class="eyebrow">AI PROMPT ENGINEERING · AUTHORIZED TARGET EVALUATION</div>
<h1>{html.escape(report['report_type'])}</h1>
<p class="muted">Project {html.escape(report['project_id'])} · {html.escape(report['method'])}</p>
<h2>Evaluation references</h2>
<div class="grid">
<div class="card"><span>Deterministic V1</span><strong>{refs['v1']['attack_success_rate']}%</strong><span>attack success · risk {refs['v1']['risk_score']}</span></div>
<div class="card"><span>Deterministic V2</span><strong>{refs['v2']['attack_success_rate']}%</strong><span>attack success · risk {refs['v2']['risk_score']}</span></div>
<div class="card"><span>Authorized target</span><strong>{_fmt(target['attack_success_rate'], '%')}</strong><span>{html.escape(str(target['adapter']))} · {target['runs']} run(s)</span></div>
</div>
<h2>Authorized-target metrics</h2>
<div class="metrics">
<div><strong>{_fmt(target['context_leakage_rate'], '%')}</strong>Context leakage rate</div>
<div><strong>{_fmt(target['tool_boundary_violation_rate'], '%')}</strong>Tool-boundary violation rate</div>
<div><strong>{_fmt(target['output_reliability_failure_rate'], '%')}</strong>Output reliability failure rate</div>
<div><strong>{_fmt(target['instruction_control_failure_rate'], '%')}</strong>Instruction-control failure rate</div>
<div><strong>{_fmt(target['schema_compliance_rate'], '%')}</strong>Schema compliance</div>
<div><strong>{_fmt(target['risk_score'])}</strong>Mean / single-run lab risk</div>
</div>
<h2>Per-test repeated-run behavior</h2>
<table><thead><tr><th>ID</th><th>Test</th><th>Domain</th><th>Attack success</th><th>Response consistency</th></tr></thead><tbody>{attack_rows}</tbody></table>
<h2>Evaluation mode</h2><p>{html.escape(json.dumps(target.get('evaluation_modes', {}), sort_keys=True))}</p>
<div class="note"><strong>Interpretation limits</strong><ul>{notes}</ul></div>
<p class="muted">Generated {html.escape(report['generated_at'])}</p>
</main></body></html>"""


def write_target_comparison_reports(target_report: dict, output_dir: str | Path) -> dict[str, str]:
    output = Path(output_dir)
    output.mkdir(parents=True, exist_ok=True)
    report = build_target_comparison_report(target_report)
    json_path = output / "authorized-target-comparison.json"
    html_path = output / "authorized-target-comparison.html"
    json_path.write_text(render_target_comparison_json(report), encoding="utf-8")
    html_path.write_text(render_target_comparison_html(report), encoding="utf-8")
    return {"json": str(json_path), "html": str(html_path)}
