# Deploy ailabs.alfonzoanthony.com on Hostinger (quick fix)

Your subdomain shows Hostinger’s **“You Are All Set to Go!”** page because **DNS points to Hostinger**, but **`public_html` still has the default placeholder** — not your built site.

GitHub Pages at `aa619172.github.io/ailabs.alfonzoanthony-com/` is separate. **Use one host for `ailabs.alfonzoanthony.com`:** Hostinger (matches your DNS today).

## 1. Fix GitHub Pages custom domain (UI mistake)

In **Settings → Pages → Custom domain**, **clear** the field. It must **not** contain a Windows path.

Wrong: `c:\users\crusoe\projects\alfonzo-portfolio\ailabs.alfonzoanthony.com`  
Right (only if DNS pointed at GitHub): `ailabs.alfonzoanthony.com`

Because Hostinger serves this subdomain, **leave custom domain empty** on GitHub Pages. Use the `github.io` URL only as a preview.

## 2. Upload the built site to Hostinger (fastest)

On your PC:

```powershell
cd C:\Users\crusoe\Projects\alfonzo-portfolio
npm ci
npm run build
```

In **hPanel → Files → File Manager** → open the folder for **ailabs.alfonzoanthony.com** (often `domains/ailabs.alfonzoanthony.com/public_html`):

1. Delete the default Hostinger `index.html` (and any other placeholder files).
2. Upload **everything inside** `C:\Users\crusoe\Projects\alfonzo-portfolio\dist\` (not the `dist` folder itself) into `public_html`.
3. Confirm `index.html`, `assets/`, `.htaccess`, and `Alfonzo_Anthony_Resume.pdf` are at the root of `public_html`.

Reload **https://ailabs.alfonzoanthony.com**.

## 3. Automatic deploys (optional)

Add GitHub Actions secrets (see [HOSTINGER.md](./HOSTINGER.md)): `HOSTINGER_FTP_SERVER`, `HOSTINGER_FTP_USERNAME`, `HOSTINGER_FTP_PASSWORD`, `HOSTINGER_FTP_REMOTE_DIR` (must be this subdomain’s `public_html` path).

Each push to `main` then runs **Deploy to Hostinger**.

## Checklist

| Step | Hostinger (your DNS) | GitHub Pages only |
|------|----------------------|-------------------|
| Custom domain in GitHub | **Empty** | `ailabs.alfonzoanthony.com` only |
| DNS for ailabs | Hostinger A / subdomain | CNAME → `aa619172.github.io` |
| Site files | `dist/` → `public_html` | GitHub Actions workflow |
