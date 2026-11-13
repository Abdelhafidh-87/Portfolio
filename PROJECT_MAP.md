# Project Map

Last updated: 2026-11-13
Current status: M0–M5 complete; M6 pending.

This file is the external memory for the project. Keep it synchronized with the code and
update it whenever structure, behavior, deployment, or launch status changes.

## 1. Purpose

A fast, accessible, single-page portfolio for a software engineer. The site presents a short
introduction, experience, skills, selected projects, and contact links. It is designed to be
deployed as a static GitHub Pages project site with no runtime dependencies.

Success criteria:

- Clear professional presentation on mobile and desktop.
- WCAG 2.2 AA accessibility and full keyboard operation.
- No horizontal overflow from 320 px upward.
- Strong Lighthouse scores without a build step.
- Content and links are easy to replace without touching layout code.
- One push to `main` deploys the site through GitHub Actions.

## 2. Non-goals

- No framework, bundler, package manager, backend, database, or server runtime.
- No contact form, CMS, analytics, authentication, theme toggle, custom domain, or blog.
- No external fonts, icon libraries, trackers, or third-party JavaScript.
- No multi-page routing or client-side application state.

## 3. Current state

| Area | Status | Notes |
| --- | --- | --- |
| M0 — documentation and repository setup | Complete | `README.md`, this map, `.gitignore`, and local Git initialization are in place. |
| M1 — page structure and content placeholders | Complete | All required sections and semantic landmarks are implemented. |
| M2 — visual system | Complete | Light minimal theme, design tokens, responsive cards, and typography. |
| M3 — responsive and accessible layout | Complete | Tested from 320 px to 1920 px; axe reports zero WCAG A/AA violations. |
| M4 — progressive JavaScript | Complete | Mobile navigation, active-section highlighting, and footer year enhancement. |
| M5 — deployment | Complete | Workflow run 43476550695 created the Pages site and deployed successfully. Live at `https://abdelhafidh-87.github.io/Portfolio/`. |
| M6 — launch content and audit | Pending | Needs final copy, résumé PDF, social URLs, and a final-content audit. |

Current Git state: branch `main` tracks `origin/main`; `origin` is
`git@github.com:Abdelhafidh-87/Portfolio.git`. The SSH push succeeded after unlocking the local
key. The first run failed at **Configure Pages** because no Pages site existed; adding
`enablement: true` let the next run create it and deploy.

## 4. Architecture

The site is a static document at the repository root.

- `index.html` contains all content, metadata, and semantic structure.
- `assets/css/styles.css` is the only stylesheet and uses custom properties for design tokens.
- `assets/js/main.js` is a deferred, dependency-free progressive enhancement script.
- `assets/img/` contains the SVG favicon and generated Apple touch icon.
- `.github/workflows/deploy.yml` validates required files, uploads the repository root, and
  deploys through GitHub Pages.
- There is no build output and no generated HTML or CSS.

Load order in `index.html`:

1. Metadata, canonical link, Open Graph/Twitter tags, and JSON-LD.
2. Favicon and Apple touch icon.
3. Stylesheet.
4. Deferred JavaScript.
5. Page content.

All local URLs are relative (`assets/...`, `#section`) so the site works under a GitHub Pages
project subpath such as `https://username.github.io/repository/`. Do not introduce root-relative
local paths beginning with `/`.

JavaScript is optional. The no-JavaScript experience keeps the navigation links visible, hides
the menu toggle, and exposes all content.

## 5. File map

```text
.
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages deployment and static validation
├── assets/
│   ├── css/
│   │   └── styles.css          # Tokens, reset, components, layout, reduced motion
│   ├── img/
│   │   ├── apple-touch-icon.png
│   │   └── favicon.svg
│   ├── js/
│   │   └── main.js             # Navigation, active section, footer year
│   └── resume.pdf              # NOT YET PRESENT; add before enabling résumé links
├── .gitignore
├── index.html                  # Complete single-page site
├── PROJECT_MAP.md              # This file
└── README.md                   # Setup, content, deployment, and validation guide
```

## 6. Temporary content to replace

Search `index.html` for `TODO(launch)` before launch.

- Identity: `Alex Morgan`, `Berlin, Germany`, `Front-end engineering`.
- Availability and contact: `Open to opportunities`, `hello@example.com`.
- About: two lorem ipsum biography paragraphs.
- Experience: Northwind Labs, Contoso Studio, Example University, and lorem ipsum bullets.
- Skills: sample language, framework, tool, and practice lists.
- Projects: Project Atlas, Project Relay, and Project Lumen with lorem ipsum summaries.
- Project links: repository links point to this repository; demo links point to
  `https://example.com`.
- Social: GitHub uses `https://github.com/Abdelhafidh-87`; LinkedIn is the placeholder
  `https://www.linkedin.com/in/example`.
