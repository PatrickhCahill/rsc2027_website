// Parked `works` and `blog` collection definitions. To restore, paste these
// back into src/content.config.ts and add them to `collections` there.

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

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

export const collections = { works, blog };
