from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "src"
if str(SRC) not in sys.path:
    sys.path.insert(0, str(SRC))

from ai_security_lab import compare_controls


def main() -> None:
    report = compare_controls()
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
