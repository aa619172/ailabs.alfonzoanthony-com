# Cursor project guide — ailabs.alfonzoanthony.com

Use this file by opening the project folder in **Cursor** or typing `@docs/CURSOR-PROJECT.md` in chat.

A matching auto-loaded rule lives at `.cursor/rules/ailabs-portfolio.mdc`.

---

## Open this project in Cursor

1. **Clone or open the folder**
   - Repo: `https://github.com/aa619172/ailabs.alfonzoanthony-com.git`
   - Local path: `C:\Users\crusoe\Projects\alfonzo-portfolio`
2. **Cursor → File → Open Folder** → select the repo root
3. Cursor will automatically load rules from `.cursor/rules/`

---

## Quick start

```powershell
cd C:\Users\crusoe\Projects\alfonzo-portfolio
npm install
npm run dev
```

Preview: http://127.0.0.1:5173

Build: `npm run build` → `dist/`

---

## Architecture

```
src/
├── App.tsx                 # Routes
├── config.ts               # UNDER_CONSTRUCTION flag
├── index.css               # Tailwind + theme tokens
├── main.tsx                # ThemeProvider wrapper
├── components/aivor/       # Shell, icons, theme, zoom viewer
├── data/
│   ├── content.ts          # Site + projects + experience + about
│   ├── caseStudyDetails.ts # Case study problem / action / outcome
│   └── hobbies.ts          # Hobby gallery content
├── pages/                  # One file per route
└── theme/ThemeProvider.tsx # light | dark | system

public/
├── projects/               # Project screenshots
├── hobbies/                # Personal hobby photos
├── .htaccess               # SPA rewrite for Hostinger
└── Alfonzo_Anthony_Resume.pdf
```

---

## Content map

| What to edit | Where |
|--------------|-------|
| Name, email, role, stats | `src/data/content.ts` → `site`, `stats` |
| Project list + summaries | `src/data/content.ts` → `caseStudies` |
| Full case study text | `src/data/caseStudyDetails.ts` |
| About + personal story | `src/data/content.ts` → `about` |
| Hobbies | `src/data/hobbies.ts` |
| Experience | `src/data/content.ts` → `experience` |
| Home ask-bar responses | `src/data/content.ts` → `askResponses` |

---

## Case study format

Each project detail uses three sections:

1. **01 · The problem**
2. **02 · What I did**
3. **03 · Outcome**

Tone: first-person, natural, honest metrics only.

---

## Theme

- Default: **dark** (`localStorage` key: `ailabs-theme`)
- Options: Light, Dark, System
- Tokens defined in `src/index.css` — use `bg-surface`, `text-ink`, etc.

---

## Deploy

| Method | How |
|--------|-----|
| Automatic | Push to `main` on GitHub → Hostinger FTP workflow |
| Manual | `npm run build` then upload `dist/` to Hostinger `public_html` |
| Zip | `npm run zip:hostinger` → upload `ailabs-upload-linux.zip` |

Live URL: https://ailabs.alfonzoanthony.com

---

## Brand facts (for copy consistency)

- **Name:** Alfonzo Anthony
- **Role:** AI Prompt Engineer
- **Email:** contact@alfonzoanthony.com
- **Location:** Gulf Coast · Remote · Available
- **Voice:** Artist by nature, 20+ years in tech, prompting as creative medium
- **Anchor proof:** 2TimesACharm — 16,653 reach, $26.53 spend, within 7 days (live Meta test)

---

## Do not add

- Outlier, Datannation.tech, Amazon MTurk, contract AI training platforms
- UX portfolio button on case studies (removed by design)
- Fake production metrics on lab projects
