# Hostinger — ailabs.alfonzoanthony.com

This site is a Vite static build. Hostinger serves the **`dist/`** folder, not the TypeScript source.

## Option A — GitHub Actions (recommended)

Repository: [ailabs.alfonzoanthony-com](https://github.com/aa619172/ailabs.alfonzoanthony-com)

1. In **GitHub → Settings → Secrets and variables → Actions**, add:

   | Secret | Example / notes |
   |--------|------------------|
   | `HOSTINGER_FTP_SERVER` | From hPanel → **Files → FTP Accounts** (hostname only, no `ftp://`) |
   | `HOSTINGER_FTP_USERNAME` | FTP user for this subdomain or main account |
   | `HOSTINGER_FTP_PASSWORD` | FTP password |
   | `HOSTINGER_FTP_REMOTE_DIR` | Document root for the subdomain, often `/domains/ailabs.alfonzoanthony.com/public_html/` or `/public_html/` — confirm in hPanel **File Manager** |

2. Push to **`main`**. The workflow `.github/workflows/deploy-hostinger.yml` runs `npm run build` and uploads `dist/` via FTP.

3. In hPanel → **Domains → Subdomains**, point **ailabs.alfonzoanthony.com** at the same hosting account whose FTP path you used.

`public/.htaccess` is copied into `dist/` on build so client-side routes work on Apache.

## Option B — hPanel Git (manual build)

If you use Hostinger’s **Git** panel against this repo, run locally first:

```powershell
npm ci
npm run build
```

Then upload **only the contents of `dist/`** to the subdomain’s `public_html` (FTP or File Manager). Do not upload `node_modules` or source unless you have Node hosting configured separately.

## DNS

For **ailabs.alfonzoanthony.com**, use Hostinger’s A record or subdomain assignment in hPanel (same pattern as `uxportfolio.alfonzoanthony.com`).

## Project repos linked from the site

| Project | GitHub repo (create if missing) |
|---------|----------------------------------|
| This portfolio | `aa619172/ailabs.alfonzoanthony-com` |
| Mockup Magic | `aa619172/Mockup-Magic` (exists) |
| Crusoe Rip Pro | `aa619172/Crusoe-RipPro-Studio` |
| SeamCut Pro | `aa619172/SeamCut-Pro` |
| n8n engines | `aa619172/n8n-automation-engines` |

Local copies: `C:\Users\crusoe\Projects\mockmachine-ai`, `crusoe-rippro-studio`, and SeamCut under your OneDrive `seamcut-app` folder until pushed to GitHub.
