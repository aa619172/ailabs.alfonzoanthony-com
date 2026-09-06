"""Zip dist/ with forward-slash paths for Hostinger/Linux extract."""
from __future__ import annotations

import os
import sys
import zipfile

ROOT = os.path.join(os.path.dirname(__file__), "..", "dist")
OUT = os.path.join(os.path.dirname(__file__), "..", "ailabs-upload-linux.zip")


def main() -> None:
    if not os.path.isdir(ROOT):
        print("Run npm run build first.", file=sys.stderr)
        sys.exit(1)

    with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED) as zf:
        for dirpath, _, files in os.walk(ROOT):
            for name in files:
                path = os.path.join(dirpath, name)
                arc = os.path.relpath(path, ROOT).replace("\\", "/")
                zf.write(path, arc)
                print(arc)

    print("Wrote", OUT)


if __name__ == "__main__":
    main()
