# Personal Developer Portfolio

A lightweight, responsive single-page portfolio built with semantic HTML5, vanilla CSS3,
and progressive JavaScript. There is no framework, build step, package manager, or runtime
dependency.

## Status

- **M0–M4:** implementation complete.
- **M5:** deployment workflow is implemented and the GitHub remote is configured; Pages
  settings and the first deployment are pending.
- **M6:** real content, resume PDF, final social URLs, and launch audit are pending.

Temporary copy uses lorem ipsum and `TODO(launch)` comments.

## Local preview

Use a local static server so relative paths behave exactly as they will on GitHub Pages:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Opening `index.html` directly with `file://` works for
most checks, but a server is preferred.

## Project structure

```text
.
├── index.html
├── assets/
│   ├── css/styles.css
│   ├── js/main.js
│   ├── img/favicon.svg
│   ├── img/apple-touch-icon.png
│   └── resume.pdf          # add before enabling the resume links
├── .github/workflows/deploy.yml
├── PROJECT_MAP.md
└── README.md
```

## Updating content

1. Edit `index.html`.
2. Search for `TODO(launch)` and replace every temporary item.
3. Add `assets/resume.pdf`, then uncomment the two resume links in the header and hero.
4. Update the canonical URL, Open Graph URL, JSON-LD URL, email address, GitHub profile,
   LinkedIn profile, and project links.
5. Run the validation checklist below.
6. Synchronize `PROJECT_MAP.md`.

## Deployment

### One-time setup

1. The `origin` remote points to `git@github.com:Abdelhafidh-87/Portfolio.git`. Add your SSH
   key to GitHub, then push `main` (or use an HTTPS remote with a credential helper).
2. Open **Settings → Pages → Build and deployment**.
3. Set **Source** to **GitHub Actions**.
4. Push to `main` or run the workflow manually from the **Actions** tab.

The workflow deploys the repository root as a static artifact to
`https://abdelhafidh-87.github.io/Portfolio/`. All local asset paths are relative so the
project-site subpath works correctly.

The canonical URL, `og:url`, and JSON-LD `url` are set to
`https://abdelhafidh-87.github.io/Portfolio/`. Verify the deployed URL and repository-name
capitalization before launch.

### Rollback

- **Preferred:** `git revert <bad-commit>` and push to `main`; the workflow redeploys the
  reverted state automatically.
- **Fast path:** re-run the last known-good workflow from the **Actions** tab.

No secrets are required. The workflow uses the automatic `GITHUB_TOKEN` with
least-privilege permissions (`contents: read`, `pages: write`, `id-token: write`).

## Validation checklist

- [ ] W3C Nu HTML Checker: zero errors.
- [ ] Lighthouse mobile: Performance, Accessibility, Best Practices, SEO ≥ 95.
- [ ] axe DevTools: zero serious/critical findings.
- [ ] Keyboard-only: skip link, nav, menu, all links usable; focus visible.
- [ ] JavaScript disabled: all content and navigation usable.
- [ ] Responsive: no horizontal scroll at 320, 375, 768, 1024, 1440, 1920 px.
- [ ] Resume link downloads a real PDF.
- [ ] All external links open safely and return the expected pages.
- [ ] Canonical/OG/JSON-LD URLs match production.
- [ ] No `TODO(` or bracketed placeholders remain.
