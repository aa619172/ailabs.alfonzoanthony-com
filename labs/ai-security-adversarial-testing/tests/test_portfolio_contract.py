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

    def test_cli_and_demo_server_are_present(self):
        lab_root = Path(__file__).resolve().parents[1]
        self.assertTrue((lab_root / "run_target.py").exists())
        self.assertTrue((lab_root / "demo_target_server.py").exists())

    def test_readme_keeps_prompt_engineering_as_primary_skill(self):
        readme = (Path(__file__).resolve().parents[1] / "README.md").read_text(encoding="utf-8")
        self.assertIn("Prompt Engineering skills demonstrated", readme)
        self.assertIn("Authorized target adapter", readme)
        self.assertIn("provider-neutral", readme)
        self.assertIn("explicit authorization", readme)


if __name__ == "__main__":
    unittest.main()
