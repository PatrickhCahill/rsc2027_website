import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Astro 7 Content Layer API: each collection declares a `loader`.
// Authors add Markdown/MDX files under the `base` directories below.
const works = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/works' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      tech: z.array(z.string()),
      link: z.string().url().optional(),
      repo: z.string().url().optional(),
      thumbnail: image().optional(),
      order: z.number().optional(),
      publishDate: z.coerce.date(),
    }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      publishDate: z.coerce.date(),
      tags: z.array(z.string()).default([]),
      description: z.string(),
      draft: z.boolean().default(false),
      heroImage: image().optional(),
    }),
});

// Conference programme: one YAML file per day under src/content/programme/,
// e.g. `2027-09-01.yaml`. The page groups sessions that share a start and end
// time into one slot and lays them out side by side, so parallel tracks need
// no extra structure — just give each its own `track` label.
const time = z.string().regex(/^\d{2}:\d{2}$/, 'Use 24-hour HH:MM, e.g. "09:30"');

const session = z.object({
  start: time,
  end: time,
  title: z.string(),
  /** Free text for now; may become a reference to a speakers collection. */
  speaker: z.string().optional(),
  room: z.string().optional(),
  /** Label for parallel sessions, e.g. "A" / "B". Sorted within a slot. */
  track: z.string().optional(),
  abstract: z.string().optional(),
  type: z.enum(['keynote', 'talk', 'poster', 'break', 'social']).default('talk'),
});

const programme = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{yaml,yml}', base: './src/content/programme' }),
  schema: z.object({
    date: z.coerce.date(),
    sessions: z.array(session),
  }),
});

export const collections = { works, blog, programme };
