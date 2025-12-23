# GPO Dashboard Management Core Solutions (Static Site)

A minimal, frontend-only static website for **GPO Dashboard Management Core Solutions** built with HTML, CSS, and JavaScript. It is optimized for GitHub Pages and includes marketing, documentation, dashboard demo, and pricing views.

## Project structure

```
/
├── index.html        # Marketing / entry point
├── docs.html         # Documentation (frontend-only)
├── dashboard.html    # Static dashboard demo using mock data
├── pricing.html      # Plans and Lemon Squeezy checkout buttons
└── assets/
    ├── style.css     # Single global stylesheet
    ├── app.js        # Single global script (theme, nav, rendering)
    └── mock-data.js  # Demo data only
```

## What to know

- This project is **frontend-only**—no backend, no frameworks, and no build tooling.
- Dashboard values are **mocked** in `assets/mock-data.js` and rendered in the static demo UI.
- Checkout buttons open **Lemon Squeezy hosted checkout** URLs in a new tab (placeholders are provided).
- Theme toggle (light/dark), navigation highlighting, and dashboard rendering are handled in `assets/app.js`.

## Running locally

1. Clone the repository.
2. Open `index.html` in your browser, or run a lightweight server (recommended for module imports):
   ```bash
   python -m http.server 8000
   ```
3. Visit `http://localhost:8000` to browse the pages.

## Deploying to GitHub Pages

1. Commit the files to your repository's default branch.
2. Enable GitHub Pages for the repository (Settings → Pages → Deploy from branch).
3. Select the branch and root folder, then save. GitHub Pages will serve the static site.

## Accessibility & performance

- Mobile-first layout with semantic HTML and descriptive meta tags.
- Single stylesheet and script keep payloads small for Lighthouse performance.
- Keyboard-focus styles and sufficient contrast are included.

