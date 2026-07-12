# Keshav Karumbunathan — personal website

A React site (Create React App + Sass + React Router), in the same family as
the Oregon Math Circle site, with its own dark green/blue identity.

## Run it locally

```bash
npm install
npm start
```

Then open http://localhost:3000.

## Build for production

```bash
npm run build
```

The static site lands in `build/`.

## Deploy to GitHub Pages

This app uses **HashRouter** and a relative `homepage` (`.`), so it works at
the root of a user site (`Kuku371.github.io`) with no routing workarounds.

Easiest path: run `npm run build`, then commit the contents of `build/` to the
branch GitHub Pages serves (or use a GitHub Action / the `gh-pages` package).
URLs look like `yoursite.com/#/studies`.

> Note: the old site's malware/"sign-in" popup came from a `polyfill.io`
> script (that domain was compromised in 2024). This rebuild does not use it.

## Editing content

All content lives in plain files under `src/data/` — you can edit these without
touching any components:

- `profile.js` — name, hero text, the Kobe quote, contact links, highlights, about
- `studies.js` — competition results, coursework, AP scores, research
- `groups.js` — current involvement, camps, previous organizations
- `projects.js` — projects (set `image` to a screenshot path when ready)
- `faqs.js` — the home-page FAQ

### Images

- **Your photo:** replace `public/images/keshav-hero.jpg` with your own
  (keep the filename, or update `photo` in `profile.js`).
- **Project screenshots:** drop files in `public/images/` and set the
  `image` field in `projects.js` (e.g. `"/images/quantum-connect4.png"`).
- Organization cards use auto-generated initials, so no logo files are needed
  (add a `logo` field to any card if you want a real image instead).

## Adding a page (e.g. a CV/resume)

1. Add a component in `src/components/`.
2. Register a `<Route>` in `src/App.js` and a link in `src/components/Navbar.js`.
3. Optionally add a per-page accent color in the `ACCENTS` map in `App.js`.

## Placeholders to fill in later

- Hero photo (`public/images/keshav-hero.jpg`)
- Project screenshots (Projects page)
- PRIMES-USA paper link (in `projects.js`, currently "coming soon")
