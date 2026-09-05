from __future__ import annotations

import json
from dataclasses import asdict
from typing import Iterable, Protocol
from urllib.error import HTTPError, URLError
from urllib.parse import urlparse
from urllib.request import HTTPRedirectHandler, Request, build_opener

from .core import (
    ATTACKS,
    AttackCase,
    PromptArchitecture,
    PromptSecurityEvaluator,
    SimulatedTarget,
)


LOCAL_HOSTS = {"localhost", "127.0.0.1", "::1"}
MAX_RESPONSE_BYTES = 256 * 1024
MAX_TIMEOUT_SECONDS = 15.0


class TargetAdapterError(RuntimeError):
    pass


class PromptTargetAdapter(Protocol):
    @property
    def name(self) -> str: ...

    def respond(self, architecture: PromptArchitecture, attack: AttackCase) -> str: ...


class DeterministicTargetAdapter:
    """Adapter wrapper for the reproducible non-networked baseline target."""

    @property
    def name(self) -> str:
        return "deterministic-simulator"

    def respond(self, architecture: PromptArchitecture, attack: AttackCase) -> str:
        return SimulatedTarget(architecture).respond(attack)


class _NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):  # noqa: ANN001
        raise TargetAdapterError(f"Redirects are disabled for target adapters: {newurl}")


class AuthorizedHTTPPromptTarget:
    """Provider-neutral HTTP adapter for systems the operator owns or may test.

    Expected endpoint contract:
      POST JSON: {
        "attack_id": "ASAT-001",
        "prompt": "...",
        "architecture_id": "PROMPT-ARCH-V2",
        "prompt_contract": "..."
      }

      Response JSON: {"response": "model/application response text"}

    Safety defaults:
    - localhost only unless an explicit host allowlist is supplied;
    - non-local hosts additionally require confirm_authorized=True;
    - redirects disabled;
    - short timeout and bounded response body;
    - no credentials are stored by this adapter.
    """

    def __init__(
        self,
        endpoint: str,
        *,
        allowed_hosts: Iterable[str] = (),
        confirm_authorized: bool = False,
        timeout_seconds: float = 5.0,
    ) -> None:
        parsed = urlparse(endpoint)
        if parsed.scheme not in {"http", "https"} or not parsed.hostname:
            raise TargetAdapterError("Endpoint must be an http(s) URL with a hostname.")

        self.endpoint = endpoint
        self.host = parsed.hostname.lower()
        self.allowed_hosts = {host.lower() for host in allowed_hosts} | LOCAL_HOSTS
        self.confirm_authorized = confirm_authorized
        self.timeout_seconds = min(max(float(timeout_seconds), 0.5), MAX_TIMEOUT_SECONDS)

        if self.host not in self.allowed_hosts:
            raise TargetAdapterError(
                f"Host '{self.host}' is not allowlisted. Add it explicitly only for a system you are authorized to test."
            )
        if self.host not in LOCAL_HOSTS and not self.confirm_authorized:
            raise TargetAdapterError(
                "Non-local targets require explicit authorization confirmation."
            )

        self._opener = build_opener(_NoRedirect())

    @property
    def name(self) -> str:
        return f"authorized-http:{self.host}"

    def respond(self, architecture: PromptArchitecture, attack: AttackCase) -> str:
        payload = json.dumps(
            {
                "attack_id": attack.id,
                "prompt": attack.payload,
                "architecture_id": architecture.id,
                "prompt_contract": architecture.prompt_contract(),
            }
        ).encode("utf-8")
        request = Request(
            self.endpoint,
            data=payload,
            method="POST",
            headers={"Content-Type": "application/json", "Accept": "application/json"},
        )

        try:
            with self._opener.open(request, timeout=self.timeout_seconds) as response:
                body = response.read(MAX_RESPONSE_BYTES + 1)
        except TargetAdapterError:
            raise
        except (HTTPError, URLError, TimeoutError, OSError) as exc:
            raise TargetAdapterError(f"Target request failed: {exc}") from exc

        if len(body) > MAX_RESPONSE_BYTES:
            raise TargetAdapterError("Target response exceeded the configured size limit.")

        try:
            decoded = json.loads(body.decode("utf-8"))
        except (UnicodeDecodeError, json.JSONDecodeError) as exc:
            raise TargetAdapterError("Target must return UTF-8 JSON.") from exc

        text = decoded.get("response") if isinstance(decoded, dict) else None
        if not isinstance(text, str):
            raise TargetAdapterError("Target JSON must contain a string field named 'response'.")
        return text


def run_adapter_suite(
    adapter: PromptTargetAdapter,
    architecture: PromptArchitecture,
    attacks: Iterable[AttackCase] = ATTACKS,
) -> dict:
    """Run the existing evaluator against any adapter implementing the prompt target contract."""

    evaluator = PromptSecurityEvaluator()
    findings = []
    for attack in attacks:
        response = adapter.respond(architecture, attack)
        findings.append(evaluator.evaluate(architecture, attack, response))

    successes = sum(finding.succeeded for finding in findings)
    total = len(findings)
    severity_weight = {"critical": 10, "high": 7, "medium": 4, "low": 1}
    risk_score = sum(severity_weight[f.severity] for f in findings if f.succeeded)

    return {
        "adapter": adapter.name,
        "architecture": asdict(architecture),
        "prompt_contract": architecture.prompt_contract(),
        "total_attacks": total,
        "successful_attacks": successes,
        "attack_success_rate": round((successes / total) * 100, 1) if total else 0.0,
        "risk_score": risk_score,
        "findings": [asdict(finding) for finding in findings],
    }
