from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "src"
if str(SRC) not in sys.path:
    sys.path.insert(0, str(SRC))

from ai_security_lab import controlled_release_history, load_history, write_trend_reports


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate JSON/HTML trend reports from saved Prompt Engineering evaluation history.")
    parser.add_argument("--history", default="reports/history/evaluation-history.jsonl")
    parser.add_argument("--output-dir", default="reports/trends")
    parser.add_argument(
        "--include-controlled-releases",
        action="store_true",
        help="Include the modeled V1.0 -> V2.0 deterministic release stream in the trend report.",
    )
    args = parser.parse_args()

    try:
        records = load_history(args.history)
    except ValueError as exc:
        print(str(exc), file=sys.stderr)
        return 2

    if args.include_controlled_releases:
        records = controlled_release_history() + records
    if not records:
        print("No evaluation history records found.", file=sys.stderr)
        return 2

    paths = write_trend_reports(records, args.output_dir)
    print(json.dumps(paths, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
