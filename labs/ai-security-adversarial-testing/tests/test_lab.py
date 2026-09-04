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
    VULNERABLE_ARCHITECTURE,
    SimulatedTarget,
    compare_controls,
    run_suite,
)


class AdversarialPromptEngineeringLabTests(unittest.TestCase):
    def test_attack_library_has_four_controlled_scenarios(self):
        self.assertEqual(len(ATTACKS), 4)

    def test_each_attack_has_prompt_engineering_rubric(self):
        for attack in ATTACKS:
            self.assertTrue(attack.objective)
            self.assertTrue(attack.evaluator_rubric)
            self.assertTrue(attack.prompt_skill)

    def test_vulnerable_prompt_architecture_exposes_all_four_failures(self):
        report = run_suite(SimulatedTarget(VULNERABLE_ARCHITECTURE))
        self.assertEqual(report["architecture"]["id"], "PROMPT-ARCH-V1")
        self.assertEqual(report["successful_attacks"], 4)
        self.assertEqual(report["attack_success_rate"], 100.0)
        self.assertEqual(report["risk_score"], 34)

    def test_hardened_prompt_architecture_blocks_all_four_attacks(self):
        report = run_suite(SimulatedTarget(HARDENED_ARCHITECTURE))
        self.assertEqual(report["architecture"]["id"], "PROMPT-ARCH-V2")
        self.assertEqual(report["successful_attacks"], 0)
        self.assertEqual(report["attack_success_rate"], 0.0)
        self.assertEqual(report["risk_score"], 0)

    def test_hardened_contract_contains_explicit_prompt_boundaries(self):
        contract = HARDENED_ARCHITECTURE.prompt_contract().lower()
        self.assertIn("untrusted", contract)
        self.assertIn("privileged", contract)
        self.assertIn("hidden", contract)

    def test_mitigation_reduces_attack_success_rate(self):
        comparison = compare_controls()
        self.assertEqual(comparison["attack_success_rate_reduction_points"], 100.0)
        self.assertEqual(comparison["risk_score_reduction"], 34)


if __name__ == "__main__":
    unittest.main()
