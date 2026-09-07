"""Write adversarial-prompt-lab-ui.html from git history with portfolio paths."""
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "adversarial-prompt-lab-ui.html"

raw = subprocess.check_output(
    ["git", "show", "77ead68:prompt-security-lab.html"],
    cwd=ROOT,
)
text = raw.decode("utf-8")

replacements = [
    (
        'https://ailabs.alfonzoanthony.com/prompt-security-lab.html',
        'https://ailabs.alfonzoanthony.com/adversarial-prompt-lab-ui.html',
    ),
    ('href="styles.css"', 'href="/adversarial-prompt-lab-ui-base.css"'),
    ('href="prompt-security-lab.css"', 'href="/adversarial-prompt-lab-ui.css"'),
    ('href="index.html"', 'href="/"'),
    ('href="index.html#work"', 'href="/projects"'),
    (
        'href="case-study-ai-security-lab.html"',
        'href="/projects/adversarial-prompt-lab"',
    ),
    ('href="resume.html"', 'href="/cv"'),
    ('src="prompt-security-lab.js"', 'src="/adversarial-prompt-lab-ui.js"'),
]

for old, new in replacements:
    text = text.replace(old, new)

OUT.write_bytes(text.encode("utf-8"))
print(f"Wrote {OUT} ({OUT.stat().st_size} bytes)")
