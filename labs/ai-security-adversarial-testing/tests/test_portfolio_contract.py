import unittest
from pathlib import Path


class PromptLabPortfolioContractTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.repo_root = Path(__file__).resolve().parents[3]

    def test_target_adapter_page_exists_and_documents_core_contract(self):
        page = self.repo_root / "target-adapter.html"
        self.assertTrue(page.exists())
        text = page.read_text(encoding="utf-8")
        for required in (
            "Same prompt tests.",
            "Real application boundary.",
            "STRUCTURED OBSERVATION CONTRACT",
            "REPEATED-RUN METRICS",
            "PERSISTENT HISTORY",
            "Network access is intentionally constrained.",
            "prompt-trends.html",
            "run_target.py",
            "--runs 5",
        ):
            self.assertIn(required, text)

    def test_trends_page_keeps_target_streams_separate(self):
        page = self.repo_root / "prompt-trends.html"
        self.assertTrue(page.exists())
        text = page.read_text(encoding="utf-8")
        for required in (
            "Prompt quality should have a",
            "CONTROLLED RELEASE STREAM",
            "TARGET STREAM SEPARATION",
            "deterministic-prompt-architecture",
            "localhost-demo-target",
            "100% → 0%",
            "5 records · 2 streams · 0 regressions",
            "REGRESSION LOGIC",
            "record_evaluation.py",
            "generate_trend_report.py",
        ):
            self.assertIn(required, text)
        self.assertIn("≠", text)

    def test_homepage_uses_current_prompt_lab_evidence(self):
        homepage = (self.repo_root / "index.html").read_text(encoding="utf-8")
        for required in (
            "12 / 12",
            "0 / 12",
            "84 → 0",
            "12 → 9 → 6 → 0 failures",
            "target-adapter.html",
            "Structured observations",
            "Repeated-run metrics",
        ):
            self.assertIn(required, homepage)
        self.assertNotIn("4 / 4", homepage)
        self.assertNotIn("0 / 4", homepage)
        self.assertNotIn("34 → 0", homepage)

    def test_case_study_marks_current_layers_as_implemented(self):
        case_study = (self.repo_root / "case-study-ai-security-lab.html").read_text(encoding="utf-8")
        for required in (
            "AUTHORIZED TARGET EVALUATION",
            "PERSISTENT HISTORY & TRENDS",
            "PROMPT EVALUATION DASHBOARD",
            "PRODUCTION PROVENANCE",
            "IMPLEMENTED EVIDENCE",
            "Authorized HTTP target adapter",
            "Persistent JSONL history",
            "Target-specific regression detection",
            "Interactive Prompt Evaluation Dashboard",
            "prompt-evaluation-dashboard.html",
            "AA-AILAB-SEC-009",
        ):
            self.assertIn(required, case_study)
        self.assertNotIn("Build a richer dashboard from multiple saved authorized-target runs", case_study)
        self.assertNotIn("Add persistent prompt/run history and trend visualization", case_study)
        self.assertNotIn("<li>Add authorized target adapters.</li>", case_study)

    def test_cli_and_demo_server_are_present(self):
        lab_root = Path(__file__).resolve().parents[1]
        self.assertTrue((lab_root / "run_target.py").exists())
        self.assertTrue((lab_root / "demo_target_server.py").exists())
        self.assertTrue((lab_root / "generate_target_comparison.py").exists())
        self.assertTrue((lab_root / "record_evaluation.py").exists())
        self.assertTrue((lab_root / "generate_trend_report.py").exists())

    def test_readme_keeps_prompt_engineering_as_primary_skill(self):
        readme = (Path(__file__).resolve().parents[1] / "README.md").read_text(encoding="utf-8")
        self.assertIn("Prompt Engineering skills demonstrated", readme)
        self.assertIn("Authorized target adapter", readme)
        self.assertIn("Persistent evaluation history — implemented", readme)
        self.assertIn("Trend analysis — implemented", readme)
        self.assertIn("Prompt Evaluation Dashboard — implemented", readme)
        self.assertIn("Production provenance build — implemented", readme)
        self.assertNotIn("Add a richer browser dashboard backed by multiple saved authorized-target runs", readme)
        self.assertIn("provider-neutral", readme)
        self.assertIn("explicit authorization", readme)


if __name__ == "__main__":
    unittest.main()
