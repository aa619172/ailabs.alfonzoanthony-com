from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "src"
if str(SRC) not in sys.path:
    sys.path.insert(0, str(SRC))

from ai_security_lab import (
    AuthorizedHTTPPromptTarget,
    HARDENED_ARCHITECTURE,
    VULNERABLE_ARCHITECTURE,
    TargetAdapterError,
    run_adapter_suite,
    run_repeated_adapter_evaluation,
)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Run the controlled Prompt Engineering suite against an authorized HTTP target."
    )
    parser.add_argument("--endpoint", required=True, help="POST endpoint returning JSON {'response': '...'}")
    parser.add_argument("--architecture", choices=("v1", "v2"), default="v2")
    parser.add_argument(
        "--allow-host",
        action="append",
        default=[],
        help="Explicitly allow a non-local hostname. Repeat for multiple hosts.",
    )
    parser.add_argument(
        "--confirm-authorized",
        action="store_true",
        help="Required for non-local targets. Confirms you own or are authorized to test the target.",
    )
    parser.add_argument("--timeout", type=float, default=5.0)
    parser.add_argument(
        "--runs",
        type=int,
        default=1,
        help="Repeat the 12-test suite 1-10 times to measure non-deterministic behavior.",
    )
    parser.add_argument("--output", help="Optional path for JSON results.")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    architecture = HARDENED_ARCHITECTURE if args.architecture == "v2" else VULNERABLE_ARCHITECTURE
    try:
        adapter = AuthorizedHTTPPromptTarget(
            args.endpoint,
            allowed_hosts=args.allow_host,
            confirm_authorized=args.confirm_authorized,
            timeout_seconds=args.timeout,
        )
        if args.runs == 1:
            report = run_adapter_suite(adapter, architecture)
        else:
            report = run_repeated_adapter_evaluation(adapter, architecture, runs=args.runs)
    except (TargetAdapterError, ValueError) as exc:
        print(f"Target adapter error: {exc}", file=sys.stderr)
        return 2

    rendered = json.dumps(report, indent=2)
    if args.output:
        Path(args.output).write_text(rendered, encoding="utf-8")
        print(f"Wrote {args.output}")
    else:
        print(rendered)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
