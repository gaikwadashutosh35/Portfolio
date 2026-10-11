# Ashutosh Gaikwad — Portfolio

Personal portfolio served at **https://www.ashutoshgaikwad.com**.

React 18 · Create React App 5 · Tailwind CSS 3 · Motion (framer-motion 11)

## Run locally

```bash
npm install
npm start          # dev server on http://localhost:3000
npm test           # smoke tests
npm run build      # production build in ./build
```

## Editing content

All copy, links, projects, experience and skills live in
[`src/data/portfolio.js`](src/data/portfolio.js). Components only handle layout.

Design tokens (colours, radii, shadows, easing) are CSS variables at the top of
[`src/index.css`](src/index.css) and are exposed to Tailwind in
[`tailwind.config.js`](tailwind.config.js).

## Deploy

```bash
npm run deploy
```

Builds and publishes `./build` to the `gh-pages` branch. `public/CNAME` keeps the
custom domain attached on every deploy.

## Credits

Fonts: Instrument Serif, Geist and Geist Mono (SIL Open Font License), self-hosted via Fontsource.
Icons: react-icons (Simple Icons, Feather, Font Awesome, Tabler, VS Code Codicons).
