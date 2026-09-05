from __future__ import annotations

import html
import json
from datetime import datetime, timezone
from pathlib import Path

from .core import compare_controls
from .experiments import agent_orchestration_integration, prompt_experiment_timeline


def build_assessment_report() -> dict:
    comparison = compare_controls()
    timeline = prompt_experiment_timeline()
    agent = agent_orchestration_integration()
    return {
        "report_type": "Adversarial Prompt Engineering Assessment",
        "portfolio_owner": "Alfonzo Anthony",
        "project_id": "AA-AILAB-SEC-009",
        "scope": "Controlled deterministic prompt-engineering simulation using synthetic data, tools, roles, and agent messages.",
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "executive_summary": {
            "baseline_failures": comparison["before"]["successful_attacks"],
            "hardened_failures": comparison["after"]["successful_attacks"],
            "baseline_risk": comparison["before"]["risk_score"],
            "hardened_risk": comparison["after"]["risk_score"],
            "release_failure_progression": [item["failed_tests"] for item in timeline],
            "release_risk_progression": [item["risk_score"] for item in timeline],
            "agent_integration": agent["result"],
        },
        "release_timeline": timeline,
        "findings": comparison["before"]["findings"],
        "hardened_retest": comparison["after"]["findings"],
        "agent_orchestration_integration": agent,
        "limitations": [
            "This report describes deterministic simulated behavior, not a third-party or production-model assessment.",
            "The severity-weighted risk score is a project-specific comparison metric, not an industry security rating.",
            "Active testing adapters must only be used against systems the operator owns or is explicitly authorized to assess.",
        ],
    }


def render_json(report: dict) -> str:
    return json.dumps(report, indent=2)


def render_html(report: dict) -> str:
    summary = report["executive_summary"]
    releases = "".join(
        f"<tr><td>{html.escape(item['version']['id'])}</td><td>{html.escape(item['version']['focus'])}</td>"
        f"<td>{item['failed_tests']}/12</td><td>{item['risk_score']}</td><td>{html.escape(item['regression_status'])}</td></tr>"
        for item in report["release_timeline"]
    )
    findings = "".join(
        f"<tr><td>{html.escape(item['attack_id'])}</td><td>{html.escape(item['attack_name'])}</td>"
        f"<td>{html.escape(item['group'])}</td><td>{html.escape(item['severity'])}</td>"
        f"<td>{html.escape(item['diagnosis'])}</td><td>{html.escape(item['v2_change'])}</td></tr>"
        for item in report["findings"]
    )
    limitations = "".join(f"<li>{html.escape(item)}</li>" for item in report["limitations"])
    return f"""<!doctype html>
<html lang=\"en\">
<head>
<meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">
<title>Adversarial Prompt Engineering Assessment — Alfonzo Anthony</title>
<style>
body{{font-family:Arial,sans-serif;background:#0f0f14;color:#eee;margin:0;padding:32px;line-height:1.5}}main{{max-width:1100px;margin:auto}}h1,h2{{font-family:Georgia,serif}}.meta,.note{{color:#aaa}}.metrics{{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:24px 0}}.metrics div{{background:#17171e;border:1px solid #333;padding:16px;border-radius:12px}}.metrics strong{{display:block;font-size:1.6rem}}table{{width:100%;border-collapse:collapse;margin:16px 0 30px;background:#15151b}}th,td{{border:1px solid #333;padding:10px;text-align:left;vertical-align:top;font-size:.86rem}}th{{color:#e7ca65}}.ok{{color:#78d9d1}}@media(max-width:700px){{body{{padding:18px}}.metrics{{grid-template-columns:1fr 1fr}}table{{display:block;overflow:auto}}}}
</style>
</head>
<body><main>
<p class=\"meta\">Project {html.escape(report['project_id'])} · Controlled deterministic assessment</p>
<h1>{html.escape(report['report_type'])}</h1>
<p>{html.escape(report['scope'])}</p>
<div class=\"metrics\"><div><strong>{summary['baseline_failures']}/12</strong>V1 failures</div><div><strong>{summary['hardened_failures']}/12</strong>V2 failures</div><div><strong>{summary['baseline_risk']}</strong>baseline lab risk</div><div><strong class=\"ok\">{summary['hardened_risk']}</strong>hardened lab risk</div></div>
<h2>Prompt release progression</h2><table><thead><tr><th>Version</th><th>Focus</th><th>Failures</th><th>Risk</th><th>Regression</th></tr></thead><tbody>{releases}</tbody></table>
<h2>Controlled findings and prompt changes</h2><table><thead><tr><th>ID</th><th>Test</th><th>Domain</th><th>Severity</th><th>Diagnosis</th><th>Prompt/control change</th></tr></thead><tbody>{findings}</tbody></table>
<h2>Agent Orchestration integration</h2><p><strong>{html.escape(summary['agent_integration'])}</strong></p><p>{html.escape(report['agent_orchestration_integration']['objective'])}</p>
<h2>Limitations</h2><ul>{limitations}</ul>
<p class=\"note\">Generated {html.escape(report['generated_at'])}</p>
</main></body></html>"""


def write_assessment_reports(output_dir: str | Path) -> dict[str, str]:
    output = Path(output_dir)
    output.mkdir(parents=True, exist_ok=True)
    report = build_assessment_report()
    json_path = output / "prompt-assessment-report.json"
    html_path = output / "prompt-assessment-report.html"
    json_path.write_text(render_json(report), encoding="utf-8")
    html_path.write_text(render_html(report), encoding="utf-8")
    return {"json": str(json_path), "html": str(html_path)}