- SEO: canonical, `og:url`, JSON-LD `url`, and page title/description use the temporary identity
  and the expected Pages URL. Verify the deployed URL and repository-name capitalization.
- Résumé: add `assets/resume.pdf`, then uncomment the header and hero links.
- Footer: `Alex Morgan`; the copyright year is updated by JavaScript when enabled.

All temporary sections are marked with `TODO(launch)` comments.

## 7. Design system

Design tokens live at the top of `assets/css/styles.css`.

- Background: `#fafaf9`; surface: `#ffffff`; text: `#18181b`; muted: `#52525b`.
- Accent: `#1d4ed8`; hover: `#1e40af`; soft accent: `#eff6ff`.
- Border: `#e4e4e7`.
- Typography: system sans stack; monospace stack for labels and metadata.
- Fluid type scale from `--step--1` through `--step-4` using `clamp()`.
- Spacing scale from `--space-1` (0.25 rem) through `--space-16` (4 rem).
- Container: maximum 72 rem with a fluid gutter.
- Header height: 4.5 rem.
- Radii: 0.375 rem, 0.75 rem, and 1 rem.
- Motion: 180 ms ease; all transforms and transitions are effectively disabled under
  `prefers-reduced-motion: reduce`.

Responsive breakpoints:

- Below 40 rem: single-column skills and projects; stacked contact actions.
- At 40 rem and above: two-column skills and projects.
- At 56.25 rem and above: desktop navigation; two-column hero, about, and contact layout.
- At 75 rem and above: four-column skills and three-column projects.

## 8. Accessibility and behavior contract

- The first focusable element is a skip link to `#main`. `main` has `tabindex="-1"` so focus
  moves into the content area.
- All interactive elements use the shared `:focus-visible` outline (3 px accent, 3 px offset).
- Navigation links have a minimum height of 44 px; buttons and primary actions are at least
  46 px tall.
- The mobile menu toggle is hidden in HTML and revealed only when JavaScript initializes.
  It controls `#primary-nav` through `aria-controls` and exposes state through `aria-expanded`.
- The mobile menu closes on link selection, on Escape, and when the viewport reaches desktop
  width. Escape returns focus to the toggle.
- The active navigation link is marked with `aria-current="location"` using an
  `IntersectionObserver`. The hero clears the current state.
- With JavaScript disabled, the navigation remains visible, the toggle stays hidden, and all
  content is available.
- External links that open a new tab use `rel="noopener noreferrer"` and include screen-reader
  text announcing the new tab.
- The three `role="list"` attributes on flex lists are intentional for Safari list semantics.
  The W3C checker reports these only as informational notes; `html-validate` flags them as
  redundant. Do not remove them without testing VoiceOver/Safari list announcements.
- Reduced-motion users receive automatic scrolling and no hover translation.

Target: WCAG 2.2 AA.

## 9. Local development

No installation is required.

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000/`. A local server is preferred over `file://` so relative assets and
future PDF downloads behave like production.

Useful static checks:

```sh
node --check assets/js/main.js

curl -sS -H 'Content-Type: text/html; charset=utf-8' \
  --data-binary @index.html \
  'https://validator.w3.org/nu/?out=json'

npx --yes html-validate index.html
```

`html-validate` reports the intentional `role="list"` redundancy described above.

## 10. Validation record

Validated on 2026-11-13 against both the local server and the production deployment.

Local checks:

- JS syntax: passed (`node --check`).
- W3C Nu HTML Checker: 0 errors, 0 warnings, 10 informational notes about `role="list"`.
- Lighthouse 13.6.0 mobile: Performance 100, Accessibility 100, Best Practices 100, SEO 100.
  FCP 1.0 s, LCP 1.0 s, CLS 0.023, TBT 30 ms.
- Playwright with Brave (`/usr/bin/brave-browser`):
  - HTTP 200, one `h1`, expected title, no console/page errors.
  - axe: zero WCAG A/AA violations.
  - No horizontal overflow at 320, 375, 390, 768, 1024, 1440, and 1920 px.
  - Mobile menu opens, sets `aria-expanded`, closes on Escape, returns focus, closes on link
    selection, updates the hash, and sets the active section.
  - Skip link is the first focus target, is visible, moves focus to `main`, and the next Tab
    enters main content.
  - No clipped headings; buttons are at least 44 px tall; reduced-motion scrolling is automatic.
  - No-JS page loads, nav remains visible, toggle is hidden, and main content is visible.

Production checks:

- `https://abdelhafidh-87.github.io/Portfolio/` returns HTTP 200 with the expected title,
  canonical URL, and `h1`.
