# Move portfolios from Hostinger → Framer

Two sites, two Framer projects, two custom domains.

| Site | Purpose | Recommended free template |
|------|---------|---------------------------|
| **uxportfolio.alfonzoanthony.com** | UX design hiring | [Fuel](https://www.framer.com/marketplace/templates/fuel/) (safe, work-first) or [Nitro](https://www.framer.com/marketplace/templates/nitro/) (video-style motion) |
| **ailabs.alfonzoanthony.com** | AI prompt engineer + automation | **[AIVOR](https://www.framer.com/marketplace/templates/aivor/)** (chosen — interactive workspace layout) |

Do **not** use the same template twice — employers should feel two intentional brands.

---

## Phase 1 — Framer setup (Day 1)

1. Sign in at [framer.com](https://www.framer.com).
2. **Remix** each template (Marketplace → template → **Remix for Free**).
3. Rename projects: `Alfonzo — UX Portfolio`, `Alfonzo — AI Labs`.
4. Publish each to a free `*.framer.website` URL and review on **phone** before touching DNS.

**Framer plan:** Custom domains require a paid **Site** plan per project (check current pricing on Framer). Budget for **two** sites if both subdomains stay separate.

---

## Phase 2 — Content migration

### UX portfolio (from uxportfolio.alfonzoanthony.com)

**Hero (6-second rule):** Lead with positioning + outcome, not a long paragraph.

> UX designer · Google UX certified · 20+ years diagnosing user problems · Figma → React

**Case studies — migrate 2–3 only (CMS):**

1. **Crusoe Rip Pro** — operator research, Figma → React, color separation UX (existing copy).
2. **Mockup Magic Studio** — dashboard / editor UX (add screenshot from live work).
3. **Google UX coursework** OR **AmeriFind / Atelier Luxe** — pick one strong visual case.

Each CMS case study should include:

- Context (2 sentences)
- Problem (bullets)
- Process (research → prototype → test)
- Solution (screenshots; **embed Figma prototype** where possible)
- Outcome (metrics or honest user feedback)

Keep the **5-step process ribbon** (Empathize → Test) as a homepage section — it’s a UX hiring signal.

**Footer:** Link to `https://ailabs.alfonzoanthony.com`.

### AI Labs (from ailabs.alfonzoanthony.com)

**Hero:** One-line positioning + **2TimesACharm Ad Engine** proof immediately:

- 16,653 people reached · $26.53 live Meta test · n8n + Claude

**Case studies — prioritize 3 deep, list rest as “More builds”:**

1. **2TimesACharm AI Ad Engine** (anchor — live-tested)
2. **Mockup Magic** (SaaS / AI product)
3. **Crusoe RipPro Studio** OR **Prompt Reliability Lab** (label **Lab** if R&D)

Tag every project: **Shipped · Live test · Lab · In development** so nothing reads inflated.

**Footer:** Link to `https://uxportfolio.alfonzoanthony.com`.

### Shared

- Resume PDF in Framer (upload asset or link to `/Alfonzo_Anthony_Resume.pdf`).
- Align cert copy: use the same wording as your PDF resume everywhere.
- Contact: email + LinkedIn.

---

## Phase 3 — DNS (Hostinger → Framer)

Do this **after** Framer preview looks correct.

For **each** subdomain in Framer: **Project Settings → Domains → Add domain**.

Framer will show DNS records. In **Hostinger hPanel → DNS** for `alfonzoanthony.com`:

1. Remove or update old records pointing subdomains at Hostinger hosting.
2. Add Framer’s **CNAME** (often `sites.framer.app`) or **A records** exactly as shown.
3. Wait for SSL (usually minutes to a few hours).

**Retire Hostinger hosting for these subdomains:**

- Stop uploading to `public_html/ailabs` (or delete placeholder files).
- If GitHub Pages was also connected, unpublish or remove custom domain there so only **one** host serves each subdomain.

---

## Phase 4 — Decommission

| What | Action |
|------|--------|
| Hostinger `public_html/ailabs` | No longer needed for portfolio |
| GitHub Pages on ailabs repo | Unpublish custom domain or archive |
| Local Vite `alfonzo-portfolio` | Archive or keep as lab index only — Framer is source of truth for marketing |
| `uxportfolio` GitHub repo | Keep as backup or archive after Framer is live |

Optional: add a short note on old URLs redirecting — Framer supports redirects on paid plans; otherwise DNS cutover is enough.

---

## Phase 5 — Launch checklist

- [ ] Mobile: scroll all case studies on phone, no laggy motion
- [ ] Each “Read case study” opens a **real CMS page** with shareable URL
- [ ] 2TimesACharm metrics visible above the fold on ailabs
- [ ] Cross-links between both portfolios
- [ ] Resume downloads
- [ ] Google Search Console: add both domains (optional)
- [ ] Update LinkedIn / resume links to confirmed live URLs

---

## Template quick pick (if undecided)

| If you want… | UX site | AI Labs site |
|--------------|---------|--------------|
| **Safest for employers** | Fuel | Promptfolio Noir |
| **More memorable** | Nitro | AIVOR |

Start with **Fuel + Promptfolio Noir** unless you strongly prefer motion on UX (Nitro).
