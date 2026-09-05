from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "src"
if str(SRC) not in sys.path:
    sys.path.insert(0, str(SRC))

from ai_security_lab.reporting import write_assessment_reports


if __name__ == "__main__":
    paths = write_assessment_reports(ROOT / "reports")
    for kind, path in paths.items():
        print(f"{kind}: {path}")