- W3C Nu HTML Checker against the live URL: 0 errors, 0 warnings, same 10 informational notes.
- The full Playwright/axe suite passed against production.
- Lighthouse 13.6.0 mobile: Performance 99, Accessibility 100, Best Practices 100, SEO 100.
  FCP 1.1 s, LCP 1.1 s, CLS 0.023, TBT 10 ms, warm TTFB 0.25–0.32 s.

The first production Lighthouse run scored 93 Performance because the initial GitHub Pages
response took 3.36 s; a warm run scored 99. Lighthouse still notes unminified CSS,
render-blocking CSS, and cache lifetimes. These are expected for a no-build static site;
GitHub Pages controls caching, and the total CSS payload is small.

The Playwright/axe harness is intentionally external to the repository and was run from
`/tmp/opencode/portfolio-test/test.js`. Results were saved to
`/tmp/opencode/playwright-results.txt` and `/tmp/opencode/playwright-production.txt`.
Recreate the harness if it is no longer available.

## 11. Deployment

Workflow: `.github/workflows/deploy.yml`

- Triggers on push to `main` and manual `workflow_dispatch`.
- Permissions: `contents: read`, `pages: write`, `id-token: write`.
- Concurrency group: `pages`; in-progress deployments are not cancelled.
- Steps: checkout, validate required files and relative paths, configure Pages (with an
  enablement attempt), upload the repository root, deploy.
- Pinned major versions: `actions/checkout@v7`, `actions/configure-pages@v6`,
  `actions/upload-pages-artifact@v5`, `actions/deploy-pages@v5`.
- No secrets are required; the workflow uses the automatic `GITHUB_TOKEN`.

Deployment record:

1. Pushed `main` at `0e0bede`. Run 1 failed at **Configure Pages** because the repository had no
   Pages site.
2. Added `enablement: true` and pushed `b5ea859`. Run 43476550695 completed successfully:
   Configure Pages, upload artifact, and deploy all passed.
3. Verified the live URL, title, canonical URL, HTML validity, accessibility, and Lighthouse
   scores.

The action documentation says automatic enablement requires a token other than
`GITHUB_TOKEN`; in this repository, the workflow's `pages: write` token succeeded. If a future
run is denied, use a PAT with Pages/administration write access or enable Pages manually.

Rollback:

- Preferred: `git revert <bad-commit>` and push to `main`.
- Fast path: re-run the last known-good workflow from the **Actions** tab.

## 12. Decision log

- Vanilla HTML/CSS/JS: keeps hosting free, startup instant, and maintenance simple.
- Single page: matches portfolio browsing behavior and avoids routing complexity.
- System fonts: removes network requests, font loading shift, and privacy concerns.
- Inline SVG favicon: crisp at any size and no extra request.
- Temporary Alex Morgan/lorem content: makes the layout reviewable before final copy is
  available; every temporary section is marked `TODO(launch)`.
- SSH `origin` with HTTPS fallback: the repository is public and readable over HTTPS; SSH push
  works after unlocking the local key.
- Résumé links commented out: prevents a broken download until `assets/resume.pdf` exists.
- Relative asset paths: required for GitHub Pages project-site subpaths.
- GitHub Actions Pages deployment: avoids maintaining a `gh-pages` branch.
- Workflow-based Pages enablement: `enablement: true` created the Pages site on the second run
  using the workflow token, so no manual Pages setup was required.
- `role="list"` retained: improves Safari/VoiceOver semantics despite validator noise.
- No OG image: avoids shipping a low-quality placeholder; add one during launch if desired.

## 13. Open items

- [ ] Replace Alex Morgan and all lorem ipsum with real identity, bio, experience, skills, and
      project content.
- [ ] Add `assets/resume.pdf` and enable both résumé links.
- [ ] Replace project repository/demo URLs and the LinkedIn placeholder; confirm the GitHub URL.
- [x] Verify canonical, Open Graph, JSON-LD, and social URLs against the production deployment.
- [x] Push `main` after unlocking the local SSH key.
- [x] Enable Pages through the workflow's `enablement: true` attempt and deploy at
      `https://abdelhafidh-87.github.io/Portfolio/`.
- [x] Re-run W3C, Lighthouse, axe, keyboard, no-JS, and responsive checks against production.
- [ ] Optionally add a 1200×630 Open Graph image and reference it in metadata.
- [ ] Review the design in a real browser with final copy; placeholder lengths may change
      wrapping and card balance.
- [x] Commit the initial implementation (`915076c`) and temporary content (`0e0bede`); keep
      future changes on `main` deployable.

## 14. Change protocol

Before committing:

1. Update content and this map together.
2. Run the static checks and the browser checks.
3. Confirm no placeholders remain for launch.
4. Keep `main` deployable; the workflow deploys every push.
5. Do not add a build step or external runtime dependency without recording the decision here.
