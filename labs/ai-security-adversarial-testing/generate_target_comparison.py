from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "src"
if str(SRC) not in sys.path:
    sys.path.insert(0, str(SRC))

from ai_security_lab import write_target_comparison_reports


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Generate JSON and HTML comparison reports from a captured authorized-target result."
    )
    parser.add_argument("--target-report", required=True, help="JSON file produced by run_target.py")
    parser.add_argument("--output-dir", default="reports/authorized-target")
    args = parser.parse_args()

    source = Path(args.target_report)
    if not source.exists():
        print(f"Target report not found: {source}", file=sys.stderr)
        return 2

    try:
        target_report = json.loads(source.read_text(encoding="utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError) as exc:
        print(f"Invalid target report JSON: {exc}", file=sys.stderr)
        return 2

    paths = write_target_comparison_reports(target_report, args.output_dir)
    print(json.dumps(paths, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
