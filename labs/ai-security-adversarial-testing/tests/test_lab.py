import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"
if str(SRC) not in sys.path:
    sys.path.insert(0, str(SRC))

from ai_security_lab import (
    ATTACKS,
    HARDENED_ARCHITECTURE,
    PROMPT_EXPERIMENT_VERSIONS,
    VULNERABLE_ARCHITECTURE,
    SimulatedTarget,
    agent_orchestration_integration,
    compare_controls,
    evaluate_prompt_version,
    prompt_experiment_timeline,
    prompt_version_history,
    run_suite,
)


class AdversarialPromptLabTests(unittest.TestCase):
    def test_attack_library_has_twelve_scenarios(self):
        self.assertEqual(len(ATTACKS), 12)
        groups = {attack.group for attack in ATTACKS}
        self.assertEqual(
            groups,
            {"Instruction Control", "Context Engineering", "Agent & Tool Prompting", "Output & Reliability"},
        )

    def test_each_group_has_three_tests(self):
        counts = {}
        for attack in ATTACKS:
            counts[attack.group] = counts.get(attack.group, 0) + 1
        self.assertTrue(all(count == 3 for count in counts.values()))

    def test_vulnerable_baseline_exposes_all_failures(self):
        report = run_suite(SimulatedTarget(VULNERABLE_ARCHITECTURE))
        self.assertEqual(report["successful_attacks"], 12)
        self.assertEqual(report["attack_success_rate"], 100.0)
        self.assertEqual(report["risk_score"], 84)

    def test_hardened_prompt_contract_blocks_all_tests(self):
        report = run_suite(SimulatedTarget(HARDENED_ARCHITECTURE))
        self.assertEqual(report["successful_attacks"], 0)
        self.assertEqual(report["attack_success_rate"], 0.0)
        self.assertEqual(report["risk_score"], 0)

    def test_group_summary_records_three_failures_per_baseline_group(self):
        report = run_suite(SimulatedTarget(VULNERABLE_ARCHITECTURE))
        for summary in report["group_summary"].values():
            self.assertEqual(summary["tests"], 3)
            self.assertEqual(summary["failures"], 3)

    def test_version_history_captures_every_prompt_change(self):
        history = prompt_version_history()
        self.assertEqual(len(history), 12)
        for item in history:
            self.assertIn("diagnosis", item)
            self.assertIn("v2_change", item)
            self.assertNotEqual(item["v1_behavior"], item["v2_behavior"])

    def test_mitigation_reduces_attack_success_and_risk(self):
        comparison = compare_controls()
        self.assertEqual(comparison["attack_success_rate_reduction_points"], 100.0)
        self.assertEqual(comparison["risk_score_reduction"], 84)
        self.assertEqual(len(comparison["version_history"]), 12)

    def test_prompt_experiment_has_four_versions(self):
        self.assertEqual([version.id for version in PROMPT_EXPERIMENT_VERSIONS], [
            "PROMPT-ARCH-V1.0",
            "PROMPT-ARCH-V1.1",
            "PROMPT-ARCH-V1.2",
            "PROMPT-ARCH-V2.0",
        ])

    def test_prompt_experiment_progression_reduces_failures_and_risk(self):
        expected = {
            "PROMPT-ARCH-V1.0": (12, 84),
            "PROMPT-ARCH-V1.1": (9, 66),
            "PROMPT-ARCH-V1.2": (6, 42),
            "PROMPT-ARCH-V2.0": (0, 0),
        }
        for version_id, (failures, risk) in expected.items():
            report = evaluate_prompt_version(version_id)
            self.assertEqual(report["failed_tests"], failures)
            self.assertEqual(report["risk_score"], risk)

    def test_experiment_timeline_has_no_regressions(self):
        timeline = prompt_experiment_timeline()
        self.assertEqual(len(timeline), 4)
        self.assertEqual(timeline[0]["regression_status"], "BASELINE")
        for item in timeline[1:]:
            self.assertEqual(item["regression_status"], "PASS")
            self.assertEqual(item["regressed_attack_ids"], [])
        self.assertEqual([item["failed_tests"] for item in timeline], [12, 9, 6, 0])
        self.assertEqual([item["risk_score"] for item in timeline], [84, 66, 42, 0])

    def test_agent_orchestration_integration_blocks_peer_override(self):
        experiment = agent_orchestration_integration()
        self.assertTrue(experiment["baseline"]["failed"])
        self.assertFalse(experiment["hardened"]["failed"])
        self.assertEqual(len(experiment["agent_contracts"]), 3)
        self.assertIn("0/1", experiment["result"])


if __name__ == "__main__":
    unittest.main()
