from __future__ import annotations

from collections import Counter
from statistics import mean
from typing import Iterable

from .adapters import PromptTargetAdapter, run_adapter_suite
from .core import ATTACKS, AttackCase, PromptArchitecture


GROUP_ATTACK_IDS = {
    "Instruction Control": {"ASAT-001", "ASAT-002", "ASAT-003"},
    "Context Engineering": {"ASAT-004", "ASAT-005", "ASAT-006"},
    "Agent & Tool Prompting": {"ASAT-007", "ASAT-008", "ASAT-009"},
    "Output & Reliability": {"ASAT-010", "ASAT-011", "ASAT-012"},
}


def _rate(numerator: int, denominator: int) -> float:
    return round((numerator / denominator) * 100, 1) if denominator else 0.0


def run_repeated_adapter_evaluation(
    adapter: PromptTargetAdapter,
    architecture: PromptArchitecture,
    *,
    runs: int = 3,
    attacks: Iterable[AttackCase] = ATTACKS,
) -> dict:
    """Evaluate a potentially non-deterministic target repeatedly using the same prompt tests."""

    if runs < 1 or runs > 10:
        raise ValueError("runs must be between 1 and 10")

    attack_list = tuple(attacks)
    reports = [run_adapter_suite(adapter, architecture, attack_list) for _ in range(runs)]

    per_attack: dict[str, dict] = {}
    for attack in attack_list:
        findings = [
            next(finding for finding in report["findings"] if finding["attack_id"] == attack.id)
            for report in reports
        ]
        success_count = sum(bool(finding["succeeded"]) for finding in findings)
        responses = [finding["response"] for finding in findings]
        most_common_response_count = Counter(responses).most_common(1)[0][1]
        per_attack[attack.id] = {
            "attack_name": attack.name,
            "group": attack.group,
            "severity": attack.severity,
            "attack_success_count": success_count,
            "attack_success_rate": _rate(success_count, runs),
            "response_consistency_rate": _rate(most_common_response_count, runs),
        }

    total_executions = runs * len(attack_list)
    successful_attacks = sum(item["attack_success_count"] for item in per_attack.values())

    group_metrics = {}
    for group, attack_ids in GROUP_ATTACK_IDS.items():
        group_successes = sum(per_attack[attack_id]["attack_success_count"] for attack_id in attack_ids if attack_id in per_attack)
        group_total = runs * sum(1 for attack_id in attack_ids if attack_id in per_attack)
        group_metrics[group] = {
            "failures": group_successes,
            "executions": group_total,
            "failure_rate": _rate(group_successes, group_total),
        }

    schema = per_attack.get("ASAT-010")
    schema_compliance_rate = round(100.0 - schema["attack_success_rate"], 1) if schema else None

    return {
        "adapter": adapter.name,
        "architecture_id": architecture.id,
        "runs": runs,
        "tests_per_run": len(attack_list),
        "total_executions": total_executions,
        "successful_attacks": successful_attacks,
        "attack_success_rate": _rate(successful_attacks, total_executions),
        "mean_risk_score": round(mean(report["risk_score"] for report in reports), 2),
        "instruction_control_failure_rate": group_metrics["Instruction Control"]["failure_rate"],
        "context_leakage_rate": group_metrics["Context Engineering"]["failure_rate"],
        "tool_boundary_violation_rate": group_metrics["Agent & Tool Prompting"]["failure_rate"],
        "output_reliability_failure_rate": group_metrics["Output & Reliability"]["failure_rate"],
        "schema_compliance_rate": schema_compliance_rate,
        "group_metrics": group_metrics,
        "per_attack": per_attack,
        "evaluation_modes": reports[0]["evaluation_modes"] if reports else {},
        "note": "Rates describe this controlled test set and prompt version; they are not universal model-security scores.",
    }


def compare_baseline_to_authorized_target(baseline_report: dict, target_report: dict) -> dict:
    """Create a compact comparison without implying the two targets are equivalent systems."""

    return {
        "baseline_adapter": baseline_report.get("adapter", "deterministic-simulator"),
        "target_adapter": target_report.get("adapter", "authorized-target"),
        "baseline_attack_success_rate": baseline_report.get("attack_success_rate"),
        "target_attack_success_rate": target_report.get("attack_success_rate"),
        "baseline_risk_score": baseline_report.get("risk_score", baseline_report.get("mean_risk_score")),
        "target_risk_score": target_report.get("risk_score", target_report.get("mean_risk_score")),
        "comparison_note": (
            "Use this as an evaluation-method comparison. A deterministic simulator and an actual model/application "
            "are not assumed to have equivalent semantics or security guarantees."
        ),
    }
