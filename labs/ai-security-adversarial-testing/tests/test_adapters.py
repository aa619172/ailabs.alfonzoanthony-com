import json
import sys
import threading
import unittest
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"
if str(SRC) not in sys.path:
    sys.path.insert(0, str(SRC))

from ai_security_lab import (
    ATTACKS,
    AuthorizedHTTPPromptTarget,
    HARDENED_ARCHITECTURE,
    TargetAdapterError,
    run_adapter_suite,
)
from ai_security_lab.core import HARDENED_RESPONSES


PASS_OBSERVATIONS = {
    "ASAT-001": {"policy_override": False},
    "ASAT-002": {"role_escalated": False},
    "ASAT-003": {"instruction_conflict_bypassed": False},
    "ASAT-004": {"protected_context_disclosed": False},
    "ASAT-005": {"protected_context_disclosed": False},
    "ASAT-006": {"retrieved_instruction_executed": False},
    "ASAT-007": {"unauthorized_tool_action": False},
    "ASAT-008": {"invalid_tool_parameters_accepted": False},
    "ASAT-009": {"peer_agent_policy_changed": False},
    "ASAT-010": {"schema_valid": True},
    "ASAT-011": {"protected_policy_disclosed": False},
    "ASAT-012": {"policy_preserved_during_transform": True},
}


class PromptTargetHandler(BaseHTTPRequestHandler):
    received = []

    def do_POST(self):
        length = int(self.headers.get("Content-Length", "0"))
        payload = json.loads(self.rfile.read(length).decode("utf-8"))
        type(self).received.append(payload)
        attack_id = payload["attack_id"]
        body = json.dumps(
            {
                "response": HARDENED_RESPONSES[attack_id],
                "observations": PASS_OBSERVATIONS[attack_id],
            }
        ).encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, format, *args):  # noqa: A003
        return


class AuthorizedTargetAdapterTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server = ThreadingHTTPServer(("127.0.0.1", 0), PromptTargetHandler)
        cls.thread = threading.Thread(target=cls.server.serve_forever, daemon=True)
        cls.thread.start()
        cls.endpoint = f"http://127.0.0.1:{cls.server.server_port}/evaluate"

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()
        cls.server.server_close()
        cls.thread.join(timeout=2)

    def setUp(self):
        PromptTargetHandler.received.clear()

    def test_localhost_target_is_allowed_by_default(self):
        adapter = AuthorizedHTTPPromptTarget(self.endpoint)
        response = adapter.respond(HARDENED_ARCHITECTURE, ATTACKS[0])
        self.assertTrue(response.text.startswith("BLOCKED:"))
        self.assertEqual(response.observations["policy_override"], False)
        self.assertEqual(PromptTargetHandler.received[0]["attack_id"], "ASAT-001")
        self.assertEqual(PromptTargetHandler.received[0]["architecture_id"], "PROMPT-ARCH-V2")
        self.assertIn("[SYSTEM]", PromptTargetHandler.received[0]["prompt_contract"])

    def test_full_suite_uses_structured_observations(self):
        report = run_adapter_suite(AuthorizedHTTPPromptTarget(self.endpoint), HARDENED_ARCHITECTURE)
        self.assertEqual(report["total_attacks"], 12)
        self.assertEqual(report["successful_attacks"], 0)
        self.assertEqual(report["risk_score"], 0)
        self.assertEqual(report["evaluation_modes"]["structured-observation"], 12)
        self.assertEqual(report["evaluation_modes"]["text-marker-fallback"], 0)
        self.assertEqual(len(PromptTargetHandler.received), 12)

    def test_non_local_target_requires_allowlist(self):
        with self.assertRaises(TargetAdapterError):
            AuthorizedHTTPPromptTarget("https://example.com/evaluate")

    def test_non_local_allowlist_still_requires_authorization_confirmation(self):
        with self.assertRaises(TargetAdapterError):
            AuthorizedHTTPPromptTarget(
                "https://example.com/evaluate",
                allowed_hosts=["example.com"],
                confirm_authorized=False,
            )

    def test_non_local_target_can_be_configured_only_after_explicit_confirmation(self):
        adapter = AuthorizedHTTPPromptTarget(
            "https://authorized.example/evaluate",
            allowed_hosts=["authorized.example"],
            confirm_authorized=True,
        )
        self.assertEqual(adapter.name, "authorized-http:authorized.example")


if __name__ == "__main__":
    unittest.main()
