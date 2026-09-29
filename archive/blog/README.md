# Parked: blog and works

The theme's blog and works (portfolio) sections, kept out of the build so the
empty content folders don't log `No files found` warnings on every
`npm run dev`. The content folders themselves stay at `src/content/blog/` and
`src/content/works/`. This folder is excluded in `tsconfig.json`.

To restore:

1. Move `pages/*` back into `src/pages/` (`blog/`, `works/`, `og/`,
   `rss.xml.ts`).
2. Paste the collections in `collections.ts` back into
   `src/content.config.ts` and add them to its `collections` export.
3. Un-comment the RSS `<link>` in `src/layouts/BaseLayout.astro`, the blog and
   works links in `src/pages/404.astro`, and the nav entries in
   `src/consts.ts`.
4. On the home page, restore the `works` / `posts` queries that the commented
   feed sections in `src/pages/index.astro` expect (see git history).
