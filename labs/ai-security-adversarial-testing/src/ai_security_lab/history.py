from __future__ import annotations

import html
import json
import uuid
from dataclasses import asdict, dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Iterable

from .experiments import prompt_experiment_timeline


@dataclass(frozen=True)
class EvaluationHistoryRecord:
    record_id: str
    recorded_at: str
    source: str
    target_label: str
    adapter: str
    architecture_id: str
    prompt_version: str
    runs: int
    total_executions: int
    attack_success_rate: float
    risk_score: float
    instruction_control_failure_rate: float | None = None
    context_leakage_rate: float | None = None
    tool_boundary_violation_rate: float | None = None
    output_reliability_failure_rate: float | None = None
    schema_compliance_rate: float | None = None
    note: str = ""


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


def _rate_from_group(report: dict, group_name: str) -> float | None:
    summary = report.get("group_summary", {}).get(group_name)
    if not summary:
        return None
    tests = summary.get("tests", 0)
    failures = summary.get("failures", 0)
    return round((failures / tests) * 100, 1) if tests else 0.0


def history_record_from_report(
    report: dict,
    *,
    target_label: str,
    prompt_version: str,
    source: str = "authorized-target",
    record_id: str | None = None,
    recorded_at: str | None = None,
    note: str = "",
) -> EvaluationHistoryRecord:
    architecture_id = report.get("architecture_id") or report.get("architecture", {}).get("id", "unknown")
    runs = int(report.get("runs", 1))
    total_executions = int(report.get("total_executions", report.get("total_attacks", 0)))
    risk = report.get("mean_risk_score", report.get("risk_score", 0.0))

    return EvaluationHistoryRecord(
        record_id=record_id or str(uuid.uuid4()),
        recorded_at=recorded_at or _now(),
        source=source,
        target_label=target_label,
        adapter=str(report.get("adapter", "unknown")),
        architecture_id=str(architecture_id),
        prompt_version=prompt_version,
        runs=runs,
        total_executions=total_executions,
        attack_success_rate=float(report.get("attack_success_rate", 0.0)),
        risk_score=float(risk or 0.0),
        instruction_control_failure_rate=report.get(
            "instruction_control_failure_rate",
            _rate_from_group(report, "Instruction Control"),
        ),
        context_leakage_rate=report.get(
            "context_leakage_rate",
            _rate_from_group(report, "Context Engineering"),
        ),
        tool_boundary_violation_rate=report.get(
            "tool_boundary_violation_rate",
            _rate_from_group(report, "Agent & Tool Prompting"),
        ),
        output_reliability_failure_rate=report.get(
            "output_reliability_failure_rate",
            _rate_from_group(report, "Output & Reliability"),
        ),
        schema_compliance_rate=report.get("schema_compliance_rate"),
        note=note,
    )


def controlled_release_history() -> list[EvaluationHistoryRecord]:
    """Convert the four modeled prompt releases into trend records for the portfolio control stream."""

    records: list[EvaluationHistoryRecord] = []
    for index, item in enumerate(prompt_experiment_timeline(), start=1):
        version = item["version"]
        failed = item["failed_tests"]
        records.append(
            EvaluationHistoryRecord(
                record_id=f"controlled-release-{index}",
                recorded_at=f"2026-09-0{index}T12:00:00+00:00",
                source="controlled-release-model",
                target_label="deterministic-prompt-architecture",
                adapter="deterministic-simulator",
                architecture_id=version["id"],
                prompt_version=version["id"],
                runs=1,
                total_executions=12,
                attack_success_rate=round((failed / 12) * 100, 1),
                risk_score=float(item["risk_score"]),
                note=version["focus"],
            )
        )
    return records


def append_history_record(path: str | Path, record: EvaluationHistoryRecord) -> None:
    destination = Path(path)
    destination.parent.mkdir(parents=True, exist_ok=True)
    with destination.open("a", encoding="utf-8") as handle:
        handle.write(json.dumps(asdict(record), sort_keys=True) + "\n")


def load_history(path: str | Path) -> list[EvaluationHistoryRecord]:
    source = Path(path)
    if not source.exists():
        return []
    records: list[EvaluationHistoryRecord] = []
    for line_number, line in enumerate(source.read_text(encoding="utf-8").splitlines(), start=1):
        if not line.strip():
            continue
        try:
            records.append(EvaluationHistoryRecord(**json.loads(line)))
        except (json.JSONDecodeError, TypeError) as exc:
            raise ValueError(f"Invalid evaluation history at line {line_number}: {exc}") from exc
    return records


