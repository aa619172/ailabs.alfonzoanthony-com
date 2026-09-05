from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "src"
if str(SRC) not in sys.path:
    sys.path.insert(0, str(SRC))

from ai_security_lab import append_history_record, history_record_from_report


def main() -> int:
    parser = argparse.ArgumentParser(description="Append a captured Prompt Engineering evaluation to JSONL history.")
    parser.add_argument("--report", required=True, help="JSON report from run_target.py or a compatible adapter report")
    parser.add_argument("--history", default="reports/history/evaluation-history.jsonl")
    parser.add_argument("--target-label", required=True, help="Stable non-secret label for the evaluated target")
    parser.add_argument("--prompt-version", required=True, help="Prompt version associated with the captured run")
    parser.add_argument("--source", default="authorized-target")
    parser.add_argument("--note", default="")
    args = parser.parse_args()

    report_path = Path(args.report)
    if not report_path.exists():
        print(f"Evaluation report not found: {report_path}", file=sys.stderr)
        return 2

    try:
        report = json.loads(report_path.read_text(encoding="utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError) as exc:
        print(f"Invalid evaluation report: {exc}", file=sys.stderr)
        return 2

    record = history_record_from_report(
        report,
        target_label=args.target_label,
        prompt_version=args.prompt_version,
        source=args.source,
        note=args.note,
    )
    append_history_record(args.history, record)
    print(json.dumps({"history": args.history, "record_id": record.record_id, "prompt_version": record.prompt_version}, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
