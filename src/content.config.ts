import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Astro 7 Content Layer API: each collection declares a `loader`.
// The template's `works` and `blog` collections are parked in archive/blog/
// (see its README) so their empty folders don't warn on every dev start.

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

export const collections = { programme };
