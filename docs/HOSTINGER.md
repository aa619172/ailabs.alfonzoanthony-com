# Hostinger — ailabs.alfonzoanthony.com

This site is a **Vite static build**. Browsers must receive the contents of **`dist/`**, not the TypeScript source at the repo root.

## GitHub Pages (what you enabled in Settings)

If **Settings → Pages** is set to **Deploy from a branch → main / (root)**, the site will not work (raw source, no build). Use **GitHub Actions** instead:

1. **Settings → Pages → Build and deployment → Source:** choose **GitHub Actions** (not “Deploy from a branch”).
2. Push to **`main`** runs `.github/workflows/deploy-github-pages.yml` (build + deploy artifact).
3. **Custom domain (optional):** in Pages settings, set **ailabs.alfonzoanthony.com**. `public/CNAME` is included in the build. In **Hostinger DNS**, add the records GitHub shows (usually `CNAME` → `aa619172.github.io` or the four `A` records) — remove conflicting Hostinger “park subdomain” records for the same name.
4. After the custom domain is active, set repository **Variable** `GITHUB_PAGES_BASE` to `/` (**Settings → Secrets and variables → Actions → Variables**) so asset paths match the subdomain URL. Until then, the default base path targets `https://aa619172.github.io/ailabs.alfonzoanthony-com/`.

**Do not use GitHub Pages and Hostinger FTP on the same hostname** — pick one DNS target.

## Option A — Hostinger FTP

Repository: [ailabs.alfonzoanthony-com](https://github.com/aa619172/ailabs.alfonzoanthony-com)

1. **Unpublish** GitHub Pages if Hostinger serves this subdomain.
2. In **GitHub → Settings → Secrets and variables → Actions**, add:

   | Secret | Example / notes |
   |--------|------------------|
   | `HOSTINGER_FTP_SERVER` | From hPanel → **Files → FTP Accounts** (hostname only, no `ftp://`) |
   | `HOSTINGER_FTP_USERNAME` | FTP user for this subdomain or main account |
   | `HOSTINGER_FTP_PASSWORD` | FTP password |
   | `HOSTINGER_FTP_REMOTE_DIR` | Document root for the subdomain, often `/domains/ailabs.alfonzoanthony.com/public_html/` or `/public_html/` — confirm in hPanel **File Manager** |

3. Push to **`main`**. `.github/workflows/deploy-hostinger.yml` runs only when `HOSTINGER_FTP_SERVER` is set.

4. In hPanel → **Domains → Subdomains**, point **ailabs.alfonzoanthony.com** at that hosting account.

`public/.htaccess` is copied into `dist/` on build so client-side routes work on Apache.

## Option B — hPanel Git (manual build)

If you use Hostinger’s **Git** panel against this repo, run locally first:

```powershell
npm ci
npm run build
```

Then upload **only the contents of `dist/`** to the subdomain’s `public_html` (FTP or File Manager). Do not upload `node_modules` or source unless you have Node hosting configured separately.

## DNS

For **ailabs.alfonzoanthony.com**, use either GitHub Pages DNS (see Pages settings) **or** Hostinger A/subdomain records (same pattern as `uxportfolio.alfonzoanthony.com`), not both.

## Project repos linked from the site

| Project | GitHub repo (create if missing) |
|---------|----------------------------------|
| This portfolio | `aa619172/ailabs.alfonzoanthony-com` |
| Mockup Magic | `aa619172/Mockup-Magic` (exists) |
| Crusoe Rip Pro | `aa619172/Crusoe-RipPro-Studio` |
| SeamCut Pro | `aa619172/SeamCut-Pro` |
| n8n engines | `aa619172/n8n-automation-engines` |

Local copies: `C:\Users\crusoe\Projects\mockmachine-ai`, `crusoe-rippro-studio`, and SeamCut under your OneDrive `seamcut-app` folder until pushed to GitHub.
