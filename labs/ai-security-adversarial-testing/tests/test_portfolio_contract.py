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
            "Network access is intentionally constrained.",
            "run_target.py",
            "--runs 5",
        ):
            self.assertIn(required, text)

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

    def test_case_study_marks_target_layer_as_implemented(self):
        case_study = (self.repo_root / "case-study-ai-security-lab.html").read_text(encoding="utf-8")
        self.assertIn("AUTHORIZED TARGET LAYER", case_study)
        self.assertIn("IMPLEMENTED EVIDENCE", case_study)
        self.assertIn("Authorized HTTP target adapter with safety constraints", case_study)
        self.assertIn("Authorized-target comparison report generator", case_study)
        self.assertNotIn("<li>Add authorized target adapters.</li>", case_study)

    def test_cli_and_demo_server_are_present(self):
        lab_root = Path(__file__).resolve().parents[1]
        self.assertTrue((lab_root / "run_target.py").exists())
        self.assertTrue((lab_root / "demo_target_server.py").exists())
        self.assertTrue((lab_root / "generate_target_comparison.py").exists())

    def test_readme_keeps_prompt_engineering_as_primary_skill(self):
        readme = (Path(__file__).resolve().parents[1] / "README.md").read_text(encoding="utf-8")
        self.assertIn("Prompt Engineering skills demonstrated", readme)
        self.assertIn("Authorized target adapter", readme)
        self.assertIn("provider-neutral", readme)
        self.assertIn("explicit authorization", readme)


if __name__ == "__main__":
    unittest.main()
