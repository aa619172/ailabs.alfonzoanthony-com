import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"
if str(SRC) not in sys.path:
    sys.path.insert(0, str(SRC))

from ai_security_lab import ATTACKS, SimulatedTarget, compare_controls, run_suite


class AdversarialLabTests(unittest.TestCase):
    def test_attack_library_has_four_controlled_scenarios(self):
        self.assertEqual(len(ATTACKS), 4)

    def test_vulnerable_baseline_exposes_all_four_failures(self):
        report = run_suite(SimulatedTarget(hardened=False))
        self.assertEqual(report["successful_attacks"], 4)
        self.assertEqual(report["attack_success_rate"], 100.0)

    def test_hardened_target_blocks_all_four_attacks(self):
        report = run_suite(SimulatedTarget(hardened=True))
        self.assertEqual(report["successful_attacks"], 0)
        self.assertEqual(report["attack_success_rate"], 0.0)
        self.assertEqual(report["risk_score"], 0)

    def test_mitigation_reduces_attack_success_rate(self):
        comparison = compare_controls()
        self.assertEqual(comparison["attack_success_rate_reduction_points"], 100.0)
        self.assertGreater(comparison["risk_score_reduction"], 0)


if __name__ == "__main__":
    unittest.main()
