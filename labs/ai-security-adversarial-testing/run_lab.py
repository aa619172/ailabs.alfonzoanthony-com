from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "src"
if str(SRC) not in sys.path:
    sys.path.insert(0, str(SRC))

from ai_security_lab import (
    agent_orchestration_integration,
    compare_controls,
    prompt_experiment_timeline,
)


def main() -> None:
    report = {
        "phase_2_comparison": compare_controls(),
        "prompt_experiment_timeline": prompt_experiment_timeline(),
        "agent_orchestration_integration": agent_orchestration_integration(),
    }
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
