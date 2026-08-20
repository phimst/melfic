# Melfic — by seraphim

A minimal, premium developer portfolio. Pure HTML/CSS/JS — no build step, no framework, works straight on GitHub Pages.

## File structure

```
/
├── index.html
├── style.css
├── script.js
├── config.js          ← edit this to customize everything
├── README.md
└── assets/
    ├── profile.svg     ← placeholder avatar, swap for profile.jpg
    ├── cv.pdf           ← placeholder resume, swap for your real CV
    └── projects/
        ├── melfic-api.svg
        ├── seraphyne.svg
        ├── xhanthus.svg
        └── myputra.svg
```

## Customizing

Everything — name, brand, hero copy, socials, CV, projects, skills, availability — is controlled from **`config.js`**. You should never need to touch `index.html`.

1. **Your info**: edit `profile`, `hero`, `about`, `contact` in `config.js`.
2. **Your photo**: replace `assets/profile.svg` with a real image (e.g. `profile.jpg`) and update `profile.avatar` in `config.js` to point at it.
3. **Your CV**: replace `assets/cv.pdf` with your real resume (same filename, or update `cv.file`).
4. **Projects**: edit the `projects` array — each entry needs `name` and `description`. `image`, `category`, and `url` are all optional:
   - No `image`? The Melfic mark (`assets/logo-mark.png`) is shown as a placeholder automatically.
   - No `category`? The badge is simply skipped.
   - No `url`? No "View Project" link is shown — the card is just informational.
5. **Skills**: edit the `skills` array — each entry needs a `name` and an `icon` key. Supported icon keys live in the `ICON_MAP` object at the top of `script.js` (html, css, javascript, typescript, node, react, express, mongodb, git, github, flutter, laravel, mysql). Any other key falls back to a generic dot.
6. **Theme**: the theme toggle in the navbar switches between light/dark and remembers the choice in `localStorage`. On first visit (no saved choice) it follows the visitor's OS/browser preference automatically.

## Deploying to GitHub Pages

1. Push this folder to a GitHub repository.
2. In the repo settings → **Pages**, set the source to your default branch (root).
3. Your site will be live at `https://<username>.github.io/<repository>/`.

All asset paths in this project are relative (`./assets/...`), so it works correctly whether it's served from a domain root or a GitHub Pages project subdirectory — no config changes needed.

## SEO — getting found on Google for "Melfic"

This project ships with technical SEO already wired up:

- **Meta tags**: title, description, canonical URL — all driven by the `seo` block in `config.js`.
- **Open Graph + Twitter Card**: rich preview when the link is shared (uses `assets/og-image.jpg`).
- **JSON-LD structured data**: `WebSite` (name: Melfic) + `Person` (name: Seraphim) schema, so Google can associate the brand and the person with this URL.
- **`sitemap.xml`** and **`robots.txt`** at the project root.
- **Google Search Console verification tag** already in `index.html` `<head>`.

### One-time setup after deploying

1. **Update the URL everywhere.** Once you know your real GitHub Pages URL (or custom domain), replace `https://seraphim.github.io/melfic/`:
   - `config.js` → `seo.url`
   - `sitemap.xml` → `<loc>`
   - `robots.txt` → `Sitemap:` line
   - The static fallback tags in `index.html` `<head>` (canonical, OG, Twitter, JSON-LD) — these exist as a no-JS fallback for crawlers that don't execute JavaScript (some social-media link previewers), so keep them in sync with `config.js`.
2. **Google Search Console** (search.google.com/search-console):
   - Add your site as a property, verify with the existing `google-site-verification` meta tag (already in `<head>`).
   - Go to **Sitemaps** → submit `sitemap.xml`.
   - Go to **URL Inspection** → paste your homepage URL → **Request Indexing**.
3. **Bing Webmaster Tools** (optional but recommended — Bing powers ChatGPT Search / Copilot): import your site directly from Google Search Console in one click, submit the same sitemap.
4. **Social profiles**: link your GitHub, X, and LinkedIn back to this site in `config.js` → `social`, and add this site's URL to those profiles' bios. Consistent cross-links between "Melfic" and "Seraphim" across platforms are one of the strongest signals for branded search.
5. **Custom domain (recommended)**: `*.github.io` sitemaps are sometimes flaky with Google's crawler. A cheap custom domain (e.g. `melfic.dev`) pointed at GitHub Pages is more reliable for ranking under your own brand name.

Ranking for a low-competition brand name like "Melfic" typically takes anywhere from a few days (technical indexing) to a few months (actually surfacing near the top) — consistency across the site and linked profiles is what speeds it up.

## Notes

- No backend, no build process, no external icon CDN — all icons are inline SVG.
- Respects `prefers-reduced-motion` and `prefers-color-scheme`.
- Keyboard-navigable with visible focus states.
