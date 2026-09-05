from __future__ import annotations

import argparse
import json
import sys
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "src"
if str(SRC) not in sys.path:
    sys.path.insert(0, str(SRC))

from ai_security_lab.core import HARDENED_RESPONSES, VULNERABLE_RESPONSES


class DemoTargetHandler(BaseHTTPRequestHandler):
    def do_POST(self) -> None:
        if self.path != "/evaluate":
            self.send_error(404)
            return

        length = int(self.headers.get("Content-Length", "0"))
        try:
            payload = json.loads(self.rfile.read(length).decode("utf-8"))
            attack_id = payload["attack_id"]
            architecture_id = payload["architecture_id"]
            responses = HARDENED_RESPONSES if architecture_id == "PROMPT-ARCH-V2" else VULNERABLE_RESPONSES
            text = responses[attack_id]
        except (UnicodeDecodeError, json.JSONDecodeError, KeyError):
            self.send_error(400, "Invalid prompt target payload")
            return

        body = json.dumps({"response": text}).encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, format, *args):  # noqa: A003
        print(f"[demo-target] {format % args}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Localhost-only demo target for the Prompt Engineering adapter.")
    parser.add_argument("--port", type=int, default=8765)
    args = parser.parse_args()

    server = ThreadingHTTPServer(("127.0.0.1", args.port), DemoTargetHandler)
    print(f"Demo prompt target: http://127.0.0.1:{args.port}/evaluate")
    print("Local deterministic demo only. Press Ctrl+C to stop.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