def build_trend_summary(records: Iterable[EvaluationHistoryRecord]) -> dict:
    ordered = sorted(records, key=lambda record: (record.target_label, record.recorded_at, record.record_id))
    streams: dict[str, list[EvaluationHistoryRecord]] = {}
    for record in ordered:
        streams.setdefault(record.target_label, []).append(record)

    stream_summaries = {}
    regressions = []
    for target_label, points in streams.items():
        target_regressions = []
        for previous, current in zip(points, points[1:]):
            attack_regression = current.attack_success_rate > previous.attack_success_rate
            risk_regression = current.risk_score > previous.risk_score
            if attack_regression or risk_regression:
                event = {
                    "target_label": target_label,
                    "from_record": previous.record_id,
                    "to_record": current.record_id,
                    "from_prompt_version": previous.prompt_version,
                    "to_prompt_version": current.prompt_version,
                    "attack_success_rate_delta": round(current.attack_success_rate - previous.attack_success_rate, 1),
                    "risk_score_delta": round(current.risk_score - previous.risk_score, 2),
                }
                target_regressions.append(event)
                regressions.append(event)

        latest = points[-1]
        stream_summaries[target_label] = {
            "records": len(points),
            "first_prompt_version": points[0].prompt_version,
            "latest_prompt_version": latest.prompt_version,
            "first_attack_success_rate": points[0].attack_success_rate,
            "latest_attack_success_rate": latest.attack_success_rate,
            "attack_success_rate_change": round(latest.attack_success_rate - points[0].attack_success_rate, 1),
            "first_risk_score": points[0].risk_score,
            "latest_risk_score": latest.risk_score,
            "risk_score_change": round(latest.risk_score - points[0].risk_score, 2),
            "regression_events": target_regressions,
            "points": [asdict(point) for point in points],
        }

    return {
        "record_count": len(ordered),
        "target_stream_count": len(streams),
        "prompt_versions": sorted({record.prompt_version for record in ordered}),
        "regression_event_count": len(regressions),
        "regressions": regressions,
        "streams": stream_summaries,
        "note": "Trend regression means a later record increased attack-success rate or lab risk within the same target stream. It does not establish universal model quality.",
    }


def render_trend_html(summary: dict) -> str:
    stream_sections = []
    for target_label, stream in summary["streams"].items():
        rows = []
        for point in stream["points"]:
            width = min(max(float(point["attack_success_rate"]), 0.0), 100.0)
            rows.append(
                f"<tr><td>{html.escape(point['prompt_version'])}</td>"
                f"<td>{html.escape(point['source'])}</td>"
                f"<td>{point['runs']}</td><td>{point['total_executions']}</td>"
                f"<td><div class='bar'><i style='width:{width}%'></i></div>{point['attack_success_rate']}%</td>"
                f"<td>{point['risk_score']}</td>"
                f"<td>{'—' if point['schema_compliance_rate'] is None else str(point['schema_compliance_rate']) + '%'}</td></tr>"
            )
        regression_label = "PASS · no regression" if not stream["regression_events"] else f"{len(stream['regression_events'])} regression event(s)"
        stream_sections.append(
            f"<section><div class='stream-head'><div><span>Target stream</span><h2>{html.escape(target_label)}</h2></div>"
            f"<strong>{html.escape(regression_label)}</strong></div>"
            f"<p>{stream['first_attack_success_rate']}% → {stream['latest_attack_success_rate']}% attack success · "
            f"risk {stream['first_risk_score']} → {stream['latest_risk_score']}</p>"
            f"<table><thead><tr><th>Prompt version</th><th>Source</th><th>Runs</th><th>Executions</th><th>Attack success</th><th>Risk</th><th>Schema compliance</th></tr></thead>"
            f"<tbody>{''.join(rows)}</tbody></table></section>"
        )

    return f"""<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Prompt Evaluation Trend Report — Alfonzo Anthony</title><style>
body{{margin:0;background:#0f0f14;color:#eee;font-family:Arial,sans-serif;line-height:1.5}}main{{max-width:1150px;margin:auto;padding:36px 24px}}h1,h2{{font-family:Georgia,serif}}.eyebrow,.stream-head span{{color:#e1c25c;font-size:.7rem;letter-spacing:.1em;text-transform:uppercase}}.summary{{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:24px 0}}.summary div{{background:#17171e;border:1px solid #333;border-radius:14px;padding:17px}}.summary strong{{display:block;font-size:1.6rem}}section{{border-top:1px solid #333;padding:30px 0}}.stream-head{{display:flex;justify-content:space-between;gap:20px;align-items:end}}.stream-head h2{{margin:5px 0}}.stream-head strong{{color:#7bd4cd}}table{{width:100%;border-collapse:collapse;background:#15151b}}th,td{{border:1px solid #333;padding:9px;text-align:left;font-size:.82rem}}th{{color:#e1c25c}}.bar{{width:120px;height:7px;background:#282831;border-radius:99px;display:inline-block;margin-right:8px;overflow:hidden}}.bar i{{display:block;height:100%;background:#d1b653}}.note{{color:#aaa;border:1px solid #444;border-radius:12px;padding:14px}}@media(max-width:720px){{.summary{{grid-template-columns:1fr}}table{{display:block;overflow:auto}}.stream-head{{display:block}}}}
</style></head><body><main><div class="eyebrow">AI PROMPT ENGINEERING · EVALUATION HISTORY</div><h1>Prompt Evaluation Trend Report</h1>
<div class="summary"><div><strong>{summary['record_count']}</strong>evaluation records</div><div><strong>{summary['target_stream_count']}</strong>target streams</div><div><strong>{summary['regression_event_count']}</strong>detected regression events</div></div>
{''.join(stream_sections)}<p class="note">{html.escape(summary['note'])}</p></main></body></html>"""


def write_trend_reports(records: Iterable[EvaluationHistoryRecord], output_dir: str | Path) -> dict[str, str]:
    output = Path(output_dir)
    output.mkdir(parents=True, exist_ok=True)
    summary = build_trend_summary(records)
    json_path = output / "prompt-evaluation-trends.json"
    html_path = output / "prompt-evaluation-trends.html"
    json_path.write_text(json.dumps(summary, indent=2), encoding="utf-8")
    html_path.write_text(render_trend_html(summary), encoding="utf-8")
    return {"json": str(json_path), "html": str(html_path)}
