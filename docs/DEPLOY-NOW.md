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
npm run zip:hostinger
```

Use **`ailabs-upload-linux.zip`** (not a plain Windows `Compress-Archive` zip). Windows zips often store paths as `assets\file.js`, and Hostinger’s extractor creates broken filenames like `assets\index-….js` instead of an `assets/` folder.

In **hPanel → Files → File Manager** → open the folder for **ailabs.alfonzoanthony.com** (often `domains/ailabs.alfonzoanthony.com/public_html`):

1. Delete the default Hostinger `index.html` (and any other placeholder files).
2. Upload **everything inside** `C:\Users\crusoe\Projects\alfonzo-portfolio\dist\` (not the `dist` folder itself) into `public_html`.
3. Confirm `index.html`, `assets/`, `.htaccess`, and `Alfonzo_Anthony_Resume.pdf` are at the root of `public_html`.

Reload **https://ailabs.alfonzoanthony.com**.

## Still seeing “You Are All Set to Go!”?

Your files are in the **wrong directory** for this subdomain. The bicycle page is Hostinger’s **default site in the real document root**, not your upload.

### Find the correct folder

1. **hPanel → Websites** → select **ailabs.alfonzoanthony.com** → **Manage**.
2. Open **Domain** / **Hosting plan** / **Advanced** (wording varies) and find **Document root** or **Root directory**.  
   Common paths:
   - `domains/ailabs.alfonzoanthony.com/public_html`
   - `public_html` (main site root — **not** `public_html/ailabs` unless the panel says so)
3. In **File Manager**, go to **that exact path** (use the path bar; start from home, not only `public_html/ailabs`).

### Fix

1. In the **document root** folder, delete **`default.php`** / Hostinger placeholder files.
2. Put your site **in that folder’s root** (`index.html`, `assets/`, `.htaccess`, etc.):
   - **Move** everything from `public_html/ailabs/` into the document root, **or**
   - Re-upload / extract `ailabs-upload-linux.zip` there (empty folder name, overwrite on).
3. Hard refresh **https://ailabs.alfonzoanthony.com**.

If hPanel lets you **change the subdomain document root** to `public_html/ailabs`, you can keep files where they are instead of moving them.

**Quick check:** In the folder Hostinger says is the root, you must see **your** `index.html` (~1 KB Vite build) and **`assets/`** — not only `default.php`.

## 3. Automatic deploys (optional)

Add GitHub Actions secrets (see [HOSTINGER.md](./HOSTINGER.md)): `HOSTINGER_FTP_SERVER`, `HOSTINGER_FTP_USERNAME`, `HOSTINGER_FTP_PASSWORD`, `HOSTINGER_FTP_REMOTE_DIR` (must be this subdomain’s `public_html` path).

Each push to `main` then runs **Deploy to Hostinger**.

## Checklist

| Step | Hostinger (your DNS) | GitHub Pages only |
|------|----------------------|-------------------|
| Custom domain in GitHub | **Empty** | `ailabs.alfonzoanthony.com` only |
| DNS for ailabs | Hostinger A / subdomain | CNAME → `aa619172.github.io` |
| Site files | `dist/` → `public_html` | GitHub Actions workflow |
