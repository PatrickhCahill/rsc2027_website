# RSC 2027 website

Source for the website of the 50th Research Students' Conference in
Probability and Statistics, Imperial College London, 31 August – 4 September 2027.

Live site: https://patrickhcahill.github.io/rsc2027_website/

## Editing the site

Most day-to-day changes need no code:

| To change…                       | Edit…                                      |
| -------------------------------- | ------------------------------------------ |
| Site title, description, footer  | `src/consts.ts` → `SITE`                   |
| Navigation links                 | `src/consts.ts` → `NAV_ITEMS`              |
| Footer social/contact icons      | `src/consts.ts` → `SOCIAL_LINKS`           |
| Home page text                   | `src/pages/index.astro`                    |
| About, Registration, Sponsorship | `src/pages/<page>/index.astro`             |
| Accent colour                    | `src/styles/global.css` → `--color-accent` |
| Share image / favicon            | `public/og.jpg`, `public/favicon.svg`      |

Pages are written in [Astro](https://astro.build) — HTML with a small
JavaScript block at the top. Content collections (speakers, programme) live
under `src/content/` as Markdown files with a frontmatter header; their
schemas are in `src/content.config.ts`.

## Running locally

Requires Node.js 22 or newer.

```sh
npm install
npm run dev      # live-reloading dev server at http://localhost:4321/rsc2027_website/
npm run build    # production build to ./dist
npm run preview  # serve the production build
npm run format   # auto-format (CI fails on unformatted code)
npm run check    # type-check
```

If a build fails with `ImageNotFound` after deleting content, clear the
content cache: `rm -rf .astro && npm run build`.

## Deploying

Every push to `main` triggers `.github/workflows/deploy.yml`, which builds
the site and publishes it to GitHub Pages. `ci.yml` runs the formatter,
type-checker, and a build on every pull request. There is nothing to deploy
by hand.

## Contact

Official conference email: rsc2027imperial@gmail.com

## License

Website built in [Astro](https://astro.build) using the
[Astro Keel template](https://github.com/kpab/astro-keel) by kpab.
[MIT](./LICENSE)
