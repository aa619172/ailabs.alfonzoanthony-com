import json
import unittest
from pathlib import Path


class PromptDashboardAndProvenanceTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.repo_root = Path(__file__).resolve().parents[3]

    def test_dashboard_exposes_target_specific_evaluation_controls(self):
        html = (self.repo_root / "prompt-evaluation-dashboard.html").read_text(encoding="utf-8")
        for required in (
            "Prompt Evaluation",
            "Target stream",
            "Import local JSON",
            "SAME-STREAM VERSION COMPARISON",
            "REGRESSION MONITOR",
            "EVALUATION HISTORY",
            "LATEST RECORD DETAILS",
            "AA-AILAB-SEC-009",
            "prompt-dashboard.js",
        ):
            self.assertIn(required, html)
        self.assertNotIn('<script src="script.js"></script>', html)

    def test_dashboard_javascript_keeps_streams_separate_and_import_local(self):
        js = (self.repo_root / "prompt-dashboard.js").read_text(encoding="utf-8")
        for required in (
            "deterministic-prompt-architecture",
            "localhost-demo-target",
            "FileReader",
            "activeStream",
            "deriveRegressions",
            "attack_success_rate",
            "context_leakage_rate",
            "tool_boundary_violation_rate",
            "schema_compliance_rate",
        ):
            self.assertIn(required, js)
        self.assertNotIn("fetch(", js)
        self.assertNotIn("XMLHttpRequest", js)

    def test_prompt_build_stage_registers_all_surfaces(self):
        build = (self.repo_root / "build-prompt-lab.mjs").read_text(encoding="utf-8")
        for path in (
            "case-study-ai-security-lab.html",
            "prompt-security-lab.html",
            "target-adapter.html",
            "prompt-trends.html",
            "prompt-evaluation-dashboard.html",
            "prompt-dashboard.css",
            "prompt-dashboard.js",
        ):
            self.assertIn(path, build)
        self.assertIn("AA-AILAB-SEC-009", build)
        self.assertIn("portfolio-provenance-id", build)
        self.assertIn("data-prompt-lab-provenance-jsonld", build)
        self.assertIn("data-prompt-lab-signature", build)
        self.assertIn("sha256", build)
        self.assertIn("schema_version='1.1'", build)

    def test_package_build_runs_prompt_lab_stage(self):
        package = json.loads((self.repo_root / "package.json").read_text(encoding="utf-8"))
        self.assertIn("node build-prompt-lab.mjs", package["scripts"]["build"])

    def test_provenance_registry_lists_dashboard_as_prompt_lab_surface(self):
        registry = (self.repo_root / "PROVENANCE.md").read_text(encoding="utf-8")
        self.assertIn("Prompt Lab registered surfaces", registry)
        self.assertIn("prompt-evaluation-dashboard.html", registry)
        self.assertIn("AA-AILAB-SEC-009", registry)
        self.assertIn("supporting Prompt Lab CSS/JavaScript file hashes", registry)


if __name__ == "__main__":
    unittest.main()
