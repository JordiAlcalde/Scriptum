import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string().default('Scriptum'),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

const relatsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    llibre: z.string(),
    llibreId: z.string(),
    capitol: z.number(),
    data: z.date(),
    sinopsi: z.string().optional(),
    tempsLectura: z.string().default('5 min'),
  }),
});

export const collections = {
  blog: blogCollection,
  relats: relatsCollection,
};

