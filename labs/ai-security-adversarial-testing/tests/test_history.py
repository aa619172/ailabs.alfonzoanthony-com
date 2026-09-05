import sys
import tempfile
import unittest
from dataclasses import replace
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"
if str(SRC) not in sys.path:
    sys.path.insert(0, str(SRC))

from ai_security_lab import (
    EvaluationHistoryRecord,
    append_history_record,
    build_trend_summary,
    controlled_release_history,
    load_history,
    render_trend_html,
    write_trend_reports,
)


class EvaluationHistoryTests(unittest.TestCase):
    def test_controlled_release_stream_matches_prompt_progression(self):
        records = controlled_release_history()
        self.assertEqual([record.prompt_version for record in records], [
            "PROMPT-ARCH-V1.0",
            "PROMPT-ARCH-V1.1",
            "PROMPT-ARCH-V1.2",
            "PROMPT-ARCH-V2.0",
        ])
        self.assertEqual([record.attack_success_rate for record in records], [100.0, 75.0, 50.0, 0.0])
        self.assertEqual([record.risk_score for record in records], [84.0, 66.0, 42.0, 0.0])

    def test_history_jsonl_round_trip(self):
        record = controlled_release_history()[0]
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "history.jsonl"
            append_history_record(path, record)
            loaded = load_history(path)
            self.assertEqual(loaded, [record])

    def test_improving_stream_has_no_regression(self):
        summary = build_trend_summary(controlled_release_history())
        stream = summary["streams"]["deterministic-prompt-architecture"]
        self.assertEqual(summary["regression_event_count"], 0)
        self.assertEqual(stream["attack_success_rate_change"], -100.0)
        self.assertEqual(stream["risk_score_change"], -84.0)

    def test_later_failure_increase_is_detected_as_regression(self):
        records = controlled_release_history()
        regressed = replace(
            records[-1],
            record_id="controlled-release-regression",
            recorded_at="2026-09-05T12:00:00+00:00",
            prompt_version="PROMPT-ARCH-V2.1",
            attack_success_rate=25.0,
            risk_score=14.0,
        )
        summary = build_trend_summary(records + [regressed])
        self.assertEqual(summary["regression_event_count"], 1)
        event = summary["regressions"][0]
        self.assertEqual(event["to_prompt_version"], "PROMPT-ARCH-V2.1")
        self.assertEqual(event["attack_success_rate_delta"], 25.0)

    def test_trend_reports_render_and_write(self):
        summary = build_trend_summary(controlled_release_history())
        rendered = render_trend_html(summary)
        self.assertIn("Prompt Evaluation Trend Report", rendered)
        self.assertIn("PROMPT-ARCH-V2.0", rendered)
        self.assertIn("PASS · no regression", rendered)
        with tempfile.TemporaryDirectory() as tmp:
            paths = write_trend_reports(controlled_release_history(), tmp)
            self.assertTrue(Path(paths["json"]).exists())
            self.assertTrue(Path(paths["html"]).exists())


if __name__ == "__main__":
    unittest.main()
